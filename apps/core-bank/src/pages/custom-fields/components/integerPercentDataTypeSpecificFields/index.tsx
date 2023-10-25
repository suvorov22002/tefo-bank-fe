import { FormikProps, INTEGRATED_RenderDynamicFields, InputNumberPercentField } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface IntegerPercentDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicIntegerPercentFieldProps>
    | undefined
}

export const IntegerPercentDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: IntegerPercentDataTypeSpecificFieldsProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const isDetailsView = !!customField
  const isLoading = !ready

  if (isLoading) {
    return null
  }

  return (
    <InputNumberPercentField
      name="defaultValue.value"
      label={t('custom-fields-create:form.fields.defaultValue.label')}
      precision={0}
      disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
    />
  )
}
