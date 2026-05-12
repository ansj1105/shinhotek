"use client";

import { useMemo, useState } from "react";

import {
  saveInquiryReply,
  sendInquiryReply,
  updateInquiryStatus,
} from "@/app/admin/actions";

type InquiryItem = {
  id: number;
  company: string | null;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  locale: string;
  status: string;
  internalNote: string | null;
  replySubject: string | null;
  replyBody: string | null;
  replySentAt: Date | null;
  createdAt: Date;
};

function extractInquiryType(internalNote: string | null) {
  if (!internalNote?.startsWith("[Inquiry Type] ")) {
    return null;
  }

  return internalNote.replace("[Inquiry Type] ", "").trim() || null;
}

function summarizeMessage(message: string) {
  const normalized = message.replace(/\s+/g, " ").trim();
  if (normalized.length <= 96) {
    return normalized;
  }

  return `${normalized.slice(0, 96)}...`;
}

export function AdminInquiriesTabs({
  inquiries,
}: {
  inquiries: InquiryItem[];
}) {
  const sortedInquiries = useMemo(
    () => [...inquiries].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()),
    [inquiries],
  );
  const [activeId, setActiveId] = useState(sortedInquiries[0]?.id ?? 0);

  const activeInquiry =
    sortedInquiries.find((inquiry) => inquiry.id === activeId) ?? sortedInquiries[0] ?? null;

  if (sortedInquiries.length === 0) {
    return (
      <section className="lumosAdminSectionCard">
        <div className="lumosAdminSectionHead">
          <div>
            <h2>문의 관리</h2>
            <p>아직 접수된 문의가 없습니다.</p>
          </div>
        </div>
        <div className="lumosAdminEmptyState">
          <strong>No inquiries yet</strong>
          <p>새 문의가 들어오면 이곳에서 목록, 문의 내용, 답변 상태를 함께 관리할 수 있습니다.</p>
        </div>
      </section>
    );
  }

  return (
    <div className="lumosAdminTabs">
      <section className="lumosAdminSectionCard">
        <div className="lumosAdminSectionHead">
          <div>
            <h2>문의 목록</h2>
            <p>문의 내용을 보고 항목을 선택한 뒤 아래에서 답변을 작성합니다.</p>
          </div>
        </div>
        <div className="lumosAdminDirectoryList">
          {sortedInquiries.map((inquiry) => (
            <button
              key={inquiry.id}
              type="button"
              className={`lumosAdminDirectoryItem ${activeInquiry?.id === inquiry.id ? "isActive" : ""}`}
              onClick={() => setActiveId(inquiry.id)}
            >
              <div className="lumosAdminDirectoryPrimary">
                <strong>{String(inquiry.id).padStart(2, "0")}</strong>
                <div className="lumosAdminDirectoryCopy">
                  <span>{inquiry.name}</span>
                  <small>{extractInquiryType(inquiry.internalNote) || "General Inquiry"}</small>
                  <small>{inquiry.email}</small>
                  <small>{summarizeMessage(inquiry.message)}</small>
                </div>
              </div>
              <div className="lumosAdminDirectoryMeta">
                <small>{inquiry.createdAt.toLocaleString("ko-KR")}</small>
                <small>{inquiry.status}</small>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeInquiry ? (
        <section className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>{`${activeInquiry.name} / ${activeInquiry.email}`}</h2>
              <p>{`${activeInquiry.createdAt.toLocaleString("ko-KR")} · ${activeInquiry.status}`}</p>
            </div>
          </div>
          <div className="lumosAdminInquiryMeta">
            <div>
              <strong>문의 유형</strong>
              <span>{extractInquiryType(activeInquiry.internalNote) || "-"}</span>
            </div>
            <div>
              <strong>회사명</strong>
              <span>{activeInquiry.company || "-"}</span>
            </div>
            <div>
              <strong>연락처</strong>
              <span>{activeInquiry.phone || "-"}</span>
            </div>
            <div>
              <strong>언어</strong>
              <span>{activeInquiry.locale}</span>
            </div>
            <div>
              <strong>답변 발송</strong>
              <span>{activeInquiry.replySentAt ? activeInquiry.replySentAt.toLocaleString("ko-KR") : "미발송"}</span>
            </div>
          </div>
          <div className="lumosAdminInquiryBody">{activeInquiry.message}</div>
          <form action={saveInquiryReply} className="lumosAdminForm">
            <input type="hidden" name="id" value={activeInquiry.id} />
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Status</span>
                <select name="status" defaultValue={activeInquiry.status}>
                  <option value="RECEIVED">RECEIVED</option>
                  <option value="REVIEWING">REVIEWING</option>
                  <option value="REPLIED">REPLIED</option>
                </select>
              </label>
              <label className="field">
                <span>Reply Subject</span>
                <input name="replySubject" defaultValue={activeInquiry.replySubject ?? ""} />
              </label>
            </div>
            <div className="lumosAdminFormGrid">
              <label className="field">
                <span>Internal Note</span>
                <textarea name="internalNote" defaultValue={activeInquiry.internalNote ?? ""} />
              </label>
              <label className="field">
                <span>Reply Body</span>
                <textarea name="replyBody" defaultValue={activeInquiry.replyBody ?? ""} />
              </label>
            </div>
            <div className="lumosAdminActionRow">
              <button type="submit" className="lumosAdminPrimaryButton">
                답변 저장
              </button>
            </div>
          </form>
          <div className="lumosAdminInlineActions">
            <form action={updateInquiryStatus} className="lumosAdminInlineForm">
              <input type="hidden" name="id" value={activeInquiry.id} />
              <input type="hidden" name="status" value="REVIEWING" />
              <button type="submit" className="lumosAdminGhostButton">
                검토중으로 변경
              </button>
            </form>
            <form action={sendInquiryReply} className="lumosAdminInlineForm">
              <input type="hidden" name="id" value={activeInquiry.id} />
              <button type="submit" className="lumosAdminPrimaryButton">
                실제 답장 메일 발송
              </button>
            </form>
          </div>
        </section>
      ) : null}
    </div>
  );
}
