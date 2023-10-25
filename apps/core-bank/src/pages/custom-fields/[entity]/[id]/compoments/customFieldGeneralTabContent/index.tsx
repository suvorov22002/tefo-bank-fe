import { dateTimeUtils } from 'utils'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Button,
  Card,
  EditFilledIcon,
  Form,
  FormProps,
  INTEGRATED_RenderDynamicFields,
  Spin,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { useCustomField } from '@/domains/customFields'
import { useTranslation } from '@/i18n'

import { CustomFieldDetailsFormContent } from '../customFieldDetailsFormContent'
import styles from './styles.module.scss'
import { CustomFieldDetailsFormValues, CustomFieldTabsKeys } from '../../../../types'

interface CustomFieldGeneralTabContentProps {
  customField: INTEGRATED_RenderDynamicFields.DynamicField
  selectedEntity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities
  setActiveTabKey: (activeKey: CustomFieldTabsKeys) => void
}

export const CustomFieldGeneralTabContent = ({
  customField,
  selectedEntity,
  setActiveTabKey,
}: CustomFieldGeneralTabContentProps) => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common'])
  const { message } = useAppStatic()
  const [isInEditMode, setIsInEditMode] = useState<boolean>(!!router.query.isInitialModeEdit)
  const { editCustomField } = useCustomField(selectedEntity, customField.id)

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })

  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleEditCustomField: FormProps<CustomFieldDetailsFormValues>['onSubmit'] = (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    editCustomField
      .mutateAsync({
        ...values,
        independent: true,
        entityLevel: values.entityLevel?.length ? values.entityLevel : null,
        createdAt: customField.createdAt,
        updatedAt: customField.updatedAt,
      })
      .then(() => {
        showSuccessMessage()
        setIsInEditMode(false)
      })
      .catch(e => handleApiError(e.body, message.error, t, helpers))
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const getCustomFieldDetailsFormInitialValues = (
    customField: INTEGRATED_RenderDynamicFields.DynamicField
  ): CustomFieldDetailsFormValues => {
    const initialValues = {
      ...customField,
      createdAt: dateTimeUtils.dateTime(customField.createdAt),
      updatedAt: customField.updatedAt ? dateTimeUtils.dateTime(customField.updatedAt) : null,
      approvedAt: customField.approvedAt ? dateTimeUtils.dateTime(customField.approvedAt) : null,
    }

    const defaultValue = initialValues.defaultValue?.value

    switch (initialValues.type) {
      case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date:
      case INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime:
        if (defaultValue) {
          initialValues.defaultValue.value = dateTimeUtils.dateTime(defaultValue)
        }
    }

    return initialValues as unknown as CustomFieldDetailsFormValues
  }

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(
      dirty && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  return (
    <Card
      className={styles.customFieldDetails__contentCard}
      title={customField.fieldName}
      extra={
        <>
          <Button
            icon={<EditFilledIcon />}
            onClick={() => setIsInEditMode(true)}
            disabled={isInEditMode}
          >
            {t('common:buttons.edit')}
          </Button>
        </>
      }
    >
      <Form<CustomFieldDetailsFormValues>
        initialValues={getCustomFieldDetailsFormInitialValues(customField)}
        onSubmit={handleEditCustomField}
        size="large"
        layout="vertical"
        enableReinitialize
        className={styles.customFieldDetails__form}
      >
        {formProps => (
          <>
            {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
            <CustomFieldDetailsFormContent
              customField={customField}
              formProps={formProps}
              selectedEntity={selectedEntity}
              isInEditMode={isInEditMode}
              setIsInEditMode={setIsInEditMode}
              setActiveTabKey={setActiveTabKey}
            />
          </>
        )}
      </Form>
    </Card>
  )
}
