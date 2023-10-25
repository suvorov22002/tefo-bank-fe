import { HeaderConsts } from 'services'
import { Session } from 'auth'

import { apiClientService } from '@/services/apiClient'

export const setApiClientAuthorizationHeader = (session: Session) =>
  apiClientService.setHeader(
    HeaderConsts.Authorization,
    session.tokenType + ' ' + session.accessToken
  )
