import { INTEGRATED_RenderDynamicFields } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { GetCustomFieldGroupsResponseData } from '@/domains/customFields'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CustomFieldGroups from './index.page'
import { useCustomFieldGroups } from '../../../domains/customFields/useCustomFieldGroups'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/customFields/useCustomFieldGroups')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldGroupsMock = useCustomFieldGroups as jest.MockedFunction<any>

const mockCustomFieldGroup: INTEGRATED_RenderDynamicFields.DynamicFieldGroup = {
  id: 'id_1',
  name: 'group',
  code: 'code',
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
  appearance: INTEGRATED_RenderDynamicFields.DynamicFieldGroupAppearances.Collapsed,
  index: 0,
  label: `field_label_`,
  status: INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Active,
  createdAt: '2023-04-03 15:14:09',
  updatedAt: '2023-04-03 15:14:09',
}

const getCustomFieldGroupMockResponseData: GetCustomFieldGroupsResponseData = {
  data: [mockCustomFieldGroup],
  limit: 10,
  page: 1,
  totalItems: 24,
}

describe('Custom field groups page', () => {
  afterEach(() => {
    useCustomFieldGroupsMock.mockReset()
  })

  it('should show loading indicator while data is fetching', async () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: undefined,
        isLoading: true,
      },
    })

    render(<CustomFieldGroups />, { wrapper: getAppWrapper() })

    const entitySelect = screen.getAllByRole('combobox')[0]

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
      expect(screen.queryByText('custom-field-groups:title')).not.toBeInTheDocument()
      expect(screen.queryByText('custom-field-groups:subtitle')).not.toBeInTheDocument()
    })
  })

  it('should show emptyState if there is no selected entity', () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: undefined,
        isLoading: false,
      },
    })
    render(<CustomFieldGroups />, { wrapper: getAppWrapper() })

    expect(
      screen.getByText('custom-field-groups:emptyNoSelectedEntity.description')
    ).toBeInTheDocument()
    expect(screen.queryByText('custom-field-groups:subtitle')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show page content if there are created custom field groups', () => {
    useCustomFieldGroupsMock.mockReturnValue({
      getCustomFieldGroups: {
        data: getCustomFieldGroupMockResponseData,
        isLoading: false,
      },
    })

    render(<CustomFieldGroups />, { wrapper: getAppWrapper() })

    const entitySelect = screen.getAllByRole('combobox')[0]

    act(() => {
      fireEvent.change(entitySelect, {
        target: {
          value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
        },
      })

      fireEvent.click(screen.getByText('custom-fields:entities.bank'))
    })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.getByText('custom-field-groups:title')).toBeInTheDocument()
    expect(screen.getByText('custom-field-groups:subtitle')).toBeInTheDocument()
    expect(screen.getByText(mockCustomFieldGroup.name)).toBeInTheDocument()
    expect(screen.getByText(mockCustomFieldGroup.index)).toBeInTheDocument()
  })
})
