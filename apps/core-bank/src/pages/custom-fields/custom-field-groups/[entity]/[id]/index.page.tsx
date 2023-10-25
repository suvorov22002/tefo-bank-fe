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
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useTranslation } from '@/i18n'
import {
  EditCustomFieldGroupRequestData,
  useCustomFieldGroup,
  useCustomFieldGroups,
} from '@/domains/customFields'

import { CreateCustomFieldGroupFormValues } from '../../../types'
import styles from './styles.module.scss'
import {
  getCustomFieldAppearanceOptions,
  getCustomFieldGroupStatusFieldOptions,
  getCustomFieldsEntitiesOptions,
} from '../../../consts'

interface EditCustomFieldFormValues extends CreateCustomFieldGroupFormValues {}

const CustomFieldGroup: NextPageWithLayout = () => {
  const router = useRouter()
  const selectedEntity = router.query.entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities
  const customFieldGroupId = router.query.id as string

  const { message } = useAppStatic()
  const { t, ready } = useTranslation([
    'common',
    'custom-fields',
    'custom-field-groups-create',
    'custom-field-groups-[entity]-[id]',
  ])
  const [isInEditMode, setIsInEditMode] = useState<boolean>(!!router.query.isInitialModeEdit)

  const { getCustomFieldGroup, editCustomFieldGroup } = useCustomFieldGroup(
    selectedEntity,
    customFieldGroupId
  )

  // is used only to get the total number of custom fields groups
  const { getCustomFieldGroups } = useCustomFieldGroups(selectedEntity, {
    page: 1,
    limit: 1,
  })

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })

  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleSubmit: FormProps<EditCustomFieldFormValues>['onSubmit'] = (values, helpers) => {
    showSubmitMessage(0)

    return editCustomFieldGroup
      .mutateAsync({ ...getCustomFieldGroup.data, ...values } as EditCustomFieldGroupRequestData)
      .then(() => {
        showSuccessMessage()
        setIsInEditMode(false)
      })
      .catch(e => handleApiError(e.body, message.error, t, helpers))
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const isLoading = !ready || getCustomFieldGroup.isLoading
  const customFieldGroupExist =
    customFieldGroupId && getCustomFieldGroup.isSuccess && getCustomFieldGroup.data

  useEffect(() => {
    if ((!getCustomFieldGroup.isLoading && !customFieldGroupExist) || getCustomFieldGroup.isError) {
      router.back()
    }
  }, [getCustomFieldGroup.isError, getCustomFieldGroup.isLoading, router, customFieldGroupExist])

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(
      dirty && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  if (isLoading) {
    return <Spin fullscreen />
  }

  const customFieldsEntitiesOptions = getCustomFieldsEntitiesOptions(t)
  const customFieldAppearanceOptions = getCustomFieldAppearanceOptions(t)
  const customFieldGroupStatusFieldOptions = getCustomFieldGroupStatusFieldOptions(t)

  return (
    <div className={styles.customFieldGroup}>
      <Header
        title={t('custom-field-groups-[entity]-[id]:title')}
        className={styles.customFieldGroup__header}
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
            <div className={styles.customFieldGroup__entitySelectWrapper}>
              <Select
                options={customFieldsEntitiesOptions}
                value={selectedEntity}
                disabled
                placeholder={t('custom-fields:entitySelect.placeholder')}
              />
            </div>
          </>
        }
      />

      <Content>
        {getCustomFieldGroup.data && (
          <Card
            className={styles.customFieldGroup__contentCard}
            title={t('custom-field-groups-[entity]-[id]:subtitle')}
            extra={
              <>
                <Button
                  icon={<EditFilledIcon />}
                  onClick={() => setIsInEditMode(true)}
                  disabled={isInEditMode}
                >
                  {t('common:buttons.edit')}
                </Button>
              </>
            }
          >
            <Form<EditCustomFieldFormValues>
              initialValues={getCustomFieldGroup.data}
              onSubmit={handleSubmit}
              size="large"
              layout="vertical"
              enableReinitialize
              className={styles.customFieldGroup__form}
            >
              {formProps => (
                <>
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <InputField
                    name="name"
                    disabled={!isInEditMode || formProps.isSubmitting}
                    label={t('custom-field-groups-create:form.fields.name.label')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  />
                  <InputField
                    name="code"
                    disabled={!isInEditMode || formProps.isSubmitting}
                    label={t('custom-field-groups-create:form.fields.code.label')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  />
                  <InputField
                    name="label"
                    disabled={!isInEditMode || formProps.isSubmitting}
                    label={t('custom-field-groups-create:form.fields.label.label')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  />
                  <InputField
                    disabled={!isInEditMode || formProps.isSubmitting}
                    name="tooltip"
                    label={t('custom-field-groups-create:form.fields.tooltip.label')}
                  />
                  <SelectField
                    disabled={!isInEditMode || formProps.isSubmitting}
                    name="appearance"
                    label={t('custom-field-groups-create:form.fields.appearance.label')}
                    options={customFieldAppearanceOptions}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  />
                  <InputNumberField
                    disabled={!isInEditMode || formProps.isSubmitting}
                    name="index"
                    label={t('custom-field-groups-create:form.fields.order.label')}
                    min={1}
                    max={getCustomFieldGroups.data?.totalItems}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  />
                  <SelectField
                    disabled={!isInEditMode || formProps.isSubmitting}
                    name="status"
                    label={t('custom-field-groups-create:form.fields.status.label')}
                    options={customFieldGroupStatusFieldOptions}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                  />

                  {isInEditMode && (
                    <div className={styles.customFieldGroup__controls}>
                      <Button
                        onClick={() => {
                          formProps.resetForm()
                          setIsInEditMode(false)
                        }}
                      >
                        {t('common:buttons.cancel')}
                      </Button>
                      <Button
                        block
                        type="primary"
                        htmlType="submit"
                        loading={formProps.isSubmitting}
                        disabled={!formProps.dirty}
                      >
                        {t('common:buttons.save')}
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Form>
          </Card>
        )}
      </Content>
    </div>
  )
}

CustomFieldGroup.getLayout = getCoreBankDefaultLayout

export default CustomFieldGroup
