import { useRouter } from 'next/router'
import {
  Avatar,
  Button,
  Content,
  Dropdown,
  Header,
  Spin,
  Tabs,
  Text,
  Title,
  handleApiError,
  theme,
  useAppStatic,
  useModal,
} from 'ui'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { TFunction, useTranslation } from '@/i18n'
import { UserStatuses, useUser, useUserDetailsTemplate } from '@/domains/users'

import { UserDetailsTabsKeys } from './consts'
import {
  CustomPermissionsTabContent,
  JobTypesTabContent,
  UserDetailsTabContent,
} from './components'

import { ResetPasswordModal } from './components/resetPasswordModal'
import styles from './styles.module.scss'

const getPageControls = (
  t: TFunction,
  actions: { approve: () => void; inactivate: () => void; resetPassword: () => void },
  status: UserStatuses
) => {
  const pageControls = []

  if (status === UserStatuses.New) {
    pageControls.push({
      key: 'approve',
      label: t('access-users-[id]:pageControls.approve'),
      onClick: actions.approve,
    })
  }
  if (
    status === UserStatuses.Blocked ||
    status === UserStatuses.Pending ||
    status === UserStatuses.Inactive
  ) {
    pageControls.push({
      key: 'resetPassword',
      label: t('access-users-[id]:pageControls.resetPassword'),
      onClick: actions.resetPassword,
    })
  }
  if (status !== UserStatuses.New && status !== UserStatuses.Inactive) {
    pageControls.push({
      key: 'inactivate',
      label: t('access-users-[id]:pageControls.inactivate'),
      onClick: actions.inactivate,
    })
  }

  return pageControls
}

const UserDetails: NextPageWithLayout = () => {
  const { message } = useAppStatic()
  const router = useRouter()
  const { token } = theme.useToken()
  const { t, ready } = useTranslation(['common', 'access-users-[id]'])

  const {
    open: openResetPasswordModal,
    close: closeResetPasswordModal,
    isOpen: resetPasswordModalIsOpen,
    props: resetPasswordModalProps,
  } = useModal<{ otp: string }>()

  const userId = String(router.query.id)
  const activeTabKey = router.query.activeTabKey
    ? String(router.query.activeTabKey)
    : UserDetailsTabsKeys.Details

  const [isUserDetailsFormInEditMode, setIsUserDetailsFormInEditMode] = useState<boolean>(
    !!router.query.isUserDetailsInitialModeEdit
  )

  const { getUser, editUserDetails, resetUserPassword, approveUser, inactivateUser } = useUser({
    userId,
  })
  const { getUserDetailsTemplate } = useUserDetailsTemplate({
    shouldQueryUserDetailsTemplate: true,
  })

  const isLoading = !ready || getUser.isLoading || getUserDetailsTemplate.isLoading
  const userExists = userId && getUser.isSuccess && getUser.data

  useEffect(() => {
    if ((!getUser.isLoading && !userExists) || getUser.isError) {
      router.back()
    }
  }, [getUser.isError, getUser.isLoading, router, userExists])

  const setUserDetailsActiveTabKey = (key: UserDetailsTabsKeys) => {
    router.push({ query: { ...router.query, activeTabKey: key } })
  }

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const approve = async () => {
    showSubmitMessage(0)

    return approveUser
      .mutateAsync(userId)
      .then(({ password }) => {
        openResetPasswordModal({ otp: password })
      })
      .catch(e => {
        handleApiError(e.body, message.error, t)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const inactivate = async () => {
    showSubmitMessage(0)

    return inactivateUser
      .mutateAsync(userId)
      .then(() => {
        showSuccessMessage()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const resetPassword = async () => {
    showSubmitMessage(0)

    return resetUserPassword
      .mutateAsync(userId)
      .then(({ password }) => {
        openResetPasswordModal({ otp: password })
      })
      .catch(e => {
        handleApiError(e.body, message.error, t)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <>
      <div className={styles.userDetails}>
        <Header
          title={t('access-users-[id]:title')}
          onBack={() => router.push(RoutesConsts.Users)}
          extra={
            <Dropdown
              menu={{
                items: getPageControls(
                  t,
                  {
                    approve,
                    inactivate,
                    resetPassword,
                  },
                  getUser.data?.status as UserStatuses
                ),
              }}
              disabled={editUserDetails.isLoading}
            >
              <Button type="text">...</Button>
            </Dropdown>
          }
        />
        <div
          style={{
            backgroundColor: token.colorBgContainer,
            paddingLeft: token.paddingLG,
            paddingRight: token.paddingLG,
          }}
          className={styles.userDetails__info}
        >
          <Avatar>{getUser.data?.userName[0].toUpperCase()}</Avatar>
          <div>
            <Title level={5} className={styles['userDetails__info-title']}>
              {getUser.data?.userName}
            </Title>
            <Text>User role</Text>
          </div>
        </div>
        <Content>
          <Tabs
            activeKey={activeTabKey}
            onChange={key => {
              setUserDetailsActiveTabKey(key as UserDetailsTabsKeys)
            }}
            defaultActiveKey={UserDetailsTabsKeys.Details}
            tabBarStyle={{
              backgroundColor: token.colorBgContainer,
              paddingLeft: token.paddingLG,
              paddingRight: token.paddingLG,
            }}
            className={styles.userDetails__tabs}
            destroyInactiveTabPane={true}
            size="large"
            items={[
              {
                key: UserDetailsTabsKeys.Details,
                label: t('access-users-[id]:tabs.details.label'),
                children: (
                  <UserDetailsTabContent
                    getUserDetailsData={getUser.data}
                    userDetailsTemplate={getUserDetailsTemplate.data}
                    isUserDetailsFormInEditMode={isUserDetailsFormInEditMode}
                    isEditUserDetailsLoading={editUserDetails.isLoading}
                    setIsUserDetailsFormInEditMode={setIsUserDetailsFormInEditMode}
                  />
                ),
              },
              {
                key: UserDetailsTabsKeys.JobTypes,
                label: t('access-users-[id]:tabs.jobTypes.label'),
                children: <JobTypesTabContent userId={userId} />,
              },
              {
                key: UserDetailsTabsKeys.CustomPermissions,
                label: t('access-users-[id]:tabs.customPermissions.label'),
                children: <CustomPermissionsTabContent userId={userId} />,
              },
            ]}
          />
        </Content>
      </div>
      <ResetPasswordModal
        open={resetPasswordModalIsOpen}
        onCancel={closeResetPasswordModal}
        {...resetPasswordModalProps}
      />
    </>
  )
}

UserDetails.getLayout = getCoreBankDefaultLayout

export default UserDetails
