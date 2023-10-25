import { dateTimeUtils } from 'utils'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { JobTypesForm } from './index'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))

const onSubmitMock = jest.fn()

describe('JobTypesForm', () => {
  afterEach(() => {
    onSubmitMock.mockReset()
  })

  it('should render from content', () => {
    const initialValues = {
      unitId: '88888',
      jobTypeId: '99999',
      includeSubordinatedUnits: true,
      validFrom: dateTimeUtils.dateTime(),
      validTo: null,
    }

    render(
      <JobTypesForm
        id="jobTypesFormId"
        bankUnitOptions={[]}
        jobTypeOptions={[]}
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
      screen.queryByText('access-users-[id]:tabs.jobTypes.forms.labels.unitId')
    ).toBeInTheDocument()
    expect(screen.queryByText(initialValues.unitId)).toBeInTheDocument()

    expect(
      screen.queryByText('access-users-[id]:tabs.jobTypes.forms.labels.includeSubordinatedUnits')
    ).toBeInTheDocument()
    expect(includeSubordinatedUnitsCheckbox).toBeChecked()

    expect(
      screen.queryByText('access-users-[id]:tabs.jobTypes.forms.labels.jobTypeId')
    ).toBeInTheDocument()
    expect(screen.queryByText(initialValues.jobTypeId)).toBeInTheDocument()

    // TODO: Add date pickers checking after global date format handling implementation
  })
})
