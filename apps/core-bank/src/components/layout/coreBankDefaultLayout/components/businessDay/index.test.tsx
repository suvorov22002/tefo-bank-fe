import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BusinessDay } from './index'
import { useOpenBusinessDay } from '../../../../../domains/businessDays/useOpenBusinessDay'

jest.mock('../../../../../domains/businessDays/useOpenBusinessDay')
jest.mock('./currentBusinessDay', () => ({
  CurrentBusinessDay: () => <div data-testid="currentBusinessDay" />,
}))
jest.mock('./SetInitialBusinessDay', () => ({
  SetInitialBusinessDay: () => <div data-testid="setInitialBusinessDay" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOpenBusinessDaysMock = useOpenBusinessDay as jest.MockedFunction<any>

describe('BusinessDay', () => {
  afterEach(() => {
    useOpenBusinessDaysMock.mockReset()
  })

  it('should not show content while data is loading', () => {
    useOpenBusinessDaysMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<BusinessDay />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('currentBusinessDay')).not.toBeInTheDocument()
    expect(screen.queryByTestId('setInitialBusinessDay')).not.toBeInTheDocument()
  })

  it('should not show SetInitialBusinessDay if business day is not set', () => {
    useOpenBusinessDaysMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: false,
        data: undefined,
      },
    })

    render(<BusinessDay />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('currentBusinessDay')).not.toBeInTheDocument()
    expect(screen.queryByTestId('setInitialBusinessDay')).toBeInTheDocument()
  })

  it('should not show CurrentBusinessDay if business day is set', () => {
    useOpenBusinessDaysMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: false,
        data: { date: '2993-09-09' },
      },
    })

    render(<BusinessDay />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('currentBusinessDay')).toBeInTheDocument()
    expect(screen.queryByTestId('setInitialBusinessDay')).not.toBeInTheDocument()
  })
})
