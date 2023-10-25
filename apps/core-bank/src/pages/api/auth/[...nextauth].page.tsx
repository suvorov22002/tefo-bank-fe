import { KeycloakProvider, NextAuth, NextAuthOptions, jwt, session, signOutHandshake } from 'auth'

import { config } from '@/configs'

const clientId = config.auth.keycloak.clientId
const clientSecret = config.auth.keycloak.clientSecret
const issuer = `${config.auth.keycloak.baseUrl}/realms/${config.auth.keycloak.realm}`
const providerBaseUrl = `${issuer}/protocol/openid-connect`

const keycloak = KeycloakProvider({
  clientId,
  clientSecret,
  issuer,
})

export const authOptions: NextAuthOptions = {
  providers: [keycloak],
  secret: clientSecret,
  callbacks: {
    jwt: ({ token, account, profile }) =>
      jwt({ token, account, profile, clientId, clientSecret, providerBaseUrl }),
    session,
  },
  events: {
    signOut: ({ token }) => signOutHandshake(token, providerBaseUrl),
  },
}

export default NextAuth(authOptions)
