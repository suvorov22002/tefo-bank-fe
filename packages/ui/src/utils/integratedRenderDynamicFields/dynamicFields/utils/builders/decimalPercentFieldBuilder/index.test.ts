import { InputNumberPercentField } from '../../../../../../components'
import { decimalPercentFieldBuilder } from './index'
import {
  DynamicDecimalPercentFieldProps,
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
} from '../../../../types'

describe('decimalPercentFieldBuilder', () => {
  const dynamicDecimalPercentFieldMock: DynamicField<DynamicDecimalPercentFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    independent: true,
    required: true,
    hiddenOnCreate: false,
    defaultValue: {},
    code: 'name',
    type: DynamicFieldTypes.DecimalPercent,
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

  it('should return InputNumberPercentField component', () => {
    expect(decimalPercentFieldBuilder(dynamicDecimalPercentFieldMock).Component).toBe(
      InputNumberPercentField
    )
  })

  it('should return specific properties for decimal field', () => {
    expect(decimalPercentFieldBuilder(dynamicDecimalPercentFieldMock).precision).toBe(10)
  })
})
