import { Form, FormikProps } from 'ui'
import { render, screen } from '@testing-library/react'

import { customFieldsMock } from '@/domains/customFields/api/mocks'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { CustomFieldDetailsFormValues } from '../../types'
import { IntegerPercentDataTypeSpecificFields } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('IntegerPercentDataTypeSpecificFields', () => {
  it('should show content', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
        }}
      >
        {formProps => (
          <IntegerPercentDataTypeSpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={undefined}
            isInEditMode={true}
          />
        )}
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('spinbutton', {
        name: 'defaultValue.value',
      })
    ).toBeInTheDocument()
  })

  it('should disable defaultValue field while isSubmitting is true', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
        }}
      >
        {formProps => (
          <IntegerPercentDataTypeSpecificFields
            formProps={
              {
                ...formProps,
                isSubmitting: true,
              } as unknown as FormikProps<CustomFieldDetailsFormValues>
            }
            customField={undefined}
            isInEditMode={true}
          />
        )}
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('spinbutton', {
        name: 'defaultValue.value',
      })
    ).toBeDisabled()
  })

  it('should disable defaultValue field on details view in view mode', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
        }}
      >
        {formProps => (
          <IntegerPercentDataTypeSpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={{ ...customFieldsMock[0], properties: {} }}
            isInEditMode={false}
          />
        )}
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('spinbutton', {
        name: 'defaultValue.value',
      })
    ).toBeDisabled()
  })
})
