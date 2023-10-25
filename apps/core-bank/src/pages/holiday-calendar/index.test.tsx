import { dateTimeUtils } from 'utils'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { DayType, HolidayCalendar, HolidayCalendarStatus } from '@/domains/holidayCalendar'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { DATE_FORMAT } from './utils'
import HolidayCalendars from './index.page'
import { useHolidayCalendars } from '../../domains/holidayCalendar/useHolidayCalendars'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../domains/holidayCalendar/useHolidayCalendars')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHolidayCalendarsMock = useHolidayCalendars as jest.MockedFunction<any>

const holidayCalendarMock: HolidayCalendar = {
  id: 'oifjgsdfmkdngdf',
  date: '10-04-2023',
  name: 'Day 1',
  type: DayType.BUSINESS_DAY,
  recurring: true,
  status: HolidayCalendarStatus.INACTIVE,
}

describe('HolidayCalendars page', () => {
  afterEach(() => {
    useHolidayCalendarsMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useHolidayCalendarsMock.mockReturnValueOnce({
      getHolidayCalendars: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<HolidayCalendars />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByText('holiday-calendar:title')).not.toBeInTheDocument()
    expect(screen.queryByRole('table')).not.toBeInTheDocument()
  })

  it('should show the page with empty state if there is no created holiday calendar', () => {
    useHolidayCalendarsMock.mockReturnValueOnce({
      getHolidayCalendars: {
        isLoading: false,
        data: {
          data: [],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<HolidayCalendars />, { wrapper: getAppWrapper() })
    const createButton = screen.queryByRole('button', { name: 'common:buttons.create' })

    expect(screen.queryByText('holiday-calendar:buttons.addDate')).not.toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:filterByDayType.labelFilter')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.all')
    ).not.toBeInTheDocument()
    expect(screen.queryByText('holiday-calendar:empty.noHolidayCalendars')).toBeInTheDocument()
    expect(createButton).not.toBeDisabled()
  })

  it('should show the page content if there are created holiday calendar', () => {
    useHolidayCalendarsMock.mockReturnValueOnce({
      getHolidayCalendars: {
        isLoading: false,
        data: {
          data: [holidayCalendarMock],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<HolidayCalendars />, { wrapper: getAppWrapper() })

    const filterSelect = screen.getByRole('combobox', { name: 'filter' })

    expect(screen.getByText('holiday-calendar:subtitle')).toBeInTheDocument()
    expect(screen.queryByText('holiday-calendar:buttons.addDate')).toBeInTheDocument()

    expect(screen.queryByText('holiday-calendar:filterByDayType.labelFilter')).toBeInTheDocument()
    expect(filterSelect).toBeInTheDocument()

    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(screen.queryByText(holidayCalendarMock.id)).not.toBeInTheDocument()
    expect(
      screen.queryByText(dateTimeUtils.dateTime(holidayCalendarMock.date).format(DATE_FORMAT))
    ).toBeInTheDocument()
    expect(screen.queryByText(holidayCalendarMock.name)).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.holidayCalendarDateType.all')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.holidayCalendarRecurringStatus.Yes')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.holidayCalendarStatus.inactive')
    ).toBeInTheDocument()
  })

  it('should show the page content if filter data table', async () => {
    useHolidayCalendarsMock.mockReturnValueOnce({
      getHolidayCalendars: {
        isLoading: false,
        data: {
          data: [holidayCalendarMock],
          page: 1,
          limit: 10,
          totalItems: 1,
        },
      },
    })

    render(<HolidayCalendars />, { wrapper: getAppWrapper() })

    const filterSelect = screen.getByRole('combobox', { name: 'filter' })

    expect(filterSelect).toBeInTheDocument()

    act(() => {
      fireEvent.click(filterSelect)
    })

    await waitFor(() => {
      fireEvent.mouseDown(
        screen.getByText(
          'holiday-calendar:holidayCalendarTable.holidayCalendarDateType.businessDay'
        )
      )
    })
  })
})
