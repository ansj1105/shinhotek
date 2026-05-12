import { changeAdminPassword } from "@/app/admin/actions";
import { AdminSectionCard } from "@/components/admin-sections";
import { requireAdminSession } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  const session = await requireAdminSession();
  const accessLogs = await prisma.adminAccessLog.findMany({
    orderBy: { createdAt: "desc" },
    take: 50,
  });

  return (
    <div className="lumosAdminGrid">
      <AdminSectionCard
        title="관리자 비밀번호 변경"
        description={`현재 계정: ${session.admin.username}`}
      >
        <form action={changeAdminPassword} className="lumosAdminForm">
          <label className="field">
            <span>현재 비밀번호</span>
            <input name="currentPassword" type="password" />
          </label>
          <label className="field">
            <span>새 비밀번호</span>
            <input name="nextPassword" type="password" />
          </label>
          <label className="field">
            <span>새 비밀번호 확인</span>
            <input name="confirmPassword" type="password" />
          </label>
          <button type="submit" className="lumosAdminPrimaryButton">
            비밀번호 변경
          </button>
        </form>
      </AdminSectionCard>

      <AdminSectionCard
        title="접속 기록"
        description="최근 관리자 로그인 시도 기록입니다."
      >
        <div className="lumosAdminLogTable">
          <div className="lumosAdminLogHead">
            <span>일시</span>
            <span>계정</span>
            <span>상태</span>
            <span>IP</span>
          </div>
          {accessLogs.map((log) => (
            <div key={log.id} className="lumosAdminLogRow">
              <span>{log.createdAt.toLocaleString("ko-KR")}</span>
              <span>{log.username}</span>
              <span>{log.success ? "성공" : "실패"}</span>
              <span>{log.ipAddress || "-"}</span>
            </div>
          ))}
        </div>
      </AdminSectionCard>
    </div>
  );
}
