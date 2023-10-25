import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getAllPermissionsTreeOptionsResponseMock } from '../api/mock'
import { useAllJobTypesPermissions } from './index'

jest.mock('../service', () => ({
  getAllPermissionsTreeOptions: jest.fn(() => getAllPermissionsTreeOptionsResponseMock),
}))

describe('useAllJobTypesPermissions', () => {
  it('should not query all permissions tree options when query is disabled', async () => {
    const { result } = renderHook(
      () => useAllJobTypesPermissions({ shouldQueryAllPermissionsTreeOptions: false }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getAllPermissionsTreeOptions.isSuccess)

    expect(result.current.getAllPermissionsTreeOptions.isFetchedAfterMount).toBe(false)
    expect(result.current.getAllPermissionsTreeOptions.data).not.toBeDefined()
  })

  it('should query all permissions tree options', async () => {
    const { result } = renderHook(() => useAllJobTypesPermissions({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getAllPermissionsTreeOptions.isSuccess)

    expect(result.current.getAllPermissionsTreeOptions.isFetchedAfterMount).toBe(true)
    expect(result.current.getAllPermissionsTreeOptions.data).toBeDefined()
  })
})
