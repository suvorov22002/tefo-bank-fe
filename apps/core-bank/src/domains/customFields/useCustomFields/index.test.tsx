import { INTEGRATED_RenderDynamicFields } from 'ui'
import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { customFieldsMock } from '../api/mocks'
import { useCustomFields } from './index'

jest.mock('../service', () => ({
  getCustomFields: jest.fn(() => customFieldsMock),
}))

describe('useCustomFields', () => {
  it('should query custom fields', async () => {
    const { result } = renderHook(
      () =>
        useCustomFields(INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank, {
          page: 1,
          limit: 10,
        }),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getCustomFields.isSuccess)

    expect(result.current.getCustomFields.isFetchedAfterMount).toBe(true)
  })
})
