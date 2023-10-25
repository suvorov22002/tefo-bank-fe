import { FormikProps, INTEGRATED_RenderDynamicFields, InputField } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface TextDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicTextFieldProps>
    | undefined
}

export const TextDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: TextDataTypeSpecificFieldsProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const isDetailsView = !!customField

  const isLoading = !ready

  if (isLoading) {
    return null
  }

  return (
    <InputField
      name="defaultValue.value"
      disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
      label={t('custom-fields-create:form.fields.defaultValue.label')}
    />
  )
}
