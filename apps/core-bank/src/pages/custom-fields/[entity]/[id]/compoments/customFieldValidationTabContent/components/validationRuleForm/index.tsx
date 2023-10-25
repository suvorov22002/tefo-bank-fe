import {
  Form,
  FormProps,
  FormikProps,
  INTEGRATED_RenderDynamicFields,
  InputNumberField,
  SelectField,
  formErrorUtils,
} from 'ui'

import { CreateCustomFieldValidationRuleRequestData } from '@/domains/customFields'
import { useTranslation } from '@/i18n'

import { getValidationRuleStatusOptions } from '../../consts'
import {
  getValidationRuleTypeOptionsByCustomFieldType,
  getValidationRuleTypeSpecificFields,
} from '../../utils'

export interface CustomFieldValidationRuleFormValues
  extends Omit<CreateCustomFieldValidationRuleRequestData, 'type'> {
  type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes | null
}

export interface ValidationRuleFormProps {
  customField: INTEGRATED_RenderDynamicFields.DynamicField
  id: FormProps<CustomFieldValidationRuleFormValues>['id']
  initialValues: FormProps<CustomFieldValidationRuleFormValues>['initialValues']
  onSubmit: FormProps<CustomFieldValidationRuleFormValues>['onSubmit']
  addedValidationRules: INTEGRATED_RenderDynamicFields.ValidationRule[]
}

export const ValidationRuleForm = ({
  customField,
  id,
  initialValues,
  onSubmit,
  addedValidationRules,
}: ValidationRuleFormProps) => {
  const { t } = useTranslation(['common', 'custom-fields-[entity]-[id]'])

  const handleTypeChange = (formProps: FormikProps<CustomFieldValidationRuleFormValues>) => {
    formProps.setFieldValue('value', null)
    formProps.setFieldTouched('value', false)
  }

  const validationRuleStatusOptions = getValidationRuleStatusOptions(t)
  const validationRuleTypeOptions = getValidationRuleTypeOptionsByCustomFieldType(
    customField.type,
    t
  ).filter(
    validationRuleOption =>
      !addedValidationRules.find(
        validationRule => validationRule.type === validationRuleOption.value
      ) || validationRuleOption.value === initialValues.type
  )

  return (
    <Form<CustomFieldValidationRuleFormValues>
      id={id}
      initialValues={initialValues}
      onSubmit={onSubmit}
      layout="vertical"
    >
      {formProps => (
        <>
          <SelectField
            name="type"
            options={validationRuleTypeOptions}
            onChange={() => handleTypeChange(formProps)}
            label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.rule')}
            required
            validate={formErrorUtils.required(t('common:forms.validations.required'))()}
          />
          {getValidationRuleTypeSpecificFields(formProps.values.type, customField.type)}
          <InputNumberField
            name="priority"
            min={1}
            required
            max={
              formProps.initialValues.type
                ? addedValidationRules.length
                : formProps.initialValues.priority
            }
            label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.index')}
            validate={formErrorUtils.required(t('common:forms.validations.required'))()}
          />
          <SelectField
            name="status"
            required
            label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.status')}
            options={validationRuleStatusOptions}
            validate={formErrorUtils.required(t('common:forms.validations.required'))()}
          />
        </>
      )}
    </Form>
  )
}
