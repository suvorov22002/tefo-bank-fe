import { StringifiableRecord, queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  BankUnit,
  CreateBankUnitRequestData,
  CreateBankUnitResponseData,
  EditBankUnitRequestData,
  EditBankUnitResponseData,
  GetBankUnitEntityLevelTemplateResponseData,
  GetBankUnitTemplateResponseData,
  GetBankUnitsBasicInfoResponseData,
  GetBankUnitsResponseData,
} from '../types'

export const getBankUnits = (page: number, size: number) =>
  apiClientService.get<GetBankUnitsResponseData>(
    queryString.stringifyUrl({
      url: '/org-structure/api/v1.0/units',
      query: {
        page,
        size,
      },
    })
  )

export const getBankUnitsBasicInfo = () =>
  apiClientService.get<GetBankUnitsBasicInfoResponseData>(
    '/org-structure/api/v1.0/units/basic-info'
  )

export const getBankUnitEntityLevelTemplate = () =>
  apiClientService.get<GetBankUnitEntityLevelTemplateResponseData>(
    '/org-structure/api/v1.0/units/templates/entity-level'
  )

export const getBankUnitTemplate = (templateId = 'default', query?: StringifiableRecord) => {
  const url = `/org-structure/api/v1.0/units/templates/${templateId}`

  return apiClientService.get<GetBankUnitTemplateResponseData>(
    queryString.stringifyUrl({
      url,
      query,
    })
  )
}

export const createBankUnit = (data: CreateBankUnitRequestData) => {
  return apiClientService.post<CreateBankUnitResponseData>('/org-structure/api/v1.0/units', {
    body: data,
  })
}

export const getBankUnit = (id: string) =>
  apiClientService.get<BankUnit>(`/org-structure/api/v1.0/units/${id}`)

export const editBankUnit = (data: EditBankUnitRequestData) =>
  apiClientService.put<EditBankUnitResponseData>(`/org-structure/api/v1.0/units/${data.id}`, {
    body: data,
  })
