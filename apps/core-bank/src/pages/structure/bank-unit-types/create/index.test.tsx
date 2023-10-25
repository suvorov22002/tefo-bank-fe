import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateBankUnitType from './index.page'
import { useBankUnitType } from '../../../../domains/bankUnitTypes/useBankUnitType'
import { useBankUnitTypeTemplate } from '../../../../domains/bankUnitTypes/useBankUnitTypeTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/bankUnitTypes/useBankUnitTypeTemplate')
jest.mock('../../../../domains/bankUnitTypes/useBankUnitType')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTypeTemplateMock = useBankUnitTypeTemplate as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTypeMock = useBankUnitType as jest.MockedFunction<any>

const bankUnitTypeTemplateMock: INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate = {
  id: '23',
  name: '12',
  customFields: [],
  groups: [],
  primaryFields: [
    {
      id: '23',
      code: 'name',
      fieldName: null,
      fieldDescription: null,
      label: 'Name',
      entityName: null,
      hiddenOnCreate: false,
      placeholder: null,
      helpText: null,
      tooltip: null,
      required: true,
      visible: true,
      order: 0,
      groupCode: null,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      validation: {
        rules: [],
      },
      properties: {},
      entityLevel: null,
      independent: true,
      defaultValue: {},
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
    },
  ],
}

describe('CreateBankUnitType page', () => {
  afterEach(() => {
    useBankUnitTypeTemplateMock.mockReset()
    useBankUnitTypeMock.mockReset()
  })

  it('should show loading indicator while template data is fetching', () => {
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    useBankUnitTypeMock.mockReturnValue({
      createBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateBankUnitType />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('structure-bank-unit-types-create:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should show the page content', () => {
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    useBankUnitTypeMock.mockReturnValue({
      createBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateBankUnitType />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('structure-bank-unit-types-create:title')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'name' })).toBeInTheDocument()
    expect(screen.queryByText('Name')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'structure-bank-unit-types-create:buttons.createUnitType',
      })
    ).toBeEnabled()
  })

  it('should handle success submit of the form', async () => {
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    useBankUnitTypeMock.mockReturnValue({
      createBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateBankUnitType />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'name' })
    const createUnitTypeButton = screen.getByRole('button', {
      name: 'structure-bank-unit-types-create:buttons.createUnitType',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Unit Type',
        },
      })

      fireEvent.click(createUnitTypeButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    useBankUnitTypeMock.mockReturnValue({
      createBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })

    render(<CreateBankUnitType />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'name' })
    const createUnitTypeButton = screen.getByRole('button', {
      name: 'structure-bank-unit-types-create:buttons.createUnitType',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Unit Type',
        },
      })

      fireEvent.click(createUnitTypeButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(input).not.toBeDisabled()
      expect(input).toHaveValue('Test Unit Type')
      expect(createUnitTypeButton).toBeInTheDocument()
      expect(createUnitTypeButton).not.toBeDisabled()
    })
  })

  it('should have unsaved changes handling', async () => {
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    useBankUnitTypeMock.mockReturnValue({
      createBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateBankUnitType />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
