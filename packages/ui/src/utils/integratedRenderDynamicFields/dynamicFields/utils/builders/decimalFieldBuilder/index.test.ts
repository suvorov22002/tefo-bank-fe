import { InputNumberField } from '../../../../../../components'
import { decimalFieldBuilder } from './index'
import {
  DynamicDecimalFieldProps,
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
} from '../../../../types'

describe('decimalFieldBuilder', () => {
  const dynamicDecimalFieldMock: DynamicField<DynamicDecimalFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    independent: true,
    hiddenOnCreate: false,
    defaultValue: {},
    required: true,
    code: 'name',
    type: DynamicFieldTypes.Decimal,
    status: DynamicFieldStatuses.Active,
    label: 'label',
    properties: {
      decimals: 10,
    },
    order: 0,
    validation: {
      rules: [],
    },
    groupCode: null,
    placeholder: null,
    helpText: null,
    tooltip: null,
  }

  it('should return InputNumberField component', () => {
    expect(decimalFieldBuilder(dynamicDecimalFieldMock).Component).toBe(InputNumberField)
  })

  it('should return specific properties for decimal field', () => {
    expect(decimalFieldBuilder(dynamicDecimalFieldMock).precision).toBe(10)
  })
})
