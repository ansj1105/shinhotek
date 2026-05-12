"use client";

import { useMemo, useState } from "react";

import { deleteApplication, saveApplication } from "@/app/admin/actions";
import { siteUrl } from "@/lib/site";

type ApplicationItem = {
  id: number;
  slug: string;
  sortOrder: number;
  titleKo: string;
  titleEn: string;
  summaryKo: string;
  summaryEn: string;
  bulletsKo: unknown;
  bulletsEn: unknown;
  imageUrl: string | null;
  published: boolean;
};

function textValue(value: unknown) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item)).join("\n");
  }

  return "";
}

export function AdminApplicationsTabs({
  applications,
}: {
  applications: ApplicationItem[];
}) {
  const sortedApplications = useMemo(
    () => [...applications].sort((a, b) => a.sortOrder - b.sortOrder || a.id - b.id),
    [applications],
  );
  const [activeId, setActiveId] = useState(sortedApplications[0]?.id ?? 0);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const activeApplication =
    sortedApplications.find((application) => application.id === activeId) ?? sortedApplications[0] ?? null;

  return (
    <div className="lumosAdminTabs">
      <div className="lumosAdminTabToolbar">
        <div className="lumosAdminTabList" role="tablist" aria-label="Application">
          {sortedApplications.map((application) => (
            <button
              key={application.id}
              type="button"
              role="tab"
              aria-selected={activeApplication?.id === application.id}
              className={`lumosAdminTabButton ${
                activeApplication?.id === application.id ? "isActive" : ""
              }`}
              onClick={() => {
                setActiveId(application.id);
                setShowCreateForm(false);
              }}
            >
              {application.titleKo}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`lumosAdminPrimaryButton ${showCreateForm ? "isSoftActive" : ""}`}
          onClick={() => setShowCreateForm((value) => !value)}
        >
          새 Application 추가
        </button>
      </div>

      {showCreateForm ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>새 Application 추가</h2>
              <p>새 application을 생성하면 즉시 프론트 페이지 앵커 목록에 포함됩니다.</p>
            </div>
          </div>
          <form action={saveApplication} className="lumosAdminForm">
            <div className="lumosAdminAssetPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Application Image</strong>
                <span>URL 입력 후 생성/변경 가능</span>
              </div>
              <div className="lumosAdminAssetPreviewFrame">
                <div className="lumosAdminAssetPreviewEmpty">Image preview will appear after save</div>
              </div>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" placeholder="new-application" />
              </label>
              <label className="field">
                <span>Sort Order</span>
                <input name="sortOrder" type="number" defaultValue={99} />
              </label>
              <label className="field">
                <span>Image URL</span>
                <input name="imageUrl" />
              </label>
            </div>
            <p className="adminHint">
              Image URL을 교체하면 응용분야 페이지의 대표 이미지가 변경됩니다.
            </p>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Title KO</span>
                <input name="titleKo" />
              </label>
              <label className="field">
                <span>Title EN</span>
                <input name="titleEn" />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field lumosAdminEditorField">
                <span>Body KO</span>
                <textarea name="summaryKo" rows={10} />
              </label>
              <label className="field lumosAdminEditorField">
                <span>Body EN</span>
                <textarea name="summaryEn" rows={10} />
              </label>
            </div>
            <p className="adminHint">
              본문은 빈 줄로 문단을 나눌 수 있고, 일반 줄바꿈은 같은 문단 안의 줄바꿈으로 표시됩니다.
            </p>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Bullets KO</span>
                <textarea name="bulletsKo" />
              </label>
              <label className="field">
                <span>Bullets EN</span>
                <textarea name="bulletsEn" />
              </label>
            </div>
            <label className="lumosAdminCheckbox">
              <input type="checkbox" name="published" defaultChecked />
              <span>노출</span>
            </label>
            <button type="submit" className="lumosAdminPrimaryButton">
              Application 생성
            </button>
          </form>
        </section>
      ) : activeApplication ? (
        <section key={activeApplication.id} className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>{activeApplication.titleKo}</h2>
              <p>{activeApplication.slug}</p>
            </div>
          </div>
          <form key={`application-form-${activeApplication.id}`} action={saveApplication} className="lumosAdminForm">
            <div className="lumosAdminAssetPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Application Image</strong>
                <span>{activeApplication.imageUrl ? "연결됨 / 변경 가능" : "미연결"}</span>
              </div>
              <div className="lumosAdminAssetPreviewFrame">
                {activeApplication.imageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeApplication.imageUrl}
                    alt={activeApplication.titleKo}
                    className="lumosAdminAssetPreviewImage"
                  />
                ) : (
                  <div className="lumosAdminAssetPreviewEmpty">No image connected</div>
                )}
              </div>
            </div>
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>{`/ko/applications#${activeApplication.slug}`}</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  key={`application-preview-${activeApplication.id}`}
                  src={`/ko/applications#${activeApplication.slug}`}
                  title={`${activeApplication.titleKo} preview`}
                  loading="lazy"
                  scrolling="no"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
            </div>
            <input type="hidden" name="id" value={activeApplication.id} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" defaultValue={activeApplication.slug} />
              </label>
              <label className="field">
                <span>Sort Order</span>
                <input name="sortOrder" type="number" defaultValue={activeApplication.sortOrder} />
              </label>
              <label className="field">
                <span>Image URL</span>
                <input name="imageUrl" defaultValue={activeApplication.imageUrl ?? ""} />
              </label>
            </div>
            <p className="adminHint">
              Image URL을 교체하면 응용분야 페이지의 대표 이미지가 변경됩니다.
            </p>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Title KO</span>
                <input name="titleKo" defaultValue={activeApplication.titleKo} />
              </label>
              <label className="field">
                <span>Title EN</span>
                <input name="titleEn" defaultValue={activeApplication.titleEn} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field lumosAdminEditorField">
                <span>Body KO</span>
                <textarea name="summaryKo" rows={10} defaultValue={activeApplication.summaryKo} />
              </label>
              <label className="field lumosAdminEditorField">
                <span>Body EN</span>
                <textarea name="summaryEn" rows={10} defaultValue={activeApplication.summaryEn} />
              </label>
            </div>
            <p className="adminHint">
              본문은 빈 줄로 문단을 나눌 수 있고, 일반 줄바꿈은 같은 문단 안의 줄바꿈으로 표시됩니다.
            </p>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Bullets KO</span>
                <textarea name="bulletsKo" defaultValue={textValue(activeApplication.bulletsKo)} />
              </label>
              <label className="field">
                <span>Bullets EN</span>
                <textarea name="bulletsEn" defaultValue={textValue(activeApplication.bulletsEn)} />
              </label>
            </div>
            <label className="lumosAdminCheckbox">
              <input type="checkbox" name="published" defaultChecked={activeApplication.published} />
              <span>노출</span>
            </label>
            <div className="lumosAdminActionRow">
              <div className="lumosAdminActionRowEnd">
                <a
                  href={`${siteUrl}/ko/applications#${activeApplication.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lumosAdminGhostButton"
                >
                  프론트 미리보기
                </a>
                <button
                  type="submit"
                  formAction={deleteApplication}
                  className="lumosAdminDangerButton"
                  onClick={(event) => {
                    if (!window.confirm("이 Application을 삭제할까요?")) {
                      event.preventDefault();
                    }
                  }}
                >
                  Application 삭제
                </button>
              </div>
              <button type="submit" className="lumosAdminPrimaryButton">
                Application 저장
              </button>
            </div>
          </form>
        </section>
      ) : null}
    </div>
  );
}
