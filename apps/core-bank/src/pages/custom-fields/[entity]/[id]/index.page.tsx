import { useRouter } from 'next/router'
import { Content, Header, INTEGRATED_RenderDynamicFields, Select, Spin, Tabs, theme } from 'ui'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useCustomField } from '@/domains/customFields'
import { useTranslation } from '@/i18n'

import { CustomFieldTabsKeys } from '../../types'
import { getCustomFieldsEntitiesOptions } from '../../consts'
import styles from './styles.module.scss'
import { CustomFieldGeneralTabContent, CustomFieldValidationTabContent } from './compoments'

const CustomField: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['custom-fields-[entity]-[id]', 'custom-fields'])
  const { token } = theme.useToken()
  const selectedEntity = router.query.entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities
  const customFieldId = router.query.id as INTEGRATED_RenderDynamicFields.DynamicField['id']
  const [activeTabKey, setActiveTabKey] = useState<CustomFieldTabsKeys>(CustomFieldTabsKeys.General)
  const { getCustomField } = useCustomField(selectedEntity, customFieldId)

  const isLoading = !ready || getCustomField.isLoading
  const customFieldExist = customFieldId && getCustomField.isSuccess && getCustomField.data

  useEffect(() => {
    if ((!getCustomField.isLoading && !customFieldExist) || getCustomField.isError) {
      router.back()
    }
  }, [getCustomField.isError, getCustomField.isLoading, router, customFieldExist])

  if (isLoading) {
    return <Spin fullscreen />
  }

  const customFieldsEntitiesOptions = getCustomFieldsEntitiesOptions(t)

  return (
    <div className={styles.customField}>
      <Header
        title={t('custom-fields-[entity]-[id]:title')}
        extra={
          <>
            <div className={styles.customField__entitySelectWrapper}>
              <Select options={customFieldsEntitiesOptions} value={selectedEntity} disabled />
            </div>
          </>
        }
        onBack={() =>
          router.push({
            pathname: RoutesConsts.CustomFields,
            query: {
              entity: selectedEntity,
            },
          })
        }
      />
      <Content>
        <Tabs
          tabBarStyle={{
            backgroundColor: token.colorBgContainer,
            paddingLeft: token.paddingLG,
            paddingRight: token.paddingLG,
          }}
          className={styles.customField__tabs}
          activeKey={activeTabKey}
          onChange={activeKey => setActiveTabKey(activeKey as CustomFieldTabsKeys)}
          items={[
            {
              key: CustomFieldTabsKeys.General,
              label: t('custom-fields-[entity]-[id]:tabs.general.label'),
              children: getCustomField.data && (
                <CustomFieldGeneralTabContent
                  customField={getCustomField.data}
                  selectedEntity={selectedEntity}
                  setActiveTabKey={setActiveTabKey}
                />
              ),
            },
            {
              key: CustomFieldTabsKeys.Validation,
              label: t('custom-fields-[entity]-[id]:tabs.validation.label'),
              children: getCustomField.data && (
                <CustomFieldValidationTabContent
                  customField={getCustomField.data}
                  selectedEntity={selectedEntity}
                />
              ),
            },
          ]}
        />
      </Content>
    </div>
  )
}

CustomField.getLayout = getCoreBankDefaultLayout

export default CustomField
