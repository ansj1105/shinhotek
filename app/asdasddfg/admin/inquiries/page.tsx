import { InquiriesAdminSection } from "@/components/admin-sections";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const inquiries = await prisma.inquiry.findMany({
    orderBy: { createdAt: "desc" },
  });

  return <InquiriesAdminSection inquiries={inquiries} />;
}
