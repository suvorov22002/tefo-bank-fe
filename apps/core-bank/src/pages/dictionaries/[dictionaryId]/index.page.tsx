import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  Empty,
  EmptyDefaultSvg,
  Header,
  PlusSquareOutlinedIcon,
  Spin,
  usePagination,
} from 'ui'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'
import { useDictionary, useDictionaryValues } from '@/domains/dictionaries'

import { DictionaryValuesTable } from '../components/tables'
import styles from './styles.module.scss'

const Dictionary: NextPageWithLayout = () => {
  const pagination = usePagination()
  const router = useRouter()
  const dictionaryId = Number(router.query.dictionaryId)

  const { getDictionary } = useDictionary(Number(dictionaryId))

  const { getDictionaryValues } = useDictionaryValues({
    dictionaryId,
    page: pagination.current,
    limit: pagination.pageSize,
  })

  const { t, ready } = useTranslation(['common', 'dictionaries-[dictionaryId]'])

  const isLoading = !ready || getDictionaryValues.isLoading || getDictionary.isLoading
  const dictionaryExist = dictionaryId && getDictionary.isSuccess && getDictionary.data

  useEffect(() => {
    if ((!getDictionary.isLoading && !dictionaryExist) || getDictionary.isError) {
      router.back()
    }
  }, [getDictionary.isError, getDictionary.isLoading, router, dictionaryExist])

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.dictionary}>
      <Header
        title={t('dictionaries-[dictionaryId]:title', { name: getDictionary.data?.name })}
        onBack={() => router.push(RoutesConsts.Dictionaries)}
        className={styles.dictionary__header}
        extra={
          <>
            <Button
              icon={<PlusSquareOutlinedIcon />}
              onClick={() => router.push(RoutesConsts.getDictionaryAddValueRoute(dictionaryId))}
            >
              {t('dictionaries-[dictionaryId]:buttons.addNewDictionaryValue')}
            </Button>
          </>
        }
      />
      <Content>
        {getDictionaryValues.data ? (
          getDictionaryValues.data.data.length ? (
            <Card className={styles.dictionary__contentCard} title={getDictionary?.data?.name}>
              <DictionaryValuesTable
                dictionary={getDictionary.data}
                dictionaryValues={getDictionaryValues.data.data}
                pagination={pagination}
                total={getDictionaryValues.data.totalItems}
              />
            </Card>
          ) : (
            <Empty
              className={styles.dictionary__empty}
              image={<EmptyDefaultSvg />}
              description={t('dictionaries-[dictionaryId]:empty.description')}
            >
              <Button
                type="primary"
                size="large"
                block
                onClick={() => router.push(RoutesConsts.getDictionaryAddValueRoute(dictionaryId))}
              >
                {t('common:buttons.create')}
              </Button>
            </Empty>
          )
        ) : null}
      </Content>
    </div>
  )
}

Dictionary.getLayout = getCoreBankDefaultLayout

export default Dictionary
