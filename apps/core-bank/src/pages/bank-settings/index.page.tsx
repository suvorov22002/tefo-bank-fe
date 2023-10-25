import { useRouter } from 'next/router'
import { useState } from 'react'
import { Content, Header, Spin, Tabs, theme } from 'ui'

import { NextPageWithLayout } from '@/types'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'

import { BankSettingsTabsKeys } from './consts'
import styles from './styles.module.scss'
import {
  BankSettingsAccessTabContent,
  BankSettingsAccountingTabContent,
  BankSettingsClosuresTabContent,
  BankSettingsCustomersTabContent,
  BankSettingsFXPositionTabContent,
  BankSettingsGeneralTabContent,
  BankSettingsTimeTabContent,
  BankSettingsTransactionsTabContent,
} from './components'

export interface EditBankSettingsFormValues {}

const BankSettings: NextPageWithLayout = () => {
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { token } = theme.useToken()
  const router = useRouter()

  const activeTabKey = router.query.activeTabKey
    ? String(router.query.activeTabKey)
    : BankSettingsTabsKeys.General

  const [bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap] = useState<
    Record<BankSettingsTabsKeys, boolean>
  >({
    [BankSettingsTabsKeys.General]: false,
    [BankSettingsTabsKeys.Time]: false,
    [BankSettingsTabsKeys.Closures]: false,
    [BankSettingsTabsKeys.Accounting]: false,
    [BankSettingsTabsKeys.Access]: false,
    [BankSettingsTabsKeys.Customers]: false,
    [BankSettingsTabsKeys.Transactions]: false,
    [BankSettingsTabsKeys.FXPosition]: false,
  })

  const setBankSettingsActiveTabKey = (key: BankSettingsTabsKeys) => {
    router.push({ query: { ...router.query, activeTabKey: key } })
  }

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.bankSettings}>
      <Header title={t('bank-settings:title')} />
      <Content>
        <Tabs
          tabBarStyle={{
            backgroundColor: token.colorBgContainer,
            paddingLeft: token.paddingLG,
            paddingRight: token.paddingLG,
          }}
          className={styles.bankSettings__tabs}
          onChange={key => {
            setBankSettingsActiveTabKey(key as BankSettingsTabsKeys)
          }}
          activeKey={activeTabKey}
          defaultActiveKey={BankSettingsTabsKeys.General}
          destroyInactiveTabPane={true}
          size="large"
          items={[
            {
              key: BankSettingsTabsKeys.General,
              label: t('bank-settings:tabs.general.label'),
              children: (
                <BankSettingsGeneralTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
            {
              key: BankSettingsTabsKeys.Time,
              label: t('bank-settings:tabs.time.label'),
              children: (
                <BankSettingsTimeTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
            {
              key: BankSettingsTabsKeys.Closures,
              label: t('bank-settings:tabs.closures.label'),
              children: (
                <BankSettingsClosuresTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
            {
              key: BankSettingsTabsKeys.Accounting,
              label: t('bank-settings:tabs.accounting.label'),
              children: (
                <BankSettingsAccountingTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
            {
              key: BankSettingsTabsKeys.Access,
              label: t('bank-settings:tabs.access.label'),
              children: (
                <BankSettingsAccessTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
            {
              key: BankSettingsTabsKeys.Customers,
              label: t('bank-settings:tabs.customers.label'),
              children: (
                <BankSettingsCustomersTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
            {
              key: BankSettingsTabsKeys.Transactions,
              label: t('bank-settings:tabs.transactions.label'),
              children: (
                <BankSettingsTransactionsTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
            {
              key: BankSettingsTabsKeys.FXPosition,
              label: t('bank-settings:tabs.FXPosition.label'),
              children: (
                <BankSettingsFXPositionTabContent
                  bankSettingsFormsEditModeMap={bankSettingsFormsEditModeMap}
                  setBankSettingsFormsEditModeMap={setBankSettingsFormsEditModeMap}
                />
              ),
            },
          ]}
        />
      </Content>
    </div>
  )
}

BankSettings.getLayout = getCoreBankDefaultLayout

export default BankSettings
