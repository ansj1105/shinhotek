import { PrismaClient } from "@prisma/client";

import { createPasswordHash } from "../lib/password";
import {
  defaultApplications,
  defaultCompanyContent,
  defaultDistributorRegions,
  defaultDistributorSettings,
  defaultPageHeroConfigs,
  defaultProducts,
  defaultResources,
  defaultSiteConfig,
} from "../lib/default-content";

const prisma = new PrismaClient();

async function main() {
  await prisma.siteConfig.upsert({
    where: { id: 1 },
    update: {
      seriesTitleKo: defaultSiteConfig.seriesTitleKo,
      seriesTitleEn: defaultSiteConfig.seriesTitleEn,
      seriesLeadKo: defaultSiteConfig.seriesLeadKo,
      seriesLeadEn: defaultSiteConfig.seriesLeadEn,
    },
    create: {
      ...defaultSiteConfig,
    },
  });

  for (const [index, application] of defaultApplications.entries()) {
    await prisma.application.upsert({
      where: { slug: application.slug },
      update: {
        ...application,
        sortOrder: index + 1,
      },
      create: {
        ...application,
        sortOrder: index + 1,
      },
    });
  }

  for (const product of defaultProducts) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        ...product,
      },
    });
  }

  for (const resource of defaultResources) {
    await prisma.resource.upsert({
      where: { slug: resource.slug },
      update: {
        ...resource,
      },
      create: {
        ...resource,
      },
    });
  }

  for (const config of defaultPageHeroConfigs) {
    await prisma.pageHeroConfig.upsert({
      where: { pageKey: config.pageKey },
      update: {},
      create: config,
    });
  }

  await prisma.companyContent.upsert({
    where: { id: 1 },
    update: {},
    create: defaultCompanyContent,
  });

  await prisma.distributorSettings.upsert({
    where: { id: 1 },
    update: {},
    create: defaultDistributorSettings,
  });

  for (const region of defaultDistributorRegions) {
    const savedRegion = await prisma.distributorRegion.upsert({
      where: { slug: region.slug },
      update: {},
      create: {
        slug: region.slug,
        nameKo: region.nameKo,
        nameEn: region.nameEn,
        descriptionKo: region.descriptionKo,
        descriptionEn: region.descriptionEn,
        sortOrder: region.sortOrder,
        enabled: region.enabled,
      },
    });

    for (const partner of region.partners) {
      const existing = await prisma.distributorPartner.findFirst({
        where: {
          regionId: savedRegion.id,
          countryEn: partner.countryEn,
          companyEn: partner.companyEn,
        },
      });

      if (!existing) {
        await prisma.distributorPartner.create({
          data: {
            regionId: savedRegion.id,
            ...partner,
          },
        });
      }
    }
  }

  const adminUsername = process.env.ADMIN_USERNAME || "admin";
  const adminPassword = process.env.ADMIN_PASSWORD || "change-me";

  await prisma.adminAccount.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      passwordHash: createPasswordHash(adminPassword),
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
