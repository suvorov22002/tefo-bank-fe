/* eslint-disable turbo/no-undeclared-env-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: false,
  transpilePackages: ['ui', 'services', 'utils', 'auth'],
  pageExtensions: ['page.ts', 'page.tsx'],
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    KEYCLOAK_CLIENT_ID: process.env.KEYCLOAK_CLIENT_ID,
    KEYCLOAK_CLIENT_SECRET: process.env.KEYCLOAK_CLIENT_SECRET,
    KEYCLOAK_REALM: process.env.KEYCLOAK_REALM,
    KEYCLOAK_BASE_URL: process.env.KEYCLOAK_BASE_URL,
  },
}
