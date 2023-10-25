import { Form, FormikProps } from 'ui'
import { render, screen } from '@testing-library/react'

import { customFieldsMock } from '@/domains/customFields/api/mocks'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import { CustomFieldDetailsFormValues } from '../../types'
import { DecimalDataTypeSpecificFields } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('DecimalDataTypeSpecificFields', () => {
  it('should show content', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
          properties: {
            decimals: null,
          },
        }}
      >
        {formProps => (
          <DecimalDataTypeSpecificFields
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
    expect(
      screen.getByRole('spinbutton', {
        name: 'properties.decimals',
      })
    ).toBeInTheDocument()
  })

  it('should disable defaultValue and decimals fields while isSubmitting is true', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
          properties: {
            decimals: null,
          },
        }}
      >
        {formProps => (
          <DecimalDataTypeSpecificFields
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

    expect(
      screen.getByRole('spinbutton', {
        name: 'properties.decimals',
      })
    ).toBeDisabled()
  })

  it('should disable defaultValue and decimals fields on details view in view mode', () => {
    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
          properties: {
            decimals: null,
          },
        }}
      >
        {formProps => (
          <DecimalDataTypeSpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={{
              ...customFieldsMock[0],
              properties: {
                decimals: 1,
              },
            }}
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

    expect(
      screen.getByRole('spinbutton', {
        name: 'properties.decimals',
      })
    ).toBeDisabled()
  })
})
