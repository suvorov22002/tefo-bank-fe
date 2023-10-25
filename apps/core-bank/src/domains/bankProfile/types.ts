import { INTEGRATED_RenderDynamicFields } from 'ui'

export interface GetBankProfileResponseData extends Record<string, unknown> {
  shortName: string
  longName: string
  streetLine: string
  city: string
  zipCode: string
  region: string
  country: string
  shortPhoneNumber: string
  phoneCode: string
  email: string
  codeGroup: string
  swiftCode: string
}

export interface GetBankProfileTemplateResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate {}

export interface EditBankProfileRequestData extends GetBankProfileResponseData {}

export interface EditBankProfileResponseData extends GetBankProfileResponseData {}
