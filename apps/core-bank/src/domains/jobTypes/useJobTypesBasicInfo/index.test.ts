import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getJobTypesBasicInfoResponseMock } from '../api/mock'
import { useJobTypesBasicInfo } from './index'

jest.mock('../service', () => ({
  getJobTypesBasicInfo: jest.fn(() => getJobTypesBasicInfoResponseMock),
}))

describe('useJobTypesBasicInfo', () => {
  it('should not query job types basic info when query is disabled', async () => {
    const { result } = renderHook(
      () => useJobTypesBasicInfo({ shouldQueryJobTypesBasicInfo: false }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getJobTypesBasicInfo.isSuccess)

    expect(result.current.getJobTypesBasicInfo.isFetchedAfterMount).toBe(false)
    expect(result.current.getJobTypesBasicInfo.data).not.toBeDefined()
  })

  it('should query job types basic info', async () => {
    const { result } = renderHook(() => useJobTypesBasicInfo({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getJobTypesBasicInfo.isSuccess)

    expect(result.current.getJobTypesBasicInfo.isFetchedAfterMount).toBe(true)
    expect(result.current.getJobTypesBasicInfo.data).toBeDefined()
  })
})
