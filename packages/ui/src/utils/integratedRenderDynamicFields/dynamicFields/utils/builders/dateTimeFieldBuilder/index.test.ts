import { DatePickerField } from '../../../../../../components'
import { dateTimeFieldBuilder } from './index'

import {
  DynamicDateTimeFieldProps,
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
} from '../../../../types'

describe('dateTimeFieldBuilder', () => {
  const dynamicDateTimeFieldMock: DynamicField<DynamicDateTimeFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    status: DynamicFieldStatuses.Active,
    entityLevel: null,
    independent: true,
    hiddenOnCreate: false,
    defaultValue: {},
    required: true,
    code: 'name',
    type: DynamicFieldTypes.DateTime,
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
    expect(dateTimeFieldBuilder(dynamicDateTimeFieldMock).Component).toBe(DatePickerField)
  })
})
