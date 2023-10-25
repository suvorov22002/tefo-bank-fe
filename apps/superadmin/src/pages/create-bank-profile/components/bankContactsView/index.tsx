import { ReactNode } from 'react'
import { Button, Form, FormHelpers, FormikProps } from 'ui'

import { useTranslation } from '@/i18n'

import { BankContactsFormValues } from '../../types'
import { getBankContactsFields } from '../../consts'
import styles from './styles.module.scss'

interface BankContactsViewProps {
  initialValues: Partial<BankContactsFormValues>
  onSubmit: (values: BankContactsFormValues, helpers: FormHelpers<BankContactsFormValues>) => void
  renderSteps?: (formProps: FormikProps<BankContactsFormValues>) => JSX.Element
  stepProgressText?: ReactNode
}

export const BankContactsView = ({
  initialValues,
  onSubmit,
  renderSteps,
  stepProgressText,
}: BankContactsViewProps) => {
  const { t, ready } = useTranslation(['common', 'create-bank-profile'])

  if (!ready) {
    return null
  }

  return (
    <Form<BankContactsFormValues>
      initialValues={{
        phoneCode: initialValues.phoneCode || '',
        shortPhoneNumber: initialValues.shortPhoneNumber || '',
        email: initialValues.email || '',
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
            {getBankContactsFields(t).map(({ Component, key, ...componentProps }) => (
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
