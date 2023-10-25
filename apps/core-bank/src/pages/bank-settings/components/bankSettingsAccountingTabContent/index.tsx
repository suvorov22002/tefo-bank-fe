import {
  Button,
  Card,
  CheckboxField,
  EditFilledIcon,
  Form,
  FormProps,
  InputNumberField,
  Popconfirm,
  SelectField,
  formErrorUtils,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { useTranslation } from '@/i18n'
import { BankSettingsAccounting, useBankSettingsAccounting } from '@/domains/bankSettings'
import {
  DictionaryCodeConsts,
  dictionariesUtils,
  useAllDictionaryValuesByDictionaryCode,
} from '@/domains/dictionaries'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditBankSettingsAccountingFormValues extends BankSettingsAccounting {}

export interface BankSettingsAccountingTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsAccountingTabContent = (props: BankSettingsAccountingTabContentProps) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsAccounting, editBankSettingsAccounting } = useBankSettingsAccounting()
  const { getAllDictionaryValuesByDictionaryCode: getAccountingMethodDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.AccountingMethod,
    })
  const { getAllDictionaryValuesByDictionaryCode: getAccountingSystemTypeDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.AccountingSystemType,
    })
  const { getAllDictionaryValuesByDictionaryCode: getSymbolTypesDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.SymbolTypes,
    })
  const { getAllDictionaryValuesByDictionaryCode: getInternalCodeFreeSegmentDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.InternalCodeFreeSegment,
    })

  const accountingMethodOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getAccountingMethodDictionaryValues.data
  )
  const accountingSystemTypeOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getAccountingSystemTypeDictionaryValues.data
  )
  const symbolTypesOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getSymbolTypesDictionaryValues.data
  )
  const internalCodeFreeSegmentOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getInternalCodeFreeSegmentDictionaryValues.data
  )

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsAccountingFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsAccounting
      .mutateAsync(values)
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.Accounting]: false,
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

  const isLoading = !ready || getBankSettingsAccounting.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsAccounting}>
      <Card
        title={t('bank-settings:tabs.accounting.subtitle')}
        className={styles.bankSettingsAccounting__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.accounting}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.Accounting]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsAccountingFormValues>
          initialValues={
            {
              accountingMethodDictionaryValueId: null,
              accountingSystemTypeDictionaryValueId: null,
              accountNumberLength: undefined,
              accountNumberAllowedSymbolsDictionaryValueId: null,
              accountNumberFreeSegmentDictionaryValueId: null,
              isUsedIBAN: false,
              IBANLength: undefined,
              ...getBankSettingsAccounting.data,
            } as EditBankSettingsAccountingFormValues
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsAccounting__form}
        >
          {formProps => {
            const shouldConfirmBeforeSubmit =
              !formProps.initialValues.accountingMethodDictionaryValueId

            return (
              <>
                {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                <SelectField
                  name="accountingMethodDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.accounting.form.labels.accountingMethodDictionaryValueId'
                  )}
                  options={accountingMethodOptions}
                  required
                  disabled={
                    !!formProps.initialValues.accountingMethodDictionaryValueId ||
                    !bankSettingsFormsEditModeMap.accounting
                  }
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  extra=" "
                  help={t('common:forms.helpMessages.canBeSetOnce')}
                />
                <SelectField
                  name="accountingSystemTypeDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.accounting.form.labels.accountingSystemTypeDictionaryValueId'
                  )}
                  options={accountingSystemTypeOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.accounting}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputNumberField
                  name="accountNumberLength"
                  label={t('bank-settings:tabs.accounting.form.labels.accountNumberLength')}
                  required
                  min={0}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.accounting}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="accountNumberAllowedSymbolsDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.accounting.form.labels.accountNumberAllowedSymbolsDictionaryValueId'
                  )}
                  options={symbolTypesOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.accounting}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="accountNumberFreeSegmentDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.accounting.form.labels.accountNumberFreeSegmentDictionaryValueId'
                  )}
                  options={internalCodeFreeSegmentOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.accounting}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <CheckboxField
                  name="isUsedIBAN"
                  disabled={!bankSettingsFormsEditModeMap.accounting}
                >
                  {t('bank-settings:tabs.accounting.form.labels.isUsedIBAN')}
                </CheckboxField>
                <InputNumberField
                  name="IBANLength"
                  label={t('bank-settings:tabs.accounting.form.labels.IBANLength')}
                  disabled={!bankSettingsFormsEditModeMap.accounting}
                  validate={value => {
                    if (formProps.values.isUsedIBAN) {
                      return formErrorUtils.required(t('common:forms.validations.required'))()(
                        value
                      )
                    }
                  }}
                />
                {bankSettingsFormsEditModeMap.accounting && (
                  <div className={styles.bankSettingsAccounting__controls}>
                    <Button
                      htmlType="reset"
                      disabled={formProps.isSubmitting}
                      onClick={() => {
                        formProps.resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.Accounting]: false,
                        })
                      }}
                    >
                      {t('common:buttons.cancel')}
                    </Button>
                    <Popconfirm
                      title={t('common:popconfirms.canBeSetOnceTitle')}
                      description={t('common:popconfirms.canBeSetOnceDescription')}
                      okText={t('common:buttons.yes')}
                      disabled={!shouldConfirmBeforeSubmit || !formProps.isValid}
                      okButtonProps={{
                        type: 'primary',
                        danger: true,
                        loading: formProps.isSubmitting,
                        disabled: !formProps.dirty,
                        onClick: formProps.submitForm,
                      }}
                      cancelButtonProps={{
                        disabled: formProps.isSubmitting,
                      }}
                      cancelText={t('common:buttons.no')}
                    >
                      <Button
                        type="primary"
                        htmlType={
                          shouldConfirmBeforeSubmit && formProps.isValid ? 'button' : 'submit'
                        }
                        block
                        loading={formProps.isSubmitting}
                        disabled={!formProps.dirty}
                      >
                        {t('common:buttons.save')}
                      </Button>
                    </Popconfirm>
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
