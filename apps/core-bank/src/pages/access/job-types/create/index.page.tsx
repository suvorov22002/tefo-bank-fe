import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  Form,
  FormProps,
  Header,
  INTEGRATED_RenderDynamicFields,
  Spin,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { useTranslation } from '@/i18n'
import { CreateJobTypeRequestData, useJobType, useJobTypeTemplate } from '@/domains/jobTypes'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'

import styles from './styles.module.scss'

interface CreateJobTypeFormValues extends CreateJobTypeRequestData {}

const CreateJobType: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'access-job-types-create'])
  const { message } = useAppStatic()
  const { createJobType } = useJobType({})
  const { getJobTypeTemplate } = useJobTypeTemplate({
    shouldQueryJobTypeTemplate: true,
  })

  const isLoading = !ready || getJobTypeTemplate.isLoading

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateJobTypeSubmit: FormProps<CreateJobTypeFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return createJobType
      .mutateAsync(values)
      .then(res => {
        showSuccessMessage()
        router.push(RoutesConsts.getJobTypeRoute(res.id))
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(
      dirty && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.createJobType}>
      <Header
        title={t('access-job-types-create:title')}
        className={styles.createJobType__header}
        onBack={() => router.push(RoutesConsts.JobTypes)}
      />
      <Content>
        <Card
          title={t('access-job-types-create:createJobTypeTitle')}
          className={styles.createJobType__contentCard}
        >
          {getJobTypeTemplate.data && (
            <Form<CreateJobTypeFormValues>
              initialValues={{
                ...(INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                  mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                  template: getJobTypeTemplate.data,
                }) as CreateJobTypeFormValues),
              }}
              onSubmit={handleCreateJobTypeSubmit}
              enableReinitialize
              layout="vertical"
              size="large"
              className={styles.createJobType__form}
            >
              {formProps => (
                <>
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <DynamicFields
                    values={formProps.initialValues}
                    template={getJobTypeTemplate.data}
                    setValues={formProps.setValues}
                    renderOptions={{
                      mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                      customRenderDynamicField: ({ Component, ...fieldProps }) => (
                        <Component {...fieldProps} disabled={formProps.isSubmitting} />
                      ),
                    }}
                  />
                  <Button type="primary" htmlType="submit" block loading={formProps.isSubmitting}>
                    {t('access-job-types-create:buttons.createJobType')}
                  </Button>
                </>
              )}
            </Form>
          )}
        </Card>
      </Content>
    </div>
  )
}

CreateJobType.getLayout = getCoreBankDefaultLayout

export default CreateJobType
