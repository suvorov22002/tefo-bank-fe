import { apiClientService } from '@/services'
import {
  EditBankProfileRequestData,
  EditBankProfileResponseData,
  GetBankProfileResponseData,
  GetBankProfileTemplateResponseData,
} from '../types'

export const getBankProfile = () => {
  return apiClientService.get<GetBankProfileResponseData>(
    '/core-bank-settings/api/v1.0/bank-profile'
  )
}

export const getBankProfileTemplate = () => {
  return apiClientService.get<GetBankProfileTemplateResponseData>(
    '/core-bank-settings/api/v1.0/bank-profile/templates/default'
  )
}

export const editBankProfile = (data: EditBankProfileRequestData) => {
  return apiClientService.put<EditBankProfileResponseData>(
    '/core-bank-settings/api/v1.0/bank-profile',
    { body: data }
  )
}
