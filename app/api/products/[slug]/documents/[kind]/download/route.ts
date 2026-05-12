import { readFile, stat } from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { getStaticProductDocument } from "@/lib/static-product-documents";

const mimeByExtension: Record<string, string> = {
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".dwg": "application/octet-stream",
  ".dxf": "application/dxf",
  ".zip": "application/zip",
};

function normalizeKind(kind: string) {
  const upperKind = kind.toUpperCase();
  return upperKind === "DRAWING" ? "DRAWING" : upperKind === "DATASHEET" ? "DATASHEET" : null;
}

function encodeDownloadName(fileName: string) {
  const safeFallback = fileName.replace(/[^\x20-\x7E]/g, "_").replace(/["\\]/g, "_");
  return `attachment; filename="${safeFallback}"; filename*=UTF-8''${encodeURIComponent(fileName)}`;
}

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string; kind: string }> },
) {
  const { slug, kind } = await context.params;
  const documentKind = normalizeKind(kind);

  if (!documentKind) {
    return NextResponse.json({ error: "Unsupported product document kind." }, { status: 400 });
  }

  const document =
    (await prisma.productDocument.findFirst({
      where: {
        kind: documentKind,
        published: true,
        product: {
          slug,
          published: true,
        },
      },
      orderBy: [{ displayOrder: "asc" }, { createdAt: "asc" }],
    })) ?? getStaticProductDocument(slug, documentKind);

  if (!document) {
    return NextResponse.json({ error: "Product document not found." }, { status: 404 });
  }

  if (/^https?:\/\//i.test(document.fileUrl)) {
    return NextResponse.redirect(document.fileUrl);
  }

  if (!document.fileUrl.startsWith("/uploads/product-documents/") && !document.fileUrl.startsWith("/products/datasheets/")) {
    return NextResponse.redirect(new URL(document.fileUrl, _request.url));
  }

  const relativePath = document.fileUrl.replace(/^\/+/, "");
  const filePath = path.join(process.cwd(), "public", relativePath);
  const publicRoot = document.fileUrl.startsWith("/uploads/product-documents/")
    ? path.join(process.cwd(), "public", "uploads", "product-documents")
    : path.join(process.cwd(), "public", "products", "datasheets");
  const resolvedPath = path.resolve(filePath);

  if (!resolvedPath.startsWith(path.resolve(publicRoot))) {
    return NextResponse.json({ error: "Invalid product document path." }, { status: 400 });
  }

  const [file, fileStat] = await Promise.all([readFile(resolvedPath), stat(resolvedPath)]);
  const extension = path.extname(document.fileName || document.fileUrl).toLowerCase();
  const mimeType = document.mimeType || mimeByExtension[extension] || "application/octet-stream";
  const fileName = document.fileName || path.basename(document.fileUrl);

  return new NextResponse(file, {
    headers: {
      "Content-Type": mimeType,
      "Content-Length": String(fileStat.size),
      "Content-Disposition": encodeDownloadName(fileName),
      "Cache-Control": "private, max-age=0, must-revalidate",
    },
  });
}
