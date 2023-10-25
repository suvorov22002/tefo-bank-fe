import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getPermissionsTreeOptionsResponseMock } from '@/domains/jobTypes/api/mock'
import { i18nMock } from '@/_tests/mocks/i18n'
import { JobType, JobTypeStatuses } from '@/domains/jobTypes'

import { JobTypePermissionsTabContent } from './index'
import { useJobType } from '../../../../../../domains/jobTypes/useJobType'
import { useJobTypePermissions } from '../../../../../../domains/jobTypes/useJobTypePermissions'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../../domains/jobTypes/useJobType')
jest.mock('../../../../../../domains/jobTypes/useJobTypePermissions')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypeMock = useJobType as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypePermissionsMock = useJobTypePermissions as jest.MockedFunction<any>

const setIsJobTypePermissionsFormInEditModeMock = jest.fn()

const jobTypeMock: JobType = {
  id: '1',
  name: 'job type 1',
  status: JobTypeStatuses.Active,
  notes: '',
  units: 1,
  users: 2,
  permissions: ['1'],
}

describe('JobTypePermissionsTabContent', () => {
  afterEach(() => {
    useJobTypeMock.mockReset()
    useJobTypePermissionsMock.mockReset()
    setIsJobTypePermissionsFormInEditModeMock.mockReset()
  })

  it('should handle empty permissions data', () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useJobTypePermissionsMock.mockReturnValue({
      getPermissionsTreeOptions: {
        isLoading: false,
        data: [],
      },
    })

    render(
      <JobTypePermissionsTabContent
        getJobTypeData={jobTypeMock}
        isJobTypePermissionsFormInEditMode={false}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.queryByText('access-job-types-[jobTypeId]:tabs.permissions.subtitle')
    ).toBeInTheDocument()
    expect(screen.queryByText('common:buttons.edit')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(
      screen.queryByText(
        'access-job-types-[jobTypeId]:jobTypePermissionsTable.columns.titles.groupPermission'
      )
    ).not.toBeInTheDocument()
  })

  it('should show component in view mode', () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useJobTypePermissionsMock.mockReturnValue({
      getPermissionsTreeOptions: {
        isLoading: false,
        data: getPermissionsTreeOptionsResponseMock,
      },
    })

    render(
      <JobTypePermissionsTabContent
        getJobTypeData={jobTypeMock}
        isJobTypePermissionsFormInEditMode={false}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    expect(
      screen.queryByText('access-job-types-[jobTypeId]:tabs.permissions.subtitle')
    ).toBeInTheDocument()
    expect(editButton).toBeEnabled()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(
      screen.queryByText(
        'access-job-types-[jobTypeId]:jobTypePermissionsTable.columns.titles.groupPermission'
      )
    ).toBeInTheDocument()
  })

  it('should show component in edit mode', () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useJobTypePermissionsMock.mockReturnValue({
      getPermissionsTreeOptions: {
        isLoading: false,
        data: getPermissionsTreeOptionsResponseMock,
      },
    })

    render(
      <JobTypePermissionsTabContent
        getJobTypeData={jobTypeMock}
        isJobTypePermissionsFormInEditMode={true}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')
    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(
      screen.queryByText('access-job-types-[jobTypeId]:tabs.permissions.subtitle')
    ).toBeInTheDocument()
    expect(editButton).toBeDisabled()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(cancelButton).toBeEnabled()
    expect(saveButton).toBeInTheDocument()
  })

  it('should handle success submit of the form', async () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useJobTypePermissionsMock.mockReturnValue({
      getPermissionsTreeOptions: {
        isLoading: false,
        data: getPermissionsTreeOptionsResponseMock,
      },
    })

    render(
      <JobTypePermissionsTabContent
        getJobTypeData={jobTypeMock}
        isJobTypePermissionsFormInEditMode={true}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const treeTable = screen.getByRole('table')
    const checkbox = within(treeTable).queryAllByRole('checkbox')[0]
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!treeTable || !checkbox || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.click(checkbox)
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
      expect(setIsJobTypePermissionsFormInEditModeMock).toBeCalled()
    })
  })

  it('should handle failed submit of the form', async () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })
    useJobTypePermissionsMock.mockReturnValue({
      getPermissionsTreeOptions: {
        isLoading: false,
        data: getPermissionsTreeOptionsResponseMock,
      },
    })

    render(
      <JobTypePermissionsTabContent
        getJobTypeData={jobTypeMock}
        isJobTypePermissionsFormInEditMode={true}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const treeTable = screen.getByRole('table')
    const checkbox = within(treeTable).queryAllByRole('checkbox')[0]
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!treeTable || !checkbox || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.click(checkbox)
      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(setIsJobTypePermissionsFormInEditModeMock).not.toBeCalled()
    })
  })

  it('should have unsaved changes warning in the form', () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.reject(data)),
      },
    })
    useJobTypePermissionsMock.mockReturnValue({
      getPermissionsTreeOptions: {
        isLoading: false,
        data: getPermissionsTreeOptionsResponseMock,
      },
    })

    render(
      <JobTypePermissionsTabContent
        getJobTypeData={jobTypeMock}
        isJobTypePermissionsFormInEditMode={true}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
