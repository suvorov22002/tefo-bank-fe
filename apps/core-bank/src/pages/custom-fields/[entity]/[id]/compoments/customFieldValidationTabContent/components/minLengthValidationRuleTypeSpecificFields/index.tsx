import { InputNumberField, formErrorUtils } from 'ui'

import { useTranslation } from '@/i18n'

export const MinLengthValidationRuleTypeSpecificFields = () => {
  const { t } = useTranslation(['custom-fields-[entity]-[id]'])

  return (
    <InputNumberField
      name="value"
      required
      label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.length')}
      validate={formErrorUtils.required(t('common:forms.validations.required'))()}
    />
  )
}
