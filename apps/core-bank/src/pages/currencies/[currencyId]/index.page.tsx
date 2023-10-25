import { useRouter } from 'next/router'
import {
  Currency,
  CurrencyStatus,
  CurrencyUsageInBank,
  useAllCurrencies,
  useCurrency,
} from '@/domains/currencies'
import { useEffect, useState } from 'react'

import {
  Button,
  Card,
  CheckboxField,
  Content,
  EditFilledIcon,
  Form,
  FormHelpers,
  Header,
  InputField,
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

import styles from './styles.module.scss'

interface CurrencyDetailsFormValues extends Currency {}

interface CheckboxValues {
  nonCash: boolean
  cash: boolean
  legalTender: boolean
  reference: boolean
}

const CurrencyDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const currencyId = router.query.currencyId ? String(router.query.currencyId) : ''

  const { t, ready } = useTranslation(['common', 'currencies', 'currencies-create'])
  const { message } = useAppStatic()
  const { getCurrency, editCurrency } = useCurrency(currencyId)
  const { getAllCurrencies } = useAllCurrencies()

  const [referenceExists, setReferenceExists] = useState<boolean>(false)
  const [isReference, setIsReference] = useState<boolean>(false)
  const [usageInBank, setUsageInBank] = useState<CurrencyUsageInBank[]>([])
  const [originalUsageInBank, setOriginalUsageInBank] = useState<CurrencyUsageInBank[]>([])

  const [checkboxValues, setCheckboxValues] = useState<CheckboxValues>({
    nonCash: false,
    cash: false,
    legalTender: false,
    reference: false,
  })

  const [originalCheckboxValues, setOriginalCheckboxValues] = useState<CheckboxValues>({
    nonCash: false,
    cash: false,
    legalTender: false,
    reference: false,
  })

  const [isCurrencyDetailsFormInEditMode, setIsCurrencyDetailsFormInEditMode] = useState<boolean>(
    !!router.query.isInitialModeEdit
  )

  const isLoading = !ready || getCurrency.isLoading || getAllCurrencies.isLoading

  const currencyExist = currencyId && getCurrency.isSuccess && getCurrency.data

  const referenceCurrencyExists = (currencies: Currency[]) => {
    for (const currency of currencies) {
      if (currency.usageInBank.includes(CurrencyUsageInBank.Reference)) {
        return true
      }
    }

    return false
  }

  const loadCheckboxValue = (usageInBankArray: CurrencyUsageInBank[]): CheckboxValues => {
    const checkboxValues: CheckboxValues = {
      nonCash: false,
      cash: false,
      legalTender: false,
      reference: false,
    }

    for (const usage of usageInBankArray) {
      switch (usage) {
        case CurrencyUsageInBank.NonCash:
          checkboxValues.nonCash = true
          break
        case CurrencyUsageInBank.Cash:
          checkboxValues.cash = true
          break
        case CurrencyUsageInBank.LegalTender:
          checkboxValues.legalTender = true
          break
        case CurrencyUsageInBank.Reference:
          checkboxValues.reference = true
          setIsReference(true)
          break
        default:
          break
      }
    }

    return checkboxValues
  }

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCurrencySubmit = async (
    values: CurrencyDetailsFormValues,
    helpers: FormHelpers<CurrencyDetailsFormValues>
  ) => {
    showSubmitMessage(0)

    const getValues: CurrencyDetailsFormValues = {
      id: values.id,
      name: values.name,
      alphabeticCode: values.alphabeticCode,
      numericCode: values.numericCode,
      symbol: values.symbol,
      numberOfDecimals: values.numberOfDecimals,
      status: values.status,
      usageInBank: usageInBank,
    }

    return editCurrency
      .mutateAsync(getValues)
      .then(() => {
        setIsCurrencyDetailsFormInEditMode(false)
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

  const handleReferenceConfirm = () => {
    setCheckboxValues(prevCheckboxValues => ({ ...prevCheckboxValues, reference: true }))
    setUsageInBank(prevUsageInBank => [...prevUsageInBank, CurrencyUsageInBank.Reference])
  }

  const handleResetCheckboxes = () => {
    setCheckboxValues(originalCheckboxValues)
    setUsageInBank(originalUsageInBank)
    setIsCurrencyDetailsFormInEditMode(false)
  }

  useEffect(() => {
    if ((!getCurrency.isLoading && !currencyExist) || getCurrency.isError) {
      router.back()
    }

    setReferenceExists(referenceCurrencyExists(getAllCurrencies.data || []))

    if (getCurrency.data) {
      const loadedCheckboxValues = loadCheckboxValue(getCurrency.data.usageInBank)

      setUsageInBank(getCurrency.data.usageInBank)
      setOriginalUsageInBank(getCurrency.data.usageInBank)
      setCheckboxValues(loadedCheckboxValues)
      setOriginalCheckboxValues(loadedCheckboxValues)
    }
  }, [
    getCurrency.isError,
    getCurrency.isLoading,
    currencyExist,
    router,
    getAllCurrencies.data,
    getCurrency.data,
  ])

  if (isLoading || !getCurrency.data) {
    return <Spin fullscreen />
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  const disabledForm = !isCurrencyDetailsFormInEditMode || editCurrency.isLoading

  return (
    <div className={styles.currencyDetails}>
      <Header
        title={t('currencies:title')}
        className={styles.currencyDetails__header}
        onBack={() => router.push(RoutesConsts.Currencies)}
      />
      <Content>
        <Card
          title={getCurrency.data?.name}
          className={styles.currencyDetails__contentCard}
          extra={
            <Button
              icon={<EditFilledIcon />}
              onClick={() => setIsCurrencyDetailsFormInEditMode(true)}
              disabled={isCurrencyDetailsFormInEditMode}
            >
              {t('common:buttons.edit')}
            </Button>
          }
        >
          {getCurrency.data && (
            <Form<CurrencyDetailsFormValues>
              initialValues={
                {
                  id: getCurrency.data.id,
                  name: getCurrency.data.name,
                  alphabeticCode: getCurrency.data.alphabeticCode,
                  numericCode: getCurrency.data.numericCode,
                  symbol: getCurrency.data.symbol,
                  numberOfDecimals: getCurrency.data.numberOfDecimals,
                  status: getCurrency.data.status,
                } as CurrencyDetailsFormValues
              }
              onSubmit={handleCurrencySubmit}
              layout="vertical"
              size="large"
              className={styles.currencyDetails__form}
              enableReinitialize
            >
              {formProps => {
                return (
                  <>
                    {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                    <InputField
                      name="name"
                      label={t('currencies:currenciesTable.columns.titles.name')}
                      required
                      validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                      disabled={disabledForm}
                    />
                    <InputField
                      name="alphabeticCode"
                      label={t('currencies:currenciesTable.columns.titles.alphabeticCode')}
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
                      disabled={disabledForm}
                    />
                    <InputField
                      name="numericCode"
                      label={t('currencies:currenciesTable.columns.titles.numericCode')}
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
                      disabled={disabledForm}
                    />
                    <InputField
                      name="symbol"
                      label={t('currencies:currenciesTable.columns.titles.symbol')}
                      validate={formErrorUtils.optionalCompose(
                        formErrorUtils.minLength(
                          t('common:forms.validations.minLength', { minLength: 1 })
                        )(1),
                        formErrorUtils.maxLength(
                          t('common:forms.validations.maxLength', { maxLength: 6 })
                        )(6)
                      )}
                      disabled={disabledForm}
                    />
                    <InputField
                      name="numberOfDecimals"
                      label={t('currencies:currenciesTable.columns.titles.numberOfDecimals')}
                      required
                      validate={formErrorUtils.compose(
                        formErrorUtils.required(t('common:forms.validations.required'))(),
                        formErrorUtils.min(t('common:forms.validations.min', { min: 0 }))(0),
                        formErrorUtils.max(t('common:forms.validations.max', { max: 9 }))(9),
                        formErrorUtils.numeric(t('common:forms.validations.numeric'))
                      )}
                      disabled={disabledForm}
                    />
                    <div className={styles.currencyDetails__usageInBankFieldArea}>
                      <CheckboxField
                        name={CurrencyUsageInBank.NonCash}
                        label={t('currencies:currenciesTable.columns.titles.usageInBank')}
                        disabled={disabledForm || isReference}
                        onChange={e => {
                          e.target.checked
                            ? setCheckboxValues({
                                nonCash: e.target.checked,
                                cash: false,
                                legalTender: false,
                                reference: false,
                              })
                            : setCheckboxValues({
                                nonCash: false,
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
                        checked={checkboxValues.nonCash}
                      >
                        {t('currencies-create:currencyUsageInBank.nonCash')}
                      </CheckboxField>
                      <CheckboxField
                        name={CurrencyUsageInBank.Cash}
                        disabled={!checkboxValues.nonCash || disabledForm || isReference}
                        onChange={e => {
                          e.target.checked
                            ? setCheckboxValues({
                                ...checkboxValues,
                                cash: e.target.checked,
                                legalTender: false,
                                reference: false,
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
                        disabled={!checkboxValues.cash || disabledForm || isReference}
                        onChange={e => {
                          e.target.checked
                            ? setCheckboxValues({
                                ...checkboxValues,
                                legalTender: e.target.checked,
                                reference: false,
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
                        disabled={
                          !checkboxValues.legalTender ||
                          referenceExists ||
                          disabledForm ||
                          isReference
                        }
                        onChange={e => {
                          setCheckboxValues({
                            ...checkboxValues,
                            reference: e.target.checked,
                          })
                          setUsageInBank(prevUsageInBank =>
                            e.target.checked
                              ? [...prevUsageInBank, CurrencyUsageInBank.Reference]
                              : prevUsageInBank.filter(
                                  item => item !== CurrencyUsageInBank.Reference
                                )
                          )
                        }}
                        checked={
                          (checkboxValues.legalTender &&
                            checkboxValues.reference &&
                            !referenceExists) ||
                          checkboxValues.reference
                        }
                      >
                        {t('currencies-create:currencyUsageInBank.reference')}
                      </CheckboxField>
                    </div>
                    <SelectField
                      name="status"
                      required
                      disabled={disabledForm}
                      options={[
                        {
                          label: t('currencies:currenciesTable.currencyStatuses.active'),
                          value: CurrencyStatus.Active,
                        },
                        {
                          label: t('currencies:currenciesTable.currencyStatuses.inactive'),
                          value: CurrencyStatus.Inactive,
                        },
                      ]}
                      validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                      label={t('currencies:currenciesTable.columns.titles.status')}
                    />
                    {isCurrencyDetailsFormInEditMode && (
                      <div className={styles.currencyDetails__controls}>
                        <Button
                          htmlType="reset"
                          disabled={formProps.isSubmitting}
                          onClick={() => {
                            formProps.resetForm()
                            handleResetCheckboxes()
                          }}
                        >
                          {t('common:buttons.cancel')}
                        </Button>
                        <Popconfirm
                          title={t('currencies-create:popconfirms.referenceCanBeSetOnceTitle')}
                          description={t(
                            'currencies-create:popconfirms.referenceCanBeSetOnceDescription'
                          )}
                          placement="topRight"
                          onConfirm={handleReferenceConfirm}
                          disabled={!checkboxValues.reference}
                          okText={t('common:buttons.yes')}
                          okButtonProps={{
                            type: 'primary',
                            danger: true,
                            loading: formProps.isSubmitting,
                            disabled: !formProps.dirty,
                            onClick: formProps.submitForm,
                          }}
                          cancelText={t('common:buttons.no')}
                        >
                          <Button
                            block
                            type="primary"
                            htmlType={checkboxValues.reference ? 'button' : 'submit'}
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
          )}
        </Card>
      </Content>
    </div>
  )
}

CurrencyDetails.getLayout = getCoreBankDefaultLayout

export default CurrencyDetails
