import { useRouter } from 'next/router'
import { Button, Result } from 'ui'

import { RoutesConsts } from '@/consts'
import { useTranslation } from '@/i18n'

export const SuccessView = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['create-bank-profile'])

  if (!ready) {
    return null
  }

  return (
    <Result
      status="success"
      title={t('create-bank-profile:results.successView.title')}
      extra={
        <Button
          size="large"
          type="primary"
          onClick={() => router.push(RoutesConsts.BankCreationRedirectPath)}
        >
          {t('create-bank-profile:results.successView.goToBankButton')}
        </Button>
      }
    />
  )
}
