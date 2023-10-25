import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  Button,
  Card,
  Content,
  Form,
  FormProps,
  Header,
  INTEGRATED_RenderDynamicFields,
  InputField,
  InputNumberField,
  Select,
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
  CreateCustomFieldGroupRequestData,
  useCustomFieldGroup,
  useCustomFieldGroups,
} from '@/domains/customFields'

import { CreateCustomFieldGroupFormValues } from '../../types'
import styles from './styles.module.scss'
import {
  getCustomFieldAppearanceOptions,
  getCustomFieldGroupStatusFieldOptions,
  getCustomFieldsEntitiesOptions,
} from '../../consts'

const CreateCustomFieldGroup: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'custom-fields', 'custom-field-groups-create'])
  const { message } = useAppStatic()
  const [selectedEntity, setSelectedEntity] =
    useState<INTEGRATED_RenderDynamicFields.DynamicFieldEntities>(
      (router.query.entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities) ||
        INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank
    )

  // is used only to get the total number of custom fields
  const { getCustomFieldGroups } = useCustomFieldGroups(selectedEntity, { page: 1, limit: 10 })
  const { createCustomFieldGroup } = useCustomFieldGroup(selectedEntity)

  const createCustomFieldGroupInitialValues: CreateCustomFieldGroupFormValues = {
    status: INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Active,
    appearance: INTEGRATED_RenderDynamicFields.DynamicFieldGroupAppearances.Expanded,
    name: '',
    label: '',
    code: '',
    index: getCustomFieldGroups.data ? getCustomFieldGroups.data.totalItems + 1 : null,
  }

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })

  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<CreateCustomFieldGroupFormValues>['onSubmit'] = (
    values,
    helpers
  ) => {
    showSubmitMessage(0)

    return createCustomFieldGroup
      .mutateAsync(values as CreateCustomFieldGroupRequestData)
      .then(() => {
        showSuccessMessage()
        router.push({
          pathname: RoutesConsts.CustomFieldGroups,
          query: {
            entity: selectedEntity,
          },
        })
      })
      .catch(e => handleApiError(e.body, message.error, t, helpers))
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(
      dirty && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  const customFieldsEntitiesOptions = getCustomFieldsEntitiesOptions(t)
  const customFieldAppearanceOptions = getCustomFieldAppearanceOptions(t)
  const customFieldGroupStatusFieldOptions = getCustomFieldGroupStatusFieldOptions(t)

  return (
    <div className={styles.createCustomFieldGroup}>
      <Header
        title={t('custom-field-groups-create:title')}
        className={styles.createCustomFieldGroup__header}
        onBack={() =>
          router.push({
            pathname: RoutesConsts.CustomFieldGroups,
            query: {
              entity: selectedEntity,
            },
          })
        }
        extra={
          <>
            <div className={styles.createCustomFieldGroup__entitySelectWrapper}>
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
          className={styles.createCustomFieldGroup__contentCard}
          title={t('custom-field-groups-create:subtitle')}
        >
          <Form<CreateCustomFieldGroupFormValues>
            initialValues={createCustomFieldGroupInitialValues}
            onSubmit={handleSubmit}
            size="large"
            layout="vertical"
            enableReinitialize
            className={styles.createCustomFieldGroup__form}
          >
            {formProps => (
              <>
                {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                <InputField
                  name="name"
                  label={t('custom-field-groups-create:form.fields.name.label')}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputField
                  name="code"
                  label={t('custom-field-groups-create:form.fields.code.label')}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputField
                  name="label"
                  label={t('custom-field-groups-create:form.fields.label.label')}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputField
                  name="tooltip"
                  label={t('custom-field-groups-create:form.fields.tooltip.label')}
                />
                <SelectField
                  name="appearance"
                  label={t('custom-field-groups-create:form.fields.appearance.label')}
                  options={customFieldAppearanceOptions}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <InputNumberField
                  name="index"
                  label={t('custom-field-groups-create:form.fields.order.label')}
                  min={1}
                  max={getCustomFieldGroups.data && getCustomFieldGroups.data.totalItems + 1}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />
                <SelectField
                  name="status"
                  label={t('custom-field-groups-create:form.fields.status.label')}
                  options={customFieldGroupStatusFieldOptions}
                  required
                  validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                />

                <div className={styles.createCustomFieldGroup__controls}>
                  <Button onClick={() => router.push(RoutesConsts.CustomFieldGroups)}>
                    {t('common:buttons.cancel')}
                  </Button>
                  <Button block type="primary" htmlType="submit" loading={formProps.isSubmitting}>
                    {t('common:buttons.create')}
                  </Button>
                </div>
              </>
            )}
          </Form>
        </Card>
      </Content>
    </div>
  )
}

CreateCustomFieldGroup.getLayout = getCoreBankDefaultLayout

export default CreateCustomFieldGroup
