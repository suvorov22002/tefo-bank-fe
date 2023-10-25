import { INTEGRATED_RenderDynamicFields } from 'ui'

import { CreateCustomFieldGroupRequestData } from '../types'

export const customFieldsMock: INTEGRATED_RenderDynamicFields.DynamicField[] = new Array(15)
  .fill(null)
  .map((_, i) => ({
    id: i.toString(),
    code: `field_${i}`,
    fieldName: `field_name_${i}`,
    entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
    entityLevel: null,
    defaultValue: {},
    type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
    hiddenOnCreate: false,
    required: i % 2 === 0,
    groupCode: `group_${i}`,
    independent: i % 2 === 0,
    order: i,
    label: `field_label_${i}`,
    status:
      i % 2 === 0
        ? INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active
        : INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Inactive,
    validation: {
      rules: [],
    },
    approvedAt: '2023-04-03 15:14:09',
    createdAt: '2023-04-03 15:14:09',
    updatedAt: '2023-04-03 15:14:09',
    fieldProps: {},
    helpText: null,
    placeholder: null,
    properties: {},
    tooltip: null,
  }))

export const customFieldValidationRulesMock: INTEGRATED_RenderDynamicFields.ValidationRule[] =
  new Array(15).fill(null).map((_, i) => ({
    id: (i + 1).toString(),
    type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Required,
    priority: i,
    value: i,
    message: `message ${i}`,
    status:
      i % 2 === 0
        ? INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active
        : INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Inactive,
  }))

export const createCustomFieldGroupRequestDataMock: CreateCustomFieldGroupRequestData = {
  name: 'name',
  label: 'label',
  code: 'code',
  appearance: INTEGRATED_RenderDynamicFields.DynamicFieldGroupAppearances.Collapsed,
  index: 0,
  status: INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Active,
}
