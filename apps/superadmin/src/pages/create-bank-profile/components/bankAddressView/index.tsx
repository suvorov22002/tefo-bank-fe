import { ReactNode } from 'react'
import { Button, Form, FormHelpers, FormikProps } from 'ui'

import { useTranslation } from '@/i18n'

import { BankAddressFormValues } from '../../types'
import { getBankAddressFields } from '../../consts'
import styles from './styles.module.scss'

interface BankAddressViewProps {
  initialValues: Partial<BankAddressFormValues>
  onSubmit: (values: BankAddressFormValues, helpers: FormHelpers<BankAddressFormValues>) => void
  renderSteps?: (formProps: FormikProps<BankAddressFormValues>) => JSX.Element
  stepProgressText?: ReactNode
}

export const BankAddressView = ({
  initialValues,
  onSubmit,
  renderSteps,
  stepProgressText,
}: BankAddressViewProps) => {
  const { t, ready } = useTranslation(['common', 'create-bank-profile'])

  if (!ready) {
    return null
  }

  return (
    <Form<BankAddressFormValues>
      initialValues={{
        streetLine: initialValues.streetLine || '',
        city: initialValues.city || '',
        region: initialValues.region || '',
        zipCode: initialValues.zipCode || '',
        country: initialValues.country || '',
      }}
      onSubmit={onSubmit}
      layout="vertical"
      size="large"
      className={styles.bankView}
    >
      {formProps => (
        <>
          {renderSteps && renderSteps(formProps)}
          <div className={styles.bankView__form}>
            {getBankAddressFields(t).map(({ Component, key, ...componentProps }) => (
              <Component {...componentProps} key={key} />
            ))}
            {stepProgressText}
            <div className={styles.bankView__buttonsContainer}>
              <Button
                type="primary"
                htmlType="submit"
                block
                className={styles.bankView__continueButton}
                disabled={!formProps.isValid}
              >
                {t('common:buttons.continue')}
              </Button>
            </div>
          </div>
        </>
      )}
    </Form>
  )
}
