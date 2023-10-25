import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import BankUnitType from './index.page'
import { getBankUnitTypeResponseMock } from '@/domains/bankUnitTypes/api/mock'
import { useBankUnitType } from '../../../../domains/bankUnitTypes/useBankUnitType'
import { useBankUnitTypeTemplate } from '../../../../domains/bankUnitTypes/useBankUnitTypeTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/bankUnitTypes/useBankUnitType')
jest.mock('../../../../domains/bankUnitTypes/useBankUnitTypeTemplate')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTypeMock = useBankUnitType as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTypeTemplateMock = useBankUnitTypeTemplate as jest.MockedFunction<any>

const bankUnitTypeTemplateMock: INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate = {
  id: '23',
  name: '23',
  customFields: [],
  groups: [],
  primaryFields: [
    {
      id: '12',
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

describe('BankUnitType page', () => {
  afterEach(() => {
    useBankUnitTypeMock.mockReset()
    useBankUnitTypeTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useBankUnitTypeMock.mockReturnValue({
      getBankUnitType: {
        isLoading: true,
        data: undefined,
      },
      editBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<BankUnitType />, { wrapper: getAppWrapper() })
    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('structure-bank-unit-types-[id]:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should show the page content if bankUnitType with given id exists', () => {
    useBankUnitTypeMock.mockReturnValue({
      getBankUnitType: {
        isLoading: false,
        data: getBankUnitTypeResponseMock,
      },
      editBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    render(<BankUnitType />, { wrapper: getAppWrapper() })

    expect(screen.getByText('structure-bank-unit-types-[id]:title')).toBeInTheDocument()
    expect(screen.getByText('common:buttons.edit')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
  })

  it('should display the form in a view mode if there is a template data', async () => {
    useBankUnitTypeMock.mockReturnValue({
      getBankUnitType: {
        isLoading: false,
        data: getBankUnitTypeResponseMock,
      },
      editBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    render(<BankUnitType />, { wrapper: getAppWrapper() })

    await waitFor(() => {
      const input = screen.queryByRole('textbox', { name: 'name' })

      expect(screen.getByRole('form')).toBeInTheDocument()
      expect(screen.queryByText('Name')).toBeInTheDocument()
      expect(input).toBeDisabled()
      expect(input).toHaveValue('ZY5-C')
    })
  })

  it('should display the form in a edit mode after edit button is clicked', async () => {
    useBankUnitTypeMock.mockReturnValue({
      getBankUnitType: {
        isLoading: false,
        data: getBankUnitTypeResponseMock,
      },
      editBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    render(<BankUnitType />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const cancelButton = screen.queryByRole('button', { name: 'common:buttons.cancel' })
    const saveButton = screen.queryByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.queryByRole('textbox', { name: 'name' })

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
    expect(input).not.toBeDisabled()
    expect(input).toHaveValue('ZY5-C')
  })

  it('should handle the form submit', async () => {
    useBankUnitTypeMock.mockReturnValue({
      getBankUnitType: {
        isLoading: false,
        data: getBankUnitTypeResponseMock,
      },
      editBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    render(<BankUnitType />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.getByRole('textbox', { name: 'name' })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Updated fieldValue',
        },
      })

      expect(input).not.toBeDisabled()

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(
        screen.getByRole('textbox', {
          name: 'name',
        })
      ).toBeDisabled()
      expect(input).toHaveValue('Updated fieldValue')
      expect(saveButton).not.toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankUnitTypeMock.mockReturnValue({
      getBankUnitType: {
        isLoading: false,
        data: getBankUnitTypeResponseMock,
      },
      editBankUnitType: {
        isLoading: false,
        mutateAsync: jest.fn(() =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: false,
        data: bankUnitTypeTemplateMock,
      },
    })

    render(<BankUnitType />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.getByRole('textbox', { name: 'name' })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Updated fieldValue',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(input).not.toBeDisabled()
      expect(input).toHaveValue('Updated fieldValue')
      expect(saveButton).toBeInTheDocument()
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should call unsaved changes related hook', () => {
    useBankUnitTypeMock.mockReturnValue({
      getBankUnitType: {
        isLoading: true,
      },
    })
    useBankUnitTypeTemplateMock.mockReturnValue({
      getBankUnitTypeTemplate: {
        isLoading: true,
      },
    })

    render(<BankUnitType />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
