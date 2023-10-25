import { INTEGRATED_RenderDynamicFields, queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { CustomFieldsCacheKeys } from '../consts'
import { customFieldsMock } from '../api/mocks'
import { useCustomField } from './index'

jest.mock('../service', () => ({
  getCustomFields: jest.fn(() => customFieldsMock),
  createCustomField: jest.fn(data => Promise.resolve(data)),
  editCustomField: jest.fn(data => data),
  getCustomField: jest.fn(() => customFieldsMock[0]),
}))

describe('useCustomField', () => {
  const createCustomFieldRequestMockData: Omit<INTEGRATED_RenderDynamicFields.DynamicField, 'id'> =
    {
      code: `field_`,
      hiddenOnCreate: false,
      fieldName: `field_name`,
      entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      entityLevel: null,
      defaultValue: {},
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      group: `group`,
      independent: true,
      order: 0,
      label: `field_label`,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      tooltip: null,
      placeholder: null,
      required: true,
      properties: {},
      validation: {
        rules: [],
      },
      helpText: null,
    }

  it('should invalidate getCustomFields data after createCustomField action', async () => {
    const { result: useCustomFieldResult } = renderHook(() => useCustomField(), {
      wrapper: getAppWrapper(),
    })

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await useCustomFieldResult.current.createCustomField.mutateAsync({
          ...createCustomFieldRequestMockData,
        })
    )

    await waitFor(() => useCustomFieldResult.current.createCustomField.isSuccess)

    expect(queryClient.invalidateQueries).toBeCalledWith([
      CustomFieldsCacheKeys.CustomFields,
      createCustomFieldRequestMockData.entityName,
    ])
  })

  it('should invalidate getCustomFields data after editCustomField action', async () => {
    const { result } = renderHook(
      () => useCustomField(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, '23'),
      {
        wrapper: getAppWrapper(),
      }
    )

    jest.spyOn(queryClient, 'invalidateQueries')

    await act(
      async () =>
        await result.current.editCustomField.mutateAsync({
          ...createCustomFieldRequestMockData,
          id: '23',
        })
    )

    await waitFor(() => result.current.createCustomField.isSuccess)

    expect(queryClient.invalidateQueries).toBeCalledWith([
      CustomFieldsCacheKeys.CustomFields,
      INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
    ])
  })
})
