import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import JobTypes from './index.page'
import { JobType, JobTypeStatuses, useJobTypes } from '../../../domains/jobTypes'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/jobTypes')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypesMock = useJobTypes as jest.MockedFunction<any>

const jobTypeMock: JobType = {
  id: '1',
  name: 'job type 1',
  status: JobTypeStatuses.Active,
  notes: '',
  units: 888,
  users: 999,
  permissions: [],
}

describe('JobTypes page', () => {
  afterEach(() => {
    useJobTypesMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useJobTypesMock.mockReturnValue({
      getJobTypes: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<JobTypes />, { wrapper: getAppWrapper() })
    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('access-job-types:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created jobTypes', () => {
    useJobTypesMock.mockReturnValue({
      getJobTypes: {
        isLoading: false,
        data: {
          data: [],
          page: 1,
          limit: 10,
          totalItems: 0,
        },
      },
    })

    render(<JobTypes />, { wrapper: getAppWrapper() })
    const createButton = screen.queryByText('access-job-types:buttons.createJobType')?.parentNode

    expect(screen.queryByText('access-job-types:title')).not.toBeInTheDocument()
    expect(screen.queryByText('access-job-types:buttons.addNewJobType')).not.toBeInTheDocument()
    expect(screen.queryByText('access-job-types:empty.noJobTypes')).toBeInTheDocument()
    expect(createButton).not.toBeDisabled()
  })

  it('should show the page content if there are created jobTypes', () => {
    useJobTypesMock.mockReturnValue({
      getJobTypes: {
        isLoading: false,
        data: {
          data: [jobTypeMock],
          page: 1,
          limit: 10,
          totalItems: 0,
        },
      },
    })

    render(<JobTypes />, { wrapper: getAppWrapper() })

    expect(screen.getByText('access-job-types:title')).toBeInTheDocument()
    expect(screen.queryByText('access-job-types:buttons.addNewJobType')).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.queryByText(jobTypeMock.name)).toBeInTheDocument()
    expect(
      screen.queryByText('access-job-types:jobTypesTable.jobTypeStatuses.active')
    ).toBeInTheDocument()
  })
})
