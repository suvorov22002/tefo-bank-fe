import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getJobTypesResponseMock } from '../api/mock'
import { useJobTypes } from './index'

jest.mock('../service', () => ({
  getJobTypes: jest.fn(() => getJobTypesResponseMock),
}))

describe('useJobTypes', () => {
  it('should query job types', async () => {
    const { result } = renderHook(() => useJobTypes({ page: 1, limit: 10 }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getJobTypes.isSuccess)

    expect(result.current.getJobTypes.isFetchedAfterMount).toBe(true)
    expect(result.current.getJobTypes.data).toBeDefined()
  })
})
