import { useEffect } from 'react'
import { useSession } from 'auth'

import type { Session } from '../../auth'

const MIN_INTERVAL_SECONDS = 1

interface RefreshTokenHandlerProps {
  setRefreshInterval: (interval: number) => void
  onSessionUpdate?: (session: Session) => void
}

export const RefreshTokenHandler = ({
  setRefreshInterval,
  onSessionUpdate,
}: RefreshTokenHandlerProps) => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session && onSessionUpdate) {
      onSessionUpdate(session)
    }
  }, [session, onSessionUpdate])

  useEffect(() => {
    if (session?.shouldRefreshAccessTokenAt) {
      const remainingTime = Math.round(session.shouldRefreshAccessTokenAt - Date.now() / 1000)

      setRefreshInterval(remainingTime > 0 ? remainingTime : MIN_INTERVAL_SECONDS)
    }
  }, [session, setRefreshInterval])

  return null
}

export default RefreshTokenHandler
