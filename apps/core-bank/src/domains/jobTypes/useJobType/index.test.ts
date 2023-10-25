import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { JobType } from '../types'
import { JobTypesCacheKeys } from '../consts'
import { getJobTypesResponseMock } from '../api/mock'
import { useJobType } from './index'

jest.mock('../service', () => ({
  createJobType: jest.fn((jobType: JobType) => jobType),
  getJobType: jest.fn(() => getJobTypesResponseMock.data[0]),
  getJobTypes: jest.fn(() => getJobTypesResponseMock),
  editJobType: jest.fn((jobType: JobType) => jobType),
}))

describe('useJobType', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useJobType({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getJobType.isSuccess)
    await waitFor(() => result.current.createJobType.isSuccess)

    expect(result.current.getJobType.isFetchedAfterMount).toBe(false)
    expect(result.current.getJobType.data).not.toBeDefined()
    expect(result.current.createJobType.isIdle).toBe(true)
    expect(result.current.createJobType.data).not.toBeDefined()
  })

  it('should query job type', async () => {
    const { result } = renderHook(() => useJobType({ jobTypeId: '1' }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getJobType.isSuccess)
    await waitFor(() => result.current.createJobType.isSuccess)

    expect(result.current.getJobType.isFetchedAfterMount).toBe(true)
    expect(result.current.getJobType.data).toBeDefined()
  })

  it('should invalidate getJobTypes data after createJobType action', async () => {
    const { result: useJobTypeResult } = renderHook(() => useJobType({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await useJobTypeResult.current.createJobType.mutateAsync({
          ...getJobTypesResponseMock.data[0],
          id: 'testJobTypeId',
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [JobTypesCacheKeys.JobTypes],
    })
  })

  it('should invalidate getJobTypes data after editJobType action', async () => {
    const { result: useJobTypeResult } = renderHook(() => useJobType({}), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await useJobTypeResult.current.editJobType.mutateAsync({
          ...getJobTypesResponseMock.data[0],
          name: 'Updated jobType name',
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [JobTypesCacheKeys.JobType],
    })
  })
})
