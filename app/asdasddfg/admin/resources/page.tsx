import { ResourcesAdminSection } from "@/components/admin-sections";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminResourcesPage() {
  const resources = await prisma.resource.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
  });

  return <ResourcesAdminSection resources={resources} />;
}
