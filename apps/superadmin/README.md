# TEFO-BANK-FE SUPERADMIN

superadmin Front-End application bootstrapped by [Next.js](https://nextjs.org/) and managed by [Turborepo](https://turbo.build/repo) and [Yarn](https://yarnpkg.com/).

## Getting Started
Make sure you do have `.env.development.local`, `.env.production.local` and `.env.test.local` files created and filled according to `.env.*_template` templates.

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Base URL of the API  

- `NEXT_PUBLIC_CORE_BANK_URL` - Base URL of the core-bank application  
- `NEXT_PUBLIC_SUCCESS_BANK_CREATION_REDIRECT_PATH` - Path to redirect in case bank already exist  

## Running Locally

First, install the dependencies if needed by:

```bash
yarn
```

Then run the development servers by:

```bash
yarn workspace superadmin dev
```

After that visit localhost [http://localhost:3000](http://localhost:3000) to see the result.

> More information about `Available commands` can be found in the root README.md file.
