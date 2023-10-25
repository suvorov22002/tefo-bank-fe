import { getDynamicFieldsInitialValuesInEditMode } from '.'
import {
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicFieldValidationRuleStatuses,
  DynamicFieldsTemplate,
  ValidationRuleTypes,
} from '../../types'

const dynamicFieldsTemplateMock: DynamicFieldsTemplate = {
  id: '1',
  name: 'default',
  groups: [],
  primaryFields: [
    {
      id: 'f2',
      entityName: DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,
      code: 'p1',
      label: 'test',
      required: false,
      hiddenOnCreate: false,
      defaultValue: {},
      order: 1,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      status: DynamicFieldStatuses.Active,
      type: DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
    },
    {
      id: 'f3',
      entityName: DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,
      code: 'p2',
      label: 'test',
      required: false,
      hiddenOnCreate: false,
      defaultValue: {},
      order: 1,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      status: DynamicFieldStatuses.Active,
      type: DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
    },
  ],
  customFields: [
    {
      id: 'f2',
      entityName: DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,
      code: 'c1',
      label: 'test',
      required: false,
      hiddenOnCreate: false,
      defaultValue: {},
      order: 1,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      status: DynamicFieldStatuses.Active,
      type: DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
    },
    {
      id: 'f2',
      entityName: DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,
      code: 'c2',
      label: 'test',
      required: false,
      hiddenOnCreate: false,
      defaultValue: {},
      order: 1,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      status: DynamicFieldStatuses.Active,
      type: DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
    },
    {
      id: 'f2',
      entityName: DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,
      code: 'c3',
      label: 'test',
      required: false,
      hiddenOnCreate: false,
      defaultValue: {},
      order: 1,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      helpText: '',
      tooltip: '',
      status: DynamicFieldStatuses.Active,
      type: DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
    },
  ],
}

describe('getDynamicFieldsInitialValuesInCreateMode', () => {
  it('should return initial values for primary fields', () => {
    expect(getDynamicFieldsInitialValuesInEditMode(dynamicFieldsTemplateMock, {})).toEqual({
      p1: '',
      p2: '',
    })
  })

  it('should return initial values for required custom fields', () => {
    expect(
      getDynamicFieldsInitialValuesInEditMode(
        {
          ...dynamicFieldsTemplateMock,
          customFields: dynamicFieldsTemplateMock.customFields.map((customField, i) => ({
            ...customField,
            validation: {
              rules: [
                {
                  type: ValidationRuleTypes.Required,
                  id: i.toString(),
                  priority: 0,
                  value: null,
                  message: 'default',
                  status: DynamicFieldValidationRuleStatuses.Active,
                },
              ],
            },
          })),
        },
        {}
      )
    ).toEqual({
      p1: '',
      p2: '',
      c1: '',
      c2: '',
      c3: '',
    })
  })

  it('should handle existing values', () => {
    expect(
      getDynamicFieldsInitialValuesInEditMode(dynamicFieldsTemplateMock, {
        p1: 'value1',
        p2: 'value2',
        c1: 'cfValue1',
      })
    ).toEqual({
      p1: 'value1',
      p2: 'value2',
      c1: 'cfValue1',
    })
  })
})
