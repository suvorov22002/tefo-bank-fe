import * as bankProfileApi from '../api'
import { CreateBankProfileRequestData, GetBankProfileResponseData } from '../types'

export const createBankProfile = (data: CreateBankProfileRequestData) =>
  bankProfileApi.createBankProfile(data)

export const getBankProfile = (): Promise<GetBankProfileResponseData> =>
  bankProfileApi.getBankProfile().then(({ body }) => body)
