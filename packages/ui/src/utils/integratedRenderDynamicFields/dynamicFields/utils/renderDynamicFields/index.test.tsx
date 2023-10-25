import { getRenderDynamicFields } from '.'

import { render, screen } from '@testing-library/react'

import {
  DynamicField,
  DynamicFieldApiClient,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicFieldValidationRuleStatuses,
  ValidationRuleTypes,
} from '../../../types'

jest.mock('formik', () => {
  return {
    useField: (fieldProps: { name: string }) => {
      return [
        {
          onChange: jest.mock,
          name: fieldProps.name,
        },
        {},
        {},
      ]
    },
  }
})

const dynamicFieldsMock: DynamicField[] = [
  {
    id: 'f1',
    fieldName: 'f1_',
    hiddenOnCreate: false,
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    independent: true,
    code: 'codeGroup',
    label: 'Code Group',
    status: DynamicFieldStatuses.Active,
    required: false,
    order: 1,
    type: DynamicFieldTypes.Text,
    properties: {
      phoneCodeName: 'phoneCode',
      phoneNumberName: 'phoneNumber',
    },
    validation: {
      rules: [
        {
          id: '0',
          status: DynamicFieldValidationRuleStatuses.Active,
          type: ValidationRuleTypes.Required,
          priority: 0,
          value: /asd/,
          message: 'Field asd',
        },
        {
          id: '1',
          status: DynamicFieldValidationRuleStatuses.Active,
          type: ValidationRuleTypes.MinLength,
          priority: 1,
          value: 3,
          message: 'Field asd 3',
        },
        {
          id: '2',
          status: DynamicFieldValidationRuleStatuses.Active,
          type: ValidationRuleTypes.MaxLength,
          priority: 2,
          value: 5,
          message: 'Field asd 5',
        },
      ],
    },
    groupCode: null,
    placeholder: null,
    helpText: null,
    tooltip: null,
    defaultValue: {},
  },
  {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    entityLevel: null,
    hiddenOnCreate: false,
    independent: true,
    status: DynamicFieldStatuses.Active,
    code: 'shortName',
    label: 'Code Group',
    required: false,
    order: 0,
    type: DynamicFieldTypes.Text,
    defaultValue: {},
    properties: {
      showCount: true,
    },
    validation: {
      rules: [
        {
          id: '1',
          status: DynamicFieldValidationRuleStatuses.Active,
          type: ValidationRuleTypes.Regex,
          priority: 0,
          value: /asd/,
          message: 'Field asd',
        },
        {
          id: '2',
          status: DynamicFieldValidationRuleStatuses.Active,
          type: ValidationRuleTypes.MaxLength,
          priority: 1,
          value: 3,
          message: 'Field asd 3',
        },
        {
          id: '3',
          status: DynamicFieldValidationRuleStatuses.Active,
          type: ValidationRuleTypes.MinLength,
          priority: 2,
          value: 5,
          message: 'Field asd 5',
        },
      ],
    },
    groupCode: null,
    placeholder: null,
    helpText: null,
    tooltip: null,
  },
]

const apiClientMock: DynamicFieldApiClient = {
  get: jest.fn(() => Promise.resolve({ body: [], response: {} })),
} as unknown as DynamicFieldApiClient

describe('getRenderDynamicFields', () => {
  it('should render fields', () => {
    render(<>{getRenderDynamicFields(apiClientMock)(dynamicFieldsMock)}</>)

    const inputs = document.querySelectorAll('input')

    inputs.forEach(input => expect(input).toBeInTheDocument())
    expect(inputs).toHaveLength(2)
  })

  it('should call customRenderDynamicField', () => {
    const renderDynamicFieldMock = jest.fn((field, i) => (
      <div key={i} data-testid={`field_${field.key}`} />
    ))

    render(<>{getRenderDynamicFields(apiClientMock)(dynamicFieldsMock, renderDynamicFieldMock)}</>)

    expect(screen.getAllByTestId(/^field_/)).toHaveLength(dynamicFieldsMock.length)
    expect(renderDynamicFieldMock).toBeCalledTimes(dynamicFieldsMock.length)
  })
})
