import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { DictionaryCodeConsts } from '../types'
import { useAllDictionaryValuesByDictionaryCode } from './index'

jest.mock('../service', () => ({
  getAllDictionaryValuesByDictionaryCode: jest.fn(() => []),
}))

describe('useAllDictionaryValuesByDictionaryCode', () => {
  it('should query dictionary values by dictionaryCode', async () => {
    const { result } = renderHook(
      () =>
        useAllDictionaryValuesByDictionaryCode({
          dictionaryCode: DictionaryCodeConsts.AccountingMethod,
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getAllDictionaryValuesByDictionaryCode.isSuccess)

    expect(result.current.getAllDictionaryValuesByDictionaryCode.isFetchedAfterMount).toBe(true)
    expect(result.current.getAllDictionaryValuesByDictionaryCode.data).toBeDefined()
  })

  it('should not query dictionaryValues by dictionaryCode while shouldQueryAllDictionaryValuesByDictionaryCode is false', async () => {
    const { result } = renderHook(
      () =>
        useAllDictionaryValuesByDictionaryCode({
          dictionaryCode: DictionaryCodeConsts.AccountingMethod,
          shouldQueryAllDictionaryValuesByDictionaryCode: false,
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getAllDictionaryValuesByDictionaryCode.isSuccess)

    expect(result.current.getAllDictionaryValuesByDictionaryCode.isFetchedAfterMount).toBe(false)
  })
})
