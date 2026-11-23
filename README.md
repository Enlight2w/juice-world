# Juice World

Juice World is a juice and smoothie storefront with a browsable product menu and an administration area for catalog and order operations. The server provides product and order APIs.

## Current checkout boundary

The browser storefront currently displays sample product data; the server-side order API is not connected to a complete customer checkout flow. Treat orders as prototype records until a payment and fulfillment process is configured and exercised.

## Development

Use Node.js and the pnpm version declared in `package.json`.

```sh
pnpm install --frozen-lockfile
pnpm test
pnpm check
pnpm build
```

To start the development server on macOS or Linux, run `pnpm dev`. In Windows PowerShell, set the environment variable explicitly:

```powershell
$env:NODE_ENV = "development"
pnpm exec tsx watch server/_core/index.ts
```

Configure required server variables locally for authentication, storage, and database-backed catalog or order operations. Do not commit credentials.
