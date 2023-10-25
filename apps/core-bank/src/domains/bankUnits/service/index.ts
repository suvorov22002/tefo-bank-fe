import { StringifiableRecord } from 'utils'

import * as bankUnitsApi from '../api'
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

export const getBankUnits = (page: number, limit: number): Promise<GetBankUnitsResponseData> =>
  bankUnitsApi.getBankUnits(page, limit).then(({ body }) => body)

export const getBankUnitsBasicInfo = (): Promise<GetBankUnitsBasicInfoResponseData> =>
  bankUnitsApi.getBankUnitsBasicInfo().then(({ body }) => body)

export const getBankUnitEntityLevelTemplate =
  (): Promise<GetBankUnitEntityLevelTemplateResponseData> =>
    bankUnitsApi.getBankUnitEntityLevelTemplate().then(({ body }) => body)

export const getBankUnitTemplate = (
  templateId?: string,
  query?: StringifiableRecord
): Promise<GetBankUnitTemplateResponseData> =>
  bankUnitsApi.getBankUnitTemplate(templateId, query).then(({ body }) => body)

export const createBankUnit = (
  data: CreateBankUnitRequestData
): Promise<CreateBankUnitResponseData> => bankUnitsApi.createBankUnit(data).then(({ body }) => body)

export const getBankUnit = (id: string): Promise<BankUnit> =>
  bankUnitsApi.getBankUnit(id).then(({ body }) => body)

export const editBankUnit = (data: EditBankUnitRequestData): Promise<EditBankUnitResponseData> =>
  bankUnitsApi.editBankUnit(data).then(({ body }) => body)
