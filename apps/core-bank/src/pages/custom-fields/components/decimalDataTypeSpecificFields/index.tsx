import { FormikProps, INTEGRATED_RenderDynamicFields, InputNumberField } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface DecimalDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDecimalFieldProps>
    | undefined
}

export const DecimalDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: DecimalDataTypeSpecificFieldsProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const isDetailsView = !!customField

  const isLoading = !ready

  if (isLoading) {
    return null
  }

  return (
    <>
      <InputNumberField
        name="properties.decimals"
        min={1}
        max={10}
        disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
        label={t('custom-fields-create:form.fields.decimals.label')}
      />
      <InputNumberField
        name="defaultValue.value"
        disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
        label={t('custom-fields-create:form.fields.defaultValue.label')}
      />
    </>
  )
}
