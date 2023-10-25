import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateCustomField from './index.page'
import { getDataTypeSpecificFields } from '../utils/getDataTypeSpecificFields'
import { useAllCustomFieldGroups } from '../../../domains/customFields/useAllCustomFieldGroups'
import { useAllDictionaries } from '../../../domains/dictionaries/useAllDictionaries'
import { useAllDictionaryValuesByDictionaryCode } from '../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode'
import { useAllUsers } from '../../../domains/users/useAllUsers'
import { useBankUnitTypesBasicInfo } from '../../../domains/bankUnitTypes/useBankUnitTypesBasicInfo'
import { useBankUnits } from '../../../domains/bankUnits/useBankUnits'
import { useCustomField } from '../../../domains/customFields/useCustomField'
import { useCustomFields } from '../../../domains/customFields/useCustomFields'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/customFields/useCustomField')
jest.mock('../../../domains/bankUnitTypes/useBankUnitTypesBasicInfo')
jest.mock('../../../domains/dictionaries/useAllDictionaries')
jest.mock('../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../domains/bankUnits/useBankUnits')
jest.mock('../../../domains/users/useAllUsers')
jest.mock('../../../domains/customFields/useCustomFields')
jest.mock('../../../domains/customFields/useAllCustomFieldGroups')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))
jest.mock('../utils/getDataTypeSpecificFields')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldMock = useCustomField as jest.MockedFunction<any>
const useBankUnitTypesBasicInfoMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useBankUnitTypesBasicInfo as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllDictionariesMock = useAllDictionaries as jest.MockedFunction<any>

const useAllDictionaryValuesByDictionaryCodeMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllDictionaryValuesByDictionaryCode as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitsMock = useBankUnits as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllUsersMock = useAllUsers as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldsMock = useCustomFields as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllCustomFieldGroupsMock = useAllCustomFieldGroups as jest.MockedFunction<any>

describe('CreateCustomField', () => {
  afterEach(() => {
    useCustomFieldMock.mockReset()
  })

  it('should show page content', () => {
    useBankUnitTypesBasicInfoMock.mockReturnValue({
      getBankUnitTypesBasicInfo: {
        isLoading: false,
        data: undefined,
      },
      bankUnitTypesOptions: [],
    })
    useAllDictionariesMock.mockReturnValue({
      getAllDictionaries: {
        isLoading: false,
        data: undefined,
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: undefined,
      },
    })
    useBankUnitsMock.mockReturnValue({
      getBankUnits: {
        isLoading: false,
        data: undefined,
      },
    })

    useAllUsersMock.mockReturnValue({
      getAllUsers: {
        isLoading: false,
        data: undefined,
      },
    })

    useCustomFieldsMock.mockReturnValue({
      getCustomFields: {
        isLoading: false,
        data: undefined,
      },
    })
    useCustomFieldMock.mockReturnValue({
      createCustomField: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    useAllCustomFieldGroupsMock.mockReturnValue({
      getAllCustomFieldGroups: {
        isLoading: false,
        data: [],
      },
    })

    render(<CreateCustomField />, { wrapper: getAppWrapper() })

    expect(screen.getByText('custom-fields-create:title')).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.code.label')).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.name.label')).toBeInTheDocument()
    expect(
      screen.getByText('custom-fields-create:form.fields.description.label')
    ).toBeInTheDocument()
    expect(
      screen.getByText('custom-fields-create:form.fields.entityLevel.label')
    ).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.fieldType.label')).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.group.label')).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.order.label')).toBeInTheDocument()
    expect(
      screen.getByText('custom-fields-create:form.fields.placeholder.label')
    ).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.helpText.label')).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.tooltip.label')).toBeInTheDocument()
    expect(screen.getByText('custom-fields-create:form.fields.status.label')).toBeInTheDocument()
  })

  it('should show data type specific fields', async () => {
    useBankUnitTypesBasicInfoMock.mockReturnValue({
      getBankUnitTypesBasicInfo: {
        isLoading: false,
        data: undefined,
      },
      bankUnitTypesOptions: [],
    })
    useAllDictionariesMock.mockReturnValue({
      getAllDictionaries: {
        isLoading: false,
        data: undefined,
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: undefined,
      },
    })
    useBankUnitsMock.mockReturnValue({
      getBankUnits: {
        isLoading: false,
        data: undefined,
      },
    })

    useAllUsersMock.mockReturnValue({
      getAllUsers: {
        isLoading: false,
        data: undefined,
      },
    })

    useCustomFieldsMock.mockReturnValue({
      getCustomFields: {
        isLoading: false,
        data: undefined,
      },
    })
    useCustomFieldMock.mockReturnValue({
      createCustomField: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    useAllCustomFieldGroupsMock.mockReturnValue({
      getAllCustomFieldGroups: {
        isLoading: false,
        data: [],
      },
    })

    render(<CreateCustomField />, { wrapper: getAppWrapper() })

    const dataTypeSelectField = screen.getByRole('combobox', {
      name: 'type',
    })

    act(() => {
      fireEvent.change(dataTypeSelectField, {
        target: {
          value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Boolean,
        },
      })

      fireEvent.click(screen.getByText('custom-fields-create:form.dataTypes.boolean'))
    })

    await waitFor(() => {
      expect(getDataTypeSpecificFields).toBeCalled()
    })
  })

  it('should have unsaved changes handling', () => {
    useBankUnitTypesBasicInfoMock.mockReturnValue({
      getBankUnitTypesBasicInfo: {
        isLoading: false,
        data: undefined,
      },
      bankUnitTypesOptions: [],
    })
    useAllDictionariesMock.mockReturnValue({
      getAllDictionaries: {
        isLoading: false,
        data: undefined,
      },
    })
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: undefined,
      },
    })
    useBankUnitsMock.mockReturnValue({
      getBankUnits: {
        isLoading: false,
        data: undefined,
      },
    })

    useAllUsersMock.mockReturnValue({
      getAllUsers: {
        isLoading: false,
        data: undefined,
      },
    })

    useCustomFieldsMock.mockReturnValue({
      getCustomFields: {
        isLoading: false,
        data: undefined,
      },
    })
    useCustomFieldMock.mockReturnValue({
      createCustomField: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    useAllCustomFieldGroupsMock.mockReturnValue({
      getAllCustomFieldGroups: {
        isLoading: false,
        data: [],
      },
    })

    render(<CreateCustomField />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
