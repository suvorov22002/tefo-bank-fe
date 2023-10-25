import { useRouter } from 'next/router'
import { Content, Header, Spin, Tabs, theme } from 'ui'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'
import { useJobType, useJobTypeTemplate } from '@/domains/jobTypes'

import { JobTypeDetailsTabsKeys } from './consts'
import styles from './styles.module.scss'
import { JobTypeDetailsTabContent, JobTypePermissionsTabContent } from './components'

const JobTypeDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const { token } = theme.useToken()
  const { t, ready } = useTranslation(['common', 'access-job-types-[jobTypeId]'])

  const jobTypeId = String(router.query.jobTypeId)
  const activeTabKey = router.query.activeTabKey
    ? String(router.query.activeTabKey)
    : JobTypeDetailsTabsKeys.Details

  const [isJobTypeDetailsFormInEditMode, setIsJobTypeDetailsFormInEditMode] = useState<boolean>(
    !!router.query.isDetailsInitialModeEdit
  )
  const [isJobTypePermissionsFormInEditMode, setIsJobTypePermissionsFormInEditMode] =
    useState<boolean>(!!router.query.isPermissionsInitialModeEdit)

  const { getJobType } = useJobType({ jobTypeId })
  const { getJobTypeTemplate } = useJobTypeTemplate({
    shouldQueryJobTypeTemplate: true,
  })

  const isLoading = !ready || getJobType.isLoading || getJobTypeTemplate.isLoading

  const jobTypeExist = jobTypeId && getJobType.isSuccess && getJobType.data

  useEffect(() => {
    if ((!getJobType.isLoading && !jobTypeExist) || getJobType.isError) {
      router.back()
    }
  }, [getJobType.isError, getJobType.isLoading, jobTypeExist, router])

  const setJobTypeDetailsActiveTabKey = (key: JobTypeDetailsTabsKeys) => {
    router.push({ query: { ...router.query, activeTabKey: key } })
  }

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.jobTypeDetails}>
      <Header title={getJobType.data?.name} onBack={() => router.push(RoutesConsts.JobTypes)} />
      <Content>
        <Tabs
          tabBarStyle={{
            backgroundColor: token.colorBgContainer,
            paddingLeft: token.paddingLG,
            paddingRight: token.paddingLG,
          }}
          onChange={key => {
            setJobTypeDetailsActiveTabKey(key as JobTypeDetailsTabsKeys)
          }}
          activeKey={activeTabKey}
          defaultActiveKey={JobTypeDetailsTabsKeys.Details}
          destroyInactiveTabPane={true}
          className={styles.jobTypeDetails__tabs}
          size="large"
          items={[
            {
              key: JobTypeDetailsTabsKeys.Details,
              label: t('access-job-types-[jobTypeId]:tabs.details.label'),
              children: (
                <JobTypeDetailsTabContent
                  getJobTypeData={getJobType.data}
                  jobTypeTemplate={getJobTypeTemplate.data}
                  setJobTypeDetailsActiveTabKey={setJobTypeDetailsActiveTabKey}
                  isJobTypeDetailsFormInEditMode={isJobTypeDetailsFormInEditMode}
                  setIsJobTypeDetailsFormInEditMode={setIsJobTypeDetailsFormInEditMode}
                  setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditMode}
                />
              ),
            },
            {
              key: JobTypeDetailsTabsKeys.Permissions,
              label: t('access-job-types-[jobTypeId]:tabs.permissions.label'),
              children: (
                <JobTypePermissionsTabContent
                  getJobTypeData={getJobType.data}
                  isJobTypePermissionsFormInEditMode={isJobTypePermissionsFormInEditMode}
                  setIsJobTypePermissionsFormInEditMode={setIsJobTypePermissionsFormInEditMode}
                />
              ),
            },
          ]}
        />
      </Content>
    </div>
  )
}

JobTypeDetails.getLayout = getCoreBankDefaultLayout

export default JobTypeDetails
