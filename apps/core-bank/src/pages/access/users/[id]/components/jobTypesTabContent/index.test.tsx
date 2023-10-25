import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getUserJobTypesResponseMock } from '@/domains/users/api/mocks'
import { i18nMock } from '@/_tests/mocks/i18n'

import { JobTypesTabContent } from './index'
import { useBankUnitsBasicInfo } from '../../../../../../domains/bankUnits/useBankUnitsBasicInfo'
import { useJobTypesBasicInfo } from '../../../../../../domains/jobTypes/useJobTypesBasicInfo'
import { useUserJobType } from '../../../../../../domains/users/useUserJobType'
import { useUserJobTypes } from '../../../../../../domains/users/useUserJobTypes'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../../domains/users/useUserJobType')
jest.mock('../../../../../../domains/bankUnits/useBankUnitsBasicInfo')
jest.mock('../../../../../../domains/jobTypes/useJobTypesBasicInfo')
jest.mock('../../../../../../domains/users/useUserJobTypes')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserJobTypeMock = useUserJobType as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserJobTypesMock = useUserJobTypes as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypesBasicInfoMock = useJobTypesBasicInfo as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitsBasicInfoMock = useBankUnitsBasicInfo as jest.MockedFunction<any>

describe('JobTypesTabContent', () => {
  afterEach(() => {
    useUserJobTypeMock.mockReset()
    useUserJobTypesMock.mockReset()
    useJobTypesBasicInfoMock.mockReset()
    useBankUnitsBasicInfoMock.mockReset()
  })

  it('should handle empty job types data', () => {
    useUserJobTypeMock.mockReturnValue({
      createUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserJobTypesMock.mockReturnValue({
      getUserJobTypes: {
        isLoading: false,
        data: [],
      },
    })
    // Modal mocks
    useJobTypesBasicInfoMock.mockReturnValue({
      jobTypeOptions: [],
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<JobTypesTabContent userId="1" />, {
      wrapper: getAppWrapper(),
    })

    expect(screen.queryByText('common:buttons.edit')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'access-users-[id]:buttons.addJobType' })
    ).toBeInTheDocument()
  })

  it('should show page content if job types exist', () => {
    useUserJobTypeMock.mockReturnValue({
      createUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserJobTypesMock.mockReturnValue({
      getUserJobTypes: {
        isLoading: false,
        data: getUserJobTypesResponseMock,
      },
    })
    // Modal mocks
    useJobTypesBasicInfoMock.mockReturnValue({
      jobTypeOptions: [],
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<JobTypesTabContent userId="1" />, {
      wrapper: getAppWrapper(),
    })

    expect(
      screen.queryByText('access-users-[id]:buttons.addJobType')?.closest('button')
    ).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
  })

  it('should add job type to the list', () => {
    useUserJobTypeMock.mockReturnValue({
      createUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserJobTypesMock.mockReturnValue({
      getUserJobTypes: {
        isLoading: false,
        data: getUserJobTypesResponseMock,
      },
    })
    // Modal mocks
    useJobTypesBasicInfoMock.mockReturnValue({
      jobTypeOptions: [],
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<JobTypesTabContent userId="1" />, {
      wrapper: getAppWrapper(),
    })

    const addButton = screen.queryByText('access-users-[id]:buttons.addJobType')?.closest('button')

    expect(addButton).toBeInTheDocument()
    expect(addButton).toBeEnabled()
    expect(screen.queryByRole('table')).toBeInTheDocument()

    act(() => {
      fireEvent.click(addButton as HTMLButtonElement)
    })

    const okButton = screen.queryByRole('button', { name: 'access-users-[id]:buttons.modalOkText' })

    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(okButton).toBeInTheDocument()

    const validFrom = screen.queryByPlaceholderText(
      'access-users-[id]:tabs.jobTypes.forms.labels.validFrom'
    )

    expect(validFrom).toBeInTheDocument()

    waitFor(() => {
      act(() => {
        fireEvent.change(validFrom as HTMLElement, {
          target: {
            value: '01.01.2001',
          },
        })
        fireEvent.click(okButton as HTMLElement)
      })
    })

    waitFor(() => {
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
      expect(okButton).not.toBeInTheDocument()
      expect(screen.queryByText('01.01.2001')).toBeInTheDocument()
    })
  })

  it('should edit existing job type', () => {
    useUserJobTypeMock.mockReturnValue({
      createUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserJobType: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserJobTypesMock.mockReturnValue({
      getUserJobTypes: {
        isLoading: false,
        data: getUserJobTypesResponseMock,
      },
    })
    // Modal mocks
    useJobTypesBasicInfoMock.mockReturnValue({
      jobTypeOptions: [],
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<JobTypesTabContent userId="1" />, {
      wrapper: getAppWrapper(),
    })

    const actionsButton = screen.queryAllByText('...')[0]?.closest('button')

    expect(actionsButton).toBeInTheDocument()
    expect(actionsButton).toBeEnabled()

    waitFor(() => {
      act(() => {
        fireEvent.click(actionsButton as HTMLButtonElement)
      })
    })

    const editButton = screen.queryByText('common:tables.rowActions.edit')

    expect(editButton).toBeInTheDocument()

    waitFor(() => {
      act(() => {
        fireEvent.click(editButton as HTMLButtonElement)
      })
    })

    const okButton = screen.queryByRole('button', { name: 'access-users-[id]:buttons.modalOkText' })

    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(okButton).toBeInTheDocument()

    const validFrom = screen.queryByPlaceholderText(
      'access-users-[id]:tabs.jobTypes.forms.labels.validFrom'
    )

    expect(validFrom).toBeInTheDocument()

    waitFor(() => {
      act(() => {
        fireEvent.change(validFrom as HTMLElement, {
          target: {
            value: '01.01.2001',
          },
        })
        fireEvent.click(okButton as HTMLElement)
      })
    })

    waitFor(() => {
      expect(screen.queryByRole('form')).not.toBeInTheDocument()
      expect(okButton).not.toBeInTheDocument()
      expect(screen.queryByText('01.01.2001')).toBeInTheDocument()
    })
  })
})
