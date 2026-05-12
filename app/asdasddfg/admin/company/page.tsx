import { AdminCompanyEditor } from "@/components/admin-company-editor";
import { getCompanyContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminCompanyPage() {
  const companyContent = await getCompanyContent();

  return (
    <AdminCompanyEditor
      companyContent={{
        id: companyContent.id,
        historyTitleKo: companyContent.historyTitleKo,
        historyTitleEn: companyContent.historyTitleEn,
        historyBodyKo: companyContent.historyBodyKo,
        historyBodyEn: companyContent.historyBodyEn,
        brandTitleKo: companyContent.brandTitleKo,
        brandTitleEn: companyContent.brandTitleEn,
        brandLeadKo: companyContent.brandLeadKo,
        brandLeadEn: companyContent.brandLeadEn,
        visionTitleKo: companyContent.visionTitleKo,
        visionTitleEn: companyContent.visionTitleEn,
        visionBodyKo: companyContent.visionBodyKo,
        visionBodyEn: companyContent.visionBodyEn,
        goalTitleKo: companyContent.goalTitleKo,
        goalTitleEn: companyContent.goalTitleEn,
        goalBodyKo: companyContent.goalBodyKo,
        goalBodyEn: companyContent.goalBodyEn,
      }}
    />
  );
}
