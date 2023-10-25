import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Card,
  Content,
  Form,
  FormProps,
  Header,
  INTEGRATED_RenderDynamicFields,
  Select,
  Spin,
  handleApiError,
  useAppStatic,
} from 'ui'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'
import {
  CreateCustomFieldRequestData,
  useCustomField,
  useCustomFields,
} from '@/domains/customFields'

import { CreateCustomFieldFormContent } from './components'
import { CreateCustomFieldFormValues } from '../types'
import { getCustomFieldsEntitiesOptions } from '../consts'
import styles from './styles.module.scss'

const CreateCustomField: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'custom-fields', 'custom-fields-create'])
  const { message } = useAppStatic()
  const { createCustomField } = useCustomField()
  const [selectedEntity, setSelectedEntity] =
    useState<INTEGRATED_RenderDynamicFields.DynamicFieldEntities>(
      (router.query.entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities) ||
        INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank
    )
  const { getCustomFields } = useCustomFields(selectedEntity, { page: 1, limit: 10 })

  const createCustomFieldInitialFormValues: CreateCustomFieldFormValues = {
    code: '',
    fieldName: '',
    fieldDescription: '',
    entityLevel: [],
    type: null,
    independent: true,
    defaultValue: {
      value: null,
    },
    order: getCustomFields.data ? getCustomFields.data.totalItems + 1 : null,
    label: '',
    placeholder: '',
    properties: {},
    helpText: '',
    tooltip: '',
    status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Inactive,
    groupCode: null,
  }

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })

  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateCustomFieldSubmit: FormProps<CreateCustomFieldFormValues>['onSubmit'] = (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return createCustomField
      .mutateAsync({
        ...values,
        independent: true,
        entityName: selectedEntity,
        entityLevel: values.entityLevel?.length ? values.entityLevel : null,
      } as CreateCustomFieldRequestData)
      .then(data => {
        showSuccessMessage()
        router.push(RoutesConsts.getCustomFieldDetailsRoute(selectedEntity, data.id))
      })
      .catch(e => handleApiError(e.body, message.error, t, helpers))
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  const customFieldsEntitiesOptions = getCustomFieldsEntitiesOptions(t)

  return (
    <div className={styles.createCustomField}>
      <Header
        title={t('custom-fields-create:title')}
        className={styles.createCustomField__header}
        extra={
          <>
            <div className={styles.createCustomField__entitySelectWrapper}>
              <Select
                options={customFieldsEntitiesOptions}
                value={selectedEntity}
                onChange={setSelectedEntity}
                placeholder={t('custom-fields:entitySelect.placeholder')}
              />
            </div>
          </>
        }
      />
      <Content>
        <Card
          className={styles.createCustomField__contentCard}
          title={t('custom-fields-create:subtitle')}
        >
          <Form<CreateCustomFieldFormValues>
            initialValues={createCustomFieldInitialFormValues}
            onSubmit={handleCreateCustomFieldSubmit}
            size="large"
            layout="vertical"
            enableReinitialize
            className={styles.createCustomField__form}
          >
            {formProps => (
              <CreateCustomFieldFormContent formProps={formProps} selectedEntity={selectedEntity} />
            )}
          </Form>
        </Card>
      </Content>
    </div>
  )
}

CreateCustomField.getLayout = getCoreBankDefaultLayout

export default CreateCustomField
