import { INTEGRATED_RenderDynamicFields } from 'ui'

import * as customFieldsApi from '../api'
import {
  createCustomField,
  createCustomFieldGroup,
  createCustomFieldValidationRule,
  deleteCustomFieldValidationRule,
  editCustomField,
  editCustomFieldGroup,
  editCustomFieldValidationRule,
  getAllCustomFieldGroups,
  getCustomField,
  getCustomFieldGroup,
  getCustomFieldGroups,
  getCustomFieldValidationRules,
  getCustomFields,
} from './index'
import {
  createCustomFieldGroupRequestDataMock,
  customFieldValidationRulesMock,
  customFieldsMock,
} from '../api/mocks'

jest.mock('../api', () => ({
  getBankProfileCustomFields: jest.fn(() => Promise.resolve({})),
  getUnitCustomFields: jest.fn(() => Promise.resolve({})),
  getUserCustomFields: jest.fn(() => Promise.resolve({})),
  getCountryCustomFields: jest.fn(() => Promise.resolve({})),
  createBankProfileCustomField: jest.fn(() => Promise.resolve({})),
  createUserCustomField: jest.fn(() => Promise.resolve({})),
  createUnitCustomField: jest.fn(() => Promise.resolve({})),
  createCountryCustomField: jest.fn(() => Promise.resolve({})),
  getBankProfileCustomField: jest.fn(() => Promise.resolve({})),
  getUserCustomField: jest.fn(() => Promise.resolve({})),
  getUnitCustomField: jest.fn(() => Promise.resolve({})),
  getCountryCustomField: jest.fn(() => Promise.resolve({})),
  editBankProfileCustomField: jest.fn(() => Promise.resolve({})),
  editUserCustomField: jest.fn(() => Promise.resolve({})),
  editUnitCustomField: jest.fn(() => Promise.resolve({})),
  editCountryCustomField: jest.fn(() => Promise.resolve({})),
  getBankProfileCustomFieldValidationRules: jest.fn(() => Promise.resolve({})),
  getUserCustomFieldValidationRules: jest.fn(() => Promise.resolve({})),
  getUnitCustomFieldValidationRules: jest.fn(() => Promise.resolve({})),
  getCountryCustomFieldValidationRules: jest.fn(() => Promise.resolve({})),
  createBankProfileCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  createUserCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  createUnitCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  createCountryCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  editBankProfileCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  editUserCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  editUnitCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  editCountryCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  deleteBankProfileCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  deleteUserCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  deleteUnitCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  deleteCountryCustomFieldValidationRule: jest.fn(() => Promise.resolve({})),
  getBankProfileCustomFieldGroups: jest.fn(() => Promise.resolve({})),
  getUnitCustomFieldGroups: jest.fn(() => Promise.resolve({})),
  getUserCustomFieldGroups: jest.fn(() => Promise.resolve({})),
  getCountryCustomFieldGroups: jest.fn(() => Promise.resolve({})),
  createBankProfileCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  createUserCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  createUnitCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  createCountryCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  getBankProfileCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  getUserCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  getUnitCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  getCountryCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  editBankProfileCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  editUserCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  editUnitCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  editCountryCustomFieldGroup: jest.fn(() => Promise.resolve({})),
  getBankProfileAllCustomFieldGroups: jest.fn(() => Promise.resolve({})),
  getCountryAllCustomFieldGroups: jest.fn(() => Promise.resolve({})),
  getUnitAllCustomFieldGroups: jest.fn(() => Promise.resolve({})),
  getUserAllCustomFieldGroups: jest.fn(() => Promise.resolve({})),
}))

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getCustomFields', () => {
  it('should call customFieldsApi getBankProfileCustomFields method for Bank entity with correct arguments', async () => {
    await getCustomFields(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, 1, 10)

    expect(customFieldsApi.getBankProfileCustomFields).toBeCalledWith(1, 10)
  })

  it('should call customFieldsApi getUnitCustomFields method for Unit entity with correct arguments', async () => {
    await getCustomFields(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit, 1, 10)

    expect(customFieldsApi.getUnitCustomFields).toBeCalledWith(1, 10)
  })

  it('should call customFieldsApi getUserCustomFields method for Unit entity with correct arguments', async () => {
    await getCustomFields(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User, 1, 10)

    expect(customFieldsApi.getUserCustomFields).toBeCalledWith(1, 10)
  })

  it('should call customFieldsApi getCountryCustomFields method for Country entity with correct arguments', async () => {
    await getCustomFields(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country, 1, 10)

    expect(customFieldsApi.getCountryCustomFields).toBeCalledWith(1, 10)
  })
})

describe('createCustomField', () => {
  const createCustomFieldRequestMockData: Omit<INTEGRATED_RenderDynamicFields.DynamicField, 'id'> =
    {
      code: `field_`,
      fieldName: `field_name`,
      hiddenOnCreate: false,
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      entityLevel: null,
      defaultValue: {},
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      groupCode: `group`,
      independent: true,
      order: 0,
      label: `field_label`,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      required: true,
      validation: { rules: [] },
      placeholder: null,
      helpText: null,
      tooltip: null,
      properties: null,
    }

  it('should call customFieldsApi createBankProfileCustomField method for Bank entity with proper data', async () => {
    await createCustomField(createCustomFieldRequestMockData)

    expect(customFieldsApi.createBankProfileCustomField).toBeCalled()
    expect(customFieldsApi.createBankProfileCustomField).toBeCalledWith(
      createCustomFieldRequestMockData
    )
  })

  it('should call customFieldsApi createUserProfileCustomField method for User entity with proper data', async () => {
    const createUserCustomFieldRequestMockData = {
      ...createCustomFieldRequestMockData,
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
    }

    await createCustomField(createUserCustomFieldRequestMockData)

    expect(customFieldsApi.createUserCustomField).toBeCalled()
    expect(customFieldsApi.createUserCustomField).toBeCalledWith(
      createUserCustomFieldRequestMockData
    )
  })

  it('should call customFieldsApi createUnitCustomField method for Unit entity with proper data', async () => {
    const createUnitCustomFieldRequestMockData = {
      ...createCustomFieldRequestMockData,
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
    }

    await createCustomField(createUnitCustomFieldRequestMockData)

    expect(customFieldsApi.createUnitCustomField).toBeCalled()
    expect(customFieldsApi.createUnitCustomField).toBeCalledWith(
      createUnitCustomFieldRequestMockData
    )
  })

  it('should call customFieldsApi createCountryCustomField method for Country entity with proper data', async () => {
    const createUnitCustomFieldRequestMockData = {
      ...createCustomFieldRequestMockData,
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
    }

    await createCustomField(createUnitCustomFieldRequestMockData)

    expect(customFieldsApi.createCountryCustomField).toBeCalled()
    expect(customFieldsApi.createCountryCustomField).toBeCalledWith(
      createUnitCustomFieldRequestMockData
    )
  })
})

describe('getCustomField', () => {
  it('should call customFieldsApi getBankProfileCustomField method for Bank entity with correct arguments', async () => {
    await getCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, '23')

    expect(customFieldsApi.getBankProfileCustomField).toBeCalledWith('23')
  })

  it('should call customFieldsApi getUserCustomField method for User entity with correct arguments', async () => {
    await getCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User, '23')

    expect(customFieldsApi.getUserCustomField).toBeCalledWith('23')
  })

  it('should call customFieldsApi getUnitCustomField method for Unit entity with correct arguments', async () => {
    await getCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit, '23')

    expect(customFieldsApi.getUnitCustomField).toBeCalledWith('23')
  })

  it('should call customFieldsApi getCountryCustomField method for Country entity with correct arguments', async () => {
    await getCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country, '23')

    expect(customFieldsApi.getCountryCustomField).toBeCalledWith('23')
  })
})

describe('editCustomField', () => {
  it('should call customFieldsApi editBankProfileCustomField method for Bank entity with correct arguments', async () => {
    editCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, customFieldsMock[0])

    expect(customFieldsApi.editBankProfileCustomField).toBeCalledWith(customFieldsMock[0])
  })

  it('should call customFieldsApi editUserCustomField method for User entity with correct arguments', async () => {
    editCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User, customFieldsMock[0])

    expect(customFieldsApi.editUserCustomField).toBeCalledWith(customFieldsMock[0])
  })

  it('should call customFieldsApi editUnitCustomField method for Unit entity with correct arguments', async () => {
    editCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit, customFieldsMock[0])

    expect(customFieldsApi.editUnitCustomField).toBeCalledWith(customFieldsMock[0])
  })
  it('should call customFieldsApi editCountryCustomField method for Country entity with correct arguments', async () => {
    editCustomField(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      customFieldsMock[0]
    )

    expect(customFieldsApi.editCountryCustomField).toBeCalledWith(customFieldsMock[0])
  })
})

describe('getCustomFieldValidationRules', () => {
  it('should call customFieldsApi getBankProfileCustomFieldValidationRules method for Bank entity with correct arguments', async () => {
    getCustomFieldValidationRules(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      customFieldsMock[0].id
    )

    expect(customFieldsApi.getBankProfileCustomFieldValidationRules).toBeCalledWith(
      customFieldsMock[0].id
    )
  })

  it('should call customFieldsApi getUserCustomFieldValidationRules method for User entity with correct arguments', async () => {
    getCustomFieldValidationRules(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      customFieldsMock[0].id
    )

    expect(customFieldsApi.getUserCustomFieldValidationRules).toBeCalledWith(customFieldsMock[0].id)
  })

  it('should call customFieldsApi getUnitCustomFieldValidationRules method for Unit entity with correct arguments', async () => {
    getCustomFieldValidationRules(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      customFieldsMock[0].id
    )

    expect(customFieldsApi.getUnitCustomFieldValidationRules).toBeCalledWith(customFieldsMock[0].id)
  })

  it('should call customFieldsApi getCountryCustomFieldValidationRules method for Country entity with correct arguments', async () => {
    getCustomFieldValidationRules(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      customFieldsMock[0].id
    )

    expect(customFieldsApi.getCountryCustomFieldValidationRules).toBeCalledWith(
      customFieldsMock[0].id
    )
  })
})

describe('createCustomFieldValidationRule', () => {
  it('should call customFieldsApi createBankProfileCustomFieldValidationRule method for Bank entity with correct arguments', async () => {
    createCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.createBankProfileCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })

  it('should call customFieldsApi createUserCustomFieldValidationRule method for User entity with correct arguments', async () => {
    createCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.createUserCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })

  it('should call customFieldsApi createUnitCustomFieldValidationRule method for Unit entity with correct arguments', async () => {
    createCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.createUnitCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })

  it('should call customFieldsApi createCountryCustomFieldValidationRule method for Country entity with correct arguments', async () => {
    createCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.createCountryCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })
})

describe('editCustomFieldValidationRule', () => {
  it('should call customFieldsApi editBankProfileCustomFieldValidationRule method for Bank entity with correct arguments', async () => {
    editCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.editBankProfileCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })

  it('should call customFieldsApi editUserCustomFieldValidationRule method for User entity with correct arguments', async () => {
    editCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.editUserCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })

  it('should call customFieldsApi editUnitCustomFieldValidationRule method for Unit entity with correct arguments', async () => {
    editCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.editUnitCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })

  it('should call customFieldsApi editCountryCustomFieldValidationRule method for Country entity with correct arguments', async () => {
    editCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(customFieldsApi.editCountryCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )
  })
})

describe('deleteCustomFieldValidationRule', () => {
  it('should call customFieldsApi deleteBankProfileCustomFieldValidationRule method for Bank entity with correct arguments', async () => {
    deleteCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(customFieldsApi.deleteBankProfileCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )
  })

  it('should call customFieldsApi deleteUserCustomFieldValidationRule method for User entity with correct arguments', async () => {
    deleteCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(customFieldsApi.deleteUserCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )
  })

  it('should call customFieldsApi deleteUnitCustomFieldValidationRule method for Unit entity with correct arguments', async () => {
    deleteCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(customFieldsApi.deleteUnitCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )
  })

  it('should call customFieldsApi deleteCountryCustomFieldValidationRule method for Country entity with correct arguments', async () => {
    deleteCustomFieldValidationRule(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(customFieldsApi.deleteCountryCustomFieldValidationRule).toBeCalledWith(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )
  })
})

describe('getCustomFieldGroups', () => {
  it('should call customFieldsApi getBankProfileCustomFieldGroups method for Bank entity with correct arguments', async () => {
    await getCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, 1, 10)

    expect(customFieldsApi.getBankProfileCustomFieldGroups).toBeCalledWith(1, 10)
  })

  it('should call customFieldsApi getUnitCustomFieldGroups method for Unit entity with correct arguments', async () => {
    await getCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit, 1, 10)

    expect(customFieldsApi.getUnitCustomFieldGroups).toBeCalledWith(1, 10)
  })

  it('should call customFieldsApi getUserCustomFieldGroups method for Unit entity with correct arguments', async () => {
    await getCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User, 1, 10)

    expect(customFieldsApi.getUserCustomFieldGroups).toBeCalledWith(1, 10)
  })

  it('should call customFieldsApi getCountryCustomFieldGroups method for Country entity with correct arguments', async () => {
    await getCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country, 1, 10)

    expect(customFieldsApi.getCountryCustomFieldGroups).toBeCalledWith(1, 10)
  })
})

describe('createCustomFieldGroup', () => {
  it('should call customFieldsApi createBankProfileCustomFieldGroup for Bank entity with correct arguments', async () => {
    await createCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      createCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.createBankProfileCustomFieldGroup).toBeCalledWith(
      createCustomFieldGroupRequestDataMock
    )
  })

  it('should call customFieldsApi createUserCustomFieldGroup for User entity with correct arguments', async () => {
    await createCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      createCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.createUserCustomFieldGroup).toBeCalledWith(
      createCustomFieldGroupRequestDataMock
    )
  })

  it('should call customFieldsApi createUnitCustomFieldGroup for Unit entity with correct arguments', async () => {
    await createCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      createCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.createUnitCustomFieldGroup).toBeCalledWith(
      createCustomFieldGroupRequestDataMock
    )
  })

  it('should call customFieldsApi createCountryCustomFieldGroup for Country entity with correct arguments', async () => {
    await createCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      createCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.createCountryCustomFieldGroup).toBeCalledWith(
      createCustomFieldGroupRequestDataMock
    )
  })
})

describe('getCustomFieldGroup', () => {
  it('should call customFieldsApi getBankProfileCustomFieldGroup method for Bank entity with correct arguments', async () => {
    await getCustomFieldGroup(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, '23')

    expect(customFieldsApi.getBankProfileCustomFieldGroup).toBeCalledWith('23')
  })

  it('should call customFieldsApi getUserCustomFieldGroup method for User entity with correct arguments', async () => {
    await getCustomFieldGroup(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User, '23')

    expect(customFieldsApi.getUserCustomFieldGroup).toBeCalledWith('23')
  })

  it('should call customFieldsApi getUnitCustomFieldGroup method for Unit entity with correct arguments', async () => {
    await getCustomFieldGroup(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit, '23')

    expect(customFieldsApi.getUnitCustomFieldGroup).toBeCalledWith('23')
  })

  it('should call customFieldsApi getCountryCustomFieldGroup method for Country entity with correct arguments', async () => {
    await getCustomFieldGroup(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country, '23')

    expect(customFieldsApi.getCountryCustomFieldGroup).toBeCalledWith('23')
  })
})

describe('editCustomFieldGroup', () => {
  const editCustomFieldGroupRequestDataMock = {
    ...createCustomFieldGroupRequestDataMock,
    id: '23',
  }

  it('should call customFieldsApi editBankProfileCustomFieldGroup method for Bank entity with correct arguments', async () => {
    editCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      editCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.editBankProfileCustomFieldGroup).toBeCalledWith(
      editCustomFieldGroupRequestDataMock
    )
  })

  it('should call customFieldsApi editUserCustomFieldGroup method for User entity with correct arguments', async () => {
    editCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      editCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.editUserCustomFieldGroup).toBeCalledWith(
      editCustomFieldGroupRequestDataMock
    )
  })

  it('should call customFieldsApi editUnitCustomFieldGroup method for Unit entity with correct arguments', async () => {
    editCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      editCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.editUnitCustomFieldGroup).toBeCalledWith(
      editCustomFieldGroupRequestDataMock
    )
  })
  it('should call customFieldsApi editCountryCustomFieldGroup method for Country entity with correct arguments', async () => {
    editCustomFieldGroup(
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      editCustomFieldGroupRequestDataMock
    )

    expect(customFieldsApi.editCountryCustomFieldGroup).toBeCalledWith(
      editCustomFieldGroupRequestDataMock
    )
  })
})

describe('getAllCustomFieldGroups', () => {
  it('should call customFieldsApi getAllCustomFieldGroups method for Country entity with correct arguments', async () => {
    await getAllCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country)

    expect(customFieldsApi.getCountryAllCustomFieldGroups).toBeCalled()
  })

  it('should call customFieldsApi getAllCustomFieldGroups method for Unit entity with correct arguments', async () => {
    await getAllCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit)

    expect(customFieldsApi.getUnitAllCustomFieldGroups).toBeCalled()
  })

  it('should call customFieldsApi getAllCustomFieldGroups method for Bank Profile entity with correct arguments', async () => {
    await getAllCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank)

    expect(customFieldsApi.getBankProfileAllCustomFieldGroups).toBeCalled()
  })

  it('should call customFieldsApi getAllCustomFieldGroups method for User entity with correct arguments', async () => {
    await getAllCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User)

    expect(customFieldsApi.getUserAllCustomFieldGroups).toBeCalled()
  })
})
