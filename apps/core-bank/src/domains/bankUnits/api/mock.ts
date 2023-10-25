import { INTEGRATED_RenderDynamicFields } from 'ui'

import {
  BankUnit,
  BankUnitStatus,
  GetBankUnitTemplateResponseData,
  GetBankUnitsBasicInfoResponseData,
  GetBankUnitsResponseData,
} from '../types'

const bankUnitTypeOptionsMock = [
  { label: 'ZY5-D', value: 'ZY5-D' },
  { label: 'ZY5-E', value: 'ZY5-E' },
]

const bankUnitParentOptionsMock = [
  { label: 'ZY5-A', value: 'ZY5-A' },
  { label: 'ZY5-B', value: 'ZY5-B' },
]

export const bankUnitMock: BankUnit = {
  id: '1',
  unitTypeId: 'ZY5-C',
  unitTypeName: 'ZY5-C',
  parentId: 'ZY5-B',
  parentName: 'ZY5-B',
  code: 'UnitCode1',
  name: 'ZY4-C',
  streetLine: '1 Eliot Park',
  city: 'City',
  region: 'Region',
  zipCode: 'ZipCode',
  phoneCode: '+380',
  shortPhoneNumber: '1234567',
  email: 'email@email.com',
  isDataRestricted: false,
  status: BankUnitStatus.ACTIVE,
}

export const getBankUnitsResponseMock: GetBankUnitsResponseData = {
  page: 1,
  limit: 10,
  totalItems: 2,
  data: [
    {
      id: '1',
      unitTypeId: 'ZY5-C',
      unitTypeName: 'ZY5-C',
      parentId: 'ZY5-B',
      parentName: 'ZY5-B',
      code: 'UnitCode1',
      name: 'ZY4-C',
      streetLine: '1 Eliot Park',
      city: 'City',
      region: 'Region',
      zipCode: 'ZipCode',
      phoneCode: '+380',
      shortPhoneNumber: '1234567',
      email: 'email@email.com',
      isDataRestricted: false,
      status: BankUnitStatus.INACTIVE,
    },
    {
      id: '2',
      unitTypeId: 'ZY5-D',
      unitTypeName: 'ZY5-D',
      parentId: 'ZY5-B',
      parentName: 'ZY5-B',
      code: 'UnitCode2',
      name: 'ZY5-C',
      streetLine: '1 Eliot Park',
      city: 'City',
      region: 'Region',
      zipCode: 'ZipCode',
      phoneCode: '+380',
      shortPhoneNumber: '1234567',
      email: 'email@email.com',
      isDataRestricted: true,
      status: BankUnitStatus.INACTIVE,
    },
  ],
}

export const getBankUnitsBasicInfoResponseMock: GetBankUnitsBasicInfoResponseData = [
  {
    id: '1',
    name: 'Unit 1',
  },
  {
    id: '2',
    name: 'Unit 2',
  },
]

export const getBankUnitTemplateResponseMock: GetBankUnitTemplateResponseData = {
  id: 'ut1',
  name: 'User Template v1',
  primaryFields: [
    {
      id: 'f1',
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,
      code: 'unitType',
      label: 'Unit Type',
      hiddenOnCreate: false,
      defaultValue: {},
      required: true,
      order: 0,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      tooltip: '',
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List,
      properties: {
        options: bankUnitTypeOptionsMock,
      },
      validation: {
        rules: [],
      },
    },
    {
      id: 'f2',
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,

      code: 'parent',
      label: 'Parent',
      required: false,
      hiddenOnCreate: false,
      defaultValue: {},
      order: 1,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List,
      properties: {
        options: bankUnitParentOptionsMock,
      },
      validation: {
        rules: [],
      },
    },
    {
      id: 'f3',
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      entityLevel: null,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      independent: true,
      hiddenOnCreate: false,
      defaultValue: {},
      code: 'name',
      label: 'Name',
      required: true,
      order: 2,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
    },
  ],
  customFields: [],
  groups: [],
}
