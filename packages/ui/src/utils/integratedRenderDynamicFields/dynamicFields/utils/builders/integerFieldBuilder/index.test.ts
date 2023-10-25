import { InputNumberField } from '../../../../../../components'
import { integerFieldBuilder } from './index'
import {
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicIntegerFieldProps,
} from '../../../../types'

describe('integerFieldBuilder', () => {
  const dynamicIntegerFieldMock: DynamicField<DynamicIntegerFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    defaultValue: {},
    independent: true,
    required: true,
    code: 'name',
    type: DynamicFieldTypes.Integer,
    hiddenOnCreate: false,
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
    expect(integerFieldBuilder(dynamicIntegerFieldMock).Component).toBe(InputNumberField)
  })

  it('should have precision value equal to 0', () => {
    expect(integerFieldBuilder(dynamicIntegerFieldMock).precision).toBe(0)
  })
})
