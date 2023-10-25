import { SelectField } from '../../../../../../components'
import { listFieldBuilder } from './index'
import {
  DynamicField,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicListFieldProps,
} from '../../../../types'

describe('listFieldBuilder', () => {
  const dynamicListFieldMock: DynamicField<DynamicListFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    independent: true,
    defaultValue: {},
    code: 'name',
    type: DynamicFieldTypes.List,
    hiddenOnCreate: false,
    status: DynamicFieldStatuses.Active,
    required: false,
    label: 'label',
    order: 0,
    properties: {
      options: [{ label: 'optionLabel', value: 'optionValue' }],
    },
    validation: {
      rules: [],
    },
    groupCode: null,
    placeholder: null,
    helpText: null,
    tooltip: null,
  }

  it('should return SelectField component', () => {
    expect(listFieldBuilder(dynamicListFieldMock).Component).toBe(SelectField)
  })

  it("should return SelectField's properties", () => {
    expect(listFieldBuilder(dynamicListFieldMock)).toMatchObject({
      name: 'name',
      required: false,
      options: [{ label: 'optionLabel', value: 'optionValue' }],
    })
  })
})
