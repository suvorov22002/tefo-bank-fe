import { useState } from 'react'
import {
  Button,
  Card,
  Content,
  EditFilledIcon,
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
import { useTranslation } from '@/i18n'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'
import {
  GetBankProfileResponseData,
  useBankProfile,
  useBankProfileTemplate,
} from '@/domains/bankProfile'

import styles from './styles.module.scss'

interface BankProfileFormValues extends GetBankProfileResponseData {}

const BankProfile: NextPageWithLayout = () => {
  const [isBankProfileInEditMode, setIsBankProfileInEditMode] = useState(false)

  const { getBankProfile, editBankProfileAction } = useBankProfile()
  const { getBankProfileTemplate } = useBankProfileTemplate()

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-profile'])

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<BankProfileFormValues>['onSubmit'] = async (values, helpers) => {
    showSubmitMessage(0)

    return editBankProfileAction
      .mutateAsync(values)
      .then(() => {
        setIsBankProfileInEditMode(false)
        showSuccessMessage()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const isLoading = getBankProfile.isLoading || getBankProfileTemplate.isLoading || !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <>
      <Header
        title={t('bank-profile:title')}
        className={styles.bankProfile__header}
        extra={
          <>
            <Button
              size="middle"
              icon={<EditFilledIcon />}
              disabled={isBankProfileInEditMode}
              onClick={() => setIsBankProfileInEditMode(true)}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      />
      <Content className={styles.bankProfile__content}>
        <Card>
          {getBankProfile.data && getBankProfileTemplate.data && (
            <Form<BankProfileFormValues>
              initialValues={INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                mode: isBankProfileInEditMode
                  ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                  : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                template: getBankProfileTemplate.data,
                values: getBankProfile.data,
              })}
              onSubmit={handleSubmit}
              layout="vertical"
              size="large"
              className={styles.bankProfile__form}
              enableReinitialize
            >
              {({ resetForm, dirty, isSubmitting, setValues }) => (
                <>
                  {CheckIfFormHasChanged(dirty, isSubmitting)}
                  <DynamicFields
                    values={getBankProfile.data}
                    setValues={setValues}
                    template={getBankProfileTemplate.data}
                    renderOptions={{
                      mode: isBankProfileInEditMode
                        ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                        : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                      customRenderDynamicField: ({ Component, ...props }) => (
                        <Component {...props} disabled={!isBankProfileInEditMode || isSubmitting} />
                      ),
                    }}
                  />
                  {isBankProfileInEditMode && (
                    <div className={styles.bankProfile__formButtonsContainer}>
                      <Button
                        onClick={() => {
                          resetForm()
                          setIsBankProfileInEditMode(false)
                        }}
                        disabled={isSubmitting}
                      >
                        {t('common:buttons.cancel')}
                      </Button>
                      <Button
                        htmlType="submit"
                        type="primary"
                        loading={isSubmitting}
                        block
                        disabled={!dirty}
                      >
                        {t('common:buttons.saveChanges')}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Form>
          )}
        </Card>
      </Content>
    </>
  )
}

BankProfile.getLayout = getCoreBankDefaultLayout

export default BankProfile
