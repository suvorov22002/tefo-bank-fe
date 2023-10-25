import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  EditFilledIcon,
  Form,
  FormProps,
  Header,
  INTEGRATED_RenderDynamicFields,
  Spin,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { useTranslation } from '@/i18n'
import { Country, useCountry, useCountryTemplate } from '@/domains/countries'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'

import styles from './styles.module.scss'

interface CountryDetailsFormValues extends Country {}

const CountryDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const { message } = useAppStatic()
  const { t, ready } = useTranslation(['common', 'countries'])

  const countryId = String(router.query.countryId)

  const [isCountryDetailsFormInEditMode, setIsCountryDetailsFormInEditMode] = useState<boolean>(
    !!router.query.isInitialModeEdit
  )

  const { getCountry, editCountry } = useCountry({ countryId })
  const { getCountryTemplate } = useCountryTemplate({
    shouldQueryCountryTemplate: true,
  })

  const isLoading = !ready || getCountry.isLoading || getCountryTemplate.isLoading

  const countryExist = countryId && getCountry.isSuccess && getCountry.data

  const countryTemplateFields = [
    ...(getCountryTemplate.data?.primaryFields || []),
    ...(getCountryTemplate.data?.customFields || []),
  ]

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  useEffect(() => {
    if ((!getCountry.isLoading && !countryExist) || getCountry.isError) {
      router.back()
    }
  }, [getCountry.isError, getCountry.isLoading, countryExist, router])

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleEditCountrySubmit: FormProps<CountryDetailsFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return editCountry
      .mutateAsync({
        ...values,
        id: Number(countryId),
      })
      .then(() => {
        setIsCountryDetailsFormInEditMode(false)
        showSuccessMessage()
        router.push(RoutesConsts.Countries)
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.countryDetails}>
      <Header
        title={t('countries:title')}
        className={styles.countryDetails__header}
        onBack={() => router.push(RoutesConsts.Countries)}
      />
      <Content>
        <Card
          title={getCountry.data?.name}
          className={styles.countryDetails__contentCard}
          extra={
            !!countryTemplateFields.length && (
              <>
                <Button
                  icon={<EditFilledIcon />}
                  disabled={isCountryDetailsFormInEditMode}
                  onClick={() => setIsCountryDetailsFormInEditMode(true)}
                >
                  {t('common:buttons.edit')}
                </Button>
              </>
            )
          }
        >
          {getCountryTemplate.data && getCountry.data && (
            <Form<CountryDetailsFormValues>
              initialValues={INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit,
                template: getCountryTemplate.data,
                values: getCountry.data,
              })}
              onSubmit={handleEditCountrySubmit}
              enableReinitialize
              layout="vertical"
              size="large"
              className={styles.countryDetails__form}
            >
              {formProps => {
                return (
                  <>
                    {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                    <DynamicFields
                      setValues={formProps.setValues}
                      values={getCountry.data}
                      template={getCountryTemplate.data}
                      renderOptions={{
                        mode: isCountryDetailsFormInEditMode
                          ? INTEGRATED_RenderDynamicFields.RenderTemplateModes.Edit
                          : INTEGRATED_RenderDynamicFields.RenderTemplateModes.View,
                        customRenderDynamicField: ({ Component, ...props }) => (
                          <Component
                            {...props}
                            disabled={formProps.isSubmitting || !isCountryDetailsFormInEditMode}
                          />
                        ),
                      }}
                    />
                    {isCountryDetailsFormInEditMode && (
                      <div className={styles.countryDetails__controls}>
                        <Button
                          htmlType="reset"
                          disabled={formProps.isSubmitting}
                          onClick={() => {
                            formProps.resetForm()
                            setIsCountryDetailsFormInEditMode(false)
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
          )}
        </Card>
      </Content>
    </div>
  )
}

CountryDetails.getLayout = getCoreBankDefaultLayout

export default CountryDetails
