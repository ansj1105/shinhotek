import { getAdminHeaderStats } from "@/lib/admin-auth";
import { AdminShell } from "@/components/admin-shell";

export const dynamic = "force-dynamic";

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const stats = await getAdminHeaderStats();

  return (
    <AdminShell
      title="Shinhotek 관리자"
      description="메인, 애플리케이션, 제품, 자료실, 문의 답변을 기능별 라우트에서 관리합니다."
      lastLoginAt={stats.lastLoginAt}
      pendingInquiries={stats.pendingInquiries}
      todayVisitors={stats.todayVisitors}
    >
      {children}
    </AdminShell>
  );
}
