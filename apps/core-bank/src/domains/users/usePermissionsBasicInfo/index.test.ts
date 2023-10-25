import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getPermissionsBasicInfoResponseMock } from '../api/mocks'
import { usePermissionsBasicInfo } from './index'

jest.mock('../service', () => ({
  getPermissionsBasicInfo: jest.fn(() => getPermissionsBasicInfoResponseMock),
}))

describe('usePermissionsBasicInfo', () => {
  it('should not query permissions basic info when query is disabled', async () => {
    const { result } = renderHook(
      () => usePermissionsBasicInfo({ shouldQueryPermissionsBasicInfo: false }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getPermissionsBasicInfo.isSuccess)

    expect(result.current.getPermissionsBasicInfo.isFetchedAfterMount).toBe(false)
    expect(result.current.getPermissionsBasicInfo.data).not.toBeDefined()
  })

  it('should query permissions basic info', async () => {
    const { result } = renderHook(() => usePermissionsBasicInfo({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getPermissionsBasicInfo.isSuccess)

    expect(result.current.getPermissionsBasicInfo.isFetchedAfterMount).toBe(true)
    expect(result.current.getPermissionsBasicInfo.data).toBeDefined()
  })
})
