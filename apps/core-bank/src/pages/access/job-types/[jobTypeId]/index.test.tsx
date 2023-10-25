import { INTEGRATED_RenderDynamicFields } from 'ui'
import { fireEvent, render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { JobType, JobTypeStatuses } from '@/domains/jobTypes'

import JobTypeDetails from './index.page'
import { useJobType } from '../../../../domains/jobTypes/useJobType'
import { useJobTypeTemplate } from '../../../../domains/jobTypes/useJobTypeTemplate'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../domains/jobTypes/useJobType')
jest.mock('../../../../domains/jobTypes/useJobTypeTemplate')

jest.mock('./components', () => ({
  JobTypeDetailsTabContent: () => <div data-testid="jobTypeDetailsTabContent" />,
  JobTypePermissionsTabContent: () => <div data-testid="jobTypePermissionsTabContent" />,
}))

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypeMock = useJobType as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypeTemplateMock = useJobTypeTemplate as jest.MockedFunction<any>

const jobTypeMock: JobType = {
  id: '1',
  name: 'job type 1',
  status: JobTypeStatuses.Active,
  notes: '',
  units: 1,
  users: 2,
  permissions: ['1'],
}

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

describe('JobTypeDetails page', () => {
  afterEach(() => {
    useJobTypeMock.mockReset()
    useJobTypeTemplateMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useJobTypeMock.mockReturnValue({
      getJobType: {
        isLoading: true,
        data: undefined,
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<JobTypeDetails />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByTestId('jobTypeDetailsTabContent')).not.toBeInTheDocument()
    expect(screen.queryByTestId('jobTypePermissionsTabContent')).not.toBeInTheDocument()
  })

  it('should show the page content after data is fetched', () => {
    useJobTypeMock.mockReturnValue({
      getJobType: {
        isLoading: false,
        data: jobTypeMock,
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: false,
        data: jobTypeTemplateMock,
      },
    })

    render(<JobTypeDetails />, { wrapper: getAppWrapper() })

    expect(screen.queryByText(jobTypeMock.name)).toBeInTheDocument()
    expect(
      screen.queryByText('access-job-types-[jobTypeId]:tabs.details.label')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('access-job-types-[jobTypeId]:tabs.permissions.label')
    ).toBeInTheDocument()
    expect(screen.queryByTestId('jobTypeDetailsTabContent')).toBeInTheDocument()
    expect(screen.queryByTestId('jobTypePermissionsTabContent')).not.toBeInTheDocument()
  })

  it('should switch tabs', () => {
    useJobTypeMock.mockReturnValue({
      getJobType: {
        isLoading: false,
        data: jobTypeMock,
      },
    })
    useJobTypeTemplateMock.mockReturnValue({
      getJobTypeTemplate: {
        isLoading: false,
        data: jobTypeTemplateMock,
      },
    })
    render(<JobTypeDetails />, { wrapper: getAppWrapper() })

    const jobTypePermissionsTab = screen.getByText(
      'access-job-types-[jobTypeId]:tabs.permissions.label'
    )

    fireEvent.click(jobTypePermissionsTab)

    expect(screen.getByTestId('jobTypePermissionsTabContent')).toBeInTheDocument()
  })
})
