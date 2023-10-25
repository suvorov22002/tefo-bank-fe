import { InputNumberPercentField } from '../../../../../../components'
import { integerPercentFieldBuilder } from './index'
import {
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicIntegerPercentFieldProps,
} from '../../../../types'

describe('integerPercentFieldBuilder', () => {
  const dynamicIntegerPercentFieldMock: DynamicField<DynamicIntegerPercentFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    independent: true,
    defaultValue: {},
    required: true,
    hiddenOnCreate: false,
    code: 'name',
    type: DynamicFieldTypes.IntegerPercent,
    status: DynamicFieldStatuses.Active,
    label: 'label',
    properties: {},
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
    expect(integerPercentFieldBuilder(dynamicIntegerPercentFieldMock).Component).toBe(
      InputNumberPercentField
    )
  })

  it('should have precision value equal to 0', () => {
    expect(integerPercentFieldBuilder(dynamicIntegerPercentFieldMock).precision).toBe(0)
  })
})
