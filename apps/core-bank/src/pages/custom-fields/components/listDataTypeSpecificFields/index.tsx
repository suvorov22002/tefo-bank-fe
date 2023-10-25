import { FormikProps, INTEGRATED_RenderDynamicFields, ListField } from 'ui'

import { useTranslation } from '@/i18n'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface ListDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicListFieldProps>
    | undefined
}

export const ListDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: ListDataTypeSpecificFieldsProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const isDetailsView = !!customField
  const isLoading = !ready

  if (isLoading) {
    return null
  }

  return (
    <ListField
      name="defaultValue.value"
      options={customField?.properties?.options}
      addNewItemButtonText={t('custom-fields-create:buttons.listFieldAddNewItemButtonText')}
      label={t('custom-fields-create:form.fields.defaultValue.label')}
      disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
      onAddNewItem={item =>
        formProps.setFieldValue('properties.options', [
          ...(formProps.values.properties.options || []),
          item,
        ])
      }
    />
  )
}
