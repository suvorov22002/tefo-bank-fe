import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getUserDetailsTemplateMock } from '../api/mocks'
import { useUserDetailsTemplate } from './index'

jest.mock('../service', () => ({
  getUserDetailsTemplate: jest.fn(() => getUserDetailsTemplateMock),
}))

describe('useUserDetailsTemplate', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useUserDetailsTemplate({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getUserDetailsTemplate.isSuccess)

    expect(result.current.getUserDetailsTemplate.isFetchedAfterMount).toBe(false)
    expect(result.current.getUserDetailsTemplate.data).not.toBeDefined()
  })

  it('should query default user details template', async () => {
    const { result } = renderHook(
      () => useUserDetailsTemplate({ shouldQueryUserDetailsTemplate: true }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getUserDetailsTemplate.isSuccess)

    expect(result.current.getUserDetailsTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getUserDetailsTemplate.data).toBeDefined()
  })

  it('should query user details template by templateId', async () => {
    const { result } = renderHook(
      () =>
        useUserDetailsTemplate({
          shouldQueryUserDetailsTemplate: true,
          userDetailsTemplateParams: { templateId: 't1' },
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getUserDetailsTemplate.isSuccess)

    expect(result.current.getUserDetailsTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getUserDetailsTemplate.data).toBeDefined()
  })
})
