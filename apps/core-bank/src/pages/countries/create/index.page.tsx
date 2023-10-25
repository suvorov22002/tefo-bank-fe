import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  Form,
  FormProps,
  Header,
  INTEGRATED_RenderDynamicFields,
  Spin,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { useTranslation } from '@/i18n'
import { CreateCountryRequestData, useCountry, useCountryTemplate } from '@/domains/countries'
import { DynamicFields, getCoreBankDefaultLayout } from '@/components'

import styles from './styles.module.scss'

interface CreateCountryFormValues extends CreateCountryRequestData {}

const CreateCountry: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'countries'])
  const { message } = useAppStatic()
  const { createCountry } = useCountry({})
  const { getCountryTemplate } = useCountryTemplate({
    shouldQueryCountryTemplate: true,
  })

  const isLoading = !ready || getCountryTemplate.isLoading

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateCountrySubmit: FormProps<CreateCountryFormValues>['onSubmit'] = async (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return createCountry
      .mutateAsync(values)
      .then(() => {
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

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(
      dirty && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.createCountry}>
      <Header
        title={t('countries:title')}
        className={styles.createCountry__header}
        onBack={() => router.push(RoutesConsts.Countries)}
      />
      <Content>
        <Card
          title={t('countries:createCountryTitle')}
          className={styles.createCountry__contentCard}
        >
          {getCountryTemplate.data && (
            <Form<CreateCountryFormValues>
              initialValues={{
                ...INTEGRATED_RenderDynamicFields.getDynamicFieldsInitialValues({
                  template: getCountryTemplate.data,
                  mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                }),
              }}
              onSubmit={handleCreateCountrySubmit}
              enableReinitialize
              layout="vertical"
              size="large"
              className={styles.createCountry__form}
            >
              {formProps => (
                <>
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <DynamicFields
                    setValues={formProps.setValues}
                    values={formProps.initialValues}
                    template={getCountryTemplate.data}
                    renderOptions={{
                      mode: INTEGRATED_RenderDynamicFields.RenderTemplateModes.Create,
                      customRenderDynamicField: ({ Component, ...props }) => (
                        <Component {...props} disabled={formProps.isSubmitting} />
                      ),
                    }}
                  />

                  <Button type="primary" htmlType="submit" block loading={formProps.isSubmitting}>
                    {t('common:buttons.create')}
                  </Button>
                </>
              )}
            </Form>
          )}
        </Card>
      </Content>
    </div>
  )
}

CreateCountry.getLayout = getCoreBankDefaultLayout

export default CreateCountry
