import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankUnitsResponseMock } from '../api/mock'
import { useBankUnits } from './index'

jest.mock('../service', () => ({
  getBankUnits: jest.fn(() => getBankUnitsResponseMock),
}))

describe('useBankUnits', () => {
  it('should query getBankUnits', async () => {
    const { result } = renderHook(() => useBankUnits({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnits.isSuccess)

    expect(result.current.getBankUnits.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnits.data).toBeDefined()
  })
})
