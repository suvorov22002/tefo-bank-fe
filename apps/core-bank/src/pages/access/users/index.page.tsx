import { ReactNode } from 'react'
import { dateTimeUtils } from 'utils'
import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Content,
  Dropdown,
  Empty,
  EmptyDefaultSvg,
  Header,
  Select,
  Spin,
  Table,
  TableColumnsType,
  UserAddOutlinedIcon,
  handleApiError,
  useAppStatic,
  useModal,
  usePagination,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { GetUsersDataItem, UserStatuses, useUser, useUsers } from '@/domains/users'
import { TFunction, useTranslation } from '@/i18n'

import { ResetPasswordModal } from './[id]/components/resetPasswordModal'
import styles from './styles.module.scss'

// TODO: Remove after global date format handling implementation
const DATE_FORMAT = 'DD.MM.YYYY'

const getUserStatusDisplay = (
  t: TFunction
): Record<GetUsersDataItem['status'], { label: string; status: BadgeProps['status'] }> => ({
  [UserStatuses.Active]: {
    label: t('access-users:usersTable.userStatuses.active'),
    status: 'success',
  },
  [UserStatuses.Inactive]: {
    label: t('access-users:usersTable.userStatuses.inactive'),
    status: 'error',
  },
  [UserStatuses.New]: {
    label: t('access-users:usersTable.userStatuses.new'),
    status: 'default',
  },
  [UserStatuses.Pending]: {
    label: t('access-users:usersTable.userStatuses.pending'),
    status: 'processing',
  },
  [UserStatuses.Locked]: {
    label: t('access-users:usersTable.userStatuses.locked'),
    status: 'warning',
  },
  [UserStatuses.Blocked]: {
    label: t('access-users:usersTable.userStatuses.blocked'),
    status: 'error',
  },
})

const getUserTableColumns = (t: TFunction): TableColumnsType<UserTableRecord> => [
  {
    title: t('access-users:usersTable.columns.titles.userName'),
    dataIndex: 'userName',
    key: 'userName',
    fixed: 'left',
  },
  {
    title: t('access-users:usersTable.columns.titles.firstName'),
    dataIndex: 'firstName',
    key: 'firstName',
  },
  {
    title: t('access-users:usersTable.columns.titles.lastName'),
    dataIndex: 'lastName',
    key: 'lastName',
  },
  {
    title: t('access-users:usersTable.columns.titles.title'),
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: t('access-users:usersTable.columns.titles.email'),
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: t('access-users:usersTable.columns.titles.lastLoginDate'),
    dataIndex: 'lastLoginDate',
    key: 'lastLoginDate',
  },
  {
    title: t('access-users:usersTable.columns.titles.status'),
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: t('common:tables.columns.titles.actions'),
    dataIndex: 'actions',
    key: 'actions',
    width: '80px',
    fixed: 'right',
  },
]

const getUserTableRowActions = (
  t: TFunction,
  router: NextRouter,
  userId: string,
  actions: {
    approve: (userId: string) => void
    inactivate: (userId: string) => void
    resetPassword: (userId: string) => void
  },
  status: UserStatuses
) => {
  const tableRowActions = []

  tableRowActions.push({
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getUserRoute(userId),
        query: {
          isUserDetailsInitialModeEdit: true,
        },
      }),
  })

  if (status === UserStatuses.New) {
    tableRowActions.push({
      key: 'approve',
      label: t('access-users:usersTable.rowActions.approve'),
      onClick: () => actions.approve(userId),
    })
  }
  if (
    status === UserStatuses.Blocked ||
    status === UserStatuses.Pending ||
    status === UserStatuses.Inactive
  ) {
    tableRowActions.push({
      key: 'resetPassword',
      label: t('access-users:usersTable.rowActions.resetPassword'),
      onClick: () => actions.resetPassword(userId),
    })
  }
  if (status !== UserStatuses.New && status !== UserStatuses.Inactive) {
    tableRowActions.push({
      key: 'inactivate',
      label: t('access-users:usersTable.rowActions.inactivate'),
      onClick: () => actions.inactivate(userId),
    })
  }

  return tableRowActions
}

interface UserTableRecord extends Omit<GetUsersDataItem, 'status'> {
  source: GetUsersDataItem
  status: ReactNode
}

const Users: NextPageWithLayout = () => {
  const { message } = useAppStatic()
  const router = useRouter()
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'access-users'])

  const { getUsers } = useUsers({ page: pagination.current, limit: pagination.pageSize })
  const { resetUserPassword, approveUser, inactivateUser } = useUser({})

  const {
    open: openResetPasswordModal,
    close: closeResetPasswordModal,
    isOpen: resetPasswordModalIsOpen,
    props: resetPasswordModalProps,
  } = useModal<{ otp: string }>()

  const isLoading = !ready || getUsers.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const userStatusDisplay = getUserStatusDisplay(t)
  const userTableColumns = getUserTableColumns(t)

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const approve = async (userId: string) => {
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

  const inactivate = async (userId: string) => {
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

  const resetPassword = async (userId: string) => {
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

  return (
    <div className={styles.users}>
      {!!getUsers.data?.data.length && (
        <Header
          title={t('access-users:title')}
          className={styles.users__header}
          extra={
            <>
              {getUsers.data?.data.length ? (
                <Button
                  icon={<UserAddOutlinedIcon />}
                  onClick={() => router.push(RoutesConsts.CreateUser)}
                >
                  {t('access-users:buttons.addUser')}
                </Button>
              ) : undefined}
            </>
          }
        />
      )}
      <Content>
        {getUsers.data?.data.length ? (
          <Card title={t('access-users:subtitle')} className={styles.users__contentCard}>
            <div className={styles.users__filters}>
              <div className={styles.users__filterItem}>
                <Select
                  label={<span>{t('access-users:usersTable.filters.byUnit')}:</span>}
                  labelCol={{ span: 24 }}
                />
              </div>
              <div className={styles.users__filterItem}>
                <Select
                  label={<span>{t('access-users:usersTable.filters.byJobType')}:</span>}
                  labelCol={{ span: 24 }}
                />
              </div>
            </div>
            <Table<UserTableRecord>
              columns={userTableColumns}
              pagination={{
                ...pagination,
                total: getUsers.data.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getUsers.data?.data.map(user => ({
                ...user,
                key: user.id,
                source: user,
                lastLoginDate:
                  user.lastLoginDate &&
                  dateTimeUtils.dateTime(user.lastLoginDate).format(DATE_FORMAT),
                actions: (
                  <Dropdown
                    menu={{
                      items: getUserTableRowActions(
                        t,
                        router,
                        user.id,
                        {
                          approve,
                          inactivate,
                          resetPassword,
                        },
                        user.status
                      ),
                    }}
                  >
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
                status: (
                  <Badge
                    text={userStatusDisplay[user.status].label}
                    status={userStatusDisplay[user.status].status}
                  />
                ),
              }))}
              scroll={{ x: true }}
              onRow={record => ({
                onClick: () => router.push(RoutesConsts.getUserRoute(record.source.id)),
              })}
            />
          </Card>
        ) : (
          <Empty
            image={<EmptyDefaultSvg />}
            description={t('access-users:empty')}
            className={styles.users__empty}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => router.push(RoutesConsts.CreateUser)}
            >
              {t('access-users:buttons.addUser')}
            </Button>
          </Empty>
        )}
      </Content>
      <ResetPasswordModal
        open={resetPasswordModalIsOpen}
        onCancel={closeResetPasswordModal}
        {...resetPasswordModalProps}
      />
    </div>
  )
}

Users.getLayout = getCoreBankDefaultLayout

export default Users
