import { INTEGRATED_RenderDynamicFields } from 'ui'

import { Paginated } from '@/types'

export enum BankUnitStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
  IDLE = 'IDLE',
}

export interface BankUnit extends Record<string, unknown> {
  id: string
  unitTypeId: string
  unitTypeName: string
  parentId: string
  parentName: string
  code: string
  name: string
  streetLine: string
  city: string
  region: string
  zipCode: string
  shortPhoneNumber: string
  phoneCode: string
  email: string
  isDataRestricted: boolean
  status: BankUnitStatus
}

export interface BankUnitBasicInfo extends Pick<BankUnit, 'id' | 'name'> {}

export interface GetBankUnitEntityLevelTemplateResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate {}

export interface GetBankUnitTemplateResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate {}

export interface GetBankUnitsResponseData extends Paginated<BankUnit[]> {}

export type GetBankUnitsBasicInfoResponseData = BankUnitBasicInfo[]

export interface CreateBankUnitRequestData extends BankUnit {}
export interface CreateBankUnitResponseData extends BankUnit {}
export interface EditBankUnitRequestData extends BankUnit {}
export interface EditBankUnitResponseData extends BankUnit {}
