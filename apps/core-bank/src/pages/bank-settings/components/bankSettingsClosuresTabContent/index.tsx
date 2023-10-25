import {
  Button,
  Card,
  CheckboxField,
  EditFilledIcon,
  Form,
  FormProps,
  InputNumberField,
  TimePickerField,
  formErrorUtils,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'
import { DateTime, dateTimeUtils } from 'utils'

import { useTranslation } from '@/i18n'
import { BankSettingsClosures, useBankSettingsClosures } from '@/domains/bankSettings'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditBankSettingsClosuresFormValues extends Omit<BankSettingsClosures, 'cutOffTime'> {
  cutOffTime: DateTime
}

export interface BankSettingsClosuresTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsClosuresTabContent = (props: BankSettingsClosuresTabContentProps) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsClosures, editBankSettingsClosures } = useBankSettingsClosures()

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsClosuresFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsClosures
      .mutateAsync({
        ...values,
        cutOffTime: values.cutOffTime
          ? [values.cutOffTime.hour(), values.cutOffTime.minute()]
          : null,
      })
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.Closures]: false,
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

  const isLoading = !ready || getBankSettingsClosures.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsClosures}>
      <Card
        title={t('bank-settings:tabs.closures.subtitle')}
        className={styles.bankSettingsClosures__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.closures}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.Closures]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsClosuresFormValues>
          initialValues={
            {
              shouldBlockUsersDuringEOD: false,
              minutesForUserNotificationAboutEODStart: null,
              EOMDaysForAdjustments: null,
              EOQDaysForAdjustments: null,
              EOYDaysForAdjustments: null,
              ...getBankSettingsClosures.data,
              cutOffTime:
                getBankSettingsClosures.data && getBankSettingsClosures.data.cutOffTime
                  ? dateTimeUtils.dateTime({
                      hour: getBankSettingsClosures.data.cutOffTime[0],
                      minute: getBankSettingsClosures.data.cutOffTime[1],
                    })
                  : null,
            } as EditBankSettingsClosuresFormValues
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsClosures__form}
        >
          {({ dirty, isSubmitting, resetForm }) => {
            return (
              <>
                {CheckIfFormHasChanged(dirty, isSubmitting)}
                <TimePickerField
                  name="cutOffTime"
                  label={t('bank-settings:tabs.closures.form.labels.cutOffTime')}
                  // TODO: Move format to consts during adding locale handling if needed
                  format="HH:mm"
                  disabled={!bankSettingsFormsEditModeMap.closures}
                />
                <CheckboxField
                  name="shouldBlockUsersDuringEOD"
                  disabled={!bankSettingsFormsEditModeMap.closures}
                >
                  {t('bank-settings:tabs.closures.form.labels.shouldBlockUsersDuringEOD')}
                </CheckboxField>
                <InputNumberField
                  name="minutesForUserNotificationAboutEODStart"
                  label={t(
                    'bank-settings:tabs.closures.form.labels.minutesForUserNotificationAboutEODStart'
                  )}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  min={0}
                  max={30}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.closures}
                />
                <InputNumberField
                  name="EOMDaysForAdjustments"
                  label={t('bank-settings:tabs.closures.form.labels.EOMDaysForAdjustments')}
                  min={0}
                  max={30}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.closures}
                />
                <InputNumberField
                  name="EOQDaysForAdjustments"
                  label={t('bank-settings:tabs.closures.form.labels.EOQDaysForAdjustments')}
                  min={0}
                  max={30}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.closures}
                />
                <InputNumberField
                  name="EOYDaysForAdjustments"
                  label={t('bank-settings:tabs.closures.form.labels.EOYDaysForAdjustments')}
                  min={0}
                  max={30}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.closures}
                />
                {bankSettingsFormsEditModeMap.closures && (
                  <div className={styles.bankSettingsClosures__controls}>
                    <Button
                      htmlType="reset"
                      disabled={isSubmitting}
                      onClick={() => {
                        resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.Closures]: false,
                        })
                      }}
                    >
                      {t('common:buttons.cancel')}
                    </Button>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={isSubmitting}
                      disabled={!dirty}
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
