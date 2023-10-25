import { FormikProps, INTEGRATED_RenderDynamicFields, InputNumberField } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface IntegerDataTypeSpecificFieldProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicIntegerFieldProps>
    | undefined
}

export const IntegerDataTypeSpecificField = ({
  formProps,
  isInEditMode,
  customField,
}: IntegerDataTypeSpecificFieldProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const isDetailsView = !!customField
  const isLoading = !ready

  if (isLoading) {
    return null
  }

  return (
    <InputNumberField
      name="defaultValue.value"
      disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
      label={t('custom-fields-create:form.fields.defaultValue.label')}
    />
  )
}
