import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useBankUnitTypeTemplate } from './index'

jest.mock('../service', () => ({
  getBankUnitTypeTemplate: jest.fn(() => Promise.resolve({})),
}))

describe('useBankUnitTypes', () => {
  it('should query bank unit type template', async () => {
    const { result } = renderHook(() => useBankUnitTypeTemplate(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getBankUnitTypeTemplate.isSuccess)

    expect(result.current.getBankUnitTypeTemplate.isFetchedAfterMount).toBe(true)
  })
})
