import { dateTimeUtils } from 'utils'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { DateTimeFormatConsts } from '@/consts'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { SetInitialBusinessDay } from './index'
import { useInitialBusinessDay } from '../../../../../../domains/businessDays/useInitialBusinessDay'

jest.useFakeTimers().setSystemTime(new Date('2023-09-15'))

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../../../../domains/businessDays/useInitialBusinessDay')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  ClockCircleOutlinedIcon: () => <div data-testid="clock-icon" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useInitialBusinessDayMock = useInitialBusinessDay as jest.MockedFunction<any>

const ALLOWED_DATE = dateTimeUtils.dateTime().add(1, 'days').startOf('day')

const initialBusinessDayAvailableSlotsMock = [
  ALLOWED_DATE.format(DateTimeFormatConsts.DefaultDateTime),
]

describe('SetInitialBusinessDay', () => {
  afterEach(() => {
    useInitialBusinessDayMock.mockReset()
  })
  afterAll(() => {
    jest.useRealTimers()
  })

  it('should show content', () => {
    useInitialBusinessDayMock.mockReturnValue({
      getInitialBusinessDayAvailableSlots: {
        isLoading: false,
        data: undefined,
      },
      setInitialBusinessDay: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })

    render(<SetInitialBusinessDay />, { wrapper: getAppWrapper() })

    expect(
      screen.queryByRole('button', { name: 'business-days:buttons.setInitialBusinessDay' })
    ).toBeInTheDocument()
  })

  it('should handle successful initial business day set', async () => {
    useInitialBusinessDayMock.mockReturnValue({
      getInitialBusinessDayAvailableSlots: {
        isLoading: false,
        data: initialBusinessDayAvailableSlotsMock,
      },
      setInitialBusinessDay: {
        isLoading: false,
        mutateAsync: jest.fn((data: string) => Promise.resolve(data)),
      },
    })

    render(<SetInitialBusinessDay />, { wrapper: getAppWrapper() })

    const showModalButton = screen.getByRole('button', {
      name: 'business-days:buttons.setInitialBusinessDay',
    })

    act(() => {
      fireEvent.click(showModalButton)
    })

    const availableDay = screen.getByText(ALLOWED_DATE.format('DD'))
    const submitButton = screen.getByRole('button', { name: 'common:buttons.ok' })

    act(() => {
      fireEvent.click(availableDay)
    })

    act(() => {
      fireEvent.click(submitButton)
    })
    const confirmButton = screen.getByRole('button', { name: 'common:buttons.yes' })

    act(() => {
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(availableDay).not.toBeInTheDocument()
      expect(submitButton).not.toBeInTheDocument()
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed initial business day set', async () => {
    useInitialBusinessDayMock.mockReturnValue({
      getInitialBusinessDayAvailableSlots: {
        isLoading: false,
        data: initialBusinessDayAvailableSlotsMock,
      },
      setInitialBusinessDay: {
        isLoading: false,
        mutateAsync: jest.fn((_data: string) =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })

    render(<SetInitialBusinessDay />, { wrapper: getAppWrapper() })

    const showModalButton = screen.getByRole('button', {
      name: 'business-days:buttons.setInitialBusinessDay',
    })

    act(() => {
      fireEvent.click(showModalButton)
    })

    const availableDay = screen.getByText(ALLOWED_DATE.format('DD'))
    const submitButton = screen.getByRole('button', { name: 'common:buttons.ok' })

    act(() => {
      fireEvent.click(availableDay)
    })

    act(() => {
      fireEvent.click(submitButton)
    })
    const confirmButton = screen.getByRole('button', { name: 'common:buttons.yes' })

    act(() => {
      fireEvent.click(confirmButton)
    })

    await waitFor(() => {
      expect(availableDay).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })
})
