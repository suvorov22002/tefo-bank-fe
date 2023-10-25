import { Form } from 'ui'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { MoreDateValidationRuleTypeSpecificFields } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('MoreDateValidationRuleTypeSpecificFields', () => {
  it('should show content', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          value: null,
        }}
      >
        <MoreDateValidationRuleTypeSpecificFields />
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('textbox', {
        name: 'value.targetDate',
      })
    ).toBeInTheDocument()
  })
})
