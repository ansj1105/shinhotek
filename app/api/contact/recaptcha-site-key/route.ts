import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    siteKey: process.env.RECAPTCHA_SITE_KEY ?? "",
  });
}
