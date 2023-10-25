import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getCountryTemplateResponseMock } from '../api/mock'
import { useCountryTemplate } from './index'

jest.mock('../service', () => ({
  getCountryTemplate: jest.fn(() => getCountryTemplateResponseMock),
}))

describe('useCountryTemplate', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useCountryTemplate({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCountryTemplate.isSuccess)

    expect(result.current.getCountryTemplate.isFetchedAfterMount).toBe(false)
    expect(result.current.getCountryTemplate.data).not.toBeDefined()
  })

  it('should query default country template', async () => {
    const { result } = renderHook(() => useCountryTemplate({ shouldQueryCountryTemplate: true }), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getCountryTemplate.isSuccess)

    expect(result.current.getCountryTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getCountryTemplate.data).toBeDefined()
  })

  it('should query bank country template by id', async () => {
    const { result } = renderHook(
      () =>
        useCountryTemplate({
          shouldQueryCountryTemplate: true,
          countryTemplateParams: { templateId: 't1' },
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getCountryTemplate.isSuccess)

    expect(result.current.getCountryTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getCountryTemplate.data).toBeDefined()
  })
})
