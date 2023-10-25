import { DatePickerField, formErrorUtils } from 'ui'

import { useTranslation } from '@/i18n'

interface LessDateValidationRuleTypeSpecificFieldsProps {
  showTime?: boolean
}

export const LessDateValidationRuleTypeSpecificFields = ({
  showTime = false,
}: LessDateValidationRuleTypeSpecificFieldsProps) => {
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
