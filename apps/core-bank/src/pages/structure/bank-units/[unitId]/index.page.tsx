import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  EditFilledIcon,
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
import { useTranslation } from '@/i18n'
import {
  BankUnit,
  EditBankUnitRequestData,
  useBankUnit,
  useBankUnitEntityLevelTemplate,
  useBankUnitTemplate,
} from '@/domains/bankUnits'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'

import styles from './styles.module.scss'

interface EditBankUnitFormValues extends BankUnit {}

const BankUnitDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'structure-bank-units-[unitId]'])

  const unitId = router.query.unitId ? String(router.query.unitId) : ''

  const [isEditBankUnitFormInEditMode, setIsEditBankUnitFormInEditMode] = useState<boolean>(
    !!router.query.isInitialModeEdit
  )
  const [entityLevelTemplateFieldValue, setEntityLevelTemplateFieldValue] = useState<
    string | undefined
  >(undefined)

  const { getBankUnit, editBankUnit } = useBankUnit({ unitId })
  const { getBankUnitEntityLevelTemplate } = useBankUnitEntityLevelTemplate({
    shouldQueryBankUnitEntityLevelTemplate: true,
  })

  const entityLevelTemplateFieldCode = getBankUnitEntityLevelTemplate.data?.primaryFields[0].code

  const { getBankUnitTemplate } = useBankUnitTemplate({
    shouldQueryBankUnitTemplate: !!entityLevelTemplateFieldValue,
    bankUnitTemplateParams: {
      [entityLevelTemplateFieldCode as string]: entityLevelTemplateFieldValue,
    },
  })

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  const unitExist = unitId && getBankUnit.isSuccess && getBankUnit.data

  useEffect(() => {
    if ((!getBankUnit.isLoading && !unitExist) || getBankUnit.isError) {
      router.back()
    }
  }, [router, unitExist, getBankUnit.isLoading, getBankUnit.isError])

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

  const isLoading = !ready || getBankUnit.isLoading || getBankUnitEntityLevelTemplate.isLoading

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

  const showSuccessMessage = () => {
    return message.success(t('common:notifications.success'))
  }

  const handleEditBankUnitSubmit: FormProps<EditBankUnitFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankUnit
      .mutateAsync({
        ...values,
        id: getBankUnit.data?.id,
      } as EditBankUnitRequestData)
      .then(() => {
        setIsEditBankUnitFormInEditMode(false)
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

  return (
    <>
      {isLoading && <Spin fullscreen />}
      <div className={styles.editBankUnit}>
        <Header
          title={
            ready && t('structure-bank-units-[unitId]:title', { unitName: getBankUnit.data?.name })
          }
          onBack={() => router.push(RoutesConsts.BankUnits)}
          className={styles.editBankUnit__header}
          extra={
            <>
              <Button
                icon={<EditFilledIcon />}
                disabled={isEditBankUnitFormInEditMode}
                onClick={() => setIsEditBankUnitFormInEditMode(true)}
              >
                {t('common:buttons.edit')}
              </Button>
            </>
          }
        />
        <Content>
          <Card className={styles.editBankUnit__contentCard}>
            {mergedBankUnitTemplate && (
              <Form<EditBankUnitFormValues>
                initialValues={INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                  mode: isEditBankUnitFormInEditMode
                    ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                    : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                  template: mergedBankUnitTemplate,
                  values: getBankUnit.data || {},
                })}
                onSubmit={handleEditBankUnitSubmit}
                enableReinitialize
                layout="vertical"
                size="large"
                className={styles.editBankUnit__form}
              >
                {formProps => (
                  <>
                    <FormListener
                      data={
                        entityLevelTemplateFieldCode && formProps.values
                          ? (formProps.values[entityLevelTemplateFieldCode] as string)
                          : undefined
                      }
                      callback={handleSetEntityLevelTemplateFieldValue}
                    />
                    {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                    <DynamicFields
                      values={getBankUnit.data || {}}
                      template={mergedBankUnitTemplate}
                      setValues={formProps.setValues}
                      renderOptions={{
                        mode: isEditBankUnitFormInEditMode
                          ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                          : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                        customRenderDynamicField: ({ Component, ...fieldProps }) => (
                          <Component
                            {...fieldProps}
                            disabled={!isEditBankUnitFormInEditMode || formProps.isSubmitting}
                          />
                        ),
                      }}
                    />
                    {isEditBankUnitFormInEditMode && (
                      <div className={styles.editBankUnit__controls}>
                        <Button
                          htmlType="reset"
                          disabled={formProps.isSubmitting}
                          onClick={() => {
                            formProps.resetForm()
                            setIsEditBankUnitFormInEditMode(false)
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
    </>
  )
}

BankUnitDetails.getLayout = getCoreBankDefaultLayout

export default BankUnitDetails
