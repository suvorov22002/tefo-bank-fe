import { dateTimeUtils } from 'utils'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { CustomPermissionsForm } from './index'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))

const onSubmitMock = jest.fn()

describe('CustomPermissionsForm', () => {
  afterEach(() => {
    onSubmitMock.mockReset()
  })

  it('should render from content', () => {
    const initialValues = {
      unitId: '88888',
      permissionId: '99999',
      includeSubordinatedUnits: true,
      validFrom: dateTimeUtils.dateTime(),
      validTo: null,
    }

    render(
      <CustomPermissionsForm
        id="customPermissionsFormId"
        bankUnitOptions={[]}
        allPermissionsTreeOptions={[]}
        initialValues={initialValues}
        onSubmit={onSubmitMock}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    const includeSubordinatedUnitsCheckbox = screen.getByRole('checkbox', {
      name: 'includeSubordinatedUnits',
    })

    expect(
      screen.queryByText('access-users-[id]:tabs.customPermissions.forms.labels.unitId')
    ).toBeInTheDocument()
    expect(screen.queryByText(initialValues.unitId)).toBeInTheDocument()

    expect(
      screen.queryByText(
        'access-users-[id]:tabs.customPermissions.forms.labels.includeSubordinatedUnits'
      )
    ).toBeInTheDocument()
    expect(includeSubordinatedUnitsCheckbox).toBeChecked()

    expect(
      screen.queryByText('access-users-[id]:tabs.customPermissions.forms.labels.permissionId')
    ).toBeInTheDocument()
    expect(screen.queryByText(initialValues.permissionId)).toBeInTheDocument()

    // TODO: Add date pickers checking after global date format handling implementation
  })
})
