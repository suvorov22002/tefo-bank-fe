import {
  Button,
  Card,
  EditFilledIcon,
  Form,
  FormProps,
  InputNumberField,
  SelectField,
  formErrorUtils,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { useTranslation } from '@/i18n'
import { BankSettingsTransactions, useBankSettingsTransactions } from '@/domains/bankSettings'
import {
  DictionaryCodeConsts,
  dictionariesUtils,
  useAllDictionaryValuesByDictionaryCode,
} from '@/domains/dictionaries'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditBankSettingsTransactionsFormValues extends BankSettingsTransactions {}

export interface BankSettingsTransactionsTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsTransactionsTabContent = (
  props: BankSettingsTransactionsTabContentProps
) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsTransactions, editBankSettingsTransactions } =
    useBankSettingsTransactions()

  const { getAllDictionaryValuesByDictionaryCode: getSymbolTypesDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.SymbolTypes,
    })
  const { getAllDictionaryValuesByDictionaryCode: getPeriodTermDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.PeriodTerm,
    })

  const symbolTypesOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getSymbolTypesDictionaryValues.data
  )
  const periodTermOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getPeriodTermDictionaryValues.data
  )

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsTransactionsFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsTransactions
      .mutateAsync(values)
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.Transactions]: false,
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

  const isLoading = !ready || getBankSettingsTransactions.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsTransactions}>
      <Card
        title={t('bank-settings:tabs.transactions.subtitle')}
        className={styles.bankSettingsTransactions__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.transactions}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.Transactions]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsTransactionsFormValues>
          initialValues={
            {
              transactionNumberLength: null,
              transactionNumberSymbolsDictionaryValueId: null,
              transactionNumberUniquenessTermDictionaryValueId: null,
              ...getBankSettingsTransactions.data,
            } as EditBankSettingsTransactionsFormValues
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsTransactions__form}
        >
          {formProps => {
            return (
              <>
                {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                <InputNumberField
                  name="transactionNumberLength"
                  label={t('bank-settings:tabs.transactions.form.labels.transactionNumberLength')}
                  required
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.transactions}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="transactionNumberSymbolsDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.transactions.form.labels.transactionNumberSymbolsDictionaryValueId'
                  )}
                  options={symbolTypesOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.transactions}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="transactionNumberUniquenessTermDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.transactions.form.labels.transactionNumberUniquenessTermDictionaryValueId'
                  )}
                  options={periodTermOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.transactions}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                {bankSettingsFormsEditModeMap.transactions && (
                  <div className={styles.bankSettingsTransactions__controls}>
                    <Button
                      htmlType="reset"
                      disabled={formProps.isSubmitting}
                      onClick={() => {
                        formProps.resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.Transactions]: false,
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
