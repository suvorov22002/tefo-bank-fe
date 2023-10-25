import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankUnitsBasicInfoResponseMock } from '../api/mock'
import { useBankUnitsBasicInfo } from './index'

jest.mock('../service', () => ({
  getBankUnitsBasicInfo: jest.fn(() => getBankUnitsBasicInfoResponseMock),
}))

describe('useBankUnitsBasicInfo', () => {
  it('should not query bank units basic info when query is disabled', async () => {
    const { result } = renderHook(
      () => useBankUnitsBasicInfo({ shouldQueryBankUnitsBasicInfo: false }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getBankUnitsBasicInfo.isSuccess)

    expect(result.current.getBankUnitsBasicInfo.isFetchedAfterMount).toBe(false)
    expect(result.current.getBankUnitsBasicInfo.data).not.toBeDefined()
  })

  it('should query bank units basic info', async () => {
    const { result } = renderHook(() => useBankUnitsBasicInfo({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnitsBasicInfo.isSuccess)

    expect(result.current.getBankUnitsBasicInfo.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnitsBasicInfo.data).toBeDefined()
  })
})
