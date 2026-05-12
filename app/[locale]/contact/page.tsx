import { redirect } from "next/navigation";

import type { Locale } from "@/lib/site";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;
  redirect(`/${locale}/contact/quote`);
}
