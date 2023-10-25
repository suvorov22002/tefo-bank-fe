import { INTEGRATED_RenderDynamicFields, useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { GetJobTypeTemplateResponseData, JobType, JobTypeStatuses } from '@/domains/jobTypes'

import { JobTypeDetailsTabContent } from './index'
import { useJobType } from '../../../../../../domains/jobTypes/useJobType'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../../domains/jobTypes/useJobType')

jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypeMock = useJobType as jest.MockedFunction<any>

const setJobTypeDetailsActiveTabKeyMock = jest.fn()
const setIsJobTypeDetailsFormInEditModeMock = jest.fn()
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

const jobTypeTemplateMock: GetJobTypeTemplateResponseData = {
  id: 'ut1',
  name: 'User Template v1',
  groups: [],
  primaryFields: [
    {
      id: '23',
      code: 'name',
      fieldName: null,
      fieldDescription: null,
      label: 'Job Type Name',
      entityName: null,
      placeholder: null,
      helpText: null,
      tooltip: null,
      required: false,
      defaultValue: {},
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      hiddenOnCreate: false,
      visible: true,
      order: 2,
      groupCode: null,
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
}

describe('JobTypeDetailsTabContent', () => {
  afterEach(() => {
    useJobTypeMock.mockReset()
    setIsJobTypeDetailsFormInEditModeMock.mockReset()
  })

  it('should show component in view mode', () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <JobTypeDetailsTabContent
        getJobTypeData={jobTypeMock}
        jobTypeTemplate={jobTypeTemplateMock}
        setJobTypeDetailsActiveTabKey={setJobTypeDetailsActiveTabKeyMock}
        isJobTypeDetailsFormInEditMode={false}
        setIsJobTypeDetailsFormInEditMode={setIsJobTypeDetailsFormInEditModeMock}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: jobTypeTemplateMock.primaryFields[0].code,
    })
    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')
    const addPermissionsButton = screen
      .queryByText('access-job-types-[jobTypeId]:buttons.addPermissions')
      ?.closest('button')

    expect(screen.queryByText(jobTypeMock.name)).toBeInTheDocument()
    expect(editButton).toBeEnabled()
    expect(screen.queryByText(jobTypeTemplateMock.primaryFields[0].label)).toBeInTheDocument()
    expect(input).toHaveValue(jobTypeMock.name)
    expect(input).toBeDisabled()
    expect(addPermissionsButton).toBeEnabled()
  })

  it('should show component in edit mode', () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <JobTypeDetailsTabContent
        getJobTypeData={jobTypeMock}
        jobTypeTemplate={jobTypeTemplateMock}
        setJobTypeDetailsActiveTabKey={setJobTypeDetailsActiveTabKeyMock}
        isJobTypeDetailsFormInEditMode={true}
        setIsJobTypeDetailsFormInEditMode={setIsJobTypeDetailsFormInEditModeMock}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: jobTypeTemplateMock.primaryFields[0].code,
    })
    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')
    const addPermissionsButton = screen.queryByText(
      'access-job-types-[jobTypeId]:buttons.addPermissions'
    )
    const cancelButton = screen.queryByText('common:buttons.cancel')?.closest('button')
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    expect(screen.queryByText(jobTypeMock.name)).toBeInTheDocument()
    expect(editButton).toBeDisabled()
    expect(screen.queryByText(jobTypeTemplateMock.primaryFields[0].label)).toBeInTheDocument()
    expect(input).toHaveValue(jobTypeMock.name)
    expect(input).not.toBeDisabled()
    expect(addPermissionsButton).not.toBeInTheDocument()
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

    render(
      <JobTypeDetailsTabContent
        getJobTypeData={jobTypeMock}
        jobTypeTemplate={jobTypeTemplateMock}
        setJobTypeDetailsActiveTabKey={setJobTypeDetailsActiveTabKeyMock}
        isJobTypeDetailsFormInEditMode={true}
        setIsJobTypeDetailsFormInEditMode={setIsJobTypeDetailsFormInEditModeMock}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: jobTypeTemplateMock.primaryFields[0].code,
    })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!input || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'new name value',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
      expect(setIsJobTypeDetailsFormInEditModeMock).toBeCalled()
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

    render(
      <JobTypeDetailsTabContent
        getJobTypeData={jobTypeMock}
        jobTypeTemplate={jobTypeTemplateMock}
        setJobTypeDetailsActiveTabKey={setJobTypeDetailsActiveTabKeyMock}
        isJobTypeDetailsFormInEditMode={true}
        setIsJobTypeDetailsFormInEditMode={setIsJobTypeDetailsFormInEditModeMock}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    const input = screen.queryByRole('textbox', {
      name: jobTypeTemplateMock.primaryFields[0].code,
    })
    const saveButton = screen.queryByText('common:buttons.save')?.closest('button')

    if (!input || !saveButton) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.change(input, {
        target: {
          value: 'new name value',
        },
      })

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(setIsJobTypeDetailsFormInEditModeMock).not.toBeCalled()
    })
  })

  it('should have unsaved changes warning in the form', () => {
    useJobTypeMock.mockReturnValue({
      editJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })

    render(
      <JobTypeDetailsTabContent
        getJobTypeData={jobTypeMock}
        jobTypeTemplate={jobTypeTemplateMock}
        setJobTypeDetailsActiveTabKey={setJobTypeDetailsActiveTabKeyMock}
        isJobTypeDetailsFormInEditMode={false}
        setIsJobTypeDetailsFormInEditMode={setIsJobTypeDetailsFormInEditModeMock}
        setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditModeMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
