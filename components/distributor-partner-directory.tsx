"use client";

import { useMemo } from "react";

import type { Locale } from "@/lib/site";

type DistributorPartner = {
  id: number;
  countryEn: string;
  countryKo: string;
  companyEn: string;
  companyKo: string;
  legalName?: string | null;
  addressEn: string;
  addressKo: string;
  telephone?: string | null;
  email?: string | null;
  website?: string | null;
  logoUrl?: string | null;
  published: boolean;
};

export type DistributorRegion = {
  id: number;
  slug: string;
  nameEn: string;
  nameKo: string;
  descriptionEn?: string | null;
  descriptionKo?: string | null;
  enabled: boolean;
  partners: DistributorPartner[];
};

export function DistributorPartnerDirectory({
  locale,
  regions,
  mapImageUrl,
}: {
  locale: Locale;
  regions: DistributorRegion[];
  mapImageUrl?: string | null;
}) {
  const isKo = locale === "ko";
  const activeRegions = useMemo(
    () => regions.filter((region) => region.enabled && region.partners.some((partner) => partner.published)),
    [regions],
  );

  return (
    <div className="pageBody distributorPartnerDirectory">
      <section className="distributorWorldSection" aria-label={isKo ? "대리점 안내 이미지" : "Distributor visual"}>
        <div className="distributorImageGraphic">
          {mapImageUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={mapImageUrl}
              alt={isKo ? "Shinhotek 대리점 소개 이미지" : "Shinhotek distributor map image"}
              className="distributorRegisteredImage"
            />
          ) : (
            <div className="distributorImagePlaceholder">
              {isKo ? "관리자에서 대리점 소개 이미지를 등록해 주세요." : "Register a distributor image in the admin page."}
            </div>
          )}
        </div>
      </section>

      <section className="distributorRegionGrid" aria-label={isKo ? "지역별 대리점 목록" : "Regional distributor list"}>
        <h2 className="distributorContactTitle">Contact us</h2>
        {activeRegions.map((region) => {
          const partners = region.partners.filter((partner) => partner.published);
          const description = isKo ? region.descriptionKo : region.descriptionEn;

          return (
            <div className="distributorRegionColumn" key={region.id}>
              <div className="distributorRegionHead">
                <h3>{isKo ? region.nameKo : region.nameEn}</h3>
                {description ? <p>{description}</p> : null}
              </div>
              <div className="distributorCountryList">
                {partners.map((partner) => (
                  <article className="distributorCountryCard" key={partner.id}>
                    <span className="distributorCountryLabel">{isKo ? partner.countryKo : partner.countryEn}</span>
                    <div className="distributorCountryBody">
                      <strong className="distributorPartnerName">{isKo ? partner.companyKo : partner.companyEn}</strong>
                      {partner.legalName ? <span className="distributorLegalName">{partner.legalName}</span> : null}
                      {partner.logoUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={partner.logoUrl}
                          alt={isKo ? partner.companyKo : partner.companyEn}
                          className="distributorCountryLogo"
                        />
                      ) : null}
                      <p className="distributorCountryAddress">{isKo ? partner.addressKo : partner.addressEn}</p>
                      <dl className="distributorContactList">
                        {partner.telephone ? (
                          <div>
                            <dt>Tel</dt>
                            <dd>
                              <a href={`tel:${partner.telephone.replace(/[\s-]/g, "")}`}>{partner.telephone}</a>
                            </dd>
                          </div>
                        ) : null}
                        {partner.email ? (
                          <div>
                            <dt>E-mail</dt>
                            <dd>
                              <a href={`mailto:${partner.email}`}>{partner.email}</a>
                            </dd>
                          </div>
                        ) : null}
                        {partner.website ? (
                          <div>
                            <dt>Web</dt>
                            <dd>
                              <a href={partner.website} target="_blank" rel="noreferrer">
                                {partner.website.replace(/^https?:\/\//, "")}
                              </a>
                            </dd>
                          </div>
                        ) : null}
                      </dl>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}
