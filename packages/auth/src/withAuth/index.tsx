import { Spin } from 'ui'
import { ReactNode, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'

import { ErrorConsts } from '../consts'

export interface WithAuthProps {
  children?: ReactNode
}

export const WithAuth = ({ children }: WithAuthProps) => {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn('keycloak')
    }
  }, [status])

  useEffect(() => {
    if (session?.error === ErrorConsts.RefreshAccessTokenError) {
      signIn('keycloak')
    }
  }, [session])

  if (status === 'loading') {
    return <Spin fullscreen />
  }

  return session && !session.error ? <>{children}</> : null
}
