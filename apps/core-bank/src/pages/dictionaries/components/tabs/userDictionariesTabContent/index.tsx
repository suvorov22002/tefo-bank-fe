import { useRouter } from 'next/router'
import { Button, Card, Empty, EmptyDefaultSvg, Spin, UsePaginationResults } from 'ui'

import { GetUserDictionariesResponseData } from '@/domains/dictionaries'
import { RoutesConsts } from '@/consts'
import { useTranslation } from '@/i18n'

import { DictionariesTable } from '../../tables'
import styles from './styles.module.scss'

interface UserDictionariesTabContentProps {
  userDictionariesData: GetUserDictionariesResponseData | undefined
  pagination: UsePaginationResults
}

export const UserDictionariesTabContent = ({
  userDictionariesData,
  pagination,
}: UserDictionariesTabContentProps) => {
  const { t, ready } = useTranslation(['common', 'dictionaries'])
  const router = useRouter()

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  return userDictionariesData ? (
    <>
      {userDictionariesData.data.length ? (
        <Card
          className={styles.userDictionariesTab__contentCard}
          title={t('dictionaries:tabs.userDictionaries.title')}
        >
          {userDictionariesData.data && (
            <DictionariesTable
              dictionaries={userDictionariesData.data}
              total={userDictionariesData.totalItems}
              pagination={pagination}
            />
          )}
        </Card>
      ) : (
        <Empty
          className={styles.userDictionariesTab__empty}
          image={<EmptyDefaultSvg />}
          description={t('dictionaries:tabs.userDictionaries.emptyDescription')}
        >
          <Button
            type="primary"
            size="large"
            block
            onClick={() => router.push(RoutesConsts.CreateDictionary)}
          >
            {t('common:buttons.create')}
          </Button>
        </Empty>
      )}
    </>
  ) : null
}
