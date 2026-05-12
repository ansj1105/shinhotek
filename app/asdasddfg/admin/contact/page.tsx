import { ContactAdminSection } from "@/components/admin-sections";
import { getDistributorDirectory, getPageHeroConfigs } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function AdminContactPage() {
  const [pageHeroConfigs, distributorDirectory] = await Promise.all([
    getPageHeroConfigs(),
    getDistributorDirectory({ includeDisabled: true }),
  ]);

  return (
    <ContactAdminSection
      pageHeroConfigs={pageHeroConfigs}
      distributorSettings={distributorDirectory.settings}
      distributorRegions={distributorDirectory.regions}
    />
  );
}
