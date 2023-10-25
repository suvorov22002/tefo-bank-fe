import KeycloakProvider from 'next-auth/providers/keycloak'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { SessionProvider, signIn, signOut, useSession } from 'next-auth/react'

export * from './withAuth'
export * from './refreshTokenHandler'
export * from './callbacks'

export {
  KeycloakProvider,
  NextAuth,
  SessionProvider,
  signIn,
  signOut,
  useSession,
  type NextAuthOptions,
}
