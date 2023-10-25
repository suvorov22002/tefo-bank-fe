import { useRouter } from 'next/router'
import {
  Button,
  Card,
  CheckboxField,
  Content,
  Form,
  FormHelpers,
  Header,
  InputField,
  InputNumberField,
  Popconfirm,
  SelectField,
  Spin,
  formErrorUtils,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'
import { useEffect, useState } from 'react'

import {
  CreateCurrencyRequestData,
  Currency,
  CurrencyStatus,
  CurrencyUsageInBank,
  useAllCurrencies,
  useCurrency,
} from '@/domains/currencies'

import styles from './styles.module.scss'

interface CreateCurrencyFormValues extends CreateCurrencyRequestData {}

interface CheckboxValues {
  nonCash: boolean
  cash: boolean
  legalTender: boolean
  reference: boolean
}

const CreateCurrency: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'currencies-create'])
  const { message } = useAppStatic()

  const { createCurrency } = useCurrency()
  const { getAllCurrencies } = useAllCurrencies()

  const [referenceExists, setReferenceExists] = useState<boolean>(false)
  const [usageInBank, setUsageInBank] = useState<CurrencyUsageInBank[]>([])
  const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({
    nonCash: false,
    cash: false,
    legalTender: false,
    reference: false,
  })

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateCurrencySubmit = (
    values: CreateCurrencyFormValues,
    helpers: FormHelpers<CreateCurrencyFormValues>
  ) => {
    showSubmitMessage(0)

    const updatedValues: CreateCurrencyFormValues = {
      name: values.name,
      alphabeticCode: values.alphabeticCode,
      numericCode: values.numericCode,
      symbol: values.symbol,
      numberOfDecimals: values.numberOfDecimals,
      status: values.status,
      usageInBank: usageInBank,
    }

    return createCurrency
      .mutateAsync(updatedValues)
      .then(() => {
        showSuccessMessage()
        router.push(RoutesConsts.Currencies)
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const isLoading = !ready || getAllCurrencies.isLoading

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) => {
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)
  }

  const referenceCurrencyExists = (currencies: Currency[]) => {
    for (const currency of currencies) {
      if (currency.usageInBank.includes(CurrencyUsageInBank.Reference)) {
        return true
      }
    }

    return false
  }

  useEffect(() => {
    setReferenceExists(referenceCurrencyExists(getAllCurrencies.data || []))
  }, [getAllCurrencies.data])

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.createCurrency}>
      <Header title={t('currencies-create:title')} className={styles.createCurrency__header} />
      <Content>
        <Card
          title={t('currencies-create:subtitle')}
          className={styles.createCurrency__contentCard}
        >
          <Form<CreateCurrencyFormValues>
            initialValues={{
              alphabeticCode: '',
              name: '',
              numberOfDecimals: 0,
              numericCode: 0,
              symbol: '',
              status: CurrencyStatus.Active,
              usageInBank: [],
            }}
            onSubmit={handleCreateCurrencySubmit}
            enableReinitialize
            className={styles.createCurrency__form}
            size="large"
            layout="vertical"
          >
            {formProps => {
              return (
                <>
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <InputField
                    name="name"
                    label={t('currencies-create:currencyForm.labels.name')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  />
                  <InputField
                    name="alphabeticCode"
                    label={t('currencies-create:currencyForm.labels.alphabeticCode')}
                    required
                    validate={formErrorUtils.compose(
                      formErrorUtils.required(t('common:forms.validations.required'))(),
                      formErrorUtils.upperCasedAlphabetic(
                        t('common:forms.validations.upperCasedAlphabetic')
                      ),
                      formErrorUtils.minLength(
                        t('common:forms.validations.minLength', { minLength: 3 })
                      )(3),
                      formErrorUtils.maxLength(
                        t('common:forms.validations.maxLength', { maxLength: 3 })
                      )(3)
                    )}
                  />
                  <InputField
                    name="numericCode"
                    label={t('currencies-create:currencyForm.labels.numericCode')}
                    required
                    validate={formErrorUtils.compose(
                      formErrorUtils.required(t('common:forms.validations.required'))(),
                      formErrorUtils.minLength(
                        t('common:forms.validations.minLength', { minLength: 3 })
                      )(3),
                      formErrorUtils.maxLength(
                        t('common:forms.validations.maxLength', { maxLength: 3 })
                      )(3),
                      formErrorUtils.numeric(t('common:forms.validations.numeric'))
                    )}
                  />
                  <InputField
                    name="symbol"
                    label={t('currencies-create:currencyForm.labels.symbol')}
                    validate={formErrorUtils.optionalCompose(
                      formErrorUtils.minLength(
                        t('common:forms.validations.minLength', { minLength: 1 })
                      )(1),
                      formErrorUtils.maxLength(
                        t('common:forms.validations.maxLength', { maxLength: 6 })
                      )(6)
                    )}
                  />
                  <InputNumberField
                    name="numberOfDecimals"
                    label={t('currencies-create:currencyForm.labels.numberOfDecimals')}
                    required
                    validate={formErrorUtils.compose(
                      formErrorUtils.required(t('common:forms.validations.required'))(),
                      formErrorUtils.numeric(t('common:forms.validations.numeric')),
                      formErrorUtils.min(t('common:forms.validations.min', { min: 0 }))(0),
                      formErrorUtils.max(t('common:forms.validations.max', { max: 9 }))(9)
                    )}
                  />
                  <div className={styles.createCurrency__usageInBankFieldArea}>
                    <CheckboxField
                      name={CurrencyUsageInBank.NonCash}
                      label={t('currencies-create:currencyForm.labels.usageInBank')}
                      disabled={false}
                      onChange={e => {
                        e.target.checked
                          ? setCheckboxValues({
                              ...checkboxValues,
                              nonCash: e.target.checked,
                            })
                          : setCheckboxValues({
                              nonCash: e.target.checked,
                              cash: false,
                              legalTender: false,
                              reference: false,
                            })

                        setUsageInBank(prevUsageInBank =>
                          e.target.checked
                            ? [...prevUsageInBank, CurrencyUsageInBank.NonCash]
                            : prevUsageInBank.filter(item => item !== CurrencyUsageInBank.NonCash)
                        )
                      }}
                    >
                      {t('currencies-create:currencyUsageInBank.nonCash')}
                    </CheckboxField>

                    <CheckboxField
                      name={CurrencyUsageInBank.Cash}
                      disabled={!checkboxValues.nonCash}
                      onChange={e => {
                        e.target.checked
                          ? setCheckboxValues({
                              ...checkboxValues,
                              cash: e.target.checked,
                            })
                          : setCheckboxValues({
                              ...checkboxValues,
                              cash: false,
                              legalTender: false,
                              reference: false,
                            })

                        setUsageInBank(prevUsageInBank =>
                          e.target.checked
                            ? [...prevUsageInBank, CurrencyUsageInBank.Cash]
                            : prevUsageInBank.filter(item => item !== CurrencyUsageInBank.Cash)
                        )
                      }}
                      checked={checkboxValues.cash && checkboxValues.nonCash}
                    >
                      {t('currencies-create:currencyUsageInBank.cash')}
                    </CheckboxField>

                    <CheckboxField
                      name={CurrencyUsageInBank.LegalTender}
                      disabled={!checkboxValues.cash}
                      onChange={e => {
                        e.target.checked
                          ? setCheckboxValues({
                              ...checkboxValues,
                              legalTender: e.target.checked,
                            })
                          : setCheckboxValues({
                              ...checkboxValues,
                              legalTender: false,
                              reference: false,
                            })

                        setUsageInBank(prevUsageInBank =>
                          e.target.checked
                            ? [...prevUsageInBank, CurrencyUsageInBank.LegalTender]
                            : prevUsageInBank.filter(
                                item => item !== CurrencyUsageInBank.LegalTender
                              )
                        )
                      }}
                      checked={checkboxValues.legalTender && checkboxValues.cash}
                    >
                      {t('currencies-create:currencyUsageInBank.legalTender')}
                    </CheckboxField>

                    <CheckboxField
                      name={CurrencyUsageInBank.Reference}
                      disabled={referenceExists || !checkboxValues.legalTender}
                      checked={
                        checkboxValues.legalTender && checkboxValues.reference && !referenceExists
                      }
                      onChange={e => {
                        setCheckboxValues({
                          ...checkboxValues,
                          reference: e.target.checked,
                        })
                        setUsageInBank(prevUsageInBank =>
                          e.target.checked
                            ? [...prevUsageInBank, CurrencyUsageInBank.Reference]
                            : prevUsageInBank.filter(item => item !== CurrencyUsageInBank.Reference)
                        )
                      }}
                    >
                      {t('currencies-create:currencyUsageInBank.reference')}
                    </CheckboxField>
                  </div>
                  <SelectField
                    name="status"
                    required
                    options={[
                      {
                        label: t('currencies-create:currencyForm.statusOptions.active'),
                        value: CurrencyStatus.Active,
                      },
                      {
                        label: t('currencies-create:currencyForm.statusOptions.inactive'),
                        value: CurrencyStatus.Inactive,
                      },
                    ]}
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    label={t('currencies-create:currencyForm.labels.status')}
                  />
                  <div className={styles.createCurrency__controls}>
                    <Button
                      disabled={formProps.isSubmitting}
                      onClick={() => router.push(RoutesConsts.Currencies)}
                    >
                      {t('common:buttons.cancel')}
                    </Button>
                    <Popconfirm
                      title={t('currencies-create:popconfirms.referenceCanBeSetOnceTitle')}
                      description={t(
                        'currencies-create:popconfirms.referenceCanBeSetOnceDescription'
                      )}
                      placement="topRight"
                      okText={t('common:buttons.yes')}
                      disabled={!checkboxValues.reference}
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
                        block
                        type="primary"
                        htmlType={checkboxValues.reference ? 'button' : 'submit'}
                        loading={formProps.isSubmitting}
                      >
                        {t('common:buttons.create')}
                      </Button>
                    </Popconfirm>
                  </div>
                </>
              )
            }}
          </Form>
        </Card>
      </Content>
    </div>
  )
}

CreateCurrency.getLayout = getCoreBankDefaultLayout

export default CreateCurrency
