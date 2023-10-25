import { INTEGRATED_RenderDynamicFields, queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { CustomFieldsCacheKeys } from '../consts'
import { createCustomFieldGroupRequestDataMock } from '../api/mocks'
import { useCustomFieldGroup } from './index'

jest.mock('../service', () => ({
  createCustomFieldGroup: jest.fn(data => data),
  editCustomFieldGroup: jest.fn(data => data),
}))

describe('useCustomFieldGroup', () => {
  it('should invalidate getCustomFieldGroups data after createCustomFieldGroup action', async () => {
    const { result: useCustomFieldGroupResult } = renderHook(
      () => useCustomFieldGroup(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank),
      {
        wrapper: getAppWrapper(),
      }
    )

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await useCustomFieldGroupResult.current.createCustomFieldGroup.mutateAsync({
          ...createCustomFieldGroupRequestDataMock,
        })
    )

    await waitFor(() => useCustomFieldGroupResult.current.createCustomFieldGroup.isSuccess)

    expect(queryClient.invalidateQueries).toBeCalledWith([
      CustomFieldsCacheKeys.CustomFieldGroups,
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
    ])
  })

  it('should invalidate getCustomFieldGroups data after editCustomFieldGroup action', async () => {
    const { result: useCustomFieldGroupResult } = renderHook(
      () => useCustomFieldGroup(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank),
      {
        wrapper: getAppWrapper(),
      }
    )

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await useCustomFieldGroupResult.current.editCustomFieldGroup.mutateAsync({
          ...createCustomFieldGroupRequestDataMock,
          id: '23',
        })
    )

    await waitFor(() => useCustomFieldGroupResult.current.editCustomFieldGroup.isSuccess)

    expect(queryClient.invalidateQueries).toBeCalledWith([
      CustomFieldsCacheKeys.CustomFieldGroups,
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
    ])
  })
})
