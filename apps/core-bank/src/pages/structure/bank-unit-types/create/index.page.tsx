import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  Form,
  FormHelpers,
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
import {
  CreateBankUnitTypeRequestData,
  useBankUnitType,
  useBankUnitTypeTemplate,
} from '@/domains/bankUnitTypes'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'

import styles from './styles.module.scss'

interface CreateBankUnitTypeFormValues extends CreateBankUnitTypeRequestData {}

const CreateBankUnitType: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'structure-bank-unit-types-create'])
  const { message } = useAppStatic()
  const { createBankUnitType } = useBankUnitType({})
  const { getBankUnitTypeTemplate } = useBankUnitTypeTemplate()

  const isLoading = !ready || getBankUnitTypeTemplate.isLoading

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateBankUnitTypeSubmit = async (
    values: CreateBankUnitTypeFormValues,
    helpers: FormHelpers<CreateBankUnitTypeFormValues>
  ) => {
    showSubmitMessage(0)

    return createBankUnitType
      .mutateAsync(values)
      .then(() => {
        showSuccessMessage()
        router.push(RoutesConsts.BankUnitTypes)
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
    <div className={styles.createBankUnitType}>
      <Header
        title={t('structure-bank-unit-types-create:title')}
        onBack={router.back}
        className={styles.createBankUnitType__header}
      />
      <Content>
        <Card className={styles.createBankUnitType__contentCard}>
          {getBankUnitTypeTemplate.data && (
            <Form<CreateBankUnitTypeFormValues>
              initialValues={INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                template: getBankUnitTypeTemplate.data,
                mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
              })}
              onSubmit={handleCreateBankUnitTypeSubmit}
              enableReinitialize
              layout="vertical"
              size="large"
              className={styles.createBankUnitType__form}
            >
              {({ dirty, isSubmitting, initialValues, setValues }) => (
                <>
                  {CheckIfFormHasChanged(dirty, isSubmitting)}
                  <DynamicFields
                    values={initialValues}
                    template={getBankUnitTypeTemplate.data}
                    setValues={setValues}
                    renderOptions={{
                      mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                      customRenderDynamicField: ({ Component, ...fieldProps }) => (
                        <Component {...fieldProps} disabled={isSubmitting} />
                      ),
                    }}
                  />
                  <Button type="primary" htmlType="submit" block loading={isSubmitting}>
                    {t('structure-bank-unit-types-create:buttons.createUnitType')}
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

CreateBankUnitType.getLayout = getCoreBankDefaultLayout

export default CreateBankUnitType
