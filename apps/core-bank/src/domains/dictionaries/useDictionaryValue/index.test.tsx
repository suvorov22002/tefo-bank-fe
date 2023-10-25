import { queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { DictionariesCacheKeys } from '../consts'
import { useDictionaryValue } from './index'
import { createDictionaryValueMock, editDictionaryValueMock } from '../api/mocks'

jest.mock('../service', () => ({
  createDictionaryValue: jest.fn(() => undefined),
  getDictionaryValue: jest.fn((_valueId: number) => editDictionaryValueMock),
  editDictionaryValue: jest.fn(data => data),
}))

describe('useUserDictionary', () => {
  it('should invalidate dictionary values queries after create new value', async () => {
    const { result } = renderHook(() => useDictionaryValue(1), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.createDictionaryValueAction.mutateAsync(createDictionaryValueMock)
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [DictionariesCacheKeys.DictionaryValues, 1],
    })
  })

  it('should query dictionaryValue', async () => {
    const { result } = renderHook(() => useDictionaryValue(1, 2), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getDictionaryValue.isSuccess)

    expect(result.current.getDictionaryValue.isFetchedAfterMount).toBe(true)
    expect(result.current.getDictionaryValue.data).toBeDefined()
  })

  it('should mutate getDictionaryValue data and invalidate getDictionaryValues queries after edit dictionary value', async () => {
    const { result } = renderHook(() => useDictionaryValue(1, 2), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getDictionaryValue.isSuccess)

    await act(
      async () => await result.current.editDictionaryValue.mutateAsync(editDictionaryValueMock)
    )

    jest.spyOn(queryClient, 'invalidateQueries')

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [DictionariesCacheKeys.DictionaryValues, 1],
    })
    expect(queryClient.getQueryData([DictionariesCacheKeys.DictionaryValue, 2])).toStrictEqual(
      editDictionaryValueMock
    )
  })
})
