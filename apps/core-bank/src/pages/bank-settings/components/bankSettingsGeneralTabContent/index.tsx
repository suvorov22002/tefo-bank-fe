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
import { BankSettingsGeneral, useBankSettingsGeneral } from '@/domains/bankSettings'
import {
  DictionaryCodeConsts,
  dictionariesUtils,
  useAllDictionaryValuesByDictionaryCode,
} from '@/domains/dictionaries'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditBankSettingsGeneralFormValues extends BankSettingsGeneral {}

export interface BankSettingsGeneralTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsGeneralTabContent = (props: BankSettingsGeneralTabContentProps) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsGeneral, editBankSettingsGeneral } = useBankSettingsGeneral()
  const { getAllDictionaryValuesByDictionaryCode: getInterfaceLanguageDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.InterfaceLanguage,
    })
  const { getAllDictionaryValuesByDictionaryCode: getDateFormatDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.DateFormat,
    })
  const { getAllDictionaryValuesByDictionaryCode: getTimeModeDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.TimeMode,
    })
  const { getAllDictionaryValuesByDictionaryCode: getDecimalMarkDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.DecimalMark,
    })
  const { getAllDictionaryValuesByDictionaryCode: getThousandSeparatorDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.ThousandSeparator,
    })
  const { getAllDictionaryValuesByDictionaryCode: getPageSizeDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.PageSize,
    })

  const interfaceLanguageOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getInterfaceLanguageDictionaryValues.data
  )
  const dateFormatOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getDateFormatDictionaryValues.data
  )
  const timeModeOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getTimeModeDictionaryValues.data
  )
  const decimalMarkOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getDecimalMarkDictionaryValues.data
  )
  const thousandSeparatorOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getThousandSeparatorDictionaryValues.data
  )
  const pageSizeOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getPageSizeDictionaryValues.data
  )

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsGeneralFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsGeneral
      .mutateAsync(values)
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.General]: false,
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

  const isLoading =
    !ready ||
    getBankSettingsGeneral.isLoading ||
    getInterfaceLanguageDictionaryValues.isLoading ||
    getDateFormatDictionaryValues.isLoading ||
    getTimeModeDictionaryValues.isLoading ||
    getDecimalMarkDictionaryValues.isLoading ||
    getThousandSeparatorDictionaryValues.isLoading ||
    getPageSizeDictionaryValues.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsGeneral}>
      <Card
        title={t('bank-settings:tabs.general.subtitle')}
        className={styles.bankSettingsGeneral__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.general}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.General]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsGeneralFormValues>
          initialValues={
            {
              defaultLanguageDictionaryValueId: null,
              dateFormatDictionaryValueId: null,
              timeModeDictionaryValueId: null,
              decimalMarkDictionaryValueId: null,
              thousandSeparatorDictionaryValueId: null,
              defaultPageSizeDictionaryValueId: null,
              ...getBankSettingsGeneral.data,
            } as BankSettingsGeneral
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsGeneral__form}
        >
          {({ dirty, isSubmitting, resetForm }) => {
            return (
              <>
                {CheckIfFormHasChanged(dirty, isSubmitting)}
                <SelectField
                  name="defaultLanguageDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.general.form.labels.defaultLanguageDictionaryValueId'
                  )}
                  options={interfaceLanguageOptions}
                  disabled={!bankSettingsFormsEditModeMap.general}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="dateFormatDictionaryValueId"
                  label={t('bank-settings:tabs.general.form.labels.dateFormatDictionaryValueId')}
                  options={dateFormatOptions}
                  disabled={!bankSettingsFormsEditModeMap.general}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="timeModeDictionaryValueId"
                  label={t('bank-settings:tabs.general.form.labels.timeModeDictionaryValueId')}
                  options={timeModeOptions}
                  disabled={!bankSettingsFormsEditModeMap.general}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="decimalMarkDictionaryValueId"
                  label={t('bank-settings:tabs.general.form.labels.decimalMarkDictionaryValueId')}
                  options={decimalMarkOptions}
                  disabled={!bankSettingsFormsEditModeMap.general}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="thousandSeparatorDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.general.form.labels.thousandSeparatorDictionaryValueId'
                  )}
                  options={thousandSeparatorOptions}
                  disabled={!bankSettingsFormsEditModeMap.general}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="defaultPageSizeDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.general.form.labels.defaultPageSizeDictionaryValueId'
                  )}
                  options={pageSizeOptions}
                  disabled={!bankSettingsFormsEditModeMap.general}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                {bankSettingsFormsEditModeMap.general && (
                  <div className={styles.bankSettingsGeneral__controls}>
                    <Button
                      htmlType="reset"
                      disabled={isSubmitting}
                      onClick={() => {
                        resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.General]: false,
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
