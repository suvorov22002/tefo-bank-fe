import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { BusinessDaysCacheKeys } from '../consts'
import { getInitialBusinessDayAvailableSlotsResponseDataMock } from '../api/mock'
import { useInitialBusinessDay } from './index'

jest.mock('../service', () => ({
  getInitialBusinessDayAvailableSlots: jest.fn(
    (_date: string) => getInitialBusinessDayAvailableSlotsResponseDataMock
  ),
  setInitialBusinessDay: jest.fn((date: string) => ({ date })),
}))

describe('useInitialBusinessDay', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useInitialBusinessDay({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getInitialBusinessDayAvailableSlots.isSuccess)
    await waitFor(() => result.current.setInitialBusinessDay.isSuccess)

    expect(result.current.getInitialBusinessDayAvailableSlots.isFetchedAfterMount).toBe(false)
    expect(result.current.getInitialBusinessDayAvailableSlots.data).not.toBeDefined()
    expect(result.current.setInitialBusinessDay.isIdle).toBe(true)
    expect(result.current.setInitialBusinessDay.data).not.toBeDefined()
  })

  it('should query initial business day available slots', async () => {
    const { result } = renderHook(() => useInitialBusinessDay({ date: '2945-01-01' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getInitialBusinessDayAvailableSlots.isSuccess)
    await waitFor(() => result.current.setInitialBusinessDay.isSuccess)

    expect(result.current.getInitialBusinessDayAvailableSlots.isFetchedAfterMount).toBe(true)
    expect(result.current.getInitialBusinessDayAvailableSlots.data).toBeDefined()
  })

  it('should invalidate getInitialBusinessDayAvailableSlots data after createJobType action', async () => {
    const { result } = renderHook(() => useInitialBusinessDay({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(async () => await result.current.setInitialBusinessDay.mutateAsync('2945-01-01'))

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [BusinessDaysCacheKeys.OpenBusinessDayDate],
    })
  })
})
