"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { logoutAdmin } from "@/app/admin/actions";

type AdminMenuChild = {
  href: string;
  label: string;
  meta: string;
  icon: "home" | "apps" | "box" | "docs" | "mail" | "settings" | "contact";
};

type AdminMenuGroup = {
  id: string;
  label: string;
  children: AdminMenuChild[];
};

const adminMenu: AdminMenuGroup[] = [
  {
    id: "site",
    label: "사이트 관리",
    children: [
      { href: "/asdasddfg/admin", label: "대시보드", meta: "Overview / Tasks", icon: "home" },
      { href: "/asdasddfg/admin/home", label: "메인 설정", meta: "Hero / Story / SEO", icon: "home" },
      { href: "/asdasddfg/admin/company", label: "회사소개", meta: "Title / Body / Vision", icon: "home" },
      { href: "/asdasddfg/admin/applications", label: "Application", meta: "소개 / 정렬 / 노출", icon: "apps" },
      { href: "/asdasddfg/admin/products", label: "Product", meta: "목록 / 상세 / SEO", icon: "box" },
      { href: "/asdasddfg/admin/contact", label: "Contact", meta: "Quote / Directions / Hero", icon: "contact" },
      { href: "/asdasddfg/admin/resources", label: "자료실", meta: "CRUD / 순번 / 파일 링크", icon: "docs" },
    ],
  },
  {
    id: "support",
    label: "고객 대응",
    children: [
      { href: "/asdasddfg/admin/inquiries", label: "문의 관리", meta: "수신함 / 상태 / 답변 메일", icon: "mail" },
    ],
  },
  {
    id: "settings",
    label: "설정",
    children: [
      { href: "/asdasddfg/admin/settings", label: "설정", meta: "비밀번호 / 접속 기록", icon: "settings" },
    ],
  },
];

function AdminNavIcon({ type }: { type: AdminMenuChild["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "home":
      return (
        <svg {...common}>
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M10 20v-6h4v6" />
        </svg>
      );
    case "apps":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="7" height="7" rx="1.5" />
          <rect x="13" y="4" width="7" height="7" rx="1.5" />
          <rect x="4" y="13" width="7" height="7" rx="1.5" />
          <rect x="13" y="13" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "box":
      return (
        <svg {...common}>
          <path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Z" />
          <path d="M12 12 20 7.5" />
          <path d="M12 12 4 7.5" />
          <path d="M12 12v9" />
        </svg>
      );
    case "docs":
      return (
        <svg {...common}>
          <path d="M7 3.5h7l4 4V20H7z" />
          <path d="M14 3.5V8h4" />
          <path d="M9.5 12h5" />
          <path d="M9.5 16h5" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
          <path d="m5 7 7 5 7-5" />
        </svg>
      );
    case "contact":
      return (
        <svg {...common}>
          <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5z" />
          <path d="M7.5 9.5h9" />
          <path d="M7.5 13h5" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19 12a7 7 0 0 0-.08-1l2.02-1.57-2-3.46-2.45.82a7 7 0 0 0-1.73-1l-.37-2.55h-4l-.37 2.55a7 7 0 0 0-1.73 1l-2.45-.82-2 3.46L5.08 11A7 7 0 0 0 5 12c0 .34.03.67.08 1l-2.02 1.57 2 3.46 2.45-.82c.53.42 1.11.76 1.73 1l.37 2.55h4l.37-2.55c.62-.24 1.2-.58 1.73-1l2.45.82 2-3.46L18.92 13c.05-.33.08-.66.08-1Z" />
        </svg>
      );
  }
}

function AdminHeaderActionIcon({ type }: { type: "site" | "theme" | "settings" | "logout" }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (type) {
    case "site":
      return (
        <svg {...common}>
          <path d="M4 12h16" />
          <path d="M12 4a15 15 0 0 1 0 16" />
          <path d="M12 4a15 15 0 0 0 0 16" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      );
    case "theme":
      return (
        <svg {...common}>
          <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M19 12a7 7 0 0 0-.08-1l2.02-1.57-2-3.46-2.45.82a7 7 0 0 0-1.73-1l-.37-2.55h-4l-.37 2.55a7 7 0 0 0-1.73 1l-2.45-.82-2 3.46L5.08 11A7 7 0 0 0 5 12c0 .34.03.67.08 1l-2.02 1.57 2 3.46 2.45-.82c.53.42 1.11.76 1.73 1l.37 2.55h4l.37-2.55c.62-.24 1.2-.58 1.73-1l2.45.82 2-3.46L18.92 13c.05-.33.08-.66.08-1Z" />
        </svg>
      );
    case "logout":
      return (
        <svg {...common}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <path d="M16 17l5-5-5-5" />
          <path d="M21 12H9" />
        </svg>
      );
  }
}

export function AdminShell({
  children,
  title,
  description,
  lastLoginAt,
  pendingInquiries,
  todayVisitors,
}: {
  children: React.ReactNode;
  title: string;
  description?: string;
  lastLoginAt?: Date | null;
  pendingInquiries?: number;
  todayVisitors?: number;
}) {
  const pathname = usePathname();
  const currentGroup =
    adminMenu.find((group) => group.children.some((item) => item.href === pathname)) ?? adminMenu[0];
  const currentPage =
    currentGroup.children.find((item) => item.href === pathname) ?? currentGroup.children[0];
  const previewMap: Record<string, { href: string; label: string }> = {
    "/asdasddfg/admin/home": { href: "/ko", label: "메인 미리보기" },
    "/asdasddfg/admin/applications": { href: "/ko/applications", label: "Application 미리보기" },
    "/asdasddfg/admin/products": { href: "/ko/products", label: "Product 미리보기" },
    "/asdasddfg/admin/contact": { href: "/ko/contact/quote", label: "Contact 미리보기" },
    "/asdasddfg/admin/resources": { href: "/ko/contact/resources", label: "자료실 미리보기" },
    "/asdasddfg/admin/inquiries": { href: "/ko/contact/quote", label: "문의 페이지 보기" },
  };
  const previewTarget = pathname ? previewMap[pathname] : null;
  const [collapsed, setCollapsed] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const unresolvedInquiryCount = pendingInquiries ?? 0;

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("shinhotek-admin-theme");
    const savedCollapsed = window.localStorage.getItem("shinhotek-admin-collapsed");

    if (savedTheme === "dark" || savedTheme === "light") {
      setTheme(savedTheme);
    }

    if (savedCollapsed === "true") {
      setCollapsed(true);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("shinhotek-admin-theme", theme);
    window.localStorage.setItem("shinhotek-admin-collapsed", String(collapsed));
  }, [theme, collapsed]);

  return (
    <div className="lumosAdminLayout" data-theme={theme} data-collapsed={collapsed}>
      <aside className="lumosAdminSidebar">
        <div className="lumosAdminSidebarHead">
          <div>
            <strong>Shinhotek Admin</strong>
            {!collapsed ? <span>Content operations</span> : null}
          </div>
          <button
            type="button"
            className="lumosAdminIconButton"
            onClick={() => setCollapsed((value) => !value)}
            aria-label="Toggle sidebar"
          >
            {collapsed ? ">" : "<"}
          </button>
        </div>

        <nav className="lumosAdminNav">
          {adminMenu.map((group) => {
            return (
              <div key={group.id} className="lumosAdminNavGroup">
                {!collapsed ? <div className="lumosAdminNavGroupLabel">{group.label}</div> : null}
                <div className="lumosAdminNavGroupItems">
                  {group.children.map((item) => {
                    const active = pathname === item.href;

                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`lumosAdminNavItem ${active ? "isActive" : ""}`}
                        aria-current={active ? "page" : undefined}
                        title={item.label}
                      >
                        <div className="lumosAdminNavIcon" aria-hidden="true">
                          <AdminNavIcon type={item.icon} />
                        </div>
                        <div className="lumosAdminNavText">
                          <div className="lumosAdminNavLabel">{item.label}</div>
                          {!collapsed ? <div className="lumosAdminNavMeta">{item.meta}</div> : null}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>
      </aside>

      <div className="lumosAdminMain">
        <header className="lumosAdminHeader">
          <button
            type="button"
            className="lumosAdminMenuToggle"
            onClick={() => setCollapsed((value) => !value)}
            aria-label="Toggle sidebar"
          >
            ≡
          </button>
          <div className="lumosAdminHeaderTitle">
            <h1>{currentPage.label}</h1>
            <p>{currentPage.meta}</p>
          </div>
          <div className="lumosAdminHeaderStats">
            <div className="lumosAdminStatItem">
              <span>Last Login</span>
              <strong>{lastLoginAt ? lastLoginAt.toLocaleString("ko-KR") : "-"}</strong>
            </div>
            <div className="lumosAdminStatItem">
              <span>Today Visitors</span>
              <strong>{todayVisitors ?? 0}</strong>
            </div>
          </div>
          <div className="lumosAdminHeaderActions">
            <button
              type="button"
              className="lumosAdminGhostIconButton lumosAdminNotificationButton"
              aria-label={unresolvedInquiryCount > 0 ? `알림 ${unresolvedInquiryCount}건` : "알림"}
              title={unresolvedInquiryCount > 0 ? `알림 ${unresolvedInquiryCount}건` : "알림"}
              onClick={() => setShowNotifications(true)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M6 8a6 6 0 1 1 12 0c0 5 2 6 2 6H4s2-1 2-6" />
                <path d="M10 18a2 2 0 0 0 4 0" />
              </svg>
              {unresolvedInquiryCount > 0 ? (
                <span className="lumosAdminNotificationBadge" aria-hidden="true">
                  {unresolvedInquiryCount > 9 ? "9+" : unresolvedInquiryCount}
                </span>
              ) : null}
            </button>
            {previewTarget ? (
              <Link
                href={previewTarget.href}
                className="lumosAdminGhostButton"
                target="_blank"
                title={previewTarget.label}
              >
                {previewTarget.label}
              </Link>
            ) : null}
            <Link href="/ko" className="lumosAdminGhostIconButton" target="_blank" title="사이트 보기" aria-label="사이트 보기">
              <AdminHeaderActionIcon type="site" />
            </Link>
            <button
              type="button"
              className="lumosAdminGhostIconButton"
              onClick={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
              title={theme === "dark" ? "라이트 모드" : "다크 모드"}
              aria-label={theme === "dark" ? "라이트 모드" : "다크 모드"}
            >
              <AdminHeaderActionIcon type="theme" />
            </button>
            <Link href="/asdasddfg/admin/settings" className="lumosAdminGhostIconButton" title="설정" aria-label="설정">
              <AdminHeaderActionIcon type="settings" />
            </Link>
            <form action={logoutAdmin}>
              <button type="submit" className="lumosAdminGhostIconButton" title="로그아웃" aria-label="로그아웃">
                <AdminHeaderActionIcon type="logout" />
              </button>
            </form>
          </div>
        </header>
        <main className="lumosAdminContent">
          <section className="lumosAdminPageIntro">
            <div className="lumosAdminBreadcrumb">
              <span>Shinhotek Admin</span>
              <span>/</span>
              <span>{currentGroup.label}</span>
              <span>/</span>
              <strong>{currentPage.label}</strong>
            </div>
            <div className="lumosAdminPageSummary">
              <div className="lumosAdminPageIcon" aria-hidden="true">
                <AdminNavIcon type={currentPage.icon} />
              </div>
              <div className="lumosAdminPageCopy">
                <span className="lumosAdminPageEyebrow">{currentGroup.label}</span>
                <h2>{currentPage.label}</h2>
                <p>{description || title}</p>
              </div>
              <div className="lumosAdminPageAside">
                <div className="lumosAdminPageTags">
                  {currentPage.meta.split("/").map((item) => (
                    <span key={item.trim()}>{item.trim()}</span>
                  ))}
                </div>
                {previewTarget ? (
                  <Link
                    href={previewTarget.href}
                    className="lumosAdminPrimaryButton"
                    target="_blank"
                    title={previewTarget.label}
                  >
                    {previewTarget.label}
                  </Link>
                ) : null}
              </div>
            </div>
          </section>
          {children}
        </main>
      </div>
      {showNotifications ? (
        <div
          className="lumosAdminModalBackdrop"
          role="presentation"
          onClick={() => setShowNotifications(false)}
        >
          <section
            className="lumosAdminModal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lumos-admin-notification-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="lumosAdminModalHead">
              <div>
                <span className="lumosAdminPageEyebrow">Notifications</span>
                <h2 id="lumos-admin-notification-title">알림</h2>
              </div>
              <button
                type="button"
                className="lumosAdminGhostIconButton"
                onClick={() => setShowNotifications(false)}
                aria-label="알림 닫기"
              >
                ×
              </button>
            </div>
            <div className="lumosAdminModalBody">
              {unresolvedInquiryCount > 0 ? (
                <div className="lumosAdminNotificationList">
                  <div className="lumosAdminNotificationItem isAlert">
                    <div className="lumosAdminNotificationCopy">
                      <strong>미응답 문의</strong>
                      <p>{`현재 확인이 필요한 문의가 ${unresolvedInquiryCount}건 있습니다.`}</p>
                    </div>
                    <Link
                      href="/asdasddfg/admin/inquiries"
                      className="lumosAdminPrimaryButton"
                      onClick={() => setShowNotifications(false)}
                    >
                      문의 관리 보기
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="lumosAdminEmptyState">
                  <strong>새 알림이 없습니다.</strong>
                  <p>미응답 문의나 운영 알림이 생기면 이곳에서 바로 확인할 수 있습니다.</p>
                </div>
              )}
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}




