import { Form } from 'ui'
import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { MinPastValidationRuleTypeSpecificFields } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('MaxPastValidationRuleTypeSpecificFields', () => {
  it('should show content', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          value: null,
        }}
      >
        <MinPastValidationRuleTypeSpecificFields />
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('spinbutton', {
        name: 'value.unit',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', {
        name: 'value.term',
      })
    ).toBeInTheDocument()
  })
})
