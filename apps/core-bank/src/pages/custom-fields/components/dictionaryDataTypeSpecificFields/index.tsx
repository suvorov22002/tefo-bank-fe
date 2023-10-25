import { queryString } from 'utils'
import { FormikProps, INTEGRATED_RenderDynamicFields, SelectField, formErrorUtils } from 'ui'

import { useTranslation } from '@/i18n'
import { useAllDictionaries, useAllDictionaryValuesByDictionaryCode } from '@/domains/dictionaries'

import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

interface DictionaryDataTypeSpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicDictionaryFieldProps>
    | undefined
}

export const DictionaryDataTypeSpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: DictionaryDataTypeSpecificFieldsProps) => {
  const { t, ready } = useTranslation(['custom-fields-create'])

  const { getAllDictionaries } = useAllDictionaries({})

  const { getAllDictionaryValuesByDictionaryCode } = useAllDictionaryValuesByDictionaryCode({
    dictionaryCode: formProps.values.properties.dictionary,
    shouldQueryAllDictionaryValuesByDictionaryCode: !!formProps.values.properties.dictionary,
  })

  const isDetailsView = !!customField

  const handleDictionaryChange = (value: string) => {
    formProps.setFieldValue('defaultValue', null)
    formProps.setFieldValue('properties.dictionary', value)
    formProps.setFieldValue(
      'properties.url',
      queryString.stringifyUrl({
        url: '/dictionary-service/api/v1/dictionaries/values/all',
        query: { dictionaryCode: value },
      })
    )
  }

  if (!ready) {
    return null
  }

  return (
    <>
      <SelectField
        required
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        name="properties.dictionary"
        label={t('custom-fields-create:form.fields.dictionary.label')}
        options={getAllDictionaries.data?.map(dictionary => ({
          label: dictionary.name,
          value: dictionary.code,
        }))}
        showSearch
        // TODO: Move filterOption callback to common utils
        filterOption={(input, option) =>
          String(option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        onChange={value => handleDictionaryChange(value)}
        disabled={formProps.isSubmitting || isDetailsView}
        extra={isDetailsView ? undefined : ' '}
        help={isDetailsView ? undefined : t('common:forms.helpMessages.canBeSetOnce')}
      />
      <SelectField
        name="defaultValue.value"
        showSearch
        filterOption={(input, option) =>
          String(option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={getAllDictionaryValuesByDictionaryCode.data?.map(dictionaryValue => ({
          label: dictionaryValue.name,
          value: dictionaryValue.code,
        }))}
        label={t('custom-fields-create:form.fields.defaultValue.label')}
        disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
      />
    </>
  )
}
