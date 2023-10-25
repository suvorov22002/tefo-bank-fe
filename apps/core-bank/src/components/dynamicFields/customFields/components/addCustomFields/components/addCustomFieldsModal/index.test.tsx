import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { AddCustomFieldsModal } from './index'
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
  {
    id: 'f2',
    fieldName: 'f2_',
    entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
    hiddenOnCreate: false,
    entityLevel: null,
    defaultValue: {},
    independent: true,
    code: 'codeGroup2',
    status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
    label: 'Code Group2',
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

const onAddMock = jest.fn()
const onCloseMock = jest.fn()

describe('AddCustomFieldsModal', () => {
  afterEach(() => {
    onAddMock.mockReset()
  })

  it('should render content', () => {
    render(
      <AddCustomFieldsModal
        isOpen={true}
        onAdd={onAddMock}
        close={onCloseMock}
        customFieldsToAdd={fieldsMock}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )
    expect(
      screen.queryByText('common:dynamicFields.addCustomFields.modal.title')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('common:dynamicFields.addCustomFields.fields.fieldToAdd.label')
    ).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'common:buttons.ok' })).toBeInTheDocument()
  })

  it('should not submit the modal when value is not selected', () => {
    render(
      <AddCustomFieldsModal
        isOpen={true}
        onAdd={onAddMock}
        close={onCloseMock}
        customFieldsToAdd={fieldsMock}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    const submitButton = screen.getByRole('button', { name: 'common:buttons.ok' })

    expect(submitButton).toBeInTheDocument()

    fireEvent.click(submitButton)

    expect(onAddMock).not.toBeCalled()
  })

  it('should close the modal', () => {
    render(
      <AddCustomFieldsModal
        isOpen={true}
        onAdd={onAddMock}
        close={onCloseMock}
        customFieldsToAdd={fieldsMock}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    const cancelButton = screen.getByRole('button', { name: 'common:buttons.cancel' })

    expect(cancelButton).toBeInTheDocument()

    expect(cancelButton).not.toBeDisabled()

    fireEvent.click(cancelButton)

    expect(onCloseMock).toBeCalledTimes(1)
  })

  it('should call onAddMock on submit', async () => {
    render(
      <AddCustomFieldsModal
        isOpen={true}
        onAdd={onAddMock}
        close={onCloseMock}
        customFieldsToAdd={fieldsMock}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    const submitButton = screen.getByRole('button', { name: 'common:buttons.ok' })

    expect(submitButton).toBeInTheDocument()

    const select = screen.getByRole('combobox')

    act(() => {
      fireEvent.mouseDown(select)
    })
    await waitFor(() => {
      fireEvent.click(screen.getByText(fieldsMock[0].fieldName as string))
    })

    expect(submitButton).not.toBeDisabled()

    fireEvent.click(submitButton)

    expect(onAddMock).toBeCalledTimes(1)
  })
})
