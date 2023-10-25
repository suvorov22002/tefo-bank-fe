import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { GetCountryTemplateResponseData } from '@/domains/countries'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CountryDetails from './index.page'
import { useCountry } from '../../../domains/countries/useCountry'
import { useCountryTemplate } from '../../../domains/countries/useCountryTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/countries/useCountry')
jest.mock('../../../domains/countries/useCountryTemplate')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCountryMock = useCountry as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCountryTemplateMock = useCountryTemplate as jest.MockedFunction<any>

const countryMock = {
  name: 'Country1',
}

const countryTemplateMock: GetCountryTemplateResponseData = {
  id: '',
  name: 'Country Template v1',
  primaryFields: [
    {
      code: 'name',
      label: 'Name',
      helpText: null,
      required: true,
      order: 0,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      id: 'f1',
      entityLevel: null,
      independent: true,
      placeholder: '',
      fieldName: '',
      hiddenOnCreate: false,
      defaultValue: {},
      groupCode: null,
      tooltip: '',
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      entityName: null,
      properties: {},
      validation: {
        rules: [],
      },
    },
  ],
  customFields: [],
  groups: [],
}

describe('CountryDetails page', () => {
  afterEach(() => {
    useCountryMock.mockReset()
    useCountryTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useCountryMock.mockReturnValue({
      getCountry: {
        isLoading: true,
        data: undefined,
      },
      editCountry: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useCountryTemplateMock.mockReturnValue({
      getCountryTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<CountryDetails />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })

  it('should display the form in a view mode', () => {
    useCountryMock.mockReturnValue({
      getCountry: {
        isLoading: false,
        data: countryMock,
      },
      editCountry: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useCountryTemplateMock.mockReturnValue({
      getCountryTemplate: {
        isLoading: false,
        data: countryTemplateMock,
      },
    })

    render(<CountryDetails />, { wrapper: getAppWrapper() })

    const input = screen.queryByRole('textbox', { name: 'name' })
    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('countries:title')).toBeInTheDocument()
    expect(editButton).not.toBeDisabled()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByText('Name')).toBeInTheDocument()
    expect(input).toBeDisabled()
    expect(input).toHaveValue('Country1')
  })

  it('should display the form in a edit mode after edit button is clicked', async () => {
    useCountryMock.mockReturnValue({
      getCountry: {
        isLoading: false,
        data: countryMock,
      },
      editCountry: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useCountryTemplateMock.mockReturnValue({
      getCountryTemplate: {
        isLoading: false,
        data: countryTemplateMock,
      },
    })

    render(<CountryDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const cancelButton = screen.queryByRole('button', { name: 'common:buttons.cancel' })
    const saveButton = screen.queryByRole('button', { name: 'common:buttons.save' })
    const input = screen.queryByRole('textbox', { name: 'name' })

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
    expect(input).not.toBeDisabled()
    expect(input).toHaveValue(countryMock.name)
  })

  it('should handle successful submit the form', async () => {
    useCountryMock.mockReturnValue({
      getCountry: {
        isLoading: false,
        data: countryMock,
      },
      editCountry: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useCountryTemplateMock.mockReturnValue({
      getCountryTemplate: {
        isLoading: false,
        data: countryTemplateMock,
      },
    })

    render(<CountryDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.save' })
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
      expect(input).toHaveValue('Updated fieldValue')
      expect(saveButton).not.toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: 'name' })).toBeDisabled()
    })
  })

  it('should handle failed submit of the form', async () => {
    useCountryMock.mockReturnValue({
      getCountry: {
        isLoading: false,
        data: countryMock,
      },
      editCountry: {
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
    useCountryTemplateMock.mockReturnValue({
      getCountryTemplate: {
        isLoading: false,
        data: countryTemplateMock,
      },
    })

    render(<CountryDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.save' })
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
    useCountryMock.mockReturnValue({
      getCountry: {
        isLoading: false,
        data: countryMock,
      },
      editCountry: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })
    useCountryTemplateMock.mockReturnValue({
      getCountryTemplate: {
        isLoading: false,
        data: countryTemplateMock,
      },
    })

    render(<CountryDetails />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
