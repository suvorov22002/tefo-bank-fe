/* eslint-disable turbo/no-undeclared-env-vars */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { i18n } = require('./next-i18next.config')

module.exports = {
  i18n,
  reactStrictMode: false,
  transpilePackages: ['ui', 'services'],
  pageExtensions: ['page.ts', 'page.tsx'],
  output: 'standalone',
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,

    NEXT_PUBLIC_CORE_BANK_URL: process.env.NEXT_PUBLIC_CORE_BANK_URL,
    NEXT_PUBLIC_SUCCESS_BANK_CREATION_REDIRECT_PATH:
      process.env.NEXT_PUBLIC_SUCCESS_BANK_CREATION_REDIRECT_PATH,
  },
}
