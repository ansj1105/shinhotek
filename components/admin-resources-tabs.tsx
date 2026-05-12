"use client";

import { useMemo, useState } from "react";

import { deleteResource, saveResource } from "@/app/admin/actions";
import { AdminRichTextEditor } from "@/components/admin-rich-text-editor";
import { siteUrl } from "@/lib/site";

type ResourceItem = {
  id: number;
  slug: string;
  displayIndex: number;
  titleKo: string;
  titleEn: string;
  excerptKo: string;
  excerptEn: string;
  bodyKo: string;
  bodyEn: string;
  fileUrl: string | null;
  contentImageUrl: string | null;
  contentImageAltKo: string | null;
  contentImageAltEn: string | null;
  contentImageWidth: number | null;
  contentImagePlacement: string;
  publishedAt: Date;
  published: boolean;
};

function dateValue(value: Date) {
  return value.toISOString().slice(0, 10);
}

export function AdminResourcesTabs({
  resources,
}: {
  resources: ResourceItem[];
}) {
  const sortedResources = useMemo(
    () => [...resources].sort((a, b) => a.displayIndex - b.displayIndex || a.id - b.id),
    [resources],
  );
  const [activeId, setActiveId] = useState(sortedResources[0]?.id ?? 0);
  const [showCreateForm, setShowCreateForm] = useState(false);

  const activeResource =
    sortedResources.find((resource) => resource.id === activeId) ?? sortedResources[0] ?? null;

  return (
    <div className="lumosAdminTabs">
      <section className="lumosAdminSectionCard">
        <div className="lumosAdminSectionHead">
          <div>
            <h2>자료 목록</h2>
            <p>등록된 자료를 순번 기준으로 확인하고, 선택한 항목만 아래에서 수정합니다.</p>
          </div>
        </div>
        <div className="lumosAdminDirectoryList">
          {sortedResources.map((resource) => (
            <button
              key={resource.id}
              type="button"
              className={`lumosAdminDirectoryItem ${activeResource?.id === resource.id ? "isActive" : ""}`}
              onClick={() => {
                setActiveId(resource.id);
                setShowCreateForm(false);
              }}
            >
              <div className="lumosAdminDirectoryPrimary">
                <strong>{String(resource.displayIndex).padStart(2, "0")}</strong>
                <div className="lumosAdminDirectoryCopy">
                  <span>{resource.titleKo}</span>
                  <small>{resource.slug}</small>
                </div>
              </div>
              <div className="lumosAdminDirectoryMeta">
                <small>{dateValue(resource.publishedAt)}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      <div className="lumosAdminTabToolbar">
        <div className="lumosAdminTabList" role="tablist" aria-label="Resources">
          {sortedResources.map((resource) => (
            <button
              key={resource.id}
              type="button"
              role="tab"
              aria-selected={activeResource?.id === resource.id}
              className={`lumosAdminTabButton ${activeResource?.id === resource.id ? "isActive" : ""}`}
              onClick={() => {
                setActiveId(resource.id);
                setShowCreateForm(false);
              }}
            >
              {resource.titleKo}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={`lumosAdminPrimaryButton ${showCreateForm ? "isSoftActive" : ""}`}
          onClick={() => setShowCreateForm((value) => !value)}
        >
          새 자료 등록
        </button>
      </div>

      {showCreateForm ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>새 자료 등록</h2>
              <p>등록 후 자료실 목록과 상세 페이지에 바로 반영됩니다.</p>
            </div>
          </div>
          <form action={saveResource} className="lumosAdminForm">
            <input type="hidden" name="currentFileUrl" value="" />
            <input type="hidden" name="currentContentImageUrl" value="" />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" placeholder="new-resource" />
              </label>
              <label className="field">
                <span>Display Index</span>
                <input name="displayIndex" type="number" defaultValue={resources.length + 1} />
              </label>
              <label className="field">
                <span>Published Date</span>
                <input name="publishedAt" type="date" defaultValue={dateValue(new Date())} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Title KO</span>
                <input name="titleKo" />
              </label>
              <label className="field">
                <span>Title EN</span>
                <input name="titleEn" />
              </label>
              <label className="field">
                <span>File URL</span>
                <input name="fileUrl" />
              </label>
              <label className="field">
                <span>Attachment Upload</span>
                <input name="attachment" type="file" />
              </label>
            </div>
            <div className="lumosAdminEditorPanel">
              <div className="lumosAdminEditorHead">
                <div>
                  <strong>본문 이미지</strong>
                  <span>PDF 미리보기 대신 상세 본문 안에 노출할 이미지를 등록하고 크기를 조절합니다.</span>
                </div>
              </div>
              <div className="lumosAdminFormGrid">
                <label className="field">
                  <span>Content Image URL</span>
                  <input name="contentImageUrl" placeholder="/uploads/resources/example.png" />
                </label>
                <label className="field">
                  <span>Content Image Upload</span>
                  <input name="contentImageUpload" type="file" accept="image/*" />
                </label>
                <label className="field">
                  <span>Image Width(px)</span>
                  <input name="contentImageWidth" type="number" min={160} max={1400} defaultValue={720} />
                </label>
                <label className="field">
                  <span>Image Position</span>
                  <select name="contentImagePlacement" defaultValue="after">
                    <option value="before">본문 위</option>
                    <option value="after">본문 아래</option>
                  </select>
                </label>
                <label className="field">
                  <span>Image Alt KO</span>
                  <input name="contentImageAltKo" />
                </label>
                <label className="field">
                  <span>Image Alt EN</span>
                  <input name="contentImageAltEn" />
                </label>
              </div>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Excerpt KO</span>
                <textarea name="excerptKo" />
              </label>
              <label className="field">
                <span>Excerpt EN</span>
                <textarea name="excerptEn" />
              </label>
            </div>
            <div className="lumosAdminEditorPanel">
              <div className="lumosAdminEditorHead">
                <div>
                  <strong>본문 에디터</strong>
                  <span>텍스트, 제목, 목록, 링크, 이미지/지도 이미지를 본문 안에 삽입할 수 있습니다.</span>
                </div>
              </div>
              <AdminRichTextEditor name="bodyKo" label="Body KO" />
              <AdminRichTextEditor name="bodyEn" label="Body EN" />
            </div>
            <label className="lumosAdminCheckbox">
              <input type="checkbox" name="published" defaultChecked />
              <span>노출</span>
            </label>
            <button type="submit" className="lumosAdminPrimaryButton">
              자료 생성
            </button>
          </form>
        </section>
      ) : activeResource ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>{activeResource.titleKo}</h2>
              <p>{activeResource.slug}</p>
            </div>
          </div>
          <form action={saveResource} className="lumosAdminForm">
            <div className="lumosAdminClientPreview">
              <div className="lumosAdminAssetPreviewHead">
                <strong>Client Page Preview</strong>
                <span>{`/ko/contact/resources/${activeResource.slug}`}</span>
              </div>
              <div className="lumosAdminClientPreviewFrame">
                <iframe
                  src={`/ko/contact/resources/${activeResource.slug}`}
                  title={`${activeResource.titleKo} preview`}
                  loading="lazy"
                  scrolling="no"
                  className="lumosAdminClientPreviewIframe"
                />
              </div>
            </div>
            <input type="hidden" name="id" value={activeResource.id} />
            <input type="hidden" name="currentFileUrl" value={activeResource.fileUrl ?? ""} />
            <input type="hidden" name="currentContentImageUrl" value={activeResource.contentImageUrl ?? ""} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Slug</span>
                <input name="slug" defaultValue={activeResource.slug} />
              </label>
              <label className="field">
                <span>Display Index</span>
                <input name="displayIndex" type="number" defaultValue={activeResource.displayIndex} />
              </label>
              <label className="field">
                <span>Published Date</span>
                <input name="publishedAt" type="date" defaultValue={dateValue(activeResource.publishedAt)} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Title KO</span>
                <input name="titleKo" defaultValue={activeResource.titleKo} />
              </label>
              <label className="field">
                <span>Title EN</span>
                <input name="titleEn" defaultValue={activeResource.titleEn} />
              </label>
              <label className="field">
                <span>File URL</span>
                <input name="fileUrl" defaultValue={activeResource.fileUrl ?? ""} />
              </label>
              <label className="field">
                <span>Attachment Upload</span>
                <input name="attachment" type="file" />
              </label>
            </div>
            <div className="lumosAdminEditorPanel">
              <div className="lumosAdminEditorHead">
                <div>
                  <strong>본문 이미지</strong>
                  <span>PDF 미리보기는 사용하지 않고, 등록한 이미지만 자료 상세 본문에 표시합니다.</span>
                </div>
              </div>
              <div className="lumosAdminAssetPreviewFrame isCompact">
                {activeResource.contentImageUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activeResource.contentImageUrl}
                    alt={activeResource.contentImageAltKo ?? activeResource.titleKo}
                    className="lumosAdminAssetPreviewImage"
                  />
                ) : (
                  <div className="lumosAdminAssetPreviewEmpty">No content image connected</div>
                )}
              </div>
              <div className="lumosAdminFormGrid">
                <label className="field">
                  <span>Content Image URL</span>
                  <input name="contentImageUrl" defaultValue={activeResource.contentImageUrl ?? ""} />
                </label>
                <label className="field">
                  <span>Content Image Upload</span>
                  <input name="contentImageUpload" type="file" accept="image/*" />
                </label>
                <label className="field">
                  <span>Image Width(px)</span>
                  <input
                    name="contentImageWidth"
                    type="number"
                    min={160}
                    max={1400}
                    defaultValue={activeResource.contentImageWidth ?? 720}
                  />
                </label>
                <label className="field">
                  <span>Image Position</span>
                  <select name="contentImagePlacement" defaultValue={activeResource.contentImagePlacement || "after"}>
                    <option value="before">본문 위</option>
                    <option value="after">본문 아래</option>
                  </select>
                </label>
                <label className="field">
                  <span>Image Alt KO</span>
                  <input name="contentImageAltKo" defaultValue={activeResource.contentImageAltKo ?? ""} />
                </label>
                <label className="field">
                  <span>Image Alt EN</span>
                  <input name="contentImageAltEn" defaultValue={activeResource.contentImageAltEn ?? ""} />
                </label>
              </div>
              <label className="lumosAdminCheckbox">
                <input type="checkbox" name="removeContentImage" />
                <span>본문 이미지 제거</span>
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Excerpt KO</span>
                <textarea name="excerptKo" defaultValue={activeResource.excerptKo} />
              </label>
              <label className="field">
                <span>Excerpt EN</span>
                <textarea name="excerptEn" defaultValue={activeResource.excerptEn} />
              </label>
            </div>
            <div className="lumosAdminEditorPanel">
              <div className="lumosAdminEditorHead">
                <div>
                  <strong>본문 에디터</strong>
                  <span>텍스트, 제목, 목록, 링크, 이미지/지도 이미지를 본문 안에 삽입할 수 있습니다.</span>
                </div>
              </div>
              <AdminRichTextEditor
                key={`bodyKo-${activeResource.id}`}
                name="bodyKo"
                label="Body KO"
                defaultValue={activeResource.bodyKo}
              />
              <AdminRichTextEditor
                key={`bodyEn-${activeResource.id}`}
                name="bodyEn"
                label="Body EN"
                defaultValue={activeResource.bodyEn}
              />
            </div>
            <div className="lumosAdminActionRow">
              <label className="lumosAdminCheckbox">
                <input type="checkbox" name="published" defaultChecked={activeResource.published} />
                <span>노출</span>
              </label>
              <div className="lumosAdminActionRowEnd">
                <a
                  href={`${siteUrl}/ko/contact/resources/${activeResource.slug}`}
                  target="_blank"
                  rel="noreferrer"
                  className="lumosAdminGhostButton"
                >
                  프론트 미리보기
                </a>
                <button type="submit" className="lumosAdminPrimaryButton">
                  자료 저장
                </button>
              </div>
            </div>
          </form>
          <form action={deleteResource} className="lumosAdminInlineForm">
            <input type="hidden" name="id" value={activeResource.id} />
            <button type="submit" className="lumosAdminDangerButton">
              삭제
            </button>
          </form>
        </section>
      ) : null}
    </div>
  );
}
