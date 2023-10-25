import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  EditFilledIcon,
  Form,
  FormHelpers,
  Header,
  INTEGRATED_RenderDynamicFields,
  Spin,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { useTranslation } from '@/i18n'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'
import {
  EditBankUnitTypeRequestData,
  useBankUnitType,
  useBankUnitTypeTemplate,
} from '@/domains/bankUnitTypes'

import styles from './styles.module.scss'

interface BankUnitTypeFormValues extends EditBankUnitTypeRequestData {}

const BankUnitTypeDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const bankUnitTypeId = router.query.id ? String(router.query.id) : ''

  const { t, ready } = useTranslation(['common', 'structure-bank-unit-types-[id]'])
  const { message } = useAppStatic()

  const { getBankUnitType, editBankUnitType } = useBankUnitType({ id: bankUnitTypeId })
  const { getBankUnitTypeTemplate } = useBankUnitTypeTemplate()

  const unitTypeExists = bankUnitTypeId && getBankUnitType.isSuccess && getBankUnitType.data
  const isLoading = !ready || getBankUnitType.isLoading || getBankUnitTypeTemplate.isLoading

  useEffect(() => {
    if ((!getBankUnitType.isLoading && !unitTypeExists) || getBankUnitType.isError) {
      router.back()
    }
  }, [getBankUnitType.isError, getBankUnitType.isLoading, router, unitTypeExists])

  const [isBankUnitTypeFormInEditMode, setBankUnitTypeFormInEditMode] = useState<boolean>(
    !!router.query.isInitialModeEdit
  )

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleEditUnitTypeSubmit = async (
    values: BankUnitTypeFormValues,
    helpers: FormHelpers<BankUnitTypeFormValues>
  ) => {
    showSubmitMessage(0)

    return editBankUnitType
      .mutateAsync({
        ...getBankUnitType.data,
        ...values,
      })
      .then(() => {
        setBankUnitTypeFormInEditMode(false)
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

  if (isLoading || !getBankUnitType.data || !getBankUnitTypeTemplate.data) {
    return <Spin fullscreen />
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankUnitType}>
      <Header
        title={t('structure-bank-unit-types-[id]:title', { name: getBankUnitType.data?.name })}
        onBack={() => router.push(RoutesConsts.BankUnitTypes)}
        className={styles.bankUnitType__header}
        extra={
          <Button
            icon={<EditFilledIcon />}
            onClick={() => setBankUnitTypeFormInEditMode(true)}
            disabled={isBankUnitTypeFormInEditMode}
          >
            {t('common:buttons.edit')}
          </Button>
        }
      />
      <Content className={styles.bankUnitType__content}>
        <Card>
          {getBankUnitType.data && getBankUnitTypeTemplate.data && (
            <Form<BankUnitTypeFormValues>
              initialValues={INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                mode: isBankUnitTypeFormInEditMode
                  ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                  : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                values: getBankUnitType.data,
                template: getBankUnitTypeTemplate.data,
              })}
              onSubmit={handleEditUnitTypeSubmit}
              layout="vertical"
              size="large"
              className={styles.bankUnitType__form}
              enableReinitialize
            >
              {({ isSubmitting, dirty, resetForm, setValues }) => (
                <>
                  {CheckIfFormHasChanged(dirty, isSubmitting)}
                  <DynamicFields
                    setValues={setValues}
                    template={getBankUnitTypeTemplate.data}
                    values={getBankUnitType.data}
                    renderOptions={{
                      mode: isBankUnitTypeFormInEditMode
                        ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                        : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                      customRenderDynamicField: ({ Component, ...props }) => (
                        <Component
                          {...props}
                          disabled={!isBankUnitTypeFormInEditMode || isSubmitting}
                        />
                      ),
                    }}
                  />
                  {isBankUnitTypeFormInEditMode && (
                    <div className={styles.bankUnitType__controls}>
                      <Button
                        htmlType="reset"
                        disabled={isSubmitting}
                        onClick={() => {
                          resetForm()
                          setBankUnitTypeFormInEditMode(false)
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
    </div>
  )
}

BankUnitTypeDetails.getLayout = getCoreBankDefaultLayout

export default BankUnitTypeDetails
