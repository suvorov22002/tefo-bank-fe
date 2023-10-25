import {
  Button,
  Card,
  CheckboxField,
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
import { BankSettingsTime, useBankSettingsTime } from '@/domains/bankSettings'
import {
  DictionaryCodeConsts,
  useAllDictionaryValuesByDictionaryCode,
} from '@/domains/dictionaries'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditBankSettingsTimeFormValues extends BankSettingsTime {}

export interface BankSettingsTimeTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsTimeTabContent = (props: BankSettingsTimeTabContentProps) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsTime, editBankSettingsTime } = useBankSettingsTime()
  const { getAllDictionaryValuesByDictionaryCode } = useAllDictionaryValuesByDictionaryCode({
    dictionaryCode: DictionaryCodeConsts.TimeZone,
  })

  const timeZoneOptions = getAllDictionaryValuesByDictionaryCode.data?.map(el => ({
    label: el.name,
    value: el.id,
  }))

  const isLoading =
    !ready || getBankSettingsTime.isLoading || getAllDictionaryValuesByDictionaryCode.isLoading

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsTimeFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsTime
      .mutateAsync(values)
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.Time]: false,
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

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsTime}>
      <Card
        title={t('bank-settings:tabs.time.subtitle')}
        className={styles.bankSettingsTime__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.time}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.Time]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsTimeFormValues>
          initialValues={
            {
              timeZoneWinterDictionaryValueId: null,
              timeZoneSummerDictionaryValueId: null,
              isNonBusinessDayMonday: false,
              isNonBusinessDayTuesday: false,
              isNonBusinessDayWednesday: false,
              isNonBusinessDayThursday: false,
              isNonBusinessDayFriday: false,
              isNonBusinessDaySaturday: false,
              isNonBusinessDaySunday: false,
              ...getBankSettingsTime.data,
            } as EditBankSettingsTimeFormValues
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsTime__form}
        >
          {({ dirty, isSubmitting, resetForm }) => {
            return (
              <>
                {CheckIfFormHasChanged(dirty, isSubmitting)}
                <SelectField
                  name="timeZoneWinterDictionaryValueId"
                  label={t('bank-settings:tabs.time.form.labels.timeZoneWinterDictionaryValueId')}
                  options={timeZoneOptions}
                  disabled={!bankSettingsFormsEditModeMap.time}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="timeZoneSummerDictionaryValueId"
                  label={t('bank-settings:tabs.time.form.labels.timeZoneSummerDictionaryValueId')}
                  options={timeZoneOptions}
                  disabled={!bankSettingsFormsEditModeMap.time}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <div className={styles.bankSettingsTime__nonBusinessDaysFieldsArea}>
                  <CheckboxField
                    name="isNonBusinessDayMonday"
                    label={t('bank-settings:tabs.time.form.labels.nonBusinessDays')}
                    disabled={!bankSettingsFormsEditModeMap.time}
                  >
                    {t('bank-settings:tabs.time.form.labels.isNonBusinessDayMonday')}
                  </CheckboxField>
                  <CheckboxField
                    name="isNonBusinessDayTuesday"
                    disabled={!bankSettingsFormsEditModeMap.time}
                  >
                    {t('bank-settings:tabs.time.form.labels.isNonBusinessDayTuesday')}
                  </CheckboxField>
                  <CheckboxField
                    name="isNonBusinessDayWednesday"
                    disabled={!bankSettingsFormsEditModeMap.time}
                  >
                    {t('bank-settings:tabs.time.form.labels.isNonBusinessDayWednesday')}
                  </CheckboxField>
                  <CheckboxField
                    name="isNonBusinessDayThursday"
                    disabled={!bankSettingsFormsEditModeMap.time}
                  >
                    {t('bank-settings:tabs.time.form.labels.isNonBusinessDayThursday')}
                  </CheckboxField>
                  <CheckboxField
                    name="isNonBusinessDayFriday"
                    disabled={!bankSettingsFormsEditModeMap.time}
                  >
                    {t('bank-settings:tabs.time.form.labels.isNonBusinessDayFriday')}
                  </CheckboxField>
                  <CheckboxField
                    name="isNonBusinessDaySaturday"
                    disabled={!bankSettingsFormsEditModeMap.time}
                  >
                    {t('bank-settings:tabs.time.form.labels.isNonBusinessDaySaturday')}
                  </CheckboxField>
                  <CheckboxField
                    name="isNonBusinessDaySunday"
                    disabled={!bankSettingsFormsEditModeMap.time}
                  >
                    {t('bank-settings:tabs.time.form.labels.isNonBusinessDaySunday')}
                  </CheckboxField>
                </div>
                {bankSettingsFormsEditModeMap.time && (
                  <div className={styles.bankSettingsTime__controls}>
                    <Button
                      htmlType="reset"
                      disabled={isSubmitting}
                      onClick={() => {
                        resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.Time]: false,
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
