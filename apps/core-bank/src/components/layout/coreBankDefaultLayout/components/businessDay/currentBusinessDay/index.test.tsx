import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { CurrentBusinessDay } from './index'
import { useBankSettingsClosures } from '../../../../../../domains/bankSettings/useBankSettingsClosures'

jest.mock('../../../../../../domains/bankSettings/useBankSettingsClosures')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  ClockCircleOutlinedIcon: () => <div data-testid="clock-icon" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankSettingsClosuresMock = useBankSettingsClosures as jest.MockedFunction<any>
const refetchOpenBusinessDayDateDataMock = jest.fn()

describe('CurrentBusinessDay', () => {
  afterEach(() => {
    useBankSettingsClosuresMock.mockReset()
    refetchOpenBusinessDayDateDataMock.mockReset()
  })

  it('should show current business day', () => {
    useBankSettingsClosuresMock.mockReturnValue({
      getBankSettingsClosures: {
        isLoading: true,
        data: undefined,
      },
    })

    render(
      <CurrentBusinessDay
        businessDay="2923-01-01"
        refetchOpenBusinessDayDateData={refetchOpenBusinessDayDateDataMock}
      />,
      { wrapper: getAppWrapper() }
    )

    expect(screen.queryByTestId('clock-icon')).toBeInTheDocument()
    // TODO: Update during global datetime format handling implementation
    expect(screen.queryByText('01.01.2923')).toBeInTheDocument()
  })
})
