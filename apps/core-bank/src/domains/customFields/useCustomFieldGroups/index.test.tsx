import { INTEGRATED_RenderDynamicFields } from 'ui'
import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useCustomFieldGroups } from './index'

jest.mock('../service', () => ({
  getCustomFieldGroups: jest.fn(() => []),
}))

describe('useCustomFieldGroups', () => {
  it('should query custom field groups', async () => {
    const { result } = renderHook(
      () =>
        useCustomFieldGroups(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, {
          page: 1,
          limit: 10,
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getCustomFieldGroups.isSuccess)

    expect(result.current.getCustomFieldGroups.isFetchedAfterMount).toBe(true)
  })
})
