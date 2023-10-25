import { INTEGRATED_RenderDynamicFields } from 'ui'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { customFieldValidationRulesMock, customFieldsMock } from '@/domains/customFields/api/mocks'

import { ValidationRuleForm } from '.'
import { getValidationRuleTypeSpecificFields } from '../../utils'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../utils', () => ({
  ...jest.requireActual('../../utils'),
  getValidationRuleTypeSpecificFields: jest.fn(),
}))

describe('ValidationRuleForm', () => {
  it('should show content', () => {
    render(
      <ValidationRuleForm
        customField={customFieldsMock[0]}
        id="ValidationRuleFormId"
        initialValues={{
          type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Email,
          priority: 1,
          value: null,
          status: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active,
        }}
        onSubmit={() => undefined}
        addedValidationRules={customFieldValidationRulesMock.slice(0, 2)}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )
    expect(
      screen.getByText('custom-fields-[entity]-[id]:tabs.validation.forms.labels.rule')
    ).toBeInTheDocument()
    expect(getValidationRuleTypeSpecificFields).toBeCalled()
    expect(
      screen.getByText('custom-fields-[entity]-[id]:tabs.validation.forms.labels.index')
    ).toBeInTheDocument()
    expect(
      screen.getByText('custom-fields-[entity]-[id]:tabs.validation.forms.labels.status')
    ).toBeInTheDocument()
  })
})
