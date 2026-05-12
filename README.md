# Shinhotek Website

신호텍 홈페이지 리뉴얼 프로젝트입니다. Next.js 기반 공개 페이지와 관리자 CMS를 포함합니다.

## 주요 범위

- 국문/영문 공개 페이지
- 메인, 회사소개, 응용분야, 제품, 고객지원, 자료실, 법적 고지
- 관리자에서 문구, 이미지, 제품, 응용분야, 자료실, 대리점, 문의 관리
- 문의 접수 저장 및 SMTP 이메일 발송
- SEO 메타태그, sitemap, robots.txt, 구조화 데이터
- Docker 기반 배포 구성

## 관리자에서 관리 가능한 항목

- 메인 Hero / Story / SEO
- 회사소개 문구와 비전
- Application 항목, 이미지, 설명, 정렬, 공개 여부
- Product 항목, 상세 설명, 스펙, 이미지, 자료 파일, SEO
- 자료실 본문, 이미지, 파일
- 대리점 소개 이미지, 대륙 활성화, 대리점 CRUD
- 문의 상태, 내부 메모, 답변 메일

## 실행

```bash
npm install
cp .env.example .env
npm run db:push
npm run db:seed
npm run dev
```

## 관리자

- URL: `/asdasddfg`
- 계정: `.env`의 `ADMIN_USERNAME`, `ADMIN_PASSWORD`
