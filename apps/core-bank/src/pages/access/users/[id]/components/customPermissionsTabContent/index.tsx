import { dateTimeUtils } from 'utils'
import {
  Button,
  Card,
  Dropdown,
  Empty,
  EmptyDefaultSvg,
  FormHelpers,
  FormProps,
  PlusSquareOutlinedIcon,
  Table,
  TableColumnsType,
  handleApiError,
  useAppStatic,
  useModal,
} from 'ui'

import { DateTimeFormatConsts } from '@/consts'
import {
  CreateUserCustomPermissionRequestData,
  EditUserCustomPermissionRequestData,
  UserCustomPermission,
  useUserCustomPermission,
  useUserCustomPermissions,
} from '@/domains/users'
import { TFunction, useTranslation } from '@/i18n'

import { CustomPermissionsFormValues } from '../customPermissionsForm'
import { CustomPermissionsModal } from '../customPermissionsModal'
import styles from './styles.module.scss'

interface UserCustomPermissionsTableRecord
  extends Omit<UserCustomPermission, 'includeSubordinatedUnits'> {
  source: UserCustomPermission
  includeSubordinatedUnits: string
}

//TODO: check this value after bank settings implementation
const DATE_FORMAT = 'DD.MM.YYYY'

const getUserCustomPermissionsTableColumns = (
  t: TFunction
): TableColumnsType<UserCustomPermissionsTableRecord> => [
  {
    title: t('access-users-[id]:tabs.customPermissions.table.columns.titles.group'),
    dataIndex: 'permissionGroupName',
    key: 'group',
    fixed: 'left',
  },
  {
    title: t('access-users-[id]:tabs.customPermissions.table.columns.titles.permission'),
    dataIndex: 'permissionName',
    key: 'permission',
  },
  {
    title: t('access-users-[id]:tabs.customPermissions.table.columns.titles.unit'),
    dataIndex: 'unitName',
    key: 'unit',
  },
  {
    title: t(
      'access-users-[id]:tabs.customPermissions.table.columns.titles.includeSubordinatedUnits'
    ),
    dataIndex: 'includeSubordinatedUnits',
    key: 'includeSubordinatedUnits',
  },
  {
    title: t('access-users-[id]:tabs.customPermissions.table.columns.titles.validFrom'),
    dataIndex: 'validFrom',
    key: 'validFrom',
  },
  {
    title: t('access-users-[id]:tabs.customPermissions.table.columns.titles.validTo'),
    dataIndex: 'validTo',
    key: 'validTo',
  },
  {
    title: t('common:tables.columns.titles.actions'),
    dataIndex: 'actions',
    key: 'actions',
    width: '80px',
    fixed: 'right',
  },
]

const getUserCustomPermissionsTableRowActions = (
  t: TFunction,
  record: UserCustomPermission,
  openModal: (props?: UserCustomPermission | undefined) => void
) => {
  return [
    {
      key: 'edit',
      label: t('common:tables.rowActions.edit'),
      onClick: () => openModal(record),
    },
  ]
}

export interface CustomPermissionsTabContentProps {
  userId: string
}

export const CustomPermissionsTabContent = (props: CustomPermissionsTabContentProps) => {
  const { userId } = props

  const { message } = useAppStatic()
  const { t } = useTranslation(['common', 'access-users-[id]'])
  const { createUserCustomPermission, editUserCustomPermission } = useUserCustomPermission()
  const { getUserCustomPermissions } = useUserCustomPermissions({ userId })

  const {
    open: openCustomPermissionModal,
    close: closeCustomPermissionModal,
    isOpen: customPermissionModalIsOpen,
    props: customPermissionModalProps,
  } = useModal<UserCustomPermission>()

  const userCustomPermissionsTableColumns = getUserCustomPermissionsTableColumns(t)

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateUserCustomPermission = async ({
    values,
    helpers,
  }: {
    values: CreateUserCustomPermissionRequestData
    helpers: FormHelpers<CustomPermissionsFormValues>
  }) => {
    showSubmitMessage(0)

    return createUserCustomPermission
      .mutateAsync({ userId, ...values })
      .then(() => {
        showSuccessMessage()
        closeCustomPermissionModal()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const handleEditUserCustomPermission = async ({
    values,
    helpers,
  }: {
    values: EditUserCustomPermissionRequestData
    helpers: FormHelpers<CustomPermissionsFormValues>
  }) => {
    showSubmitMessage(0)

    return editUserCustomPermission
      .mutateAsync({ userId, ...values })
      .then(() => {
        showSuccessMessage()
        closeCustomPermissionModal()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const handleSubmit: FormProps<CustomPermissionsFormValues>['onSubmit'] = async (
    formValues,
    helpers
  ) => {
    if (customPermissionModalProps?.id) {
      const values: EditUserCustomPermissionRequestData = {
        ...customPermissionModalProps,
        ...formValues,
        validFrom: formValues.validFrom.format(DateTimeFormatConsts.DefaultDateTime),
        validTo: formValues.validTo
          ? formValues.validTo.format(DateTimeFormatConsts.DefaultDateTime)
          : null,
      }

      return handleEditUserCustomPermission({ values, helpers })
    } else {
      const values: CreateUserCustomPermissionRequestData = {
        ...formValues,
        validFrom: formValues.validFrom.format(DateTimeFormatConsts.DefaultDateTime),
        validTo: formValues.validTo
          ? formValues.validTo.format(DateTimeFormatConsts.DefaultDateTime)
          : null,
      }

      return handleCreateUserCustomPermission({ values, helpers })
    }
  }

  return (
    <>
      <div className={styles.customPermissions}>
        {getUserCustomPermissions.data?.length ? (
          <Card
            title={t('access-users-[id]:tabs.customPermissions.subtitle')}
            className={styles.customPermissions__contentCard}
            extra={
              <>
                <Button onClick={() => openCustomPermissionModal()}>
                  <PlusSquareOutlinedIcon />
                  {t('access-users-[id]:buttons.addCustomPermission')}
                </Button>
              </>
            }
          >
            <Table<UserCustomPermissionsTableRecord>
              columns={userCustomPermissionsTableColumns}
              pagination={{
                total: getUserCustomPermissions.data?.length,
                position: ['bottomCenter'],
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getUserCustomPermissions.data?.map(customPermission => ({
                ...customPermission,
                key: customPermission.id,
                source: customPermission,
                includeSubordinatedUnits: customPermission.includeSubordinatedUnits
                  ? t('common:tables.values.yes')
                  : t('common:tables.values.no'),
                validFrom: dateTimeUtils.dateTime(customPermission.validFrom).format(DATE_FORMAT),
                validTo:
                  customPermission.validTo &&
                  dateTimeUtils.dateTime(customPermission.validTo).format(DATE_FORMAT),
                actions: (
                  <Dropdown
                    menu={{
                      items: getUserCustomPermissionsTableRowActions(
                        t,
                        customPermission,
                        openCustomPermissionModal
                      ),
                    }}
                  >
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              scroll={{ x: true }}
            />
          </Card>
        ) : (
          <Empty
            className={styles.customPermissions__empty}
            image={<EmptyDefaultSvg />}
            description={t('access-users-[id]:empty.noCustomPermissions')}
          >
            <Button type="primary" size="large" onClick={() => openCustomPermissionModal()}>
              {t('access-users-[id]:buttons.addCustomPermission')}
            </Button>
          </Empty>
        )}
      </div>
      <CustomPermissionsModal
        open={customPermissionModalIsOpen}
        onCancel={closeCustomPermissionModal}
        loading={createUserCustomPermission.isLoading}
        customPermissionsFormProps={{
          onSubmit: handleSubmit,
          initialValues: {
            permissionId: '',
            unitId: '',
            includeSubordinatedUnits: false,
            ...customPermissionModalProps,
            validFrom: dateTimeUtils.dateTime(customPermissionModalProps?.validFrom || undefined),
            validTo: customPermissionModalProps?.validTo
              ? dateTimeUtils.dateTime(customPermissionModalProps.validTo)
              : null,
          },
        }}
      />
    </>
  )
}
