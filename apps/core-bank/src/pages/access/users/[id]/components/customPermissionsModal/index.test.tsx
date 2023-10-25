import { dateTimeUtils } from 'utils'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { CustomPermissionsModal } from './index'
import { useAllJobTypesPermissions } from '../../../../../../domains/jobTypes/useAllJobTypesPermissions'
import { useBankUnitsBasicInfo } from '../../../../../../domains/bankUnits/useBankUnitsBasicInfo'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../../domains/bankUnits/useBankUnitsBasicInfo')
jest.mock('../../../../../../domains/jobTypes/useAllJobTypesPermissions')
jest.mock('../customPermissionsForm', () => ({
  CustomPermissionsForm: () => <div data-testid="customPermissionsForm" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitsBasicInfoMock = useBankUnitsBasicInfo as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllJobTypesPermissionsMock = useAllJobTypesPermissions as jest.MockedFunction<any>

const initialValuesMock = {
  unitId: '88888',
  permissionId: '99999',
  includeSubordinatedUnits: false,
  validFrom: dateTimeUtils.dateTime(),
  validTo: null,
}
const onSubmitMock = jest.fn()
const onCancelMock = jest.fn()

describe('CustomPermissionsModal', () => {
  afterEach(() => {
    useBankUnitsBasicInfoMock.mockReset()
    useAllJobTypesPermissionsMock.mockReset()
    onSubmitMock.mockReset()
    onSubmitMock.mockReset()
  })

  it('should render content', () => {
    useAllJobTypesPermissionsMock.mockReturnValue({
      getAllPermissionsTreeOptions: {
        data: [],
      },
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(
      <CustomPermissionsModal
        open={true}
        loading={false}
        onCancel={onCancelMock}
        customPermissionsFormProps={{
          initialValues: initialValuesMock,
          onSubmit: onSubmitMock,
        }}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    expect(
      screen.queryByText('access-users-[id]:tabs.customPermissions.modals.create.title')
    ).toBeInTheDocument()

    expect(screen.queryByTestId('customPermissionsForm')).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'access-users-[id]:buttons.modalOkText' })
    ).toBeInTheDocument()
  })
})
