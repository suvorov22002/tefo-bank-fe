import { apiClientService } from '@/services'

import { CreateBankProfileRequestData, GetBankProfileResponseData } from '../types'

export const createBankProfile = (data: CreateBankProfileRequestData) => {
  return apiClientService.post('/core-bank-settings/api/v1.0/bank-profile', { body: data })
}

export const getBankProfile = () => {
  return apiClientService.get<GetBankProfileResponseData>(
    '/core-bank-settings/api/v1.0/bank-profile'
  )
}
