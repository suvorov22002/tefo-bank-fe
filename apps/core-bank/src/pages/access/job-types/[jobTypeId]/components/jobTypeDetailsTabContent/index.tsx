import {
  Button,
  Card,
  EditFilledIcon,
  Form,
  FormProps,
  INTEGRATED_RenderDynamicFields,
  PlusSquareOutlinedIcon,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { DynamicFields } from '@/components'
import { useTranslation } from '@/i18n'
import { JobType, useJobType } from '@/domains/jobTypes'

import { JobTypeDetailsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditJobTypeDetailsFormValues extends Partial<JobType> {}

export interface JobTypeDetailsTabContentProps {
  getJobTypeData: JobType | undefined
  jobTypeTemplate: INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate | undefined
  isJobTypeDetailsFormInEditMode: boolean
  setIsJobTypeDetailsFormInEditMode: (value: boolean) => void
  setIsJobTypePermissionsFormInEditMode: (value: boolean) => void
  setJobTypeDetailsActiveTabKey: (value: JobTypeDetailsTabsKeys) => void
}

export const JobTypeDetailsTabContent = (props: JobTypeDetailsTabContentProps) => {
  const {
    getJobTypeData,
    jobTypeTemplate,
    isJobTypeDetailsFormInEditMode,
    setIsJobTypeDetailsFormInEditMode,
    setIsJobTypePermissionsFormInEditMode,
    setJobTypeDetailsActiveTabKey,
  } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'access-job-types-[jobTypeId]'])
  const { editJobType } = useJobType({})

  const isLoading = !ready

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleEditJobTypeDetailsSubmit: FormProps<EditJobTypeDetailsFormValues>['onSubmit'] =
    async (values, helpers) => {
      showSubmitMessage(0)

      return editJobType
        .mutateAsync({
          ...values,
          id: getJobTypeData?.id,
        } as JobType)
        .then(() => {
          setIsJobTypeDetailsFormInEditMode(false)
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

  return (
    <Card
      title={getJobTypeData?.name}
      className={styles.jobTypeDetails}
      extra={
        !!jobTypeTemplate && (
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={isJobTypeDetailsFormInEditMode}
              onClick={() => setIsJobTypeDetailsFormInEditMode(true)}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        )
      }
    >
      {!!jobTypeTemplate && getJobTypeData && (
        <Form<EditJobTypeDetailsFormValues>
          initialValues={INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
            values: getJobTypeData,
            mode: isJobTypeDetailsFormInEditMode
              ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
              : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
            template: jobTypeTemplate,
          })}
          onSubmit={handleEditJobTypeDetailsSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.jobTypeDetails__form}
        >
          {formProps => {
            return (
              <>
                {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                <DynamicFields
                  setValues={formProps.setValues}
                  values={getJobTypeData}
                  template={jobTypeTemplate}
                  renderOptions={{
                    mode: isJobTypeDetailsFormInEditMode
                      ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                      : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                    customRenderDynamicField: ({ Component, ...fieldProps }) => (
                      <Component
                        {...fieldProps}
                        disabled={!isJobTypeDetailsFormInEditMode || formProps.isSubmitting}
                      />
                    ),
                  }}
                />
                {isJobTypeDetailsFormInEditMode ? (
                  <div className={styles.jobTypeDetails__controls}>
                    <Button
                      htmlType="reset"
                      disabled={formProps.isSubmitting}
                      onClick={() => {
                        formProps.resetForm()
                        setIsJobTypeDetailsFormInEditMode(false)
                      }}
                    >
                      {t('common:buttons.cancel')}
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={formProps.isSubmitting}
                      disabled={!formProps.dirty}
                    >
                      {t('common:buttons.save')}
                    </Button>
                  </div>
                ) : (
                  <Button
                    htmlType="button"
                    type="dashed"
                    icon={<PlusSquareOutlinedIcon />}
                    className={styles.jobTypeDetails__addPermissionsButton}
                    block
                    onClick={() => {
                      setIsJobTypePermissionsFormInEditMode(true)
                      setJobTypeDetailsActiveTabKey(JobTypeDetailsTabsKeys.Permissions)
                    }}
                  >
                    {t('access-job-types-[jobTypeId]:buttons.addPermissions')}
                  </Button>
                )}
              </>
            )
          }}
        </Form>
      )}
    </Card>
  )
}
