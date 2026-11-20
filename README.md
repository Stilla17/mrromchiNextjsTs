This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Mini App users CRUD

Set `NEXT_PUBLIC_API_URL` in `.env.local` to the backend origin (local default: `http://localhost:5000`, without `/api`). Restart the dev server after changes; static deployments need a rebuild. For Telegram on a phone, use the backend's reachable HTTPS URL, not localhost. Backend `WEB_APP_URL` must allow the frontend origin through CORS.

Open the Mini App from the bot as a linked, active administrator. Requests send `Telegram.WebApp.initData` in the `Authorization` header; bot tokens are never needed by the users frontend.

- `src/lib/api.ts`: Axios client, Telegram authorization and readable errors.
- `src/features/users/users.service.ts`: backend HTTP calls.
- `src/features/users/users.hooks.ts`: TanStack Query queries, mutations and cache updates.
- `src/features/users/users.types.ts`: request and response types.
- `src/providers/QueryProvider.tsx`: query client scoped to the Mini App layout.

Run `npm run test:users` for mocked browser CRUD tests (Windows uses installed Edge; other platforms need `npx playwright install chromium`). Tests start an isolated dev server on port 3100 and never contact real MongoDB or Telegram.

Categories use `src/features/categories/` for their API service, TanStack Query hooks, browser and dialog. All active users and admins share the same category tree, up to three levels. Root categories are added directly; adding a child first asks for confirmation. The row menu renames or deletes a category, with an explicit warning before deleting its descendants. The current folder is stored in `/categories/?parent=<id>`, so breadcrumbs, browser history and refresh work. Lists refresh every 30 seconds and after mutations. Run `npm run test:e2e` for both user and category browser tests.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
