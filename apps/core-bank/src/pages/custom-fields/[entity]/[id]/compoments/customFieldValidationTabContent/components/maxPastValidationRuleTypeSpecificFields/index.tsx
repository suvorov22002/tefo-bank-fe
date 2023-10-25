import { InputNumberField, SelectField, formErrorUtils } from 'ui'

import { useTranslation } from '@/i18n'

import { getValidationRuleTermOptions } from '../../consts'

export const MaxPastValidationRuleTypeSpecificFields = () => {
  const { t } = useTranslation(['custom-fields-[entity]-[id]'])

  const validationRuleTermOptions = getValidationRuleTermOptions(t)

  return (
    <>
      <InputNumberField
        required
        name="value.unit"
        label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.unit')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
      />
      <SelectField
        required
        name="value.term"
        options={validationRuleTermOptions}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.term')}
      />
    </>
  )
}
