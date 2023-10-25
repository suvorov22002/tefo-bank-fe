import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useBankUnitTypesBasicInfo } from './index'

jest.mock('../service', () => ({
  getBankUnitTypesBasicInfo: jest.fn(() => []),
}))

describe('useBankUnitTypesBasicInfo', () => {
  it('should not query bank unit types basic info when query is disabled', async () => {
    const { result } = renderHook(
      () => useBankUnitTypesBasicInfo({ shouldQueryBankUnitTypesBasicInfo: false }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getBankUnitTypesBasicInfo.isSuccess)

    expect(result.current.getBankUnitTypesBasicInfo.isFetchedAfterMount).toBe(false)
    expect(result.current.getBankUnitTypesBasicInfo.data).not.toBeDefined()
  })

  it('should query bank unit types basic info', async () => {
    const { result } = renderHook(() => useBankUnitTypesBasicInfo({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnitTypesBasicInfo.isSuccess)

    expect(result.current.getBankUnitTypesBasicInfo.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnitTypesBasicInfo.data).toBeDefined()
  })
})
