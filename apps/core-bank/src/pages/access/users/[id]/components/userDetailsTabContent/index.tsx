import {
  Button,
  Card,
  EditFilledIcon,
  Form,
  FormProps,
  INTEGRATED_RenderDynamicFields,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { DynamicFields } from '@/components'
import { useTranslation } from '@/i18n'
import { EditUserRequestData, GetUserResponseData, useUser } from '@/domains/users'

import styles from './styles.module.scss'

interface EditUserDetailsFormValues extends Partial<GetUserResponseData> {}

export interface UserDetailsTabContentProps {
  getUserDetailsData: GetUserResponseData | undefined
  userDetailsTemplate: INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate | undefined
  isUserDetailsFormInEditMode: boolean
  isEditUserDetailsLoading: boolean
  setIsUserDetailsFormInEditMode: (value: boolean) => void
}

export const UserDetailsTabContent = (props: UserDetailsTabContentProps) => {
  const {
    getUserDetailsData,
    userDetailsTemplate,
    isUserDetailsFormInEditMode,
    isEditUserDetailsLoading,
    setIsUserDetailsFormInEditMode,
  } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'access-users-[id]'])
  const { editUserDetails } = useUser({})

  const isLoading = !ready

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleEditUserDetailsSubmit: FormProps<EditUserDetailsFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editUserDetails
      .mutateAsync({
        ...values,
        id: getUserDetailsData?.id,
      } as EditUserRequestData)
      .then(() => {
        setIsUserDetailsFormInEditMode(false)
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
      title={t('access-users-[id]:tabs.details.subtitle')}
      className={styles.userDetails}
      extra={
        !!userDetailsTemplate && (
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={isUserDetailsFormInEditMode || isEditUserDetailsLoading}
              onClick={() => setIsUserDetailsFormInEditMode(true)}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        )
      }
    >
      {!!userDetailsTemplate && getUserDetailsData && (
        <Form<EditUserDetailsFormValues>
          initialValues={INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
            mode: isUserDetailsFormInEditMode
              ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
              : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
            template: userDetailsTemplate,
            values: getUserDetailsData,
          })}
          onSubmit={handleEditUserDetailsSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.userDetails__form}
        >
          {formProps => {
            return (
              <>
                {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                <DynamicFields
                  setValues={formProps.setValues}
                  values={getUserDetailsData}
                  template={userDetailsTemplate}
                  renderOptions={{
                    mode: isUserDetailsFormInEditMode
                      ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                      : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                    customRenderDynamicField: ({ Component, ...fieldProps }) => (
                      <Component
                        {...fieldProps}
                        disabled={!isUserDetailsFormInEditMode || formProps.isSubmitting}
                      />
                    ),
                  }}
                />
                {isUserDetailsFormInEditMode && (
                  <div className={styles.userDetails__controls}>
                    <Button
                      htmlType="reset"
                      disabled={formProps.isSubmitting}
                      onClick={() => {
                        formProps.resetForm()
                        setIsUserDetailsFormInEditMode(false)
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
                )}
              </>
            )
          }}
        </Form>
      )}
    </Card>
  )
}
