import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getUserCustomPermissionsMock } from '../api/mocks'
import { useUserCustomPermissions } from './index'

jest.mock('../service', () => ({
  getUserCustomPermissions: jest.fn(() => getUserCustomPermissionsMock),
}))

describe('useUserCustomPermissions', () => {
  it('should query user custom permissions', async () => {
    const { result } = renderHook(() => useUserCustomPermissions({ userId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getUserCustomPermissions.isSuccess)

    expect(result.current.getUserCustomPermissions.isFetchedAfterMount).toBe(true)
    expect(result.current.getUserCustomPermissions.data).toBeDefined()
  })
})
