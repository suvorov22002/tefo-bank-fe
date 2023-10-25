import { INTEGRATED_RenderDynamicFields } from 'ui'

import { GetBankProfileResponseData, GetBankProfileTemplateResponseData } from '../types'

export const bankProfileFieldsMock: INTEGRATED_RenderDynamicFields.DynamicField[] = [
  {
    id: 'f1',
    fieldName: 'f1_',
    entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
    hiddenOnCreate: false,
    entityLevel: null,
    defaultValue: {},
    independent: true,
    code: 'codeGroup',
    status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
    label: 'Code Group',
    required: false,
    order: 0,
    type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
    properties: {},
    validation: {
      rules: [],
    },
    groupCode: null,
    placeholder: null,
    tooltip: null,
    helpText: null,
  },
]

export const getBankProfileMockResponse: GetBankProfileResponseData = {
  shortName: 'Bank',
  longName: 'Super Bank',
  streetLine: 'Somestreet',
  city: 'Somecity',
  region: 'Someregion',
  zipCode: 'DIVNDHMV',
  country: 'Somecountry',
  shortPhoneNumber: '',
  phoneCode: '',
  email: 'test@test.com',
  codeGroup: 'Somegroup',
  swiftCode: 'TJHKTJHKTJHK',
}

export const getBankProfileTemplateMockResponse: GetBankProfileTemplateResponseData = {
  id: 't1',
  name: 'User Template v1',
  primaryFields: bankProfileFieldsMock,
  groups: [],
  customFields: [],
}
