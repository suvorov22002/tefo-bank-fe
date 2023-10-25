import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import BankProfile from './index.page'
import { useBankProfile } from '../../domains/bankProfile/useBankProfile'
import { useBankProfileTemplate } from '../../domains/bankProfile/useBankProfileTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../domains/bankProfile/useBankProfile/')
jest.mock('../../domains/bankProfile/useBankProfileTemplate')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// TODO: Improve typing
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankProfileMock = useBankProfile as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankProfileTemplateMock = useBankProfileTemplate as jest.MockedFunction<any>

const bankProfileTemplateMock: INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate = {
  id: 'ut1',
  name: 'User Template v1',
  primaryFields: [
    {
      id: 'f1',
      fieldName: 'f1_',
      hiddenOnCreate: false,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      entityLevel: null,
      independent: true,
      code: 'fieldName',
      label: 'Field label',
      required: false,
      order: 0,
      defaultValue: {},
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
      groupCode: null,
      placeholder: null,
      helpText: null,
      tooltip: null,
    },
  ],
  customFields: [],
  groups: [],
}

const bankProfileMock = { fieldName: 'fieldName' }

describe('Bank-profile page', () => {
  afterEach(() => {
    useBankProfileMock.mockReset()
    useBankProfileTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useBankProfileMock.mockReturnValue({
      getBankProfile: {
        isLoading: true,
        data: undefined,
      },
    })
    useBankProfileTemplateMock.mockReturnValue({
      getBankProfileTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<BankProfile />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()

    expect(screen.queryByText('bank-profile:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should render page content after data is loaded', () => {
    useBankProfileMock.mockReturnValue({
      getBankProfile: {
        isLoading: false,
        data: bankProfileMock,
      },
    })
    useBankProfileTemplateMock.mockReturnValue({
      getBankProfileTemplate: {
        isLoading: false,
        data: bankProfileTemplateMock,
      },
    })

    render(<BankProfile />, { wrapper: getAppWrapper() })
    const editButton = screen.getByText('common:buttons.edit')

    expect(screen.getByText('bank-profile:title')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(editButton).toBeInTheDocument()
    expect(editButton).toBeEnabled()
  })

  it('should display the form in a view mode if there is a template data', async () => {
    useBankProfileMock.mockReturnValue({
      getBankProfile: {
        isLoading: false,
        data: bankProfileMock,
      },
    })
    useBankProfileTemplateMock.mockReturnValue({
      getBankProfileTemplate: {
        isLoading: false,
        data: bankProfileTemplateMock,
      },
    })

    render(<BankProfile />, { wrapper: getAppWrapper() })

    await waitFor(() => {
      const input = screen.queryByRole('textbox')

      expect(screen.getByRole('form')).toBeInTheDocument()
      expect(screen.queryByText('Field label')).toBeInTheDocument()
      expect(input).toHaveValue('fieldName')
      expect(input).toBeDisabled()
    })
  })

  it('should display the form in a edit mode after edit button is clicked', async () => {
    useBankProfileMock.mockReturnValue({
      getBankProfile: {
        isLoading: false,
        data: bankProfileMock,
      },
    })
    useBankProfileTemplateMock.mockReturnValue({
      getBankProfileTemplate: {
        isLoading: false,
        data: bankProfileTemplateMock,
      },
    })

    render(<BankProfile />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const cancelButton = screen.queryByRole('button', { name: 'common:buttons.cancel' })
    const saveButton = screen.queryByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.queryByRole('textbox', { name: 'fieldName' })

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
    expect(input).not.toBeDisabled()
    expect(input).toHaveValue('fieldName')
  })

  it('should handle the form submit', async () => {
    useBankProfileMock.mockReturnValue({
      getBankProfile: {
        isLoading: false,
        data: bankProfileMock,
      },
      editBankProfileAction: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useBankProfileTemplateMock.mockReturnValue({
      getBankProfileTemplate: {
        isLoading: false,
        data: bankProfileTemplateMock,
      },
    })

    render(<BankProfile />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.getByRole('textbox', { name: 'fieldName' })

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
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: 'fieldName' })).toBeDisabled()
      expect(screen.getByRole('textbox', { name: 'fieldName' })).toHaveValue('Updated fieldValue')
      expect(saveButton).not.toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankProfileMock.mockReturnValue({
      getBankProfile: {
        isLoading: false,
        data: bankProfileMock,
      },
      editBankProfileAction: {
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
    useBankProfileTemplateMock.mockReturnValue({
      getBankProfileTemplate: {
        isLoading: false,
        data: bankProfileTemplateMock,
      },
    })

    render(<BankProfile />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.getByRole('textbox', { name: 'fieldName' })

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
    useBankProfileMock.mockReturnValue({
      getBankProfile: {
        isLoading: true,
      },
    })
    useBankProfileTemplateMock.mockReturnValue({
      getBankProfileTemplate: {
        isLoading: true,
      },
    })

    render(<BankProfile />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
