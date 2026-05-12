import Link from "next/link";

import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const quickActions = [
  {
    href: "/asdasddfg/admin/home",
    title: "메인 화면 수정",
    description: "히어로, 스토리, 메인 제품 노출과 SEO 문구를 관리합니다.",
  },
  {
    href: "/asdasddfg/admin/products",
    title: "제품 관리",
    description: "제품 추가, 상세 문구, 이미지, 스펙, 자료 파일을 관리합니다.",
  },
  {
    href: "/asdasddfg/admin/applications",
    title: "응용분야 관리",
    description: "응용분야별 제목, 설명, 이미지, 노출 여부를 정리합니다.",
  },
  {
    href: "/asdasddfg/admin/contact",
    title: "고객지원 관리",
    description: "문의, 찾아오는 길, 파트너 소개 화면 정보를 관리합니다.",
  },
];

export default async function AdminIndexPage() {
  const [productCount, applicationCount, resourceCount, pendingInquiryCount, recentInquiries] =
    await Promise.all([
      prisma.product.count(),
      prisma.application.count(),
      prisma.resource.count(),
      prisma.inquiry.count({ where: { status: { not: "REPLIED" } } }),
      prisma.inquiry.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
        select: {
          id: true,
          company: true,
          name: true,
          email: true,
          status: true,
          createdAt: true,
        },
      }),
    ]);

  return (
    <div className="lumosAdminDashboard">
      <section className="lumosAdminDashboardStats" aria-label="운영 현황">
        <div className="lumosAdminMetricCard">
          <span>Products</span>
          <strong>{productCount}</strong>
          <p>등록 제품</p>
        </div>
        <div className="lumosAdminMetricCard">
          <span>Applications</span>
          <strong>{applicationCount}</strong>
          <p>응용분야</p>
        </div>
        <div className="lumosAdminMetricCard">
          <span>Resources</span>
          <strong>{resourceCount}</strong>
          <p>자료실 게시물</p>
        </div>
        <div className="lumosAdminMetricCard isAttention">
          <span>Pending</span>
          <strong>{pendingInquiryCount}</strong>
          <p>확인 필요 문의</p>
        </div>
      </section>

      <section className="lumosAdminDashboardGrid">
        <div className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>빠른 작업</h2>
              <p>자주 수정하는 영역으로 바로 이동합니다.</p>
            </div>
          </div>
          <div className="lumosAdminQuickActions">
            {quickActions.map((item) => (
              <Link key={item.href} href={item.href} className="lumosAdminQuickAction">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="lumosAdminSectionCard">
          <div className="lumosAdminSectionHead">
            <div>
              <h2>최근 문의</h2>
              <p>최근 접수된 고객 문의 상태를 확인합니다.</p>
            </div>
          </div>
          {recentInquiries.length > 0 ? (
            <div className="lumosAdminRecentList">
              {recentInquiries.map((inquiry) => (
                <Link key={inquiry.id} href="/asdasddfg/admin/inquiries" className="lumosAdminRecentItem">
                  <div>
                    <strong>{inquiry.company || inquiry.name}</strong>
                    <span>{inquiry.email}</span>
                  </div>
                  <div>
                    <span className={`lumosAdminStatusPill ${inquiry.status === "REPLIED" ? "isDone" : "isOpen"}`}>
                      {inquiry.status === "REPLIED" ? "답변 완료" : "확인 필요"}
                    </span>
                    <time>{inquiry.createdAt.toLocaleDateString("ko-KR")}</time>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="lumosAdminEmptyState">
              <strong>접수된 문의가 없습니다.</strong>
              <p>문의가 들어오면 이 영역에서 최근 항목을 확인할 수 있습니다.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

