import { PhoneNumberInputField } from '../../../../../../components'
import { phoneNumberFieldBuilder } from './index'
import {
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicPhoneNumberFieldProps,
} from '../../../../types'

describe('phoneNumberFieldBuilder', () => {
  const dynamicPhoneNumberFieldMock: DynamicField<DynamicPhoneNumberFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    independent: true,
    required: false,
    defaultValue: {},
    status: DynamicFieldStatuses.Active,
    code: 'name',
    type: DynamicFieldTypes.PhoneNumber,
    hiddenOnCreate: false,
    label: 'label',
    order: 0,
    properties: {
      phoneCodeName: 'phoneCode',
      phoneValueName: 'phoneNumber',
    },
    validation: {
      rules: [],
    },
    groupCode: null,
    placeholder: null,
    helpText: null,
    tooltip: null,
  }

  it('should return PhoneNumberInputField component', () => {
    expect(phoneNumberFieldBuilder(dynamicPhoneNumberFieldMock).Component).toBe(
      PhoneNumberInputField
    )
  })

  it("should return PhoneNumberInputField's properties", () => {
    expect(phoneNumberFieldBuilder(dynamicPhoneNumberFieldMock)).toMatchObject({
      required: false,
      codeInputProps: {
        name: 'phoneCode',
      },
      numberInputProps: {
        name: 'phoneNumber',
      },
    })
  })
})
