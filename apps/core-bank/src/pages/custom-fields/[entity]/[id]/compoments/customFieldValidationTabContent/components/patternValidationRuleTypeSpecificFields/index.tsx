import { InputField, formErrorUtils } from 'ui'

import { useTranslation } from '@/i18n'

export const PatternValidationRuleTypeSpecificFields = () => {
  const { t } = useTranslation(['custom-fields-[entity]-[id]'])

  return (
    <InputField
      name="value"
      required
      label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.pattern')}
      validate={formErrorUtils.compose(
        formErrorUtils.required(t('common:forms.validations.required'))(),
        formErrorUtils.isValidRegExp(t('common:forms.validations.notValid'))()
      )}
    />
  )
}
