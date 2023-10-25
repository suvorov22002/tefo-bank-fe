import { Card, Spin, usePagination } from 'ui'

import { useSystemDictionaries } from '@/domains/dictionaries'
import { useTranslation } from '@/i18n'

import { DictionariesTable } from '../../tables'
import styles from './styles.module.scss'

export const SystemDictionariesTabContent = () => {
  const pagination = usePagination()
  const { getSystemDictionaries } = useSystemDictionaries({
    page: pagination.current,
    limit: pagination.pageSize,
  })

  const { t, ready } = useTranslation(['dictionaries'])

  const isLoading = !ready || getSystemDictionaries.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  return getSystemDictionaries.data ? (
    <Card
      className={styles.systemDictionariesTab__contentCard}
      title={t('dictionaries:tabs.systemDictionaries.title')}
    >
      <DictionariesTable
        dictionaries={getSystemDictionaries.data.data}
        pagination={pagination}
        total={getSystemDictionaries.data.totalItems}
      />
    </Card>
  ) : null
}
