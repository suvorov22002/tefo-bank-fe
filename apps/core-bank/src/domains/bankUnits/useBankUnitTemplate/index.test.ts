import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankUnitTemplateResponseMock } from '../api/mock'
import { useBankUnitTemplate } from './index'

jest.mock('../service', () => ({
  getBankUnitTemplate: jest.fn(() => getBankUnitTemplateResponseMock),
}))

describe('useBankUnitTemplate', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useBankUnitTemplate({}), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnitTemplate.isSuccess)

    expect(result.current.getBankUnitTemplate.isFetchedAfterMount).toBe(false)
    expect(result.current.getBankUnitTemplate.data).not.toBeDefined()
  })

  it('should query default bank unit template', async () => {
    const { result } = renderHook(
      () => useBankUnitTemplate({ shouldQueryBankUnitTemplate: true }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getBankUnitTemplate.isSuccess)

    expect(result.current.getBankUnitTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnitTemplate.data).toBeDefined()
  })

  it('should query bank unit template by templateId', async () => {
    const { result } = renderHook(
      () =>
        useBankUnitTemplate({
          shouldQueryBankUnitTemplate: true,
          bankUnitTemplateParams: { templateId: 't1' },
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getBankUnitTemplate.isSuccess)

    expect(result.current.getBankUnitTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnitTemplate.data).toBeDefined()
  })
})
