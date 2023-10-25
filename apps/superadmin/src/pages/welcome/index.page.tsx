import Link from 'next/link'
import { Button, Empty, EmptyDefaultSvg, Spin } from 'ui'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getWelcomeLayout } from '@/components'
import { useTranslation } from '@/i18n'

import styles from './styles.module.scss'

const Welcome: NextPageWithLayout = () => {
  const { t, ready } = useTranslation(['common', 'welcome'])

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.welcomePage}>
      <Empty
        className={styles.empty}
        image={<EmptyDefaultSvg />}
        description={t('welcome:emptyDescription')}
      >
        <Link href={RoutesConsts.CreateBankProfile}>
          <Button type="primary" size="large">
            {t('common:buttons.create')}
          </Button>
        </Link>
      </Empty>
    </div>
  )
}

Welcome.getLayout = getWelcomeLayout

export default Welcome
