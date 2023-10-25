import { DatePickerField, FormikProps, INTEGRATED_RenderDynamicFields } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface DateDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDateFieldProps>
    | undefined
}

export const DateDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: DateDataTypeSpecificFieldsProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const isDetailsView = !!customField

  if (!ready) {
    return null
  }

  return (
    <DatePickerField
      name="defaultValue.value"
      disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
      label={t('custom-fields-create:form.fields.defaultValue.label')}
    />
  )
}
