import { useRouter } from 'next/router'
import {
  Button,
  Card,
  Content,
  EditFilledIcon,
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
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'
import {
  DictionaryStatuses,
  EditDictionaryValueRequestData,
  useDictionary,
  useDictionaryValue,
} from '@/domains/dictionaries'

import styles from './styles.module.scss'

interface DictionaryValueFormValues extends EditDictionaryValueRequestData {}

const DictionaryValue: NextPageWithLayout = () => {
  const router = useRouter()
  const dictionaryId = Number(router.query.dictionaryId)
  const valueId = Number(router.query.valueId)
  const [isDictionaryValueFormInEditMode, setDictionaryValueInEditMode] = useState<boolean>(
    !!router.query.isInitialModeEdit
  )

  const { t, ready } = useTranslation(['common', 'dictionaries-[dictionaryId]-[valueId]-edit'])

  const { message } = useAppStatic()

  //TODO: make useDictionary use number after hook refactor
  const { getDictionary } = useDictionary(dictionaryId)
  const { editDictionaryValue, getDictionaryValue } = useDictionaryValue(dictionaryId, valueId)

  const isLoading = !ready || getDictionaryValue.isLoading || getDictionary.isLoading

  const dictionaryExist = dictionaryId && getDictionary.isSuccess && getDictionary.data
  const dictionaryValueExist = valueId && getDictionaryValue.isSuccess && getDictionaryValue.data

  useEffect(() => {
    if (
      (!getDictionary.isLoading && !dictionaryExist) ||
      getDictionary.isError ||
      (!getDictionaryValue.isLoading && !dictionaryValueExist) ||
      getDictionaryValue.isError
    ) {
      router.back()
    }
  }, [
    getDictionary.isError,
    getDictionary.isLoading,
    router,
    dictionaryExist,
    getDictionaryValue.isError,
    getDictionaryValue.isLoading,
    dictionaryValueExist,
  ])

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleEditDictionaryValue = (
    values: DictionaryValueFormValues,
    helpers: FormHelpers<DictionaryValueFormValues>
  ) => {
    showSubmitMessage(0)

    return editDictionaryValue
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

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) => {
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)
  }

  if (isLoading) {
    return <Spin fullscreen />
  }

  return (
    <div className={styles.dictionaryValue}>
      <Header
        title={t('dictionaries-[dictionaryId]-[valueId]-edit:title', {
          name: getDictionary.data?.name,
        })}
        className={styles.dictionaryValue__header}
        onBack={() => router.push(RoutesConsts.getDictionaryRoute(dictionaryId))}
      />
      <Content>
        <Card
          className={styles.dictionaryValue__contentCard}
          title={t('dictionaries-[dictionaryId]-[valueId]-edit:subtitle')}
          extra={
            <Button
              icon={<EditFilledIcon />}
              onClick={() => setDictionaryValueInEditMode(true)}
              disabled={isDictionaryValueFormInEditMode}
            >
              {t('common:buttons.edit')}
            </Button>
          }
        >
          {getDictionaryValue.data && (
            <Form<DictionaryValueFormValues>
              initialValues={{ ...getDictionaryValue.data }}
              onSubmit={handleEditDictionaryValue}
              size="large"
              layout="vertical"
              className={styles.dictionaryValue__form}
            >
              {({ dirty, isSubmitting, resetForm }) => (
                <>
                  {CheckIfFormHasChanged(dirty, isSubmitting)}
                  <InputField
                    name="name"
                    label={t(
                      'dictionaries-[dictionaryId]-[valueId]-edit:editDictionaryValueForm.labels.name'
                    )}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    disabled={!isDictionaryValueFormInEditMode}
                  />
                  <InputField
                    name="code"
                    label={t(
                      'dictionaries-[dictionaryId]-[valueId]-edit:editDictionaryValueForm.labels.code'
                    )}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    disabled={!isDictionaryValueFormInEditMode}
                  />
                  <SelectField
                    name="status"
                    label={t(
                      'dictionaries-[dictionaryId]-[valueId]-edit:editDictionaryValueForm.labels.status'
                    )}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    options={[
                      {
                        label: t(
                          'dictionaries-[dictionaryId]-[valueId]-edit:editDictionaryValueForm.statusOptions.active'
                        ),
                        value: DictionaryStatuses.Active,
                      },
                      {
                        label: t(
                          'dictionaries-[dictionaryId]-[valueId]-edit:editDictionaryValueForm.statusOptions.inactive'
                        ),
                        value: DictionaryStatuses.Inactive,
                      },
                    ]}
                    disabled={!isDictionaryValueFormInEditMode}
                  />
                  {isDictionaryValueFormInEditMode && (
                    <div className={styles.dictionaryValue__controls}>
                      <Button
                        htmlType="reset"
                        disabled={isSubmitting}
                        onClick={() => {
                          resetForm()
                          setDictionaryValueInEditMode(false)
                        }}
                      >
                        {t('common:buttons.cancel')}
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={isSubmitting}
                        disabled={!dirty}
                      >
                        {t('common:buttons.saveChanges')}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Form>
          )}
        </Card>
      </Content>
    </div>
  )
}

DictionaryValue.getLayout = getCoreBankDefaultLayout

export default DictionaryValue
