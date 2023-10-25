import { dateTimeUtils } from 'utils'
import { useUnsavedChangesWarning } from 'ui'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { DayType, HolidayCalendar, HolidayCalendarStatus } from '@/domains/holidayCalendar'
import { GetOpenBusinessDayDateResponseData, useOpenBusinessDay } from '@/domains/businessDays'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { DATE_FORMAT } from '../utils'
import HolidayCalendarDetails from './index.page'
import { useHolidayCalendar } from '../../../domains/holidayCalendar/useHolidayCalendar'

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

describe('HolidayCalendarDetails page', () => {
  afterEach(() => {
    useHolidayCalendarMock.mockReset()
  })

  it('should show loading indicator while data is fetching', () => {
    useHolidayCalendarMock.mockReturnValue({
      getHolidayCalendar: {
        isLoading: true,
        data: undefined,
      },
      editHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })

    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: undefined,
      },
    })

    render(<HolidayCalendarDetails />, { wrapper: getAppWrapper() })

    expect(screen.getByTestId('loading-component')).toBeInTheDocument()
  })

  it('should display the form in a view mode', () => {
    useHolidayCalendarMock.mockReturnValue({
      getHolidayCalendar: {
        isLoading: false,
        data: holidayCalendarMock,
      },
      editHolidayCalendar: {
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

    render(<HolidayCalendarDetails />, { wrapper: getAppWrapper() })

    const dateInput = screen.queryByRole('textbox', { name: 'date' })
    const nameInput = screen.queryByRole('textbox', { name: 'name' })
    const typeSelect = screen.queryByRole('combobox', { name: 'type' })
    const recurringCheckbox = screen.queryByRole('checkbox', { name: 'recurring' })
    const statusSelect = screen.queryByRole('combobox', { name: 'status' })
    const editButton = screen.queryByText('common:buttons.edit')?.closest('button')

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByText('holiday-calendar:title')).toBeInTheDocument()
    expect(editButton).not.toBeDisabled()
    expect(screen.queryByRole('form')).toBeInTheDocument()
    expect(dateInput).toBeDisabled()
    expect(dateInput).toHaveValue(
      dateTimeUtils.dateTime(holidayCalendarMock.date).format(DATE_FORMAT)
    )
    expect(nameInput).toBeDisabled()
    expect(nameInput).toHaveValue(holidayCalendarMock.name)
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.type')
    ).toBeInTheDocument()
    expect(typeSelect).toBeDisabled()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.recurring')
    ).toBeInTheDocument()
    expect(recurringCheckbox).toBeDisabled()
    expect(
      screen.queryByText('holiday-calendar:holidayCalendarTable.columns.titles.status')
    ).toBeInTheDocument()
    expect(statusSelect).toBeDisabled()
  })

  it('should display the form in a edit mode after edit button is clicked', async () => {
    useHolidayCalendarMock.mockReturnValue({
      getHolidayCalendar: {
        isLoading: false,
        data: holidayCalendarMock,
      },
      editHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn((data: Record<string, unknown>) => Promise.resolve(data)),
      },
    })

    render(<HolidayCalendarDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const cancelButton = screen.queryByRole('button', { name: 'common:buttons.cancel' })
    const saveButton = screen.queryByRole('button', { name: 'common:buttons.save' })
    const dateInput = screen.queryByRole('textbox', { name: 'date' })
    const nameInput = screen.queryByRole('textbox', { name: 'name' })
    const typeSelect = screen.queryByRole('combobox', { name: 'type' }) as HTMLElement
    const recurringCheckbox = screen.queryByRole('checkbox', { name: 'recurring' }) as HTMLElement
    const statusSelect = screen.queryByRole('combobox', { name: 'status' }) as HTMLElement

    expect(cancelButton).toBeInTheDocument()
    expect(cancelButton).not.toBeDisabled()
    expect(saveButton).toBeInTheDocument()
    expect(saveButton).toBeDisabled()
    expect(dateInput).not.toBeDisabled()
    expect(dateInput).toHaveValue(
      dateTimeUtils.dateTime(holidayCalendarMock.date).format(DATE_FORMAT)
    )
    expect(nameInput).not.toBeDisabled()
    expect(nameInput).toHaveValue(holidayCalendarMock.name)
    expect(typeSelect).not.toBeDisabled()
    expect(recurringCheckbox).not.toBeDisabled()
    expect(statusSelect).not.toBeDisabled()
  })

  it('should handle successful submit the form', async () => {
    useHolidayCalendarMock.mockReturnValue({
      getHolidayCalendar: {
        isLoading: false,
        data: holidayCalendarMock,
      },
      editHolidayCalendar: {
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

    render(<HolidayCalendarDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.save' })
    const dateInput = screen.getByRole('textbox', { name: 'date' })
    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const typeSelect = screen.getByRole('combobox', { name: 'type' })
    const recurringCheckbox = screen.getByRole('checkbox', { name: 'recurring' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })

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

      expect(dateInput).not.toBeDisabled()
      expect(nameInput).not.toBeDisabled()
      expect(typeSelect).not.toBeDisabled()
      expect(recurringCheckbox).not.toBeDisabled()
      expect(statusSelect).not.toBeDisabled()

      fireEvent.click(saveButton)
    })

    await waitFor(() => {
      expect(dateInput).toHaveValue('10-04-2023')
      expect(dateInput).not.toHaveValue(openBusinessDayDateMock.date)
      expect(nameInput).toHaveValue('Day 0')
    })

    waitFor(() => {
      expect(saveButton).not.toBeInTheDocument()
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useHolidayCalendarMock.mockReturnValue({
      getHolidayCalendar: {
        isLoading: false,
        data: holidayCalendarMock,
      },
      editHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn(() =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })

    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: openBusinessDayDateMock,
      },
    })

    render(<HolidayCalendarDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.save' })
    const dateInput = screen.getByRole('textbox', { name: 'date' })
    const nameInput = screen.getByRole('textbox', { name: 'name' })
    const typeSelect = screen.getByRole('combobox', { name: 'type' })
    const recurringCheckbox = screen.getByRole('checkbox', { name: 'recurring' })
    const statusSelect = screen.getByRole('combobox', { name: 'status' })

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

      fireEvent.click(saveButton)
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
      expect(saveButton).toBeInTheDocument()
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form when have a same date business day', () => {
    useHolidayCalendarMock.mockReturnValue({
      getHolidayCalendar: {
        isLoading: false,
        data: holidayCalendarMock,
      },
      editHolidayCalendar: {
        isLoading: false,
        mutateAsync: jest.fn(() =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })
    useOpenBusinessDayDateMock.mockReturnValue({
      getOpenBusinessDayDate: {
        isLoading: true,
        data: openBusinessDayDateMock,
      },
    })

    render(<HolidayCalendarDetails />, { wrapper: getAppWrapper() })

    const editButton = screen.getByText('common:buttons.edit')

    act(() => {
      fireEvent.click(editButton)
    })

    const saveButton = screen.getByRole('button', { name: 'common:buttons.save' })
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
      fireEvent.click(saveButton)
    })
    waitFor(() => {
      expect(saveButton).toBeInTheDocument()
      expect(
        screen.queryByText('holiday-calendar:errorMessages.sameBusinessDay')
      ).toBeInTheDocument()
    })
  })

  it('should call unsaved changes related hook', () => {
    useHolidayCalendarMock.mockReturnValue({
      getHolidayCalendar: {
        isLoading: false,
        data: holidayCalendarMock,
      },
      editHolidayCalendar: {
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

    render(<HolidayCalendarDetails />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
