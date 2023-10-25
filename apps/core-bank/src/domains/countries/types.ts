import { INTEGRATED_RenderDynamicFields } from 'ui'

export enum CountryStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export interface Country extends Record<string, unknown> {
  id: number
  shortName: string
  name: string
  phoneCode: string
  phoneLengthMin: number
  phoneLengthMax: number
  status: CountryStatus
  createdAt: string
  updatedAt: string
  updatedBy: string
  ISOAlpha3Code: string
  ISOAlpha2Code: string
  ISONumericCode: string
}

export interface GetCountriesResponseData {
  data: Country[]
  page: number
  limit: number
  totalItems: number
}

export interface GetCountryTemplateResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate {}

export interface CreateCountryRequestData
  extends Pick<
      Country,
      | 'shortName'
      | 'name'
      | 'phoneCode'
      | 'phoneLengthMin'
      | 'phoneLengthMax'
      | 'status'
      | 'ISOAlpha3Code'
      | 'ISOAlpha2Code'
      | 'ISONumericCode'
    >,
    Record<string, unknown> {}
