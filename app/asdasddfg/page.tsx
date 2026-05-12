import { loginAdmin } from "@/app/admin/actions";
import { getAdminSession } from "@/lib/admin-auth";
import { redirect } from "next/navigation";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; message?: string }>;
}) {
  const [session, params] = await Promise.all([getAdminSession(), searchParams]);

  if (session) {
    redirect("/asdasddfg/admin/home");
  }

  const error = params.error === "invalid" ? "아이디 또는 비밀번호가 올바르지 않습니다." : null;
  const message =
    params.message === "password-updated"
      ? "비밀번호가 변경되었습니다. 다시 로그인해주세요."
      : null;

  return (
    <main className="adminLoginPage">
      <section className="adminLoginCard">
        <div className="adminLoginHead">
          <span className="eyebrow">Admin</span>
          <h1>Shinhotek 관리자 로그인</h1>
        </div>
        <form action={loginAdmin} className="adminLoginForm">
          <label className="field">
            <span>아이디</span>
            <input name="username" defaultValue="admin" />
          </label>
          <label className="field">
            <span>비밀번호</span>
            <input name="password" type="password" />
          </label>
          {error ? <p className="adminLoginError">{error}</p> : null}
          {message ? <p className="adminLoginMessage">{message}</p> : null}
          <button type="submit" className="button primary">
            로그인
          </button>
        </form>
      </section>
    </main>
  );
}
