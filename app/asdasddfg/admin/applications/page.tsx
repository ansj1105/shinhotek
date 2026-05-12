import { ApplicationsAdminSection } from "@/components/admin-sections";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "asc" }],
  });

  return <ApplicationsAdminSection applications={applications} />;
}
