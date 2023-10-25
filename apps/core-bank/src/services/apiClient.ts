import { ApiClientService } from 'services'

import { clientConfig } from '@/configs'

import { loggerService } from './logger'

export const apiClientService = new ApiClientService(clientConfig.api.url, loggerService)
