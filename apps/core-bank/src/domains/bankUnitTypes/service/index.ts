import * as bankUnitTypesApi from '../api'
import {
  BankUnitType,
  CreateBankUnitTypeRequestData,
  EditBankUnitTypeRequestData,
  GetBankUnitTypeResponseData,
  GetBankUnitTypeTemplateResponseData,
  GetBankUnitTypesResponseData,
} from '../types'

export const getBankUnitTypes = (
  page: number,
  limit: number
): Promise<GetBankUnitTypesResponseData> =>
  bankUnitTypesApi.getBankUnitTypes(page, limit).then(({ body }) => body)

export const getBankUnitType = (id: string): Promise<GetBankUnitTypeResponseData> =>
  bankUnitTypesApi.getBankUnitType(id).then(({ body }) => body)

export const getBankUnitTypeTemplate = async (): Promise<GetBankUnitTypeTemplateResponseData> =>
  bankUnitTypesApi.getBankUnitTypeTemplate().then(({ body }) => body)

export const createBankUnitType = (data: CreateBankUnitTypeRequestData): Promise<BankUnitType> =>
  bankUnitTypesApi.createBankUnitType(data).then(({ body }) => body)

export const editBankUnitType = (data: EditBankUnitTypeRequestData): Promise<BankUnitType> =>
  bankUnitTypesApi.editBankUnitType(data).then(({ body }) => body)

export const getAllBankUnitTypes = (): Promise<BankUnitType[]> =>
  bankUnitTypesApi.getAllBankUnitTypes().then(({ body }) => body)

export const getBankUnitTypesBasicInfo = () =>
  bankUnitTypesApi.getBankUnitTypesBasicInfo().then(({ body }) => body)
