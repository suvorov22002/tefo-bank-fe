import {
  Button,
  Card,
  CheckboxField,
  EditFilledIcon,
  Form,
  FormProps,
  InputNumberField,
  PasswordInputField,
  TextAreaField,
  formErrorUtils,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { useTranslation } from '@/i18n'
import { BankSettingsAccess, useBankSettingsAccess } from '@/domains/bankSettings'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditBankSettingsAccessFormValues extends BankSettingsAccess {}

export interface BankSettingsAccessTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsAccessTabContent = (props: BankSettingsAccessTabContentProps) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsAccess, editBankSettingsAccess } = useBankSettingsAccess()

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsAccessFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsAccess
      .mutateAsync(values)
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.Access]: false,
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

  const isLoading = !ready || getBankSettingsAccess.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsAccess}>
      <Card
        title={t('bank-settings:tabs.access.subtitle')}
        className={styles.bankSettingsAccess__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.access}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.Access]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsAccessFormValues>
          initialValues={
            {
              shouldEnableTwoFactorAuthentication: false,
              shouldEnableUserLoginSelfNotification: false,
              shouldEnableUserLoginSupervisorNotification: false,
              defaultPassword: '',
              invitationText: '',
              invitationValidityDuration: undefined,
              minimumPasswordLength: undefined,
              minimumNumberOfNumChars: undefined,
              minimumNumberOfSpecialChars: undefined,
              minimumNumberOfUpperCaseChars: undefined,
              passwordResetPeriod: undefined,
              passwordReuseCycles: undefined,
              failedLoginLimit: undefined,
              failedLoginAttemptsTillCoolDown: undefined,
              failedLoginCooldownPeriod: undefined,
              timeoutDuration: undefined,
              ...getBankSettingsAccess.data,
            } as EditBankSettingsAccessFormValues
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsAccess__form}
        >
          {({ dirty, isSubmitting, resetForm }) => {
            return (
              <>
                {CheckIfFormHasChanged(dirty, isSubmitting)}
                <CheckboxField
                  name="shouldEnableTwoFactorAuthentication"
                  disabled={!bankSettingsFormsEditModeMap.access}
                >
                  {t('bank-settings:tabs.access.form.labels.shouldEnableTwoFactorAuthentication')}
                </CheckboxField>
                <CheckboxField
                  name="shouldEnableUserLoginSelfNotification"
                  disabled={!bankSettingsFormsEditModeMap.access}
                >
                  {t('bank-settings:tabs.access.form.labels.shouldEnableUserLoginSelfNotification')}
                </CheckboxField>
                <CheckboxField
                  name="shouldEnableUserLoginSupervisorNotification"
                  disabled={!bankSettingsFormsEditModeMap.access}
                >
                  {t(
                    'bank-settings:tabs.access.form.labels.shouldEnableUserLoginSupervisorNotification'
                  )}
                </CheckboxField>
                <PasswordInputField
                  name="defaultPassword"
                  id="defaultPassword"
                  htmlFor="defaultPassword"
                  label={t('bank-settings:tabs.access.form.labels.defaultPassword')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                />
                <TextAreaField
                  name="invitationText"
                  label={t('bank-settings:tabs.access.form.labels.invitationText')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                />
                <InputNumberField
                  name="invitationValidityDuration"
                  label={t('bank-settings:tabs.access.form.labels.invitationValidityDuration')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={1}
                />
                <InputNumberField
                  name="minimumPasswordLength"
                  label={t('bank-settings:tabs.access.form.labels.minimumPasswordLength')}
                  required
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={1}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputNumberField
                  name="minimumNumberOfNumChars"
                  label={t('bank-settings:tabs.access.form.labels.minimumNumberOfNumChars')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={0}
                />
                <InputNumberField
                  name="minimumNumberOfSpecialChars"
                  label={t('bank-settings:tabs.access.form.labels.minimumNumberOfSpecialChars')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={0}
                />
                <InputNumberField
                  name="minimumNumberOfUpperCaseChars"
                  label={t('bank-settings:tabs.access.form.labels.minimumNumberOfUpperCaseChars')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={0}
                />
                <InputNumberField
                  name="passwordResetPeriod"
                  label={t('bank-settings:tabs.access.form.labels.passwordResetPeriod')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={1}
                />
                <InputNumberField
                  name="passwordReuseCycles"
                  label={t('bank-settings:tabs.access.form.labels.passwordReuseCycles')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={0}
                />
                <InputNumberField
                  name="failedLoginLimit"
                  label={t('bank-settings:tabs.access.form.labels.failedLoginLimit')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={1}
                />
                <InputNumberField
                  name="failedLoginAttemptsTillCoolDown"
                  label={t('bank-settings:tabs.access.form.labels.failedLoginAttemptsTillCoolDown')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={1}
                />
                <InputNumberField
                  name="failedLoginCooldownPeriod"
                  label={t('bank-settings:tabs.access.form.labels.failedLoginCooldownPeriod')}
                  disabled={!bankSettingsFormsEditModeMap.access}
                  min={1}
                />
                <InputNumberField
                  name="timeoutDuration"
                  label={t('bank-settings:tabs.access.form.labels.timeoutDuration')}
                  required
                  disabled={!bankSettingsFormsEditModeMap.access}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  min={1}
                />
                {bankSettingsFormsEditModeMap.access && (
                  <div className={styles.bankSettingsAccess__controls}>
                    <Button
                      htmlType="reset"
                      disabled={isSubmitting}
                      onClick={() => {
                        resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.Access]: false,
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
