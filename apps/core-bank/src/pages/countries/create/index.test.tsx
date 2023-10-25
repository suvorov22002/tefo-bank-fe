import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { GetCountryTemplateResponseData } from '@/domains/countries'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateCountry from './index.page'
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

const countryTemplateMock: GetCountryTemplateResponseData = {
  id: '',
  name: '',
  primaryFields: [
    {
      id: '',
      code: 'name',
      fieldName: null,
      fieldDescription: null,
      label: 'Name',
      entityName: null,
      placeholder: null,
      helpText: null,
      tooltip: null,
      required: false,
      visible: true,
      order: 2,
      groupCode: null,
      defaultValue: {},
      hiddenOnCreate: false,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      validation: {
        rules: [],
      },
      properties: {},
      entityLevel: null,
      independent: true,
    },
  ],
  customFields: [],
  groups: [],
}

describe('CreateCountry page', () => {
  afterEach(() => {
    useCountryMock.mockReset()
    useCountryTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useCountryMock.mockReturnValue({
      createCountry: {
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

    render(<CreateCountry />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('countries:title')).not.toBeInTheDocument()
    expect(screen.queryByText('countries:createCountryTitle')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should show the page content', () => {
    useCountryMock.mockReturnValue({
      createCountry: {
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

    render(<CreateCountry />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('countries:title')).toBeInTheDocument()
    expect(screen.queryByText('countries:createCountryTitle')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'name' })).toBeInTheDocument()
    expect(screen.queryByText('Name')).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'common:buttons.create' })).toBeEnabled()
  })

  it('should handle successful submit of the form', async () => {
    useCountryMock.mockReturnValue({
      createCountry: {
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

    render(<CreateCountry />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'name' })
    const createButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Country89897',
        },
      })

      fireEvent.click(createButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useCountryMock.mockReturnValue({
      createCountry: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })
    useCountryTemplateMock.mockReturnValue({
      getCountryTemplate: {
        isLoading: false,
        data: countryTemplateMock,
      },
    })

    render(<CreateCountry />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'name' })
    const createButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Country5',
        },
      })

      fireEvent.click(createButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(input).not.toBeDisabled()
      expect(input).toHaveValue('Country5')
      expect(createButton).toBeInTheDocument()
      expect(createButton).not.toBeDisabled()
    })
  })

  it('should have unsaved changes handling', async () => {
    useCountryMock.mockReturnValue({
      createCountry: {
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

    render(<CreateCountry />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
