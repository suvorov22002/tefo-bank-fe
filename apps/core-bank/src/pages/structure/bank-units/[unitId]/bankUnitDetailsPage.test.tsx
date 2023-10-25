import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { GetBankUnitTemplateResponseData } from '@/domains/bankUnits'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import BankUnitDetails from './index.page'
import { useBankUnit } from '../../../../domains/bankUnits/useBankUnit'
import { useBankUnitEntityLevelTemplate } from '../../../../domains/bankUnits/useBankUnitEntityLevelTemplate'
import { useBankUnitTemplate } from '../../../../domains/bankUnits/useBankUnitTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/bankUnits/useBankUnit')
jest.mock('../../../../domains/bankUnits/useBankUnitEntityLevelTemplate')
jest.mock('../../../../domains/bankUnits/useBankUnitTemplate')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitMock = useBankUnit as jest.MockedFunction<any>
const useBankUnitEntityLevelTemplateMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useBankUnitEntityLevelTemplate as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTemplateMock = useBankUnitTemplate as jest.MockedFunction<any>

const bankUnitMock = {
  id: '1',
  templateId: 'ut1',
  unitName: 'unitName value',
}

const bankUnitTemplateMock: GetBankUnitTemplateResponseData = {
  id: 'ut1',
  name: 'User Template v1',
  primaryFields: [
    {
      code: 'unitName',
      label: 'Unit Name',
      helpText: null,
      required: true,
      order: 0,
      hiddenOnCreate: false,
      defaultValue: {},
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      properties: {},
      validation: {
        rules: [],
      },
      id: 'f1',
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      entityLevel: null,
      independent: true,
      placeholder: '',
      fieldName: '',
      groupCode: null,
      tooltip: '',
    },
  ],
  customFields: [],
  groups: [],
}

describe('BankUnitDetails page', () => {
  afterEach(() => {
    useBankUnitMock.mockReset()
    useBankUnitEntityLevelTemplateMock.mockReset()
    useBankUnitTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useBankUnitMock.mockReturnValue({
      getBankUnit: {
        isLoading: true,
        data: undefined,
      },
      editBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useBankUnitEntityLevelTemplateMock.mockReturnValue({
      getBankUnitEntityLevelTemplate: {
        isLoading: true,
        data: undefined,
      },
    })
    useBankUnitTemplateMock.mockReturnValue({
      getBankUnitTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<BankUnitDetails />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })

  it('should show the page in view mode', () => {
    useBankUnitMock.mockReturnValue({
      getBankUnit: {
        isLoading: false,
        data: bankUnitMock,
      },
      editBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useBankUnitEntityLevelTemplateMock.mockReturnValue({
      getBankUnitEntityLevelTemplate: {
        isLoading: false,
        data: bankUnitTemplateMock,
      },
    })
    useBankUnitTemplateMock.mockReturnValue({
      getBankUnitTemplate: {
        isLoading: false,
        data: undefined,
      },
    })

    render(<BankUnitDetails />, { wrapper: getAppWrapper() })

    const input = screen.queryByRole('textbox', { name: 'unitName' })
    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units-[unitId]:title')).toBeInTheDocument()
    expect(editButton).not.toBeDisabled()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByText('Unit Name')).toBeInTheDocument()
    expect(input).toBeDisabled()
    expect(input).toHaveValue('unitName value')
  })

  it('should show the page in edit mode', () => {
    useBankUnitMock.mockReturnValue({
      getBankUnit: {
        isLoading: false,
        data: bankUnitMock,
      },
      editBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useBankUnitEntityLevelTemplateMock.mockReturnValue({
      getBankUnitEntityLevelTemplate: {
        isLoading: false,
        data: bankUnitTemplateMock,
      },
    })
    useBankUnitTemplateMock.mockReturnValue({
      getBankUnitTemplate: {
        isLoading: false,
        data: undefined,
      },
    })

    render(<BankUnitDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    if (!editButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.click(editButton)
    })

    const cancelButton = screen.queryByRole('button', { name: 'common:buttons.cancel' })
    const saveButton = screen.queryByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.queryByRole('textbox', { name: 'unitName' })

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
    expect(input).not.toBeDisabled()
    expect(input).toHaveValue('unitName value')
  })

  it('should handle success submit of the form', async () => {
    useBankUnitMock.mockReturnValue({
      getBankUnit: {
        isLoading: false,
        data: bankUnitMock,
      },
      editBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useBankUnitEntityLevelTemplateMock.mockReturnValue({
      getBankUnitEntityLevelTemplate: {
        isLoading: false,
        data: bankUnitTemplateMock,
      },
    })
    useBankUnitTemplateMock.mockReturnValue({
      getBankUnitTemplate: {
        isLoading: false,
        data: undefined,
      },
    })

    render(<BankUnitDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    if (!editButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.getByRole('textbox', { name: 'unitName' })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Updated unitName value',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: 'unitName' })).toBeDisabled()
      expect(screen.getByRole('textbox', { name: 'unitName' })).toHaveValue(
        'Updated unitName value'
      )
      expect(saveButton).not.toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankUnitMock.mockReturnValue({
      getBankUnit: {
        isLoading: false,
        data: bankUnitMock,
      },
      editBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.reject({ body: { message: '' } })),
      },
    })
    useBankUnitEntityLevelTemplateMock.mockReturnValue({
      getBankUnitEntityLevelTemplate: {
        isLoading: false,
        data: bankUnitTemplateMock,
      },
    })
    useBankUnitTemplateMock.mockReturnValue({
      getBankUnitTemplate: {
        isLoading: false,
        data: undefined,
      },
    })

    render(<BankUnitDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    if (!editButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.saveChanges' })
    const input = screen.getByRole('textbox', { name: 'unitName' })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Updated unitName value',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(input).not.toBeDisabled()
      expect(input).toHaveValue('Updated unitName value')
      expect(saveButton).toBeInTheDocument()
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should have unsaved changes warning in the form', () => {
    useBankUnitMock.mockReturnValue({
      getBankUnit: {
        isLoading: false,
        data: bankUnitMock,
      },
      editBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useBankUnitEntityLevelTemplateMock.mockReturnValue({
      getBankUnitEntityLevelTemplate: {
        isLoading: false,
        data: bankUnitTemplateMock,
      },
    })
    useBankUnitTemplateMock.mockReturnValue({
      getBankUnitTemplate: {
        isLoading: false,
        data: undefined,
      },
    })

    render(<BankUnitDetails />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
