import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { locale?: string };
    const headerStore = await headers();
    const forwarded = headerStore.get("x-forwarded-for") || "";
    const userAgent = headerStore.get("user-agent") || "";
    const visitorKey = createHash("sha256")
      .update(`${forwarded}|${userAgent}`)
      .digest("hex");

    const visitDate = new Date();
    visitDate.setHours(0, 0, 0, 0);

    await prisma.visitLog.upsert({
      where: {
        visitDate_visitorKey: {
          visitDate,
          visitorKey,
        },
      },
      update: {},
      create: {
        visitDate,
        visitorKey,
        locale: body.locale || null,
      },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
