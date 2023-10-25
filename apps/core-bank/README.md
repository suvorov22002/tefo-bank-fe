# TEFO-BANK-FE CORE-BANK

core-bank Front-End application bootstrapped by [Next.js](https://nextjs.org/) and managed by [Turborepo](https://turbo.build/repo) and [Yarn](https://yarnpkg.com/).

## Getting Started
Make sure you do have `.env.development.local`, `.env.production.local` and `.env.test.local` files created and filled according to `.env.*_template` templates.

## Environment Variables

- `NEXT_PUBLIC_API_URL` - Base URL of the API  

- `NEXTAUTH_URL` - Application URL + /api/auth  
- `NEXTAUTH_SECRET` - Auth secret  

- `KEYCLOAK_CLIENT_ID` - Keycloak client id  
- `KEYCLOAK_CLIENT_SECRET` - Auth secret  
- `KEYCLOAK_REALM` - Keycloak realm  
- `KEYCLOAK_BASE_URL` - Keycloak base URL  


## Running Locally

First, install the dependencies if needed by:

```bash
yarn
```

Then run the development servers by:

```bash
yarn workspace core-bank dev
```

After that visit localhost [http://localhost:3001](http://localhost:3001) to see the result.

> More information about `Available commands` can be found in the root README.md file.
