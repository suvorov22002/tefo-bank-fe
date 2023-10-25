import { ReactNode } from 'react'
import { Button, Form, FormHelpers, FormikProps } from 'ui'

import { useTranslation } from '@/i18n'

import { BankNameFormValues } from '../../types'
import { getBankNameFields } from '../../consts'
import styles from './styles.module.scss'

interface BankNameViewProps {
  initialValues: Partial<BankNameFormValues>
  onSubmit: (values: BankNameFormValues, helpers: FormHelpers<BankNameFormValues>) => void
  renderSteps?: (formProps: FormikProps<BankNameFormValues>) => JSX.Element
  stepProgressText?: ReactNode
}

export const BankNameView = ({
  initialValues,
  onSubmit,
  renderSteps,
  stepProgressText,
}: BankNameViewProps) => {
  const { t, ready } = useTranslation(['common', 'create-bank-profile'])

  if (!ready) {
    return null
  }

  return (
    <Form<BankNameFormValues>
      initialValues={{
        shortName: initialValues.shortName || '',
        longName: initialValues.longName || '',
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
            {getBankNameFields(t).map(({ Component, key, ...componentProps }) => (
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
