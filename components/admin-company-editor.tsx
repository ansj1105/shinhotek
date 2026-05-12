"use client";

import { updateCompanyContent } from "@/app/admin/actions";
import { siteUrl } from "@/lib/site";

type CompanyContentData = {
  id: number;
  historyTitleKo: string;
  historyTitleEn: string;
  historyBodyKo: string;
  historyBodyEn: string;
  brandTitleKo: string;
  brandTitleEn: string;
  brandLeadKo: string;
  brandLeadEn: string;
  visionTitleKo: string;
  visionTitleEn: string;
  visionBodyKo: string;
  visionBodyEn: string;
  goalTitleKo: string;
  goalTitleEn: string;
  goalBodyKo: string;
  goalBodyEn: string;
};

function EditorField({
  label,
  name,
  defaultValue,
  rows = 5,
}: {
  label: string;
  name: keyof CompanyContentData;
  defaultValue: string;
  rows?: number;
}) {
  return (
    <label className="field lumosAdminEditorField">
      <span>{label}</span>
      <textarea name={name} defaultValue={defaultValue} rows={rows} />
    </label>
  );
}

export function AdminCompanyEditor({ companyContent }: { companyContent: CompanyContentData }) {
  return (
    <section className="lumosAdminSectionCard">
      <div className="lumosAdminSectionHead">
        <div>
          <h2>회사소개</h2>
          <p>회사소개 페이지의 제목, 본문, Vision/Goal 문구를 수정합니다. 본문 줄바꿈은 공개 페이지에 반영됩니다.</p>
        </div>
      </div>

      <form action={updateCompanyContent} className="lumosAdminForm">
        <div className="lumosAdminClientPreview">
          <div className="lumosAdminAssetPreviewHead">
            <strong>Client Page Preview</strong>
            <span>/ko/company</span>
          </div>
          <div className="lumosAdminClientPreviewFrame">
            <iframe
              src="/ko/company"
              title="company page preview"
              loading="lazy"
              scrolling="no"
              className="lumosAdminClientPreviewIframe"
            />
          </div>
        </div>

        <div className="lumosAdminEditorPanel">
          <div className="lumosAdminEditorHead">
            <strong>History Content</strong>
            <span>빈 줄은 문단 구분, 일반 줄바꿈은 같은 문단 내 줄바꿈으로 처리됩니다.</span>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>History Title KO</span>
              <input name="historyTitleKo" defaultValue={companyContent.historyTitleKo} />
            </label>
            <label className="field">
              <span>History Title EN</span>
              <input name="historyTitleEn" defaultValue={companyContent.historyTitleEn} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <EditorField
              label="History Body KO"
              name="historyBodyKo"
              defaultValue={companyContent.historyBodyKo}
              rows={12}
            />
            <EditorField
              label="History Body EN"
              name="historyBodyEn"
              defaultValue={companyContent.historyBodyEn}
              rows={12}
            />
          </div>
        </div>

        <div className="lumosAdminEditorPanel">
          <div className="lumosAdminEditorHead">
            <strong>Vision / Goal</strong>
            <span>하단 Shinhotek 소개 블록의 타이틀과 본문을 관리합니다.</span>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Brand KO</span>
              <input name="brandTitleKo" defaultValue={companyContent.brandTitleKo} />
            </label>
            <label className="field">
              <span>Brand EN</span>
              <input name="brandTitleEn" defaultValue={companyContent.brandTitleEn} />
            </label>
            <label className="field">
              <span>Brand Lead KO</span>
              <input name="brandLeadKo" defaultValue={companyContent.brandLeadKo} />
            </label>
            <label className="field">
              <span>Brand Lead EN</span>
              <input name="brandLeadEn" defaultValue={companyContent.brandLeadEn} />
            </label>
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Vision Title KO</span>
              <input name="visionTitleKo" defaultValue={companyContent.visionTitleKo} />
            </label>
            <label className="field">
              <span>Vision Title EN</span>
              <input name="visionTitleEn" defaultValue={companyContent.visionTitleEn} />
            </label>
            <EditorField label="Vision Body KO" name="visionBodyKo" defaultValue={companyContent.visionBodyKo} />
            <EditorField label="Vision Body EN" name="visionBodyEn" defaultValue={companyContent.visionBodyEn} />
          </div>
          <div className="lumosAdminFormGrid">
            <label className="field">
              <span>Goal Title KO</span>
              <input name="goalTitleKo" defaultValue={companyContent.goalTitleKo} />
            </label>
            <label className="field">
              <span>Goal Title EN</span>
              <input name="goalTitleEn" defaultValue={companyContent.goalTitleEn} />
            </label>
            <EditorField label="Goal Body KO" name="goalBodyKo" defaultValue={companyContent.goalBodyKo} />
            <EditorField label="Goal Body EN" name="goalBodyEn" defaultValue={companyContent.goalBodyEn} />
          </div>
        </div>

        <div className="lumosAdminActionRow">
          <a href={`${siteUrl}/ko/company`} target="_blank" rel="noreferrer" className="lumosAdminGhostButton">
            프론트 미리보기
          </a>
          <button type="submit" className="lumosAdminPrimaryButton">
            회사소개 저장
          </button>
        </div>
      </form>
    </section>
  );
}
