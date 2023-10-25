import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getBankProfileTemplateMockResponse } from '../api/mocks'
import { useBankProfileTemplate } from './index'

jest.mock('../service', () => ({
  getBankProfileTemplate: jest.fn(() => getBankProfileTemplateMockResponse),
}))

describe('useBankProfileTemplate', () => {
  it('should query default bank profile template', async () => {
    const { result } = renderHook(() => useBankProfileTemplate(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankProfileTemplate.isSuccess)

    expect(result.current.getBankProfileTemplate.isFetchedAfterMount).toBe(true)
    expect(result.current.getBankProfileTemplate.data).toBeDefined()
  })
})
