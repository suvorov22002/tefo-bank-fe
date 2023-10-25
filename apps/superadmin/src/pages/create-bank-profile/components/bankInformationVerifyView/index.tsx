import { Button, CheckboxField, Form, FormHelpers, formErrorUtils } from 'ui'

import { useTranslation } from '@/i18n'

import { getBankInformationVerifyFields } from '../../consts'
import styles from './styles.module.scss'
import { BankInformationVerifyViewFormValues, CreateBankProfileFormValues } from '../../types'

interface BankInformationVerifyViewProps {
  initialValues: CreateBankProfileFormValues
  onSubmit: (
    values: BankInformationVerifyViewFormValues,
    helpers: FormHelpers<BankInformationVerifyViewFormValues>
  ) => void
}

export const BankInformationVerifyView = ({
  initialValues,
  onSubmit,
}: BankInformationVerifyViewProps) => {
  const { t, ready } = useTranslation(['common', 'create-bank-profile'])

  if (!ready) {
    return null
  }

  return (
    <Form<BankInformationVerifyViewFormValues>
      initialValues={{
        ...initialValues,
        informationVerified: false,
      }}
      onSubmit={onSubmit}
      className={styles.bankView}
      size="large"
      layout="vertical"
    >
      {({ isValid }) => (
        <div className={styles.bankView__form}>
          {getBankInformationVerifyFields(t).map(({ Component, ...componentProps }, index) => (
            <Component {...componentProps} key={index} help={undefined} />
          ))}
          <CheckboxField
            name="informationVerified"
            className={styles.bankView__confirmCheckbox}
            validate={formErrorUtils.required(t('common:forms.validations.required'))()}
            help={undefined}
          >
            I confirm that provided information is correct.
          </CheckboxField>

          <div className={styles.bankView__buttonsContainer}>
            <Button
              type="primary"
              htmlType="submit"
              block
              className={styles.bankView__continueButton}
              disabled={!isValid}
            >
              {t('common:buttons.continue')}
            </Button>
          </div>
        </div>
      )}
    </Form>
  )
}
