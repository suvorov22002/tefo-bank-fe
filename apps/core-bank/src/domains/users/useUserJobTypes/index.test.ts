import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getUserJobTypesResponseMock } from '../api/mocks'
import { useUserJobTypes } from './index'

jest.mock('../service', () => ({
  getUserJobTypes: jest.fn(() => getUserJobTypesResponseMock),
}))

describe('useUserJobTypes', () => {
  it('should query user job types', async () => {
    const { result } = renderHook(() => useUserJobTypes({ userId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getUserJobTypes.isSuccess)

    expect(result.current.getUserJobTypes.isFetchedAfterMount).toBe(true)
    expect(result.current.getUserJobTypes.data).toBeDefined()
  })
})
