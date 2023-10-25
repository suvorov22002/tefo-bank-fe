import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Button,
  Content,
  Header,
  PlusSquareOutlinedIcon,
  Spin,
  Tabs,
  theme,
  usePagination,
} from 'ui'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'
import { useUserDictionaries } from '@/domains/dictionaries'

import { DictionariesTabsKeys } from './types'
import styles from './styles.module.scss'
import { SystemDictionariesTabContent, UserDictionariesTabContent } from './components'

const Dictionaries: NextPageWithLayout = () => {
  const router = useRouter()
  const pagination = usePagination()

  const [activeTabKey, setActiveTabKey] = useState<DictionariesTabsKeys>(
    (router.query.activeTabKey as DictionariesTabsKeys | undefined) || DictionariesTabsKeys.User
  )

  const { getUserDictionaries } = useUserDictionaries({
    page: pagination.current,
    limit: pagination.pageSize,
  })

  const { token } = theme.useToken()
  const { t, ready } = useTranslation(['common', 'dictionaries'])

  const isLoading = !ready || getUserDictionaries.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const tabsItems = [
    {
      key: DictionariesTabsKeys.User,
      label: t('dictionaries:tabs.userDictionaries.label'),
      children: (
        <UserDictionariesTabContent
          userDictionariesData={getUserDictionaries.data}
          pagination={pagination}
        />
      ),
    },
    {
      key: DictionariesTabsKeys.System,
      label: t('dictionaries:tabs.systemDictionaries.label'),
      children: <SystemDictionariesTabContent />,
    },
  ]

  return (
    <div className={styles.dictionaries}>
      <Header
        title={t('dictionaries:title')}
        extra={
          activeTabKey === DictionariesTabsKeys.User && !!getUserDictionaries.data?.data.length ? (
            <>
              <Button
                icon={<PlusSquareOutlinedIcon />}
                onClick={() => router.push(RoutesConsts.CreateDictionary)}
              >
                {t('dictionaries:buttons.addNewDictionary')}
              </Button>
            </>
          ) : undefined
        }
      />
      <Content>
        <Tabs
          className={styles.dictionaries__tabs}
          tabBarStyle={{
            backgroundColor: token.colorBgContainer,
          }}
          onChange={key => {
            router.replace({ query: { activeTabKey: key } })
            setActiveTabKey(key as DictionariesTabsKeys)
            pagination.setCurrent(1)
          }}
          activeKey={activeTabKey}
          items={tabsItems}
          size="large"
        />
      </Content>
    </div>
  )
}

Dictionaries.getLayout = getCoreBankDefaultLayout

export default Dictionaries
