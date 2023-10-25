import { INTEGRATED_RenderDynamicFields } from 'ui'
import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useAllCustomFieldGroups } from './index'

jest.mock('../service', () => ({
  getAllCustomFieldGroups: jest.fn(() => []),
}))

describe('useAllCustomFieldGroups', () => {
  it('should query custom field groups', async () => {
    const { result } = renderHook(
      () => useAllCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getAllCustomFieldGroups.isSuccess)

    expect(result.current.getAllCustomFieldGroups.isFetchedAfterMount).toBe(true)
  })
})
