import { INTEGRATED_RenderDynamicFields } from 'ui'

import { Paginated } from '@/types'

export enum BankUnitTypeStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export interface BankUnitType extends Record<string, unknown> {
  id: string
  name: string
  isVirtual: boolean
  status: BankUnitTypeStatus
}

export interface GetBankUnitTypesResponseData extends Paginated<BankUnitType[]> {}

export type GetBankUnitTypeResponseData = BankUnitType

export type GetBankUnitTypeTemplateResponseData =
  INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate

export interface CreateBankUnitTypeRequestData extends Omit<BankUnitType, 'id'> {}

export interface EditBankUnitTypeRequestData extends BankUnitType {}

export interface BankUnitTypeBasicInfo extends Pick<BankUnitType, 'id' | 'name'> {}

export type GetBankUnitTypesBasicInfoResponseData = BankUnitTypeBasicInfo[]
