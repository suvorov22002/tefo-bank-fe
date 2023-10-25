import { INTEGRATED_RenderDynamicFields } from 'ui'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { customFieldValidationRulesMock, customFieldsMock } from '@/domains/customFields/api/mocks'

import { CustomFieldValidationTabContent } from '.'
import { useCustomFieldValidationRule } from '../../../../../../domains/customFields/useCustomFieldValidationRule'
import { useCustomFieldValidationRules } from '../../../../../../domains/customFields/useCustomFieldValidationRules'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../../../../domains/customFields/useCustomFieldValidationRule')
jest.mock('../../../../../../domains/customFields/useCustomFieldValidationRules')

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldValidationRuleMock = useCustomFieldValidationRule as jest.MockedFunction<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useCustomFieldValidationRulesMock = useCustomFieldValidationRules as jest.MockedFunction<any>

describe('CustomFieldValidationTabContent', () => {
  afterEach(() => {
    useCustomFieldValidationRuleMock.mockReset()
    useCustomFieldValidationRulesMock.mockReset()
  })

  it('should handle empty state', () => {
    useCustomFieldValidationRuleMock.mockReturnValue({
      createCustomFieldValidationRule: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editCustomFieldValidationRule: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      deleteCustomFieldValidationRule: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.resolve()),
      },
    })

    useCustomFieldValidationRulesMock.mockReturnValue({
      getCustomFieldValidationRules: {
        isLoading: false,
        data: [],
      },
    })

    render(
      <CustomFieldValidationTabContent
        customField={customFieldsMock[0]}
        selectedEntity={INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    expect(screen.queryByRole('table')).not.toBeInTheDocument()
    expect(
      screen.queryByText('custom-fields-[entity]-[id]:tabs.validation.subtitle')
    ).not.toBeInTheDocument()
    expect(
      screen.getByText('custom-fields-[entity]-[id]:tabs.validation.emptyDescription')
    ).toBeInTheDocument()
    expect(screen.getByText('common:buttons.create')).toBeInTheDocument()
  })

  it('should show page content if validation rule exist', () => {
    useCustomFieldValidationRuleMock.mockReturnValue({
      createCustomFieldValidationRule: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      editCustomFieldValidationRule: {
        isLoading: false,
        mutateAsync: jest.fn(data => Promise.resolve(data)),
      },
      deleteCustomFieldValidationRule: {
        isLoading: false,
        mutateAsync: jest.fn(() => Promise.resolve()),
      },
    })

    useCustomFieldValidationRulesMock.mockReturnValue({
      getCustomFieldValidationRules: {
        isLoading: false,
        data: [customFieldValidationRulesMock[0]],
      },
    })

    render(
      <CustomFieldValidationTabContent
        customField={customFieldsMock[1]}
        selectedEntity={INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )

    expect(screen.queryByRole('table')).toBeInTheDocument()
    expect(
      screen.queryByText('custom-fields-[entity]-[id]:tabs.validation.subtitle')
    ).toBeInTheDocument()
    expect(
      screen.queryByText('custom-fields-[entity]-[id]:tabs.validation.emptyDescription')
    ).not.toBeInTheDocument()
    expect(screen.queryByText('common:buttons.create')).not.toBeInTheDocument()
  })
})
