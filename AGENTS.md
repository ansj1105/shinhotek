# Repository Agent Notes

## Project Role

This repository is the SHINHOTEK website renewal project. It was scaffolded from the RUMOS/LUMOS codebase but should be maintained as an independent SHINHOTEK CMS site.

## Local / Remote

- Local path: `C:\work\shinhotek`
- GitHub: `https://github.com/ansj1105/shinhotek.git`
- Main branch: `main`
- Production server: `13.124.221.242`
- SSH key: `C:\work\shinotek.pem`
- Remote path: `/var/www/shinhotek`

## Deployment

Use Docker Compose on the server:

```bash
cd /var/www/shinhotek
git pull origin main
sudo docker compose up -d --build db web
sudo docker compose ps
curl -I http://127.0.0.1/ko
```

Current server deployment uses `docker-compose.override.yml` to map `web` directly to `80:3000`. The nginx/SSL service is not active until certificates are installed.

## Admin / CMS Priority

A core requirement is that admins can edit copy, images, product information, application information, resources, distributors, and contact content without code changes. Preserve this when adding features.

Admin entry:

- Login: `/asdasddfg`
- Admin dashboard: `/asdasddfg/admin`

## Environment

- Do not commit real `.env` or secrets.
- `.env.example` must remain placeholder-only.
- Server `.env` lives at `/var/www/shinhotek/.env`.
- If reCAPTCHA keys are blank, the contact form is intentionally allowed to submit without captcha for initial deployment.
- If SMTP keys are blank, inquiries are stored but email sending is inactive.

## Stack

- Next.js App Router
- Prisma
- PostgreSQL
- Docker / Docker Compose

Commands:

```bash
npm install
npm run build
npm run db:push
npm run db:seed
```

## Design Direction

Use a restrained B2B industrial style:

- Content-first sections.
- Minimal decorative effects.
- Clear technical hierarchy.
- Admin UX with dashboard overview, quick actions, consistent focus states, and predictable forms.

## Cautions

- Avoid reintroducing RUMOS/LUMOS-specific naming, assets, or product assumptions unless explicitly requested.
- Keep product categories admin-manageable. Adding a product should not require hardcoded navigation/footer changes unless the CMS contract changes.
- Keep Korean text UTF-8 safe when editing with PowerShell.
