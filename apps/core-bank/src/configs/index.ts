// https://github.com/vercel/turbo/issues/1058
/* eslint-disable turbo/no-undeclared-env-vars */
import packageJson from '../../package.json'

interface KeycloakConfig {
  clientId: string
  clientSecret: string
  realm: string
  baseUrl: string
}

interface Config {
  isDevelopment: boolean
  isTest: boolean
  isProduction: boolean
  name: string
  api: { url: string }
  auth: {
    url: string
    secret: string
    keycloak: KeycloakConfig
  }
}

type ClientConfig = Omit<Config, 'auth'>

const isServer = typeof window === 'undefined'

const apiUrl = process.env.NEXT_PUBLIC_API_URL

const authUrl = process.env.NEXTAUTH_URL
const authSecret = process.env.NEXTAUTH_SECRET

const keycloakClientId = process.env.KEYCLOAK_CLIENT_ID
const keycloakClientSecret = process.env.KEYCLOAK_CLIENT_SECRET
const keycloakRealm = process.env.KEYCLOAK_REALM
const keycloakBaseUrl = process.env.KEYCLOAK_BASE_URL

const allClientEnvVariablesProvided = !!apiUrl
const allServerEnvVariablesProvided =
  authUrl &&
  authSecret &&
  keycloakClientId &&
  keycloakClientSecret &&
  keycloakRealm &&
  keycloakBaseUrl

if (!allClientEnvVariablesProvided || (isServer && !allServerEnvVariablesProvided)) {
  throw new Error('Not all required env variables are provided')
}

export const clientConfig: ClientConfig = Object.freeze({
  name: packageJson.name,
  isDevelopment: process.env.NODE_ENV === 'development',
  isTest: process.env.NODE_ENV === 'test',
  isProduction: process.env.NODE_ENV === 'production',
  api: {
    url: apiUrl,
  },
})

export const config: Config = Object.freeze({
  ...clientConfig,
  auth: {
    url: authUrl,
    secret: authSecret,
    keycloak: {
      clientId: keycloakClientId,
      clientSecret: keycloakClientSecret,
      realm: keycloakRealm,
      baseUrl: keycloakBaseUrl,
    },
  },
} as Config)
