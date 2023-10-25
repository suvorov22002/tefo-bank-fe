import {
  FormikProps,
  INTEGRATED_RenderDynamicFields,
  InputNumberField,
  InputNumberPercentField,
} from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface DecimalPercentDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDecimalPercentFieldProps>
    | undefined
}

export const DecimalPercentDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: DecimalPercentDataTypeSpecificFieldsProps) => {
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
        disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
        max={10}
        label={t('custom-fields-create:form.fields.decimals.label')}
      />
      <InputNumberPercentField
        name="defaultValue.value"
        label={t('custom-fields-create:form.fields.defaultValue.label')}
        disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
      />
    </>
  )
}
