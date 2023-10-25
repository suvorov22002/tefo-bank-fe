import { CheckboxField } from '../../../../../../components'
import { booleanFieldBuilder } from './index'
import {
  DynamicBooleanFieldProps,
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
} from '../../../../types'

describe('booleanFieldBuilder', () => {
  const dynamicBooleanFieldMock: DynamicField<DynamicBooleanFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    hiddenOnCreate: false,
    entityLevel: null,
    independent: true,
    required: true,
    status: DynamicFieldStatuses.Active,
    code: 'name',
    type: DynamicFieldTypes.Boolean,
    defaultValue: {},
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

  it('should return CheckboxField component', () => {
    expect(booleanFieldBuilder(dynamicBooleanFieldMock).Component).toBe(CheckboxField)
  })

  it("should return CheckboxField's properties", () => {
    expect(booleanFieldBuilder(dynamicBooleanFieldMock)).toMatchObject({
      name: 'name',
      required: true,
    })
  })
})
