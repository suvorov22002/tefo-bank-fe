import * as bankProfileApi from '../api'
import { EditBankProfileResponseData } from '../types'
import { EditBankProfileRequestData, GetBankProfileResponseData } from '../types'

export const getBankProfile = (): Promise<GetBankProfileResponseData> =>
  bankProfileApi.getBankProfile().then(({ body }) => body)

export const getBankProfileTemplate = () =>
  bankProfileApi.getBankProfileTemplate().then(({ body }) => body)

export const editBankProfile = (
  data: EditBankProfileRequestData
): Promise<EditBankProfileResponseData> =>
  bankProfileApi.editBankProfile(data).then(({ body }) => body)
