import { useEffect } from 'react'
import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  Form,
  FormHelpers,
  Header,
  InputField,
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
import {
  CreateDictionaryValueRequestData,
  DictionaryStatuses,
  useDictionary,
  useDictionaryValue,
} from '@/domains/dictionaries'

import styles from './styles.module.scss'

interface CreateDictionaryValueFormValues extends CreateDictionaryValueRequestData {}

const CreateDictionaryValue: NextPageWithLayout = () => {
  const router = useRouter()
  const dictionaryId = Number(router.query.dictionaryId)
  const { t, ready } = useTranslation(['common', 'dictionaries-[dictionaryId]-add-value'])

  const { getDictionary } = useDictionary(Number(dictionaryId))
  const { createDictionaryValueAction } = useDictionaryValue(dictionaryId)
  const { message } = useAppStatic()

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateSystemDictionaryValueSubmit = (
    values: CreateDictionaryValueFormValues,
    helpers: FormHelpers<CreateDictionaryValueFormValues>
  ) => {
    showSubmitMessage(0)

    return createDictionaryValueAction
      .mutateAsync(values)
      .then(() => {
        showSuccessMessage()
        router.push(RoutesConsts.getDictionaryRoute(dictionaryId))
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const isLoading = !ready || getDictionary.isLoading
  const dictionaryExist = dictionaryId && getDictionary.isSuccess && getDictionary.data

  useEffect(() => {
    if ((!getDictionary.isLoading && !dictionaryExist) || getDictionary.isError) {
      router.back()
    }
  }, [getDictionary.isError, getDictionary.isLoading, router, dictionaryExist])

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) => {
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)
  }

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.createDictionaryValue}>
      <Header
        title={t('dictionaries-[dictionaryId]-add-value:title', {
          name: getDictionary.data?.name,
        })}
        className={styles.createDictionaryValue__header}
        onBack={() => router.push(RoutesConsts.getDictionaryRoute(dictionaryId))}
      />
      <Content>
        <Card
          title={t('dictionaries-[dictionaryId]-add-value:subtitle')}
          className={styles.createDictionaryValue__contentCard}
        >
          <Form<CreateDictionaryValueFormValues>
            initialValues={{
              name: '',
              code: '',
              status: DictionaryStatuses.Active,
            }}
            onSubmit={handleCreateSystemDictionaryValueSubmit}
            className={styles.createDictionaryValue__form}
            size="large"
            layout="vertical"
          >
            {({ dirty, isSubmitting }) => (
              <>
                {CheckIfFormHasChanged(dirty, isSubmitting)}
                <InputField
                  name="name"
                  label={t(
                    'dictionaries-[dictionaryId]-add-value:createDictionaryValueForm.labels.name'
                  )}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputField
                  name="code"
                  label={t(
                    'dictionaries-[dictionaryId]-add-value:createDictionaryValueForm.labels.code'
                  )}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="status"
                  label={t(
                    'dictionaries-[dictionaryId]-add-value:createDictionaryValueForm.labels.status'
                  )}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  options={[
                    {
                      label: t(
                        'dictionaries-[dictionaryId]-add-value:createDictionaryValueForm.statusOptions.active'
                      ),
                      value: DictionaryStatuses.Active,
                    },
                    {
                      label: t(
                        'dictionaries-[dictionaryId]-add-value:createDictionaryValueForm.statusOptions.inactive'
                      ),
                      value: DictionaryStatuses.Inactive,
                    },
                  ]}
                />
                <Button htmlType="submit" type="primary" block loading={isSubmitting}>
                  {t('common:buttons.saveChanges')}
                </Button>
              </>
            )}
          </Form>
        </Card>
      </Content>
    </div>
  )
}

CreateDictionaryValue.getLayout = getCoreBankDefaultLayout

export default CreateDictionaryValue
