import { useState } from 'react'
import { Content, Divider, FormikProps, Header, Spin, Steps, Text, classes, theme } from 'ui'

import { NextPageWithLayout } from '@/types'
import { getCreateBankProfileLayout } from '@/components'
import { useBankProfile } from '@/domains/bankProfile'
import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'
import {
  BankAddressView,
  BankContactsView,
  BankInformationVerifyView,
  BankNameView,
  BankSwiftView,
  ErrorView,
  SuccessView,
} from './components'
import { CreateBankProfileFormValues, CreateBankProfileViews } from './types'

const initialValues: CreateBankProfileFormValues = {
  shortName: '',
  longName: '',
  streetLine: '',
  city: '',
  region: '',
  zipCode: '',
  country: '',
  phoneCode: '',
  shortPhoneNumber: '',
  email: '',
  codeGroup: '',
  swiftCode: '',
}

const getCreateBankProfileSteps = (t: TFunction, ready: boolean) =>
  ready
    ? [
        {
          title: t('create-bank-profile:steps.name.title'),
          description: t('create-bank-profile:steps.name.description'),
        },
        {
          title: t('create-bank-profile:steps.address.title'),
          description: t('create-bank-profile:steps.address.description'),
        },
        {
          title: t('create-bank-profile:steps.contacts.title'),
          description: t('create-bank-profile:steps.contacts.description'),
        },
        {
          title: t('create-bank-profile:steps.swift.title'),
          description: t('create-bank-profile:steps.swift.description'),
        },
      ]
    : []

const CreateBankProfile: NextPageWithLayout = () => {
  const { t, ready } = useTranslation(['common', 'create-bank-profile'])
  const { createBankProfileAction } = useBankProfile()
  const { token } = theme.useToken()

  const [formValues, setFormValues] = useState<CreateBankProfileFormValues>(initialValues)
  const [currentStep, setCurrentStep] = useState<CreateBankProfileViews>(
    CreateBankProfileViews.BankName
  )

  const isLoading = !ready || createBankProfileAction.isLoading

  const isOnResultStep =
    currentStep === CreateBankProfileViews.Success || currentStep === CreateBankProfileViews.Error
  const createBankProfileSteps = getCreateBankProfileSteps(t, ready)

  const handleBackButtonClick = () => {
    setCurrentStep(prevStep => {
      const resultsView = [CreateBankProfileViews.Error, CreateBankProfileViews.Success]

      if (resultsView.includes(prevStep - 1)) {
        return prevStep - 2
      }

      return prevStep - 1
    })
  }

  const handleSubmit = (values: Partial<CreateBankProfileFormValues>) => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...values,
    }))
    setCurrentStep(prevStep => prevStep + 1)
  }

  const handleBankInformationVerifySubmit = async (values: CreateBankProfileFormValues) => {
    setFormValues(prevValues => ({
      ...prevValues,
      ...values,
    }))

    await createBankProfileAction.mutateAsync(values, {
      onError: () => setCurrentStep(CreateBankProfileViews.Error),
      onSuccess: () => setCurrentStep(CreateBankProfileViews.Success),
    })
  }

  const renderCreateBankProfileSteps = ({
    touched,
    errors,
  }: {
    touched: FormikProps<CreateBankProfileFormValues>['touched']
    errors: FormikProps<CreateBankProfileFormValues>['errors']
  }) => {
    const getStepStatus = () =>
      Object.keys(errors).some(field => touched[field as keyof typeof touched])
        ? 'error'
        : undefined

    return (
      <>
        <Steps
          items={createBankProfileSteps.map((step, index) =>
            index === currentStep ? { ...step, status: getStepStatus() } : step
          )}
          type="navigation"
          current={currentStep}
          className={styles.createBankProfile__steps}
        />
        <Divider />
      </>
    )
  }

  const createBankProfileFormStepProgressText = (
    <Text type="secondary" className={styles.createBankProfile__stepProgressText}>
      {ready &&
        t('create-bank-profile:stepsProgress', {
          current: currentStep + 1,
          of: createBankProfileSteps.length,
        })}
    </Text>
  )

  const getCurrentView = () => {
    switch (currentStep) {
      case CreateBankProfileViews.BankName:
        return (
          <BankNameView
            initialValues={formValues}
            onSubmit={handleSubmit}
            renderSteps={renderCreateBankProfileSteps}
            stepProgressText={createBankProfileFormStepProgressText}
          />
        )
      case CreateBankProfileViews.BankAddress:
        return (
          <BankAddressView
            initialValues={formValues}
            onSubmit={handleSubmit}
            renderSteps={renderCreateBankProfileSteps}
            stepProgressText={createBankProfileFormStepProgressText}
          />
        )
      case CreateBankProfileViews.BankContacts:
        return (
          <BankContactsView
            initialValues={formValues}
            onSubmit={handleSubmit}
            renderSteps={renderCreateBankProfileSteps}
            stepProgressText={createBankProfileFormStepProgressText}
          />
        )
      case CreateBankProfileViews.BankSwift:
        return (
          <BankSwiftView
            initialValues={formValues}
            onSubmit={handleSubmit}
            renderSteps={renderCreateBankProfileSteps}
            stepProgressText={createBankProfileFormStepProgressText}
          />
        )
      case CreateBankProfileViews.BankInformationVerify:
        return (
          <BankInformationVerifyView
            initialValues={formValues}
            onSubmit={handleBankInformationVerifySubmit}
          />
        )
      case CreateBankProfileViews.Success:
        return <SuccessView />
      case CreateBankProfileViews.Error:
        return <ErrorView setCurrentStep={setCurrentStep} />
    }
  }

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div
      className={classes(styles.createBankProfile)}
      style={{ background: token.colorBgContainer }}
    >
      <div className={classes('container', styles.createBankProfile__container)}>
        {!isOnResultStep && (
          <>
            <Header
              title={ready && t('create-bank-profile:header.title')}
              onBack={currentStep > 0 ? handleBackButtonClick : undefined}
            />
            <Divider className={styles.createBankProfile__headerDivider} />
          </>
        )}
        <Content
          className={classes(
            styles.createBankProfile__content,
            isOnResultStep && styles.createBankProfile__resultViewContent
          )}
          style={{ background: token.colorBgContainer }}
        >
          {getCurrentView()}
        </Content>
      </div>
    </div>
  )
}

CreateBankProfile.getLayout = getCreateBankProfileLayout

export default CreateBankProfile
