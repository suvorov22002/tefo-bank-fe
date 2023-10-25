import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useOpenBusinessDay } from './index'

jest.mock('../service', () => ({
  getOpenBusinessDayDate: jest.fn(() => ({ date: '2978-01-01' })),
}))

describe('useOpenBusinessDay', () => {
  it('should query getOpenBusinessDayDate', async () => {
    const { result } = renderHook(() => useOpenBusinessDay(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getOpenBusinessDayDate.isSuccess)

    expect(result.current.getOpenBusinessDayDate.isFetchedAfterMount).toBe(true)
  })
})
