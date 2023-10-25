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
import { CreateUserRequestData, useUser, useUserDetailsTemplate } from '@/domains/users'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'

import styles from './styles.module.scss'

interface CreateUserFormValues extends CreateUserRequestData {}

const CreateUser: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'access-users-create'])
  const { message } = useAppStatic()
  const { createUser } = useUser({})
  const { getUserDetailsTemplate } = useUserDetailsTemplate({
    shouldQueryUserDetailsTemplate: true,
  })

  const isLoading = !ready || getUserDetailsTemplate.isLoading

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateJobTypeSubmit: FormProps<CreateUserFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return createUser
      .mutateAsync(values)
      .then(() => {
        showSuccessMessage()
        router.push(RoutesConsts.Users)
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
    <div className={styles.createUser}>
      <Header
        title={t('access-users-create:title')}
        onBack={router.back}
        className={styles.createUser__header}
      />
      <Content>
        <Card
          title={t('access-users-create:createUserTitle')}
          className={styles.createUser__contentCard}
        >
          {getUserDetailsTemplate.data && (
            <Form<CreateUserFormValues>
              initialValues={
                INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                  mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                  template: getUserDetailsTemplate.data,
                }) as CreateUserFormValues
              }
              onSubmit={handleCreateJobTypeSubmit}
              enableReinitialize
              layout="vertical"
              size="large"
              className={styles.createUser__form}
            >
              {formProps => (
                <>
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <DynamicFields
                    template={getUserDetailsTemplate.data}
                    values={formProps.initialValues}
                    setValues={formProps.setValues}
                    renderOptions={{
                      mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                      customRenderDynamicField: ({ Component, ...fieldProps }) => (
                        <Component {...fieldProps} disabled={formProps.isSubmitting} />
                      ),
                    }}
                  />
                  <Button type="primary" htmlType="submit" block loading={formProps.isSubmitting}>
                    {t('access-users-create:buttons.createUser')}
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

CreateUser.getLayout = getCoreBankDefaultLayout

export default CreateUser
