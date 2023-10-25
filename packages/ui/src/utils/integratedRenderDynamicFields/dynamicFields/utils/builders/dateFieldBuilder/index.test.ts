import { DatePickerField } from '../../../../../../components'
import { dateFieldBuilder } from './index'
import {
  DynamicDateFieldProps,
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
} from '../../../../types'

describe('dateFieldBuilder', () => {
  const dynamicDateFieldMock: DynamicField<DynamicDateFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    hiddenOnCreate: false,
    defaultValue: {},
    independent: true,
    required: true,
    code: 'name',
    type: DynamicFieldTypes.DateTime,
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

  it('should return DatePickerField component', () => {
    expect(dateFieldBuilder(dynamicDateFieldMock).Component).toBe(DatePickerField)
  })
})
