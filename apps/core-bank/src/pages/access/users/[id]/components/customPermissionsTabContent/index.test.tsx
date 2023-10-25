import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getUserCustomPermissionsMock } from '@/domains/users/api/mocks'
import { i18nMock } from '@/_tests/mocks/i18n'

import { CustomPermissionsTabContent } from './index'
import { useAllJobTypesPermissions } from '../../../../../../domains/jobTypes/useAllJobTypesPermissions'
import { useBankUnitsBasicInfo } from '../../../../../../domains/bankUnits/useBankUnitsBasicInfo'
import { useUserCustomPermission } from '../../../../../../domains/users/useUserCustomPermission'
import { useUserCustomPermissions } from '../../../../../../domains/users/useUserCustomPermissions'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../../domains/users/useUserCustomPermission')
jest.mock('../../../../../../domains/users/useUserCustomPermissions')
jest.mock('../../../../../../domains/bankUnits/useBankUnitsBasicInfo')
jest.mock('../../../../../../domains/jobTypes/useAllJobTypesPermissions')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserCustomPermissionMock = useUserCustomPermission as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserCustomPermissionsMock = useUserCustomPermissions as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitsBasicInfoMock = useBankUnitsBasicInfo as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllJobTypesPermissionsMock = useAllJobTypesPermissions as jest.MockedFunction<any>

describe('CustomPermissionsTabContent', () => {
  afterEach(() => {
    useUserCustomPermissionMock.mockReset()
    useUserCustomPermissionsMock.mockReset()
    useBankUnitsBasicInfoMock.mockReset()
    useAllJobTypesPermissionsMock.mockReset()
  })

  it('should handle empty custom permissions data', () => {
    useUserCustomPermissionMock.mockReturnValue({
      createUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserCustomPermissionsMock.mockReturnValue({
      getUserCustomPermissions: {
        isLoading: false,
        data: [],
      },
    })
    // Modal mocks
    useAllJobTypesPermissionsMock.mockReturnValue({
      getAllPermissionsTreeOptions: {
        data: [],
      },
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<CustomPermissionsTabContent userId="1" />, {
      wrapper: getAppWrapper(),
    })

    expect(screen.queryByText('common:buttons.edit')).not.toBeInTheDocument()
    expect(screen.queryByRole('form')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(
      screen.queryByRole('button', { name: 'access-users-[id]:buttons.addCustomPermission' })
    ).toBeInTheDocument()
  })

  it('should show page content if custom permissions exist', () => {
    useUserCustomPermissionMock.mockReturnValue({
      createUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserCustomPermissionsMock.mockReturnValue({
      getUserCustomPermissions: {
        isLoading: false,
        data: getUserCustomPermissionsMock,
      },
    })
    // Modal mocks
    useAllJobTypesPermissionsMock.mockReturnValue({
      getAllPermissionsTreeOptions: {
        data: [],
      },
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<CustomPermissionsTabContent userId="1" />, {
      wrapper: getAppWrapper(),
    })

    expect(
      screen.queryByText('access-users-[id]:buttons.addCustomPermission')?.closest('button')
    ).toBeInTheDocument()
    expect(screen.queryByRole('table')).toBeInTheDocument()
  })

  it('should add custom permission to the list', () => {
    useUserCustomPermissionMock.mockReturnValue({
      createUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserCustomPermissionsMock.mockReturnValue({
      getUserCustomPermissions: {
        isLoading: false,
        data: getUserCustomPermissionsMock,
      },
    })
    // Modal mocks
    useAllJobTypesPermissionsMock.mockReturnValue({
      getAllPermissionsTreeOptions: {
        data: [],
      },
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<CustomPermissionsTabContent userId="1" />, {
      wrapper: getAppWrapper(),
    })

    const addButton = screen
      .queryByText('access-users-[id]:buttons.addCustomPermission')
      ?.closest('button')

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
      'access-users-[id]:tabs.customPermissions.forms.labels.validFrom'
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

  it('should edit existing custom permission', () => {
    useUserCustomPermissionMock.mockReturnValue({
      createUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editUserCustomPermission: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
    })
    useUserCustomPermissionsMock.mockReturnValue({
      getUserCustomPermissions: {
        isLoading: false,
        data: getUserCustomPermissionsMock,
      },
    })
    // Modal mocks
    useAllJobTypesPermissionsMock.mockReturnValue({
      getAllPermissionsTreeOptions: {
        data: [],
      },
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(<CustomPermissionsTabContent userId="1" />, {
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
      'access-users-[id]:tabs.customPermissions.forms.labels.validFrom'
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
