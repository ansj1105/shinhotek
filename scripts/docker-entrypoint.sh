#!/bin/sh
set -eu

npx prisma db push
npm run db:seed
node server.js
