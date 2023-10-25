import { INTEGRATED_RenderDynamicFields, queryClient } from 'ui'
import { act, renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { CustomFieldsCacheKeys } from '../consts'
import { useCustomFieldValidationRule } from './index'
import { useCustomFieldValidationRules } from '../useCustomFieldValidationRules'
import {
  CreateCustomFieldValidationRuleRequestData,
  EditCustomFieldValidationRuleRequestData,
} from '../types'
import { customFieldValidationRulesMock, customFieldsMock } from '../api/mocks'

jest.mock('../service', () => ({
  getCustomFieldValidationRules: jest.fn(() => customFieldValidationRulesMock),
  createCustomFieldValidationRule: jest.fn((entity, customFieldId, data) => Promise.resolve(data)),
  editCustomFieldValidationRule: jest.fn((entity, customFieldId, data) => Promise.resolve(data)),
  deleteCustomFieldValidationRule: jest.fn(() => Promise.resolve()),
}))

describe('useCustomFieldValidationRule', () => {
  const createCustomFieldValidationRuleMockRequestData: CreateCustomFieldValidationRuleRequestData =
    {
      type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Required,
      priority: 100,
      value: null,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active,
    }

  it('should update getCustomFieldValidationRules cached data after createCustomFieldValidationRule action', async () => {
    const { result: useCustomFieldValidationRuleResult } = renderHook(
      () =>
        useCustomFieldValidationRule(
          INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
          customFieldsMock[0].id
        ),
      {
        wrapper: getAppWrapper(),
      }
    )

    const { result: useCustomFieldValidationRulesResult } = renderHook(
      () =>
        useCustomFieldValidationRules(
          INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
          customFieldsMock[0].id
        ),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(
      () => useCustomFieldValidationRulesResult.current.getCustomFieldValidationRules.isSuccess
    )

    await act(
      async () =>
        await useCustomFieldValidationRuleResult.current.createCustomFieldValidationRule.mutateAsync(
          createCustomFieldValidationRuleMockRequestData
        )
    )

    expect(
      queryClient.getQueryData([
        CustomFieldsCacheKeys.CustomFieldValidationRules,
        INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
        customFieldsMock[0].id,
      ])
    ).toContainEqual(createCustomFieldValidationRuleMockRequestData)
  })

  it('should update getCustomFieldValidationRules cached data after editCustomFieldValidationRule action', async () => {
    const editCustomFieldValidationRuleMockData: EditCustomFieldValidationRuleRequestData = {
      ...customFieldValidationRulesMock[0],
      status: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Inactive,
    }

    const { result: useCustomFieldValidationRuleResult } = renderHook(
      () =>
        useCustomFieldValidationRule(
          INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
          customFieldsMock[0].id
        ),
      {
        wrapper: getAppWrapper(),
      }
    )

    const { result: useCustomFieldValidationRulesResult } = renderHook(
      () =>
        useCustomFieldValidationRules(
          INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
          customFieldsMock[0].id
        ),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(
      () => useCustomFieldValidationRulesResult.current.getCustomFieldValidationRules.isSuccess
    )

    await act(
      async () =>
        await useCustomFieldValidationRuleResult.current.editCustomFieldValidationRule.mutateAsync(
          editCustomFieldValidationRuleMockData
        )
    )

    expect(
      queryClient.getQueryData([
        CustomFieldsCacheKeys.CustomFieldValidationRules,
        INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
        customFieldsMock[0].id,
      ])
    ).toContainEqual(editCustomFieldValidationRuleMockData)
  })
  it('should update getCustomFieldValidationRules cached data after deleteCustomFieldValidationRule action', async () => {
    const { result: useCustomFieldValidationRuleResult } = renderHook(
      () =>
        useCustomFieldValidationRule(
          INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
          customFieldsMock[0].id
        ),
      {
        wrapper: getAppWrapper(),
      }
    )

    const { result: useCustomFieldValidationRulesResult } = renderHook(
      () =>
        useCustomFieldValidationRules(
          INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
          customFieldsMock[0].id
        ),
      {
        wrapper: getAppWrapper(),
      }
    )

    await waitFor(
      () => useCustomFieldValidationRulesResult.current.getCustomFieldValidationRules.isSuccess
    )

    expect(
      queryClient.getQueryData([
        CustomFieldsCacheKeys.CustomFieldValidationRules,
        INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
        customFieldsMock[0].id,
      ])
    ).toContainEqual(customFieldValidationRulesMock[0])

    await act(
      async () =>
        await useCustomFieldValidationRuleResult.current.deleteCustomFieldValidationRule.mutateAsync(
          customFieldValidationRulesMock[0].id
        )
    )

    expect(
      queryClient.getQueryData([
        CustomFieldsCacheKeys.CustomFieldValidationRules,
        INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
        customFieldsMock[0].id,
      ])
    ).not.toContainEqual(customFieldValidationRulesMock[0].id)
  })
})
