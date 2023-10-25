import {
  Button,
  Card,
  CheckboxField,
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
import { BankSettingsCustomers, useBankSettingsCustomers } from '@/domains/bankSettings'
import {
  DictionaryCodeConsts,
  dictionariesUtils,
  useAllDictionaryValuesByDictionaryCode,
} from '@/domains/dictionaries'

import { BankSettingsTabsKeys } from '../../consts'
import styles from './styles.module.scss'

interface EditBankSettingsCustomersFormValues extends BankSettingsCustomers {}

export interface BankSettingsCustomersTabContentProps {
  bankSettingsFormsEditModeMap: Record<BankSettingsTabsKeys, boolean>
  setBankSettingsFormsEditModeMap: (value: Record<BankSettingsTabsKeys, boolean>) => void
}

export const BankSettingsCustomersTabContent = (props: BankSettingsCustomersTabContentProps) => {
  const { bankSettingsFormsEditModeMap, setBankSettingsFormsEditModeMap } = props

  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'bank-settings'])
  const { getBankSettingsCustomers, editBankSettingsCustomers } = useBankSettingsCustomers()

  const { getAllDictionaryValuesByDictionaryCode: getSymbolTypesDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.SymbolTypes,
    })
  const { getAllDictionaryValuesByDictionaryCode: getInternalCodeFreeSegmentDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.InternalCodeFreeSegment,
    })
  const { getAllDictionaryValuesByDictionaryCode: getDocumentTypeDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.DocumentType,
    })
  const { getAllDictionaryValuesByDictionaryCode: getCustomerLegalFormDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.CustomerLegalForm,
    })
  const { getAllDictionaryValuesByDictionaryCode: getEconomicSectorFormDictionaryValues } =
    useAllDictionaryValuesByDictionaryCode({
      dictionaryCode: DictionaryCodeConsts.EconomicSector,
    })

  const symbolTypesOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getSymbolTypesDictionaryValues.data
  )
  const internalCodeFreeSegmentOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getInternalCodeFreeSegmentDictionaryValues.data
  )
  const documentTypeOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getDocumentTypeDictionaryValues.data
  )
  const customerLegalFormOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getCustomerLegalFormDictionaryValues.data
  )
  const economicSectorOptions = dictionariesUtils.getSelectOptionsFromDictionaryValues(
    getEconomicSectorFormDictionaryValues.data
  )

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditBankSettingsCustomersFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editBankSettingsCustomers
      .mutateAsync(values)
      .then(() => {
        setBankSettingsFormsEditModeMap({
          ...bankSettingsFormsEditModeMap,
          [BankSettingsTabsKeys.Customers]: false,
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

  const isLoading = !ready || getBankSettingsCustomers.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  return (
    <div className={styles.bankSettingsCustomers}>
      <Card
        title={t('bank-settings:tabs.customers.subtitle')}
        className={styles.bankSettingsCustomers__contentCard}
        extra={
          <>
            <Button
              icon={<EditFilledIcon />}
              disabled={bankSettingsFormsEditModeMap.customers}
              onClick={() => {
                setBankSettingsFormsEditModeMap({
                  ...bankSettingsFormsEditModeMap,
                  [BankSettingsTabsKeys.Customers]: true,
                })
              }}
            >
              {t('common:buttons.edit')}
            </Button>
          </>
        }
      >
        <Form<EditBankSettingsCustomersFormValues>
          initialValues={
            {
              internalCodeLength: null,
              isUsedUnitCodeInInternalCode: false,
              internalCodeAllowedSymbolsDictionaryValueId: null,
              internalCodeFreeSegmentDictionaryValueId: null,
              minAgeForOnboarding: null,
              KYCPeriod: null,
              documentTypeForPhotoDictionaryValueId: null,
              documentTypeForSignatureDictionaryValueId: null,
              defaultLegalFormForNaturalPersonDictionaryValueId: null,
              defaultEconomicSectorForNaturalPersonDictionaryValueId: null,

              ...getBankSettingsCustomers.data,
            } as EditBankSettingsCustomersFormValues
          }
          onSubmit={handleSubmit}
          enableReinitialize
          layout="vertical"
          size="large"
          className={styles.bankSettingsCustomers__form}
        >
          {formProps => {
            return (
              <>
                {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                <InputNumberField
                  name="internalCodeLength"
                  label={t('bank-settings:tabs.customers.form.labels.internalCodeLength')}
                  required
                  min={5}
                  max={100}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.customers}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <CheckboxField
                  name="isUsedUnitCodeInInternalCode"
                  disabled={!bankSettingsFormsEditModeMap.customers}
                >
                  {t('bank-settings:tabs.customers.form.labels.isUsedUnitCodeInInternalCode')}
                </CheckboxField>
                <SelectField
                  name="internalCodeAllowedSymbolsDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.customers.form.labels.internalCodeAllowedSymbolsDictionaryValueId'
                  )}
                  options={symbolTypesOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.customers}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="internalCodeFreeSegmentDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.customers.form.labels.internalCodeFreeSegmentDictionaryValueId'
                  )}
                  options={internalCodeFreeSegmentOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.customers}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputNumberField
                  name="minAgeForOnboarding"
                  label={t('bank-settings:tabs.customers.form.labels.minAgeForOnboarding')}
                  required
                  min={0}
                  max={18}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.customers}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputNumberField
                  name="KYCPeriod"
                  label={t('bank-settings:tabs.customers.form.labels.KYCPeriod')}
                  min={0}
                  max={5}
                  precision={0}
                  disabled={!bankSettingsFormsEditModeMap.customers}
                />
                <SelectField
                  name="documentTypeForPhotoDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.customers.form.labels.documentTypeForPhotoDictionaryValueId'
                  )}
                  options={documentTypeOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.customers}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="documentTypeForSignatureDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.customers.form.labels.documentTypeForSignatureDictionaryValueId'
                  )}
                  options={documentTypeOptions}
                  required
                  disabled={!bankSettingsFormsEditModeMap.customers}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="defaultLegalFormForNaturalPersonDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.customers.form.labels.defaultLegalFormForNaturalPersonDictionaryValueId'
                  )}
                  options={customerLegalFormOptions}
                  disabled={!bankSettingsFormsEditModeMap.customers}
                />
                <SelectField
                  name="defaultEconomicSectorForNaturalPersonDictionaryValueId"
                  label={t(
                    'bank-settings:tabs.customers.form.labels.defaultEconomicSectorForNaturalPersonDictionaryValueId'
                  )}
                  options={economicSectorOptions}
                  disabled={!bankSettingsFormsEditModeMap.customers}
                />

                {bankSettingsFormsEditModeMap.customers && (
                  <div className={styles.bankSettingsCustomers__controls}>
                    <Button
                      htmlType="reset"
                      disabled={formProps.isSubmitting}
                      onClick={() => {
                        formProps.resetForm()
                        setBankSettingsFormsEditModeMap({
                          ...bankSettingsFormsEditModeMap,
                          [BankSettingsTabsKeys.Customers]: false,
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
