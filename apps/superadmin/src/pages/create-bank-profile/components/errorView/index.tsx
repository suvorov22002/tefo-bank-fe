import { Button, Result } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateBankProfileViews } from '../../types'

interface ErrorViewProps {
  setCurrentStep: (step: CreateBankProfileViews) => void
}

export const ErrorView = (props: ErrorViewProps) => {
  const { setCurrentStep } = props

  const { t, ready } = useTranslation(['common', 'create-bank-profile'])

  if (!ready) {
    return null
  }

  return (
    <Result
      status="error"
      title={t('create-bank-profile:results.errorView.title')}
      extra={
        <Button
          type="primary"
          size="large"
          onClick={() => setCurrentStep(CreateBankProfileViews.BankName)}
        >
          {t('common:buttons.retry')}
        </Button>
      }
    />
  )
}
