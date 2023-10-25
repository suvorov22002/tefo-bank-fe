import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { GetBankUnitTemplateResponseData } from '@/domains/bankUnits'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateBankUnit from './index.page'
import { getBankUnitTypesResponseMock } from '../../../../domains/bankUnitTypes/api/mock'
import { useBankUnit } from '../../../../domains/bankUnits/useBankUnit'
import { useBankUnitEntityLevelTemplate } from '../../../../domains/bankUnits/useBankUnitEntityLevelTemplate'
import { useBankUnitTemplate } from '../../../../domains/bankUnits/useBankUnitTemplate'
import { useBankUnitTypes } from '../../../../domains/bankUnitTypes'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/bankUnits/useBankUnit')
jest.mock('../../../../domains/bankUnitTypes/useBankUnitTypes')
jest.mock('../../../../domains/bankUnits/useBankUnitEntityLevelTemplate')
jest.mock('../../../../domains/bankUnits/useBankUnitTemplate')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitMock = useBankUnit as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTypesMock = useBankUnitTypes as jest.MockedFunction<any>
const useBankUnitEntityLevelTemplateMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useBankUnitEntityLevelTemplate as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitTemplateMock = useBankUnitTemplate as jest.MockedFunction<any>

const bankUnitTemplateMock: GetBankUnitTemplateResponseData = {
  id: 'ut1',
  name: 'User Template v1',
  primaryFields: [
    {
      code: 'unitName',
      label: 'Unit Name',
      helpText: null,
      required: true,
      hiddenOnCreate: false,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      order: 0,
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
      defaultValue: {},
    },
  ],
  customFields: [],
  groups: [],
}

describe('CreateBankUnit page', () => {
  afterEach(() => {
    useBankUnitMock.mockReset()
    useBankUnitTypesMock.mockReset()
    useBankUnitEntityLevelTemplateMock.mockReset()
    useBankUnitTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useBankUnitMock.mockReturnValue({
      createBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: true,
        data: undefined,
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

    render(<CreateBankUnit />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units-create:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should show the page content', () => {
    useBankUnitMock.mockReturnValue({
      createBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: false,
        data: getBankUnitTypesResponseMock,
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

    render(<CreateBankUnit />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('structure-bank-units-create:title')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'unitName' })).toBeInTheDocument()
    expect(screen.queryByText('Unit Name')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'structure-bank-units-create:buttons.createUnit' })
    ).toBeEnabled()
  })

  it('should handle success submit of the form', async () => {
    useBankUnitMock.mockReturnValue({
      createBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: false,
        data: getBankUnitTypesResponseMock,
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

    render(<CreateBankUnit />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'unitName' })
    const createUnitButton = screen.getByRole('button', {
      name: 'structure-bank-units-create:buttons.createUnit',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Unit',
        },
      })

      fireEvent.click(createUnitButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useBankUnitMock.mockReturnValue({
      createBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: false,
        data: getBankUnitTypesResponseMock,
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

    render(<CreateBankUnit />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'unitName' })
    const createUnitButton = screen.getByRole('button', {
      name: 'structure-bank-units-create:buttons.createUnit',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Unit',
        },
      })

      fireEvent.click(createUnitButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(input).not.toBeDisabled()
      expect(input).toHaveValue('Test Unit')
      expect(createUnitButton).toBeInTheDocument()
      expect(createUnitButton).not.toBeDisabled()
    })
  })

  it('should have unsaved changes handling', async () => {
    useBankUnitMock.mockReturnValue({
      createBankUnit: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useBankUnitTypesMock.mockReturnValue({
      getBankUnitTypes: {
        isLoading: false,
        data: getBankUnitTypesResponseMock,
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

    render(<CreateBankUnit />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
