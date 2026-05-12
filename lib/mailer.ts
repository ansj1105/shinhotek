import nodemailer from "nodemailer";

type InquiryMail = {
  inquiryType?: string | null;
  company?: string | null;
  position?: string | null;
  name: string;
  email: string;
  phone?: string | null;
  message: string;
  locale: string;
};

function normalizeAddressList(value: unknown) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((item) => String(item));
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatHtmlValue(value: string) {
  return escapeHtml(value).replace(/\r?\n/g, "<br />");
}

function buildInquiryMailHtml(payload: InquiryMail) {
  const isKo = payload.locale === "ko";
  const labels = {
    title: isKo ? "Shinhotek 문의가 접수되었습니다" : "New Shinhotek Inquiry",
    inquiryType: isKo ? "문의 유형" : "Inquiry Type",
    locale: isKo ? "언어" : "Locale",
    company: isKo ? "회사명" : "Company",
    position: isKo ? "직책" : "Position",
    name: isKo ? "이름" : "Name",
    email: isKo ? "이메일" : "Email",
    phone: isKo ? "연락처" : "Phone",
    message: isKo ? "문의 내용" : "Message",
  };

  const rows = [
    [labels.inquiryType, payload.inquiryType ?? "-"],
    [labels.locale, payload.locale],
    [labels.company, payload.company ?? "-"],
    [labels.position, payload.position ?? "-"],
    [labels.name, payload.name],
    [labels.email, payload.email],
    [labels.phone, payload.phone ?? "-"],
  ];

  const rowHtml = rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="width: 132px; padding: 12px 14px; background: #f2f6fa; color: #123d67; font-size: 13px; font-weight: 700; text-align: left; border-bottom: 1px solid #d9e3ec;">${escapeHtml(label)}</th>
          <td style="padding: 12px 14px; color: #0f223d; font-size: 14px; line-height: 1.55; border-bottom: 1px solid #d9e3ec;">${formatHtmlValue(value)}</td>
        </tr>`,
    )
    .join("");

  return `
    <div style="margin: 0; padding: 24px; background: #f5f8fc; font-family: Arial, 'Noto Sans KR', sans-serif; color: #0f223d;">
      <div style="max-width: 680px; margin: 0 auto; background: #ffffff; border: 1px solid #d9e3ec;">
        <div style="padding: 22px 24px; background: #123d67; color: #ffffff;">
          <div style="font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; opacity: 0.8;">Shinhotek Contact</div>
          <h1 style="margin: 6px 0 0; font-size: 22px; line-height: 1.3;">${escapeHtml(labels.title)}</h1>
        </div>
        <table role="presentation" cellpadding="0" cellspacing="0" style="width: 100%; border-collapse: collapse;">
          ${rowHtml}
        </table>
        <div style="padding: 20px 24px 24px;">
          <div style="margin-bottom: 10px; color: #123d67; font-size: 13px; font-weight: 700;">${escapeHtml(labels.message)}</div>
          <div style="min-height: 96px; padding: 16px; background: #f8fafc; border: 1px solid #d9e3ec; color: #0f223d; font-size: 15px; line-height: 1.7;">${formatHtmlValue(payload.message)}</div>
        </div>
      </div>
    </div>`;
}

export async function sendInquiryMail(payload: InquiryMail) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_RECEIVER_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !CONTACT_RECEIVER_EMAIL) {
    return { sent: false, reason: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  const info = await transporter.sendMail({
    to: CONTACT_RECEIVER_EMAIL,
    from: SMTP_USER || CONTACT_RECEIVER_EMAIL,
    replyTo: payload.email,
    subject: `[Shinhotek] ${payload.inquiryType ?? "General Inquiry"} from ${payload.name}`,
    text: [
      `Inquiry Type: ${payload.inquiryType ?? "-"}`,
      `Locale: ${payload.locale}`,
      `Company: ${payload.company ?? "-"}`,
      `Position: ${payload.position ?? "-"}`,
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      `Phone: ${payload.phone ?? "-"}`,
      "",
      payload.message,
    ].join("\n"),
    html: buildInquiryMailHtml(payload),
  });

  return {
    sent: true,
    to: CONTACT_RECEIVER_EMAIL,
    messageId: typeof info.messageId === "string" ? info.messageId : null,
    accepted: normalizeAddressList(info.accepted),
    rejected: normalizeAddressList(info.rejected),
  };
}

type InquiryReplyMail = {
  to: string;
  subject: string;
  body: string;
};

export async function sendInquiryReplyMail(payload: InquiryReplyMail) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_SECURE,
    SMTP_USER,
    SMTP_PASS,
    CONTACT_RECEIVER_EMAIL,
  } = process.env;

  if (!SMTP_HOST || !SMTP_PORT || !CONTACT_RECEIVER_EMAIL) {
    return { sent: false, reason: "SMTP not configured" };
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === "true",
    auth: SMTP_USER && SMTP_PASS ? { user: SMTP_USER, pass: SMTP_PASS } : undefined,
  });

  await transporter.sendMail({
    to: payload.to,
    from: SMTP_USER || CONTACT_RECEIVER_EMAIL,
    replyTo: CONTACT_RECEIVER_EMAIL,
    subject: payload.subject,
    text: payload.body,
  });

  return { sent: true };
}
