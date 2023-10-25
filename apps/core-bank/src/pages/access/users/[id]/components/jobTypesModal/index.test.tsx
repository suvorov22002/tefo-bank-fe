import { dateTimeUtils } from 'utils'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { JobTypesModal } from './index'
import { useBankUnitsBasicInfo } from '../../../../../../domains/bankUnits/useBankUnitsBasicInfo'
import { useJobTypesBasicInfo } from '../../../../../../domains/jobTypes/useJobTypesBasicInfo'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../../../../domains/bankUnits/useBankUnitsBasicInfo')
jest.mock('../../../../../../domains/jobTypes/useJobTypesBasicInfo')
jest.mock('../jobTypesForm', () => ({
  JobTypesForm: () => <div data-testid="jobTypesForm" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useJobTypesBasicInfoMock = useJobTypesBasicInfo as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitsBasicInfoMock = useBankUnitsBasicInfo as jest.MockedFunction<any>
const initialValuesMock = {
  unitId: '88888',
  jobTypeId: '99999',
  includeSubordinatedUnits: true,
  validFrom: dateTimeUtils.dateTime(),
  validTo: null,
}
const onSubmitMock = jest.fn()
const onCancelMock = jest.fn()

describe('JobTypesModal', () => {
  afterEach(() => {
    useJobTypesBasicInfoMock.mockReset()
    useBankUnitsBasicInfoMock.mockReset()
    onSubmitMock.mockReset()
    onSubmitMock.mockReset()
  })

  it('should render content', () => {
    useJobTypesBasicInfoMock.mockReturnValue({
      jobTypeOptions: [],
    })
    useBankUnitsBasicInfoMock.mockReturnValue({
      bankUnitOptions: [],
    })

    render(
      <JobTypesModal
        open={true}
        loading={false}
        onCancel={onCancelMock}
        jobTypesFormProps={{
          initialValues: initialValuesMock,
          onSubmit: onSubmitMock,
        }}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    expect(
      screen.queryByText('access-users-[id]:tabs.jobTypes.modals.create.title')
    ).toBeInTheDocument()

    expect(screen.queryByTestId('jobTypesForm')).toBeInTheDocument()

    expect(
      screen.queryByRole('button', { name: 'access-users-[id]:buttons.modalOkText' })
    ).toBeInTheDocument()
  })
})
