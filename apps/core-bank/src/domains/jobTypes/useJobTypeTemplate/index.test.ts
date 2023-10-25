import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getJobTypeTemplateResponseMock } from '../api/mock'
import { useJobTypeTemplate } from './index'

jest.mock('../service', () => ({
  getJobTypeTemplate: jest.fn(() => getJobTypeTemplateResponseMock),
}))

describe('useJobTypeTemplate', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useJobTypeTemplate({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getJobTypeTemplate.isSuccess)

    expect(result.current.getJobTypeTemplate.isFetchedAfterMount).toBe(false)
    expect(result.current.getJobTypeTemplate.data).not.toBeDefined()
  })

  it('should query default job type template', async () => {
    const { result } = renderHook(() => useJobTypeTemplate({ shouldQueryJobTypeTemplate: true }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getJobTypeTemplate.isSuccess)

    expect(result.current.getJobTypeTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getJobTypeTemplate.data).toBeDefined()
  })

  it('should query bank job type template by id', async () => {
    const { result } = renderHook(
      () =>
        useJobTypeTemplate({
          shouldQueryJobTypeTemplate: true,
          jobTypeTemplateParams: { templateId: 't1' },
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getJobTypeTemplate.isSuccess)

    expect(result.current.getJobTypeTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getJobTypeTemplate.data).toBeDefined()
  })
})
