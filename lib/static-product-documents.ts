export type StaticProductDocument = {
  kind: "DATASHEET" | "DRAWING";
  titleKo: string;
  titleEn: string;
  fileUrl: string;
  fileName: string;
  mimeType: string;
};

export const staticProductDocuments: Record<string, StaticProductDocument[]> = {};

export function getStaticProductDocuments(slug: string) {
  return staticProductDocuments[slug] ?? [];
}

export function getStaticProductDocument(slug: string, kind: "DATASHEET" | "DRAWING") {
  return getStaticProductDocuments(slug).find((document) => document.kind === kind);
}
