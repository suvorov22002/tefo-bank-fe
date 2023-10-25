import { dateTimeUtils } from 'utils'
import { Button, INTEGRATED_RenderDynamicFields, Modal } from 'ui'

import { useTranslation } from '@/i18n'

import { ValidationRuleForm, ValidationRuleFormProps } from '../validationRuleForm'

const VALIDATION_RULE_FORM_ID = 'validationRuleForm'

interface ValidationRuleModalProps {
  open: boolean
  onCancel: () => void
  validationRuleFormProps: Omit<ValidationRuleFormProps, 'id'>
  validationRule: Omit<INTEGRATED_RenderDynamicFields.ValidationRule, 'message'> | undefined
}

export const ValidationRuleModal = (props: ValidationRuleModalProps) => {
  const { open, onCancel, validationRuleFormProps, validationRule } = props
  const { t } = useTranslation(['common', 'custom-fields-[entity]-[id]'])

  const { initialValues, ...restValidationRuleFormProps } = validationRuleFormProps

  const getValidationRuleFormInitialValues = () => {
    const normalizedInitialValues = {
      ...initialValues,
      ...validationRule,
    }

    if (validationRule) {
      switch (validationRule.type) {
        case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.LessDate:
        case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MoreDate:
          normalizedInitialValues.value.targetDate = dateTimeUtils.dateTime(
            normalizedInitialValues.value.targetDate
          )
      }
    }

    return normalizedInitialValues
  }

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={onCancel}
      title={
        validationRule
          ? t('custom-fields-[entity]-[id]:tabs.validation.modals.edit.title')
          : t('custom-fields-[entity]-[id]:tabs.validation.modals.create.title')
      }
      footer={[
        <Button key="okButton" type="primary" htmlType="submit" form={VALIDATION_RULE_FORM_ID}>
          {t('custom-fields-[entity]-[id]:tabs.validation.buttons.modalOkButton')}
        </Button>,
      ]}
    >
      <ValidationRuleForm
        id={VALIDATION_RULE_FORM_ID}
        {...restValidationRuleFormProps}
        initialValues={getValidationRuleFormInitialValues()}
      />
    </Modal>
  )
}
