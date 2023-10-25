import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateJobType from './index.page'
import { useJobType } from '../../../../domains/jobTypes/useJobType'
import { useJobTypeTemplate } from '../../../../domains/jobTypes/useJobTypeTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/jobTypes/useJobType')
jest.mock('../../../../domains/jobTypes/useJobTypeTemplate')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypeMock = useJobType as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypeTemplateMock = useJobTypeTemplate as jest.MockedFunction<any>

const jobTypeTemplateMock: INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate = {
  id: 'ut1',
  name: 'User Template v1',
  primaryFields: [
    {
      id: '23',
      code: 'jobTypeName',
      fieldName: null,
      fieldDescription: null,
      label: 'Job Type Name',
      entityName: null,
      placeholder: null,
      helpText: null,
      tooltip: null,
      required: false,
      hiddenOnCreate: false,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      visible: true,
      order: 2,
      groupCode: null,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      validation: {
        rules: [],
      },
      properties: {},
      defaultValue: {},
      entityLevel: null,
      independent: true,
    },
  ],
  customFields: [],
  groups: [],
}

describe('CreateJobType page', () => {
  afterEach(() => {
    useJobTypeMock.mockReset()
    useJobTypeTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useJobTypeMock.mockReturnValue({
      createJobType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<CreateJobType />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('access-job-types-create:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
  })

  it('should show the page content', () => {
    useJobTypeMock.mockReturnValue({
      createJobType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: false,
        data: jobTypeTemplateMock,
      },
    })

    render(<CreateJobType />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('access-job-types-create:title')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'jobTypeName' })).toBeInTheDocument()
    expect(screen.queryByText('Job Type Name')).toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'access-job-types-create:buttons.createJobType' })
    ).toBeEnabled()
  })

  it('should handle success submit of the form', async () => {
    useJobTypeMock.mockReturnValue({
      createJobType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: false,
        data: jobTypeTemplateMock,
      },
    })

    render(<CreateJobType />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'jobTypeName' })
    const createJobTypeButton = screen.getByRole('button', {
      name: 'access-job-types-create:buttons.createJobType',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Job Type',
        },
      })

      fireEvent.click(createJobTypeButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useJobTypeMock.mockReturnValue({
      createJobType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: false,
        data: jobTypeTemplateMock,
      },
    })

    render(<CreateJobType />, { wrapper: getAppWrapper() })

    const input = screen.getByRole('textbox', { name: 'jobTypeName' })
    const createJobTypeButton = screen.getByRole('button', {
      name: 'access-job-types-create:buttons.createJobType',
    })

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'Test Job Type',
        },
      })

      fireEvent.click(createJobTypeButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(input).not.toBeDisabled()
      expect(input).toHaveValue('Test Job Type')
      expect(createJobTypeButton).toBeInTheDocument()
      expect(createJobTypeButton).not.toBeDisabled()
    })
  })

  it('should have unsaved changes handling', async () => {
    useJobTypeMock.mockReturnValue({
      createJobType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.reject()),
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: false,
        data: jobTypeTemplateMock,
      },
    })

    render(<CreateJobType />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
