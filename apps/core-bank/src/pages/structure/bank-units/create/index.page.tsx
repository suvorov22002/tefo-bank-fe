import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  Form,
  FormListener,
  FormProps,
  Header,
  INTEGRATED_RenderDynamicFields,
  Spin,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'
import { useCallback, useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { useBankUnitTypes } from '@/domains/bankUnitTypes'
import { useTranslation } from '@/i18n'
import {
  CreateBankUnitRequestData,
  useBankUnit,
  useBankUnitEntityLevelTemplate,
  useBankUnitTemplate,
} from '@/domains/bankUnits'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'

import styles from './styles.module.scss'

interface CreateBankUnitFormValues extends CreateBankUnitRequestData {}

const CreateBankUnit: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'structure-bank-units-create'])
  const { message } = useAppStatic()
  const { createBankUnit } = useBankUnit({})
  const { getBankUnitTypes } = useBankUnitTypes({ page: 1, limit: 10 })

  const [entityLevelTemplateFieldValue, setEntityLevelTemplateFieldValue] = useState<
    string | undefined
  >(undefined)

  const { getBankUnitEntityLevelTemplate } = useBankUnitEntityLevelTemplate({
    shouldQueryBankUnitEntityLevelTemplate: true,
  })

  const entityLevelTemplateFieldCode = getBankUnitEntityLevelTemplate.data?.primaryFields[0].code

  const { getBankUnitTemplate } = useBankUnitTemplate({
    shouldQueryBankUnitTemplate: !!entityLevelTemplateFieldValue,
    bankUnitTemplateParams: {
      entityLevel: entityLevelTemplateFieldValue,
    },
  })

  // Prevent navigating to the page if there is no created unit types
  useEffect(() => {
    if (!getBankUnitTypes.isLoading && !getBankUnitTypes.data?.data.length) {
      router.back()
    }
  }, [getBankUnitTypes.data?.data.length, getBankUnitTypes.isLoading, router])

  const mergedBankUnitTemplate = getBankUnitTemplate.data
    ? {
        ...getBankUnitTemplate.data,
        primaryFields: [
          ...getBankUnitTemplate.data.primaryFields,
          ...(getBankUnitEntityLevelTemplate.data?.primaryFields || []),
        ],
        customFields: [
          ...getBankUnitTemplate.data.customFields,
          ...(getBankUnitEntityLevelTemplate.data?.customFields || []),
        ],
        groups: [
          ...getBankUnitTemplate.data.groups,
          ...(getBankUnitEntityLevelTemplate.data?.groups || []),
        ],
      }
    : getBankUnitEntityLevelTemplate.data

  const isLoading = !ready || getBankUnitTypes.isLoading || getBankUnitEntityLevelTemplate.isLoading

  const handleSetEntityLevelTemplateFieldValue = useCallback(
    (value: typeof entityLevelTemplateFieldValue) => {
      setEntityLevelTemplateFieldValue(value)
    },
    []
  )

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateBankUnitSubmit: FormProps<CreateBankUnitFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return createBankUnit
      .mutateAsync(values)
      .then(() => {
        showSuccessMessage()
        router.push(RoutesConsts.BankUnits)
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
      (!!entityLevelTemplateFieldValue || dirty) && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.createBankUnit}>
      <Header
        title={t('structure-bank-units-create:title')}
        onBack={() => router.push(RoutesConsts.BankUnits)}
        className={styles.createBankUnit__header}
      />
      <Content>
        <Card className={styles.createBankUnit__contentCard}>
          {mergedBankUnitTemplate && (
            <Form<CreateBankUnitFormValues>
              initialValues={
                {
                  ...INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                    mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                    template: mergedBankUnitTemplate,
                  }),
                  [entityLevelTemplateFieldCode as string]: entityLevelTemplateFieldValue,
                } as CreateBankUnitFormValues
              }
              onSubmit={handleCreateBankUnitSubmit}
              enableReinitialize
              layout="vertical"
              size="large"
              className={styles.createBankUnit__form}
            >
              {formProps => (
                <>
                  <FormListener
                    data={
                      entityLevelTemplateFieldCode
                        ? (formProps.values[entityLevelTemplateFieldCode] as string)
                        : undefined
                    }
                    callback={handleSetEntityLevelTemplateFieldValue}
                  />
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <DynamicFields
                    values={formProps.initialValues}
                    template={mergedBankUnitTemplate}
                    setValues={formProps.setValues}
                    renderOptions={{
                      mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                      customRenderDynamicField: ({ Component, ...fieldProps }) => (
                        <Component {...fieldProps} disabled={formProps.isSubmitting} />
                      ),
                    }}
                  />
                  <Button type="primary" htmlType="submit" block loading={formProps.isSubmitting}>
                    {t('structure-bank-units-create:buttons.createUnit')}
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

CreateBankUnit.getLayout = getCoreBankDefaultLayout

export default CreateBankUnit
