import { apiClientService } from '@/services'

import * as customFieldsApi from './index'
import {
  createCustomFieldGroupRequestDataMock,
  customFieldValidationRulesMock,
  customFieldsMock,
} from './mocks'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getBankProfileCustomFields', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getBankProfileCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getUserCustomFields', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUserCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getUnitCustomFields', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUnitCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getCountryCustomFields', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getCountryCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('createBankProfileCustomField', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createBankProfileCustomField(customFieldsMock[0])

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: customFieldsMock[0] })
    )
  })
})

describe('createUserCustomField', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createUserCustomField(customFieldsMock[0])

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: customFieldsMock[0] })
    )
  })
})

describe('createUnitCustomField', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createUnitCustomField(customFieldsMock[0])

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: customFieldsMock[0] })
    )
  })
})

describe('createCountryCustomField', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createCountryCustomField(customFieldsMock[0])

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: customFieldsMock[0] })
    )
  })
})

describe('getBankProfileCustomField', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getBankProfileCustomField('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getUserCustomField', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getUserCustomField('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getUnitCustomField', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getUnitCustomField('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getCountryCustomField', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getCountryCustomField('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('editBankProfileCustomField', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editBankProfileCustomField(customFieldsMock[0])

    const { id, ...rest } = customFieldsMock[0]

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(String(id)),
      expect.objectContaining({ body: rest })
    )
  })
})

describe('editUserCustomField', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editUserCustomField(customFieldsMock[0])

    const { id, ...rest } = customFieldsMock[0]

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(String(id)),
      expect.objectContaining({ body: rest })
    )
  })
})

describe('editUnitCustomField', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editUnitCustomField(customFieldsMock[0])

    const { id, ...rest } = customFieldsMock[0]

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(String(id)),
      expect.objectContaining({ body: rest })
    )
  })
})

describe('editCountryCustomField', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editCountryCustomField(customFieldsMock[0])

    const { id, ...rest } = customFieldsMock[0]

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(String(id)),
      expect.objectContaining({ body: rest })
    )
  })
})

describe('getBankProfileCustomFieldValidationRules', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getBankProfileCustomFieldValidationRules('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getUserCustomFieldValidationRules', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getUserCustomFieldValidationRules('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getUnitCustomFieldValidationRules', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getUnitCustomFieldValidationRules('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getCountryCustomFieldValidationRules', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getCountryCustomFieldValidationRules('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('editBankProfileCustomFieldValidationRule', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editBankProfileCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('editUserCustomFieldValidationRule', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editUserCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('editUnitCustomFieldValidationRule', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editUnitCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('editCountryCustomFieldValidationRule', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editCountryCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('createBankProfileCustomFieldValidationRule', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createBankProfileCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.post).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('createUserCustomFieldValidationRule', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createUserCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.post).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('createUnitCustomFieldValidationRule', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createUnitCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.post).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('createCountryCustomFieldValidationRule', () => {
  it('should use apiClientService post method with proper data', async () => {
    await customFieldsApi.createCountryCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0]
    )

    expect(apiClientService.post).toBeCalledWith(
      expect.stringContaining(customFieldsMock[0].id),
      expect.objectContaining({
        body: customFieldValidationRulesMock[0],
      })
    )
  })
})

describe('deleteBankProfileCustomFieldValidationRule', () => {
  it('should use apiClientService delete method with proper data', async () => {
    await customFieldsApi.deleteBankProfileCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(apiClientService.delete).toBeCalledWith(expect.stringContaining(customFieldsMock[0].id))
    expect(apiClientService.delete).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id)
    )
  })
})

describe('deleteUserCustomFieldValidationRule', () => {
  it('should use apiClientService delete method with proper data', async () => {
    await customFieldsApi.deleteUserCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(apiClientService.delete).toBeCalledWith(expect.stringContaining(customFieldsMock[0].id))
    expect(apiClientService.delete).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id)
    )
  })
})

describe('deleteUnitCustomFieldValidationRule', () => {
  it('should use apiClientService delete method with proper data', async () => {
    await customFieldsApi.deleteUnitCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(apiClientService.delete).toBeCalledWith(expect.stringContaining(customFieldsMock[0].id))
    expect(apiClientService.delete).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id)
    )
  })
})

describe('deleteCountryCustomFieldValidationRule', () => {
  it('should use apiClientService delete method with proper data', async () => {
    await customFieldsApi.deleteCountryCustomFieldValidationRule(
      customFieldsMock[0].id,
      customFieldValidationRulesMock[0].id
    )

    expect(apiClientService.delete).toBeCalledWith(expect.stringContaining(customFieldsMock[0].id))
    expect(apiClientService.delete).toBeCalledWith(
      expect.stringContaining(customFieldValidationRulesMock[0].id)
    )
  })
})

describe('getBankProfileCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUserCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getUserCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUserCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getUnitCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUserCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getCountryCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUserCustomFields(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('createBankProfileCustomFieldGroup', () => {
  it('should call apiClientService post method with proper data', async () => {
    await customFieldsApi.createBankProfileCustomFieldGroup(createCustomFieldGroupRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('createUserCustomFieldGroup', () => {
  it('should call apiClientService post method with proper data', async () => {
    await customFieldsApi.createUserCustomFieldGroup(createCustomFieldGroupRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('createUnitCustomFieldGroup', () => {
  it('should call apiClientService post method with proper data', async () => {
    await customFieldsApi.createUnitCustomFieldGroup(createCustomFieldGroupRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('createCountryCustomFieldGroup', () => {
  it('should call apiClientService post method with proper data', async () => {
    await customFieldsApi.createCountryCustomFieldGroup(createCustomFieldGroupRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('getBankProfileCustomFieldGroup', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getBankProfileCustomFieldGroup('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getUserCustomFieldGroup', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getUserCustomFieldGroup('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getUnitCustomFieldGroup', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getUnitCustomFieldGroup('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('getCountryCustomFieldGroup', () => {
  it('should use apiClientService get method with proper data', async () => {
    await customFieldsApi.getCountryCustomFieldGroup('23')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('23'))
  })
})

describe('editBankProfileCustomFieldGroup', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editBankProfileCustomFieldGroup({
      ...createCustomFieldGroupRequestDataMock,
      id: '23',
    })

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining('23'),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('editUserCustomFieldGroup', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editUserCustomFieldGroup({
      ...createCustomFieldGroupRequestDataMock,
      id: '23',
    })

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining('23'),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('editUnitCustomFieldGroup', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editUnitCustomFieldGroup({
      ...createCustomFieldGroupRequestDataMock,
      id: '23',
    })

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining('23'),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('editCountryCustomFieldGroup', () => {
  it('should use apiClientService put method with proper data', async () => {
    await customFieldsApi.editCountryCustomFieldGroup({
      ...createCustomFieldGroupRequestDataMock,
      id: '23',
    })

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining('23'),
      expect.objectContaining({ body: createCustomFieldGroupRequestDataMock })
    )
  })
})

describe('getCountryAllCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getCountryAllCustomFieldGroups()

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('countries'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('custom-groups'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('all'))
  })
})

describe('getUnitAllCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUnitAllCustomFieldGroups()

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('units'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('custom-groups'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('all'))
  })
})

describe('getBankProfileAllCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getBankProfileAllCustomFieldGroups()

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('bank-profile'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('custom-groups'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('all'))
  })
})

describe('getUserAllCustomFieldGroups', () => {
  it('should call apiClientService get method', async () => {
    await customFieldsApi.getUserAllCustomFieldGroups()

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('users'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('custom-groups'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('all'))
  })
})
