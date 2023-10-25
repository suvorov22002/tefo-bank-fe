import { INTEGRATED_RenderDynamicFields } from 'ui'
import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { useCustomFieldValidationRules } from './index'
import { customFieldValidationRulesMock, customFieldsMock } from '../api/mocks'

jest.mock('../service', () => ({
  getCustomFieldValidationRules: jest.fn(() => customFieldValidationRulesMock),
}))

describe('useCustomFieldValidationRules', () => {
  it('should query useCustomFieldValidationRules', async () => {
    const { result } = renderHook(
      () =>
        useCustomFieldValidationRules(
          INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
          customFieldsMock[0].id
        ),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(() => result.current.getCustomFieldValidationRules.isSuccess)

    expect(result.current.getCustomFieldValidationRules.isFetchedAfterMount).toBe(true)
  })
})
