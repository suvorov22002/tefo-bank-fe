import { fireEvent, render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { AddCustomFields } from './index'
import { INTEGRATED_RenderDynamicFields } from 'ui'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))

const fieldsMock: INTEGRATED_RenderDynamicFields.DynamicField[] = [
  {
    id: 'f1',
    fieldName: 'f1_',
    entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
    hiddenOnCreate: false,
    entityLevel: null,
    defaultValue: {},
    independent: true,
    code: 'codeGroup',
    status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
    label: 'Code Group',
    required: false,
    order: 0,
    type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
    properties: {},
    validation: {
      rules: [],
    },
    groupCode: null,
    placeholder: null,
    tooltip: null,
    helpText: null,
  },
]

const onAddCustomFieldMock = jest.fn()

describe('AddCustomFields', () => {
  afterEach(() => {
    onAddCustomFieldMock.mockReset()
  })

  it('should render content', () => {
    render(
      <AddCustomFields customFieldsToAdd={fieldsMock} onAddCustomField={onAddCustomFieldMock} />,
      {
        wrapper: getAppWrapper(),
      }
    )
    expect(
      screen.queryByText('common:dynamicFields.addCustomFields.buttons.addCustomFieldButton')
    ).toBeInTheDocument()
  })

  it('should render modal on click addCustomFieldButton', () => {
    render(
      <AddCustomFields customFieldsToAdd={fieldsMock} onAddCustomField={onAddCustomFieldMock} />,
      {
        wrapper: getAppWrapper(),
      }
    )

    const openModalButton = screen.getByText(
      'common:dynamicFields.addCustomFields.buttons.addCustomFieldButton'
    )

    expect(openModalButton).toBeInTheDocument()

    fireEvent.click(openModalButton)

    expect(
      screen.queryByText('common:dynamicFields.addCustomFields.modal.title')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('common:dynamicFields.addCustomFields.fields.fieldToAdd.label')
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'common:buttons.ok' })).toBeInTheDocument()
  })
})
