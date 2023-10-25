/* eslint-disable @typescript-eslint/no-var-requires */
const I18NextHttpBackend = require('i18next-http-backend')
const HttpBackend = require('i18next-http-backend/cjs')
const ChainedBackend = require('i18next-chained-backend').default
const LocalStorageBackend = require('i18next-localstorage-backend').default

// https://github.com/vercel/turbo/issues/1058
/* eslint-disable turbo/no-undeclared-env-vars */
const isDev = process.env.NODE_ENV === 'development'
const isBrowser = typeof window !== 'undefined'
const expirationTime = isDev ? 0 : 60 * 60 * 1000
const defaultVersion = Date.now()
const loadPath =
  (isBrowser ? '/locales' : require('path').resolve('./public/locales')) + '/{{lng}}/{{ns}}.json'

const serverSidePageConfig = {
  backend: {
    loadPath,
  },
  use: [I18NextHttpBackend],
}

const clientSidePageConfig = {
  backend: {
    backendOptions: [{ expirationTime, defaultVersion }, { loadPath }],
    backends: [LocalStorageBackend, HttpBackend],
  },
  use: [ChainedBackend],
}

const baseConfig = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  debug: isDev,
  serializeConfig: false,
}

module.exports = Object.assign(baseConfig, isBrowser ? clientSidePageConfig : serverSidePageConfig)
