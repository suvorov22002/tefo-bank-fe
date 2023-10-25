import { FormikProps, INTEGRATED_RenderDynamicFields, SelectField } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface BooleanDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicBooleanFieldProps>
    | undefined
}

export const BooleanDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: BooleanDataTypeSpecificFieldsProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const isDetailsView = !!customField

  if (!ready) {
    return null
  }

  return (
    <SelectField
      label={t('custom-fields-create:form.fields.defaultValue.label')}
      name="defaultValue.value"
      disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
      value={
        typeof formProps.values.defaultValue.value === 'boolean'
          ? JSON.stringify(formProps.values.defaultValue.value)
          : null
      }
      onChange={value => {
        const normalizedValue = value ?? null

        formProps.setFieldValue('defaultValue.value', JSON.parse(normalizedValue))
      }}
      options={[
        {
          value: JSON.stringify(true),
          label: t('custom-fields-create:form.dataTypeBooleanDefaultValueOptionsLabels.true'),
        },
        {
          value: JSON.stringify(false),
          label: t('custom-fields-create:form.dataTypeBooleanDefaultValueOptionsLabels.false'),
        },
      ]}
    />
  )
}
