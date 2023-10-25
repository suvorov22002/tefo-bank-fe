import { InputField } from '../../../../../../components'
import { textFieldBuilder } from './index'
import {
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicTextFieldProps,
} from '../../../../types'

describe('textFieldBuilder', () => {
  const dynamicFieldMock: DynamicField<DynamicTextFieldProps> = {
    id: 'id',
    fieldName: `field_1`,
    code: `field_name_2`,
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    type: DynamicFieldTypes.Text,
    defaultValue: {},
    required: true,
    status: DynamicFieldStatuses.Active,
    hiddenOnCreate: false,
    independent: true,
    order: 0,
    label: `field_label`,
    validation: {
      rules: [],
    },
    properties: {},
    groupCode: null,
    placeholder: null,
    helpText: null,
    tooltip: null,
  }

  it('should return InputField component', () => {
    expect(textFieldBuilder(dynamicFieldMock).Component).toBe(InputField)
  })
})
