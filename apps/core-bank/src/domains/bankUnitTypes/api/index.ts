import { queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  BankUnitType,
  CreateBankUnitTypeRequestData,
  EditBankUnitTypeRequestData,
  GetBankUnitTypeResponseData,
  GetBankUnitTypeTemplateResponseData,
  GetBankUnitTypesBasicInfoResponseData,
  GetBankUnitTypesResponseData,
} from '../types'

export const getBankUnitTypes = (page: number, size: number) =>
  apiClientService.get<GetBankUnitTypesResponseData>(
    queryString.stringifyUrl({
      url: '/org-structure/api/v1.0/unit-types',
      query: {
        page,
        size,
      },
    })
  )

export const getBankUnitType = (id: string) => {
  return apiClientService.get<GetBankUnitTypeResponseData>(
    `/org-structure/api/v1.0/unit-types/${id}`
  )
}

export const getBankUnitTypeTemplate = () => {
  return apiClientService.get<GetBankUnitTypeTemplateResponseData>(
    '/org-structure/api/v1.0/unit-types/templates/default'
  )
}

export const createBankUnitType = (data: CreateBankUnitTypeRequestData) => {
  return apiClientService.post<BankUnitType>('/org-structure/api/v1.0/unit-types', {
    body: data,
  })
}

export const editBankUnitType = (data: EditBankUnitTypeRequestData) => {
  const { id, ...rest } = data

  return apiClientService.put<BankUnitType>(`/org-structure/api/v1.0/unit-types/${id}`, {
    body: rest,
  })
}

export const getAllBankUnitTypes = () => {
  return apiClientService.get<BankUnitType[]>('/org-structure/api/v1.0/unit-types/all')
}

export const getBankUnitTypesBasicInfo = () => {
  return apiClientService.get<GetBankUnitTypesBasicInfoResponseData>(
    `/org-structure/api/v1.0/unit-types/basic-info`
  )
}
