import { useUnsavedChangesWarning } from 'ui'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { DayType, HolidayCalendar, HolidayCalendarStatus } from '@/domains/holidayCalendar'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import CreateHolidayCalendar from './index.page'
import { useHolidayCalendar } from '../../../domains/holidayCalendar/useHolidayCalendar'
import { GetOpenBusinessDayDateResponseData, useOpenBusinessDay } from '@/domains/businessDays'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/holidayCalendar/useHolidayCalendar')
jest.mock('../../../domains/businessDays/useOpenBusinessDay')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useHolidayCalendarMock = useHolidayCalendar as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useOpenBusinessDayDateMock = useOpenBusinessDay as jest.MockedFunction<any>

const holidayCalendarMock: HolidayCalendar = {
  id: 'oifjgsdfmkdngdf',
  date: '10-04-2023',
  name: 'Day 1',
  type: DayType.BUSINESS_DAY,
  recurring: true,
  status: HolidayCalendarStatus.INACTIVE,
}

const openBusinessDayDateMock: GetOpenBusinessDayDateResponseData = {
  date: '18-04-2023',
}

describe('CreateHolidayCalendar page', () => {
  afterEach(() => {
    useHolidayCalendarMock.mockReset()
  })

  it('should show the page content', () => {
    useHolidayCalendarMock.mockReturnValue({
      createHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })

    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: openBusinessDayDateMock,
      },
    })

    render(<CreateHolidayCalendar />, { wrapper: getAppWrapper() })

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('holiday-calendar:title')).toBeInTheDocument()
    expect(screen.queryByText('holiday-calendar:createDayTitle')).toBeInTheDocument()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'date' })).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.date')
    ).toBeInTheDocument()
    expect(screen.queryByRole('textbox', { name: 'name' })).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.name')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'type' })).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.type')
    ).toBeInTheDocument()
    expect(screen.queryByRole('checkbox', { name: 'recurring' })).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.recurring')
    ).toBeInTheDocument()
    expect(screen.queryByRole('combobox', { name: 'status' })).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.status')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.holidayCalendarStatus.active')
    ).toBeInTheDocument()
    expect(
      screen.queryByRole('button', {
        name: 'common:buttons.create',
      })
    ).toBeEnabled()
  })

  it('should handle successful submit of the form', async () => {
    useHolidayCalendarMock.mockReturnValue({
      createHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })

    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: openBusinessDayDateMock,
      },
    })

    render(<CreateHolidayCalendar />, { wrapper: getAppWrapper() })

    const dateInput = screen.getByTestId('dateId')
    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const typeSelect = screen.getByRole('combobox', { name: 'type' })
    const recurringCheckbox = screen.getByRole('checkbox', { name: 'recurring' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })
    const createButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    expect(dateInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(typeSelect).toBeInTheDocument()
    expect(recurringCheckbox).toBeInTheDocument()
    expect(statusSelect).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()

    act(() => {
      fireEvent.change(dateInput, {
        target: {
          value: '10-04-2023',
        },
      })
      fireEvent.change(nameInput, {
        target: {
          value: 'Day 0',
        },
      })
      fireEvent.change(typeSelect, {
        target: {
          value: DayType.BUSINESS_DAY,
        },
      })
      fireEvent.change(recurringCheckbox, {
        target: {
          value: true,
        },
      })
      fireEvent.change(statusSelect, {
        target: {
          value: HolidayCalendarStatus.INACTIVE,
        },
      })

      fireEvent.click(createButton)
    })

    await waitFor(() => {
      expect(dateInput).toHaveValue('10-04-2023')
      expect(dateInput).not.toHaveValue(openBusinessDayDateMock.date)
      expect(nameInput).toHaveValue('Day 0')
    })

    waitFor(() => {
      expect(createButton).not.toBeInTheDocument()
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useHolidayCalendarMock.mockReturnValue({
      createHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })

    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: openBusinessDayDateMock,
      },
    })

    render(<CreateHolidayCalendar />, { wrapper: getAppWrapper() })

    const dateInput = screen.getByTestId('dateId')
    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const typeSelect = screen.getByRole('combobox', { name: 'type' })
    const recurringCheckbox = screen.getByRole('checkbox', { name: 'recurring' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })
    const createButton = screen.getByRole('button', {
      name: 'common:buttons.create',
    })

    expect(dateInput).toBeInTheDocument()
    expect(nameInput).toBeInTheDocument()
    expect(typeSelect).toBeInTheDocument()
    expect(recurringCheckbox).toBeInTheDocument()
    expect(statusSelect).toBeInTheDocument()
    expect(createButton).toBeInTheDocument()

    act(() => {
      fireEvent.change(dateInput, {
        target: {
          value: '10-04-2023',
        },
      })
      fireEvent.change(nameInput, {
        target: {
          value: 'Day 0',
        },
      })
      fireEvent.change(typeSelect, {
        target: {
          value: DayType.BUSINESS_DAY,
        },
      })
      fireEvent.change(recurringCheckbox, {
        target: {
          value: true,
        },
      })
      fireEvent.change(statusSelect, {
        target: {
          value: HolidayCalendarStatus.INACTIVE,
        },
      })

      fireEvent.click(createButton)
    })

    await waitFor(() => {
      expect(dateInput).not.toBeDisabled()
      expect(dateInput).toHaveValue('10-04-2023')
      expect(nameInput).not.toBeDisabled()
      expect(nameInput).toHaveValue('Day 0')
      expect(typeSelect).not.toBeDisabled()
      expect(recurringCheckbox).not.toBeDisabled()
      expect(statusSelect).not.toBeDisabled()
      act(() => {
        fireEvent.change(typeSelect, {
          target: {
            value: holidayCalendarMock.type,
          },
        })
        fireEvent.change(recurringCheckbox, {
          target: {
            value: holidayCalendarMock.recurring,
          },
        })
        fireEvent.change(statusSelect, {
          target: {
            value: holidayCalendarMock.status,
          },
        })
      })
    })

    waitFor(() => {
      expect(createButton).toBeInTheDocument()
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form when have a same date business day', () => {
    useHolidayCalendarMock.mockReturnValue({
      createHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({ body: { message: '' } })
        ),
      },
    })

    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: openBusinessDayDateMock,
      },
    })

    render(<CreateHolidayCalendar />, { wrapper: getAppWrapper() })

    const createButton = screen.getByText('common:buttons.create')
    const dateInput = screen.getByRole('textbox', { name: 'date' })
    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const typeSelect = screen.getByRole('combobox', { name: 'type' })
    const recurringCheckbox = screen.getByRole('checkbox', { name: 'recurring' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })

    act(() => {
      fireEvent.change(dateInput, {
        target: {
          value: openBusinessDayDateMock.date,
        },
      })
      fireEvent.change(nameInput, {
        target: {
          value: 'Day 11',
        },
      })
      fireEvent.change(typeSelect, {
        target: {
          value: DayType.BUSINESS_DAY,
        },
      })
      fireEvent.change(recurringCheckbox, {
        target: {
          value: true,
        },
      })
      fireEvent.change(statusSelect, {
        target: {
          value: HolidayCalendarStatus.ACTIVE,
        },
      })
      fireEvent.click(createButton)
    })
    waitFor(() => {
      expect(createButton).toBeInTheDocument()
      expect(
        screen.queryByText('holiday-calendar:errorMessages.sameBusinessDay')
      ).toBeInTheDocument()
    })
  })

  it('should have unsaved changes handling', async () => {
    useHolidayCalendarMock.mockReturnValue({
      createHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })

    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: openBusinessDayDateMock,
      },
    })

    render(<CreateHolidayCalendar />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
