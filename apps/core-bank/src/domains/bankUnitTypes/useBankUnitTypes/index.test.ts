import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankUnitTypesResponseMock } from '../api/mock'
import { useBankUnitTypes } from './index'

jest.mock('../service', () => {
  return {
    getBankUnitTypes: jest.fn(() => getBankUnitTypesResponseMock),
  }
})

describe('useBankUnitTypes', () => {
  it('should query getBankUnitTypes', async () => {
    const { result } = renderHook(() => useBankUnitTypes({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnitTypes.isSuccess)

    expect(result.current.getBankUnitTypes.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnitTypes.data).toBeDefined()
  })
})
