import { DatePickerField, formErrorUtils } from 'ui'

import { useTranslation } from '@/i18n'

interface MoreDateValidationRuleTypeSpecificFieldsProps {
  showTime?: boolean
}

export const MoreDateValidationRuleTypeSpecificFields = ({
  showTime = false,
}: MoreDateValidationRuleTypeSpecificFieldsProps) => {
  const { t } = useTranslation(['custom-fields-[entity]-[id]'])

  return (
    <>
      <DatePickerField
        required
        name="value.targetDate"
        showTime={showTime}
        label={t('custom-fields-[entity]-[id]:tabs.validation.forms.labels.date')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
      />
    </>
  )
}
