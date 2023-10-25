import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getPermissionsTreeOptionsResponseMock } from '../api/mock'
import { useJobTypePermissions } from './index'

jest.mock('../service', () => ({
  getPermissionsTreeOptions: jest.fn(() => getPermissionsTreeOptionsResponseMock),
}))

describe('useJobTypePermissions', () => {
  it('should query job types', async () => {
    const { result } = renderHook(() => useJobTypePermissions({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getPermissionsTreeOptions.isSuccess)

    expect(result.current.getPermissionsTreeOptions.isFetchedAfterMount).toBe(true)
    expect(result.current.getPermissionsTreeOptions.data).toBeDefined()
  })
})
