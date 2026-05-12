import { NextResponse } from "next/server";
import { z } from "zod";

import { sendInquiryMail } from "@/lib/mailer";
import { prisma } from "@/lib/prisma";

const inquirySchema = z.object({
  inquiryType: z.enum(["Sales", "Service"]),
  company: z.string().trim().min(1),
  position: z.string().optional().nullable(),
  name: z.string().trim().min(1),
  email: z.string().trim().email(),
  phone: z.string().trim().min(1),
  message: z.string().trim().min(1),
  recaptchaToken: z.string().trim().optional().default(""),
  locale: z.string().min(2),
});

async function verifyRecaptcha(token: string) {
  const secret = process.env.RECAPTCHA_SECRET_KEY;

  if (!secret || secret.startsWith("YOUR_")) {
    return true;
  }

  const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    body: new URLSearchParams({
      secret,
      response: token,
    }),
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  if (!response.ok) {
    return false;
  }

  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

export async function POST(request: Request) {
  let locale = "en";

  try {
    const rawBody = await request.json();
    locale = typeof rawBody?.locale === "string" ? rawBody.locale : "en";
    const body = inquirySchema.parse(rawBody);
    const isKo = locale === "ko";
    const recaptchaVerified = await verifyRecaptcha(body.recaptchaToken);

    if (!recaptchaVerified) {
      return NextResponse.json(
        {
          error: isKo
            ? "\uBCF4\uC548 \uC778\uC99D\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."
            : "Security verification failed.",
        },
        { status: 400 },
      );
    }

    const inquiry = await prisma.inquiry.create({
      data: {
        company: body.company,
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        locale: body.locale,
        internalNote: [
          body.inquiryType ? `[Inquiry Type] ${body.inquiryType}` : null,
          body.position ? `[Position] ${body.position}` : null,
        ]
          .filter(Boolean)
          .join("\n") || null,
      },
    });

    try {
      const mailResult = await sendInquiryMail(body);
      if (!mailResult.sent) {
        console.warn("Inquiry mail was not sent:", {
          inquiryId: inquiry.id,
          reason: mailResult.reason ?? "unknown reason",
        });
      } else {
        console.info("Inquiry mail sent:", {
          inquiryId: inquiry.id,
          to: mailResult.to,
          messageId: mailResult.messageId,
          accepted: mailResult.accepted,
          rejected: mailResult.rejected,
        });
      }
    } catch (mailError) {
      console.error("Inquiry mail failed after database save:", {
        inquiryId: inquiry.id,
        error: mailError,
      });
    }

    return NextResponse.json({
      message: isKo
        ? "\uBB38\uC758\uAC00 \uC815\uC0C1\uC801\uC73C\uB85C \uC811\uC218\uB418\uC5C8\uC2B5\uB2C8\uB2E4."
        : "Your inquiry has been submitted successfully.",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error:
          locale === "ko"
            ? "\uBB38\uC758 \uC811\uC218\uC5D0 \uC2E4\uD328\uD588\uC2B5\uB2C8\uB2E4."
            : "Unable to submit the inquiry.",
      },
      { status: 400 },
    );
  }
}

