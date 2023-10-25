// https://github.com/vercel/turbo/issues/1058
/* eslint-disable turbo/no-undeclared-env-vars */
import packageJson from '../../package.json'

interface Config {
  isDevelopment: boolean
  isTest: boolean
  isProduction: boolean
  name: string
  api: { url: string }
  coreBankUrl: string
  bankCreationRedirectPath: string
}

type ClientConfig = Config

const apiUrl = process.env.NEXT_PUBLIC_API_URL
const coreBankUrl = process.env.NEXT_PUBLIC_CORE_BANK_URL
const bankCreationRedirectPath = process.env.NEXT_PUBLIC_SUCCESS_BANK_CREATION_REDIRECT_PATH

const allClientEnvVariablesProvided = apiUrl && coreBankUrl && bankCreationRedirectPath

if (!allClientEnvVariablesProvided) {
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
  coreBankUrl,
  bankCreationRedirectPath,
})

export const config: Config = Object.freeze({
  ...clientConfig,
} as Config)
