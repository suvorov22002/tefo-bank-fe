import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankUnitTypesResponseMock } from '../api/mock'
import { useAllBankUnitTypes } from './index'

jest.mock('../service', () => {
  return {
    getAllBankUnitTypes: jest.fn(() => getBankUnitTypesResponseMock),
  }
})

describe('useAllBankUnitTypes', () => {
  it('should query getAllBankUnitTypes', async () => {
    const { result } = renderHook(() => useAllBankUnitTypes({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getAllBankUnitTypes.isSuccess)

    expect(result.current.getAllBankUnitTypes.isFetchedAfterMount).toBe(true)
    expect(result.current.getAllBankUnitTypes.data).toBeDefined()
  })

  it('should not query getAllBankUnitTypes while shouldQueryBankUnitTypes is false', async () => {
    const { result } = renderHook(
      () => useAllBankUnitTypes({ shouldQueryAllBankUnitTypes: false }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getAllBankUnitTypes.isSuccess)

    expect(result.current.getAllBankUnitTypes.isFetchedAfterMount).toBe(false)
  })
})
