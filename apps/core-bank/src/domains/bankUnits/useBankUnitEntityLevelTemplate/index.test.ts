import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankUnitTemplateResponseMock } from '../api/mock'
import { useBankUnitEntityLevelTemplate } from './index'

jest.mock('../service', () => ({
  getBankUnitEntityLevelTemplate: jest.fn(() => getBankUnitTemplateResponseMock),
}))

describe('useBankUnitEntityLevelTemplate', () => {
  it('should handle empty configuration argument', async () => {
    const { result } = renderHook(() => useBankUnitEntityLevelTemplate({}), {
      wrapper: getAppWrapper(),
    })

    expect(result.current.getBankUnitEntityLevelTemplate.isFetchedAfterMount).toBe(false)
    expect(result.current.getBankUnitEntityLevelTemplate.data).not.toBeDefined()
  })

  it('should query default bank unit template', async () => {
    const { result } = renderHook(
      () => useBankUnitEntityLevelTemplate({ shouldQueryBankUnitEntityLevelTemplate: true }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getBankUnitEntityLevelTemplate.isSuccess)

    expect(result.current.getBankUnitEntityLevelTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankUnitEntityLevelTemplate.data).toBeDefined()
  })
})
