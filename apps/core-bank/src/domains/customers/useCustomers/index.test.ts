import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getCustomersResponseDataMock } from '../api/mock'
import { useCustomers } from './index'

jest.mock('../service', () => ({
  getCustomers: jest.fn(() => getCustomersResponseDataMock),
}))

describe('useCustomers', () => {
  it('should query getCustomers', async () => {
    const { result } = renderHook(() => useCustomers({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCustomers.isSuccess)

    expect(result.current.getCustomers.isFetchedAfterMount).toBe(true)
  })
})
