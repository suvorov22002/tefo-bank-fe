import { INTEGRATED_RenderDynamicFields } from 'ui'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { customFieldValidationRulesMock, customFieldsMock } from '@/domains/customFields/api/mocks'

import { ValidationRuleModal } from '.'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../validationRuleForm', () => ({
  ValidationRuleForm: jest.fn(() => <div data-testid="validationRuleForm" />),
}))

describe('ValidationRuleForm', () => {
  it('should show content', () => {
    render(
      <ValidationRuleModal
        open={true}
        onCancel={() => undefined}
        validationRule={undefined}
        validationRuleFormProps={{
          initialValues: {
            type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Email,
            priority: 1,
            value: null,
            status: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active,
          },
          onSubmit: () => undefined,
          addedValidationRules: customFieldValidationRulesMock.slice(0, 2),
          customField: customFieldsMock[0],
        }}
      />,
      {
        wrapper: getAppWrapper(),
      }
    )
    expect(
      screen.getByText('custom-fields-[entity]-[id]:tabs.validation.modals.create.title')
    ).toBeInTheDocument()
    expect(screen.getByTestId('validationRuleForm')).toBeInTheDocument()
    expect(
      screen.getByText('custom-fields-[entity]-[id]:tabs.validation.buttons.modalOkButton')
    ).toBeInTheDocument()
  })
})
