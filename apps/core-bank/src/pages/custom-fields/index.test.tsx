import { INTEGRATED_RenderDynamicFields } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import {
  GetAllCustomFieldGroupsResponseData,
  GetCustomFieldsResponseData,
} from '@/domains/customFields'

import CustomFields from './index.page'
import { useAllCustomFieldGroups } from '../../domains/customFields/useAllCustomFieldGroups'
import { useCustomFields } from '../../domains/customFields/useCustomFields'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../domains/customFields/useCustomFields')
jest.mock('../../domains/customFields/useAllCustomFieldGroups')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldsMock = useCustomFields as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllCustomFieldGroupsMock = useAllCustomFieldGroups as jest.MockedFunction<any>

const mockCustomField: INTEGRATED_RenderDynamicFields.DynamicField = {
  id: 'id_1',
  code: `field`,
  fieldName: `field_name`,
  defaultValue: {},
  hiddenOnCreate: false,
  entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
  entityLevel: null,
  type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
  required: true,
  groupCode: `group`,
  independent: false,
  order: 0,
  label: `field_label_`,
  placeholder: null,
  helpText: null,
  tooltip: null,
  status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
  validation: {
    rules: [],
  },
  approvedAt: '2023-04-03 15:14:09',
  createdAt: '2023-04-03 15:14:09',
  updatedAt: '2023-04-03 15:14:09',
  properties: {},
}

const getCustomFieldsMockResponseData: GetCustomFieldsResponseData = {
  data: [mockCustomField],
  limit: 10,
  page: 1,
  totalItems: 24,
}

const getAllCustomFieldGroupsMockResponseData: GetAllCustomFieldGroupsResponseData = [
  {
    id: '1',
    name: 'name',
    code: 'group',
    label: 'groupLabel',
    appearance: INTEGRATED_RenderDynamicFields.DynamicFieldGroupAppearances.Collapsed,
    index: 0,
    status: INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Active,
  },
]

describe('Custom fields page', () => {
  afterEach(() => {
    useCustomFieldsMock.mockReset()
  })

  it('should show loading indicator while data is fetching', async () => {
    useCustomFieldsMock.mockReturnValue({
      getCustomFields: {
        data: undefined,
        isLoading: true,
      },
    })

    useAllCustomFieldGroupsMock.mockReturnValue({
      getAllCustomFieldGroups: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<CustomFields />, { wrapper: getAppWrapper() })

    const entitySelect = screen.getByRole('combobox')

    act(() => {
      fireEvent.change(entitySelect, {
        target: {
          value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
        },
      })

      fireEvent.click(screen.getByText('custom-fields:entities.bank'))
    })

    await waitFor(() => {
      expect(screen.getByTestId('loading-component')).toBeInTheDocument()
      expect(screen.queryByRole('table')).not.toBeInTheDocument()
      expect(screen.queryByText('custom-fields:title')).not.toBeInTheDocument()
      expect(screen.queryByText('custom-fields:subtitle')).not.toBeInTheDocument()
    })
  })

  it('should show page content if there are created custom fields', () => {
    useCustomFieldsMock.mockReturnValue({
      getCustomFields: {
        data: getCustomFieldsMockResponseData,
        isLoading: false,
      },
    })

    useAllCustomFieldGroupsMock.mockReturnValue({
      getAllCustomFieldGroups: {
        data: getAllCustomFieldGroupsMockResponseData,
        isLoading: false,
      },
    })

    render(<CustomFields />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.getByRole('table')).toBeInTheDocument()
    expect(screen.getByText('custom-fields:title')).toBeInTheDocument()
    expect(screen.getByText('custom-fields:subtitle')).toBeInTheDocument()
    expect(screen.getByText(mockCustomField.code)).toBeInTheDocument()
    expect(screen.getByText(mockCustomField.fieldName as string)).toBeInTheDocument()
    expect(
      screen.queryByText(
        getAllCustomFieldGroupsMockResponseData.find(
          ({ code }) => code === mockCustomField.groupCode
        )?.name || ''
      )
    ).toBeInTheDocument()
    expect(screen.getByText('custom-fields:customFieldsTable.dataTypes.string')).toBeInTheDocument()
  })
})
