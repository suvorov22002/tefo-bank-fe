import { Key } from 'react'
import {
  Button,
  Card,
  EditFilledIcon,
  Form,
  FormProps,
  Spin,
  TreeTableField,
  handleApiError,
  useAppStatic,
  usePagination,
  useUnsavedChangesWarning,
} from 'ui'

import { useTranslation } from '@/i18n'
import {
  JobType,
  PermissionsTreeOption,
  useJobType,
  useJobTypePermissions,
} from '@/domains/jobTypes'

import styles from './styles.module.scss'

interface NormalizedDataItem extends Record<string, unknown> {
  id: string
  key: Key
  label: string
  children?: NormalizedDataItem[]
}

const normalizeDataSource = (data: PermissionsTreeOption[] | undefined): NormalizedDataItem[] =>
  (data || []).map(el => {
    if (Array.isArray(el.items)) {
      return {
        ...el,
        key: el.id,
        children: normalizeDataSource(el.items),
      }
    } else {
      return { ...el, key: el.id }
    }
  })

interface EditJobTypePermissionsFormValues extends Partial<JobType> {}

export interface JobTypePermissionsTabContentProps {
  getJobTypeData: JobType | undefined
  isJobTypePermissionsFormInEditMode: boolean
  setIsJobTypePermissionsFormInEditMode: (value: boolean) => void
}

export const JobTypePermissionsTabContent = (props: JobTypePermissionsTabContentProps) => {
  const {
    getJobTypeData,
    isJobTypePermissionsFormInEditMode,
    setIsJobTypePermissionsFormInEditMode,
  } = props

  const { message } = useAppStatic()
  const { editJobType } = useJobType({})
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'access-job-types-[jobTypeId]'])

  const { getPermissionsTreeOptions } = useJobTypePermissions({
    page: pagination.current,
    limit: pagination.pageSize,
  })

  const isLoading = !ready

  const permissionsTreeOptionsNormalizedDataSource = normalizeDataSource(
    getPermissionsTreeOptions.data?.data
  )

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleEditJobTypePermissionSubmit: FormProps<EditJobTypePermissionsFormValues>['onSubmit'] =
    async (values, helpers) => {
      showSubmitMessage(0)

      return editJobType
        .mutateAsync({
          ...values,
          id: getJobTypeData?.id,
        } as JobType)
        .then(() => {
          setIsJobTypePermissionsFormInEditMode(false)
          showSuccessMessage()
        })
        .catch(e => {
          handleApiError(e.body, message.error, t, helpers)
        })
        .finally(() => {
          message.destroy('submitMessage')
        })
    }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <Card
      title={t('access-job-types-[jobTypeId]:tabs.permissions.subtitle')}
      className={styles.jobTypePermissions}
      extra={
        !!permissionsTreeOptionsNormalizedDataSource.length && (
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={isJobTypePermissionsFormInEditMode}
              onClick={() => setIsJobTypePermissionsFormInEditMode(true)}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        )
      }
    >
      {!!permissionsTreeOptionsNormalizedDataSource.length && (
        <Form<EditJobTypePermissionsFormValues>
          initialValues={getJobTypeData as JobType}
          onSubmit={handleEditJobTypePermissionSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.jobTypePermissions__form}
        >
          {({ dirty, isSubmitting, resetForm }) => (
            <>
              {CheckIfFormHasChanged(dirty, isSubmitting)}
              <TreeTableField
                name="permissions"
                pagination={{
                  ...pagination,
                  total: getPermissionsTreeOptions.data?.totalItems,
                  showTotal: (total, range) =>
                    t('common:tables.pagination.totalItems', {
                      from: range[0],
                      to: range[1],
                      total,
                    }),
                }}
                dataSource={permissionsTreeOptionsNormalizedDataSource}
                columns={[
                  {
                    title: t(
                      'access-job-types-[jobTypeId]:jobTypePermissionsTable.columns.titles.groupPermission'
                    ),
                    dataIndex: 'label',
                  },
                ]}
                rowSelection={{
                  getCheckboxProps: () => ({
                    disabled: !isJobTypePermissionsFormInEditMode || isSubmitting,
                  }),
                }}
              />
              {isJobTypePermissionsFormInEditMode && (
                <div className={styles.jobTypePermissions__controls}>
                  <Button
                    htmlType="reset"
                    disabled={isSubmitting}
                    onClick={() => {
                      resetForm()
                      setIsJobTypePermissionsFormInEditMode(false)
                    }}
                  >
                    {t('common:buttons.cancel')}
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    block
                    loading={isSubmitting}
                    disabled={!dirty}
                  >
                    {t('common:buttons.save')}
                  </Button>
                </div>
              )}
            </>
          )}
        </Form>
      )}
    </Card>
  )
}
