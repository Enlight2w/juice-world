# Juice World - Project Notes

## Project Info
- Name: juice-world
- Path: /home/ubuntu/juice-world
- Domain: juiceworld-dgcycthx.manus.space
- Auto-publish: ENABLED

## Stack
- Frontend: React 19 + Tailwind 4 + Vite 7
- Backend: Express + tRPC 11 + Drizzle ORM (MySQL)
- Auth: Manus OAuth (admin/user roles)
- Storage: S3 via storagePut (server/storage.ts)

## Key Files
- client/src/pages/Home.tsx - Main landing page
- client/src/pages/AdminDashboard.tsx - Admin panel (NEW)
- client/src/App.tsx - Routes (/ and /admin)
- server/routers.ts - tRPC routers (products + orders CRUD)
- server/db.ts - Database query helpers
- drizzle/schema.ts - Tables: users, products, orders
- server/routers.test.ts - Vitest tests (18 passing)

## Storage Images (in /manus-storage/)
- hero-banner_957caf3b.png
- logo-mark_26884e61.png
- citrus-splash_f8182f2c.png
- tropical-juice_78531b43.png
- green-detox_9c406ba5.png
- berries-smoothie_4d980906.png
- fruit-juice-collection_9a4ff52e.png
- juice-smoothie_dcaae237.png
- milkshake-classic_e8f4ac67.png
- chocolate-milkshake_9c54a269.png
- pudding-dessert_43655a0b.png
- mango-pudding_f78ee9c1.png

## Todo Status
- [x] Full-stack upgrade complete
- [x] Database tables created (products, orders)
- [x] 21 products seeded
- [x] Backend API routers with S3 file storage
- [x] Vitest tests passing (18 tests)
- [ ] AdminDashboard page (just created, needs testing)
- [ ] Update frontend to use backend products (optional - currently uses static data)
- [ ] Final verification
