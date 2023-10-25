import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  Form,
  FormProps,
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
  CreateUserDictionaryRequestData,
  DictionaryStatuses,
  useUserDictionary,
} from '@/domains/dictionaries'

import styles from './styles.module.scss'

interface CreateUserDictionaryFormValues extends CreateUserDictionaryRequestData {}

const createUserDictionaryFormInitialValues: CreateUserDictionaryFormValues = {
  code: '',
  name: '',
  status: DictionaryStatuses.Active,
}

const CreateDictionary: NextPageWithLayout = () => {
  const { t, ready } = useTranslation(['common', 'dictionaries-create'])
  const router = useRouter()

  const { message } = useAppStatic()

  const { createUserDictionaryAction } = useUserDictionary()

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateUserDictionarySubmit: FormProps<CreateUserDictionaryFormValues>['onSubmit'] =
    async (values, helpers) => {
      showSubmitMessage(0)

      return createUserDictionaryAction
        .mutateAsync(values)
        .then(() => {
          showSuccessMessage()
          router.push(RoutesConsts.Dictionaries)
        })
        .catch(e => {
          handleApiError(e.body, message.error, t, helpers)
        })
        .finally(() => {
          message.destroy('submitMessage')
        })
    }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) => {
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)
  }

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.createDictionary}>
      <Header
        title={t('dictionaries-create:title')}
        onBack={() => router.push(RoutesConsts.Dictionaries)}
        className={styles.createDictionary__header}
      />
      <Content>
        <Card
          title={t('dictionaries-create:subtitle')}
          className={styles.createDictionary__contentCard}
        >
          <Form
            initialValues={createUserDictionaryFormInitialValues}
            onSubmit={handleCreateUserDictionarySubmit}
            layout="vertical"
            size="large"
            className={styles.createDictionary__form}
          >
            {({ dirty, isSubmitting }) => (
              <>
                {CheckIfFormHasChanged(dirty, isSubmitting)}
                <InputField
                  name="code"
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  label={t('dictionaries-create:createDictionaryForm.labels.code')}
                />
                <InputField
                  name="name"
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  label={t('dictionaries-create:createDictionaryForm.labels.name')}
                />
                <SelectField
                  name="status"
                  required
                  options={[
                    {
                      label: t('dictionaries-create:createDictionaryForm.statusOptions.active'),
                      value: DictionaryStatuses.Active,
                    },
                    {
                      label: t('dictionaries-create:createDictionaryForm.statusOptions.inactive'),
                      value: DictionaryStatuses.Inactive,
                    },
                  ]}
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  label={t('dictionaries-create:createDictionaryForm.labels.status')}
                />
                <Button loading={isSubmitting} block type="primary" htmlType="submit">
                  {t('dictionaries-create:buttons.createDataDictionary')}
                </Button>
              </>
            )}
          </Form>
        </Card>
      </Content>
    </div>
  )
}

CreateDictionary.getLayout = getCoreBankDefaultLayout

export default CreateDictionary
