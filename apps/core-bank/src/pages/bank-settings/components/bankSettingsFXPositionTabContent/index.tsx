import {
  Button,
  Card,
  EditFilledIcon,
  Form,
  FormProps,
  SelectField,
  formErrorUtils,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { useTranslation } from '@/i18n'
import { BankSettingsFXPosition, useBankSettingsFXPosition } from '@/domains/bankSettings'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

// TODO: Replace after appropriate entities will be implemented on the BE side
export const OPTIONS_MOCK = [
  {
    label: 'Placeholder 1',
    value: '1',
  },
  {
    label: 'Placeholder 2',
    value: '2',
  },
  {
    label: 'Placeholder 3',
    value: '3',
  },
]

interface EditBankSettingsFXPositionFormValues extends BankSettingsFXPosition {}

export interface BankSettingsFXPositionTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsFXPositionTabContent = (props: BankSettingsFXPositionTabContentProps) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsFXPosition, editBankSettingsFXPosition } = useBankSettingsFXPosition()

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsFXPositionFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsFXPosition
      .mutateAsync(values)
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.FXPosition]: false,
        })
        showSuccessMessage()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const isLoading = !ready || getBankSettingsFXPosition.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsFXPosition}>
      <Card
        title={t('bank-settings:tabs.FXPosition.subtitle')}
        className={styles.bankSettingsFXPosition__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.FXPosition}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.FXPosition]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsFXPositionFormValues>
          initialValues={
            {
              FXRateType: null,
              FXPosition: null,
              FXPositionEquivalent: null,
              FXRevaluationGain: null,
              FXRevaluationLost: null,
              FXRevaluationTransactionType: null,
              ...getBankSettingsFXPosition.data,
            } as EditBankSettingsFXPositionFormValues
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsFXPosition__form}
        >
          {formProps => {
            return (
              <>
                {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                <SelectField
                  name="FXRateType"
                  label={t('bank-settings:tabs.FXPosition.form.labels.FXRateType')}
                  options={OPTIONS_MOCK}
                  required
                  disabled={!bankSettingsFormsEditModeMap.FXPosition}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="FXPosition"
                  label={t('bank-settings:tabs.FXPosition.form.labels.FXPosition')}
                  options={OPTIONS_MOCK}
                  required
                  disabled={!bankSettingsFormsEditModeMap.FXPosition}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="FXPositionEquivalent"
                  label={t('bank-settings:tabs.FXPosition.form.labels.FXPositionEquivalent')}
                  options={OPTIONS_MOCK}
                  required
                  disabled={!bankSettingsFormsEditModeMap.FXPosition}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="FXRevaluationGain"
                  label={t('bank-settings:tabs.FXPosition.form.labels.FXRevaluationGain')}
                  options={OPTIONS_MOCK}
                  required
                  disabled={!bankSettingsFormsEditModeMap.FXPosition}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="FXRevaluationLost"
                  label={t('bank-settings:tabs.FXPosition.form.labels.FXRevaluationLost')}
                  options={OPTIONS_MOCK}
                  required
                  disabled={!bankSettingsFormsEditModeMap.FXPosition}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="FXRevaluationTransactionType"
                  label={t(
                    'bank-settings:tabs.FXPosition.form.labels.FXRevaluationTransactionType'
                  )}
                  options={OPTIONS_MOCK}
                  required
                  disabled={!bankSettingsFormsEditModeMap.FXPosition}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                {bankSettingsFormsEditModeMap.FXPosition && (
                  <div className={styles.bankSettingsFXPosition__controls}>
                    <Button
                      htmlType="reset"
                      disabled={formProps.isSubmitting}
                      onClick={() => {
                        formProps.resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.FXPosition]: false,
                        })
                      }}
                    >
                      {t('common:buttons.cancel')}
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={formProps.isSubmitting}
                      disabled={!formProps.dirty}
                    >
                      {t('common:buttons.save')}
                    </Button>
                  </div>
                )}
              </>
            )
          }}
        </Form>
      </Card>
    </div>
  )
}
