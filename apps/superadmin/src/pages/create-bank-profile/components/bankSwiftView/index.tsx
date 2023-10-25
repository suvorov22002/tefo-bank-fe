import { ReactNode } from 'react'
import { Button, Form, FormHelpers, FormikProps } from 'ui'

import { useTranslation } from '@/i18n'

import { BankSwiftFormValues } from '../../types'
import { getBankSwiftFields } from '../../consts'
import styles from './styles.module.scss'

interface BankSwiftViewProps {
  initialValues: Partial<BankSwiftFormValues>
  onSubmit: (values: BankSwiftFormValues, helpers: FormHelpers<BankSwiftFormValues>) => void
  renderSteps?: (formProps: FormikProps<BankSwiftFormValues>) => JSX.Element
  stepProgressText?: ReactNode
}

export const BankSwiftView = ({
  initialValues,
  stepProgressText,
  onSubmit,
  renderSteps,
}: BankSwiftViewProps) => {
  const { t, ready } = useTranslation(['common', 'create-bank-profile'])

  if (!ready) {
    return null
  }

  return (
    <Form<BankSwiftFormValues>
      initialValues={{
        codeGroup: initialValues.codeGroup || '',
        swiftCode: initialValues.swiftCode || '',
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
            {getBankSwiftFields(t).map(({ Component, key, ...componentProps }) => (
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
