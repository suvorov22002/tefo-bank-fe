import { queryClient } from 'ui'
import { act, renderHook } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { DictionariesCacheKeys } from '../consts'
import { DictionaryStatuses } from '../types'
import { useUserDictionary } from './index'

jest.mock('../service', () => ({
  createUserDictionary: jest.fn(dictionary => dictionary),
}))

describe('useUserDictionary', () => {
  it('should invalidate user dictionaries queries after create user dictionary', async () => {
    const { result } = renderHook(() => useUserDictionary(), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.createUserDictionaryAction.mutateAsync({
          name: 'country',
          code: '_country',
          status: DictionaryStatuses.Active,
        })
    )

    expect(queryClient.invalidateQueries).toBeCalledWith({
      queryKey: [DictionariesCacheKeys.UserDictionaries],
    })
  })
})
