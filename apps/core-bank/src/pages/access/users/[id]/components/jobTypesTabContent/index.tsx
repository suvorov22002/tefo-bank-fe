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
  Text,
  handleApiError,
  useAppStatic,
  useModal,
} from 'ui'

import { DateTimeFormatConsts } from '@/consts'
import {
  CreateUserJobTypeRequestData,
  UserJobType,
  useUserJobType,
  useUserJobTypes,
} from '@/domains/users'
import { TFunction, useTranslation } from '@/i18n'

import { JobTypesModal } from '../jobTypesModal'
import { UserJobTypesFormValues } from '../jobTypesForm'
import styles from './styles.module.scss'

interface UserJobTypesTableRecord
  extends Omit<UserJobType, 'includeSubordinatedUnits'>,
    Record<string, unknown> {
  source: UserJobType
  includeSubordinatedUnits: string
}

//TODO: check this value after bank settings implementation
const DATE_FORMAT = 'DD.MM.YYYY'

const getUserJobTypesTableColumns = (t: TFunction): TableColumnsType<UserJobTypesTableRecord> => [
  {
    title: t('access-users-[id]:tabs.jobTypes.table.columns.titles.jobTypeName'),
    dataIndex: 'jobTypeName',
    key: 'jobType',
    fixed: 'left',
  },
  {
    title: t('access-users-[id]:tabs.jobTypes.table.columns.titles.unit'),
    dataIndex: 'unitName',
    key: 'unit',
  },
  {
    title: t('access-users-[id]:tabs.jobTypes.table.columns.titles.includeSubordinatedUnits'),
    dataIndex: 'includeSubordinatedUnits',
    key: 'includeSubordinatedUnits',
  },
  {
    title: t('access-users-[id]:tabs.jobTypes.table.columns.titles.validFrom'),
    dataIndex: 'validFrom',
    key: 'validFrom',
  },
  {
    title: t('access-users-[id]:tabs.jobTypes.table.columns.titles.validTo'),
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

const getUserJobTypesTableRowActions = (
  t: TFunction,
  record: UserJobType,
  openModal: (props?: UserJobType | undefined) => void
) => {
  return [
    {
      key: 'edit',
      label: t('common:tables.rowActions.edit'),
      onClick: () => openModal(record),
    },
  ]
}

export interface JobTypesTabContentProps {
  userId: string
}

export const JobTypesTabContent = (props: JobTypesTabContentProps) => {
  const { userId } = props
  const { message } = useAppStatic()
  const { t } = useTranslation(['common', 'access-users-[id]'])
  const { createUserJobType, editUserJobType } = useUserJobType()
  const { getUserJobTypes } = useUserJobTypes({ userId })

  const {
    open: openJobTypeModal,
    close: closeJobTypeModal,
    isOpen: jobTypeModalIsOpen,
    props: jobTypeModalProps,
  } = useModal<UserJobType>()

  const userJobTypesTableColumns = getUserJobTypesTableColumns(t)

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateUpdateUserJobType = async ({
    values,
    helpers,
  }: {
    values: CreateUserJobTypeRequestData
    helpers: FormHelpers<UserJobTypesFormValues>
  }) => {
    showSubmitMessage(0)

    return createUserJobType
      .mutateAsync({ userId, ...values })
      .then(() => {
        showSuccessMessage()
        closeJobTypeModal()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const handleEditUserJobType = async ({
    values,
    helpers,
  }: {
    values: UserJobType
    helpers: FormHelpers<UserJobTypesFormValues>
  }) => {
    showSubmitMessage(0)

    return editUserJobType
      .mutateAsync({ userId, ...values })
      .then(() => {
        showSuccessMessage()
        closeJobTypeModal()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const handleSubmit: FormProps<UserJobTypesFormValues>['onSubmit'] = async (
    formValues,
    helpers
  ) => {
    if (jobTypeModalProps?.id) {
      const values: UserJobType = {
        ...jobTypeModalProps,
        ...formValues,
        validFrom: formValues.validFrom.format(DateTimeFormatConsts.DefaultDateTime),
        validTo: formValues.validTo
          ? formValues.validTo.format(DateTimeFormatConsts.DefaultDateTime)
          : null,
      }

      return handleEditUserJobType({ values, helpers })
    } else {
      const values: CreateUserJobTypeRequestData = {
        ...formValues,
        validFrom: formValues.validFrom.format(DateTimeFormatConsts.DefaultDateTime),
        validTo: formValues.validTo
          ? formValues.validTo.format(DateTimeFormatConsts.DefaultDateTime)
          : null,
      }

      return handleCreateUpdateUserJobType({ values, helpers })
    }
  }

  return (
    <>
      <div className={styles.jobTypes}>
        {getUserJobTypes.data?.length ? (
          <Card
            title={t('access-users-[id]:tabs.jobTypes.subtitle')}
            className={styles.jobTypes__contentCard}
            extra={
              <>
                <Button onClick={() => openJobTypeModal()}>
                  <PlusSquareOutlinedIcon />
                  {t('access-users-[id]:buttons.addJobType')}
                </Button>
              </>
            }
          >
            <Table<UserJobTypesTableRecord>
              columns={userJobTypesTableColumns}
              expandable={{
                expandedRowRender: record => (
                  <Text className={styles.jobTypes__permissions}>
                    {record.permissions.join(', ')}
                  </Text>
                ),
              }}
              pagination={{
                total: getUserJobTypes.data?.length,
                position: ['bottomCenter'],
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getUserJobTypes.data?.map(jobType => ({
                ...jobType,
                key: jobType.id,
                source: jobType,
                includeSubordinatedUnits: jobType.includeSubordinatedUnits
                  ? t('common:tables.values.yes')
                  : t('common:tables.values.no'),
                validFrom: dateTimeUtils.dateTime(jobType.validFrom).format(DATE_FORMAT),
                validTo:
                  jobType.validTo && dateTimeUtils.dateTime(jobType.validTo).format(DATE_FORMAT),
                actions: (
                  <Dropdown
                    menu={{ items: getUserJobTypesTableRowActions(t, jobType, openJobTypeModal) }}
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
            className={styles.jobTypes__empty}
            image={<EmptyDefaultSvg />}
            description={t('access-users-[id]:empty.noJobTypes')}
          >
            <Button type="primary" size="large" onClick={() => openJobTypeModal()}>
              {t('access-users-[id]:buttons.addJobType')}
            </Button>
          </Empty>
        )}
      </div>
      <JobTypesModal
        open={jobTypeModalIsOpen}
        onCancel={closeJobTypeModal}
        loading={createUserJobType.isLoading}
        jobTypesFormProps={{
          onSubmit: handleSubmit,
          initialValues: {
            jobTypeId: '',
            unitId: '',
            includeSubordinatedUnits: !!jobTypeModalProps?.includeSubordinatedUnits,
            ...jobTypeModalProps,
            validFrom: dateTimeUtils.dateTime(jobTypeModalProps?.validFrom || undefined),
            validTo: jobTypeModalProps?.validTo
              ? dateTimeUtils.dateTime(jobTypeModalProps.validTo)
              : null,
          },
        }}
      />
    </>
  )
}
