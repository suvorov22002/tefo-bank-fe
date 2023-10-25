import { useRouter } from 'next/router'
import {
  Button,
  FormikProps,
  INTEGRATED_RenderDynamicFields,
  InputField,
  InputNumberField,
  Popconfirm,
  SelectField,
  SelectFieldProps,
  Spin,
  TextAreaField,
  formErrorUtils,
  useUnsavedChangesWarning,
} from 'ui'

import { RoutesConsts } from '@/consts'
import { useBankUnitTypesBasicInfo } from '@/domains/bankUnitTypes'
import { useTranslation } from '@/i18n'
import {
  customFieldsEntitiesWithLevelOfDetail,
  useAllCustomFieldGroups,
  useCustomFields,
} from '@/domains/customFields'

import { CreateCustomFieldFormValues } from '../../../types'
import { getDataTypeSpecificFields } from '../../../utils'
import styles from './styles.module.scss'
import {
  getCustomFieldDataTypesOptions,
  getCustomFieldEntityLevelSelectOptions,
  getCustomFieldStatusFieldOptions,
} from '../../../consts'

interface CreateCustomFieldFormContentProps {
  formProps: FormikProps<CreateCustomFieldFormValues>
  selectedEntity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities
}

export const CreateCustomFieldFormContent = ({
  formProps,
  selectedEntity,
}: CreateCustomFieldFormContentProps) => {
  const { values, dirty, isSubmitting, setValues } = formProps
  const { t, ready } = useTranslation(['common', 'custom-fields-create'])
  const router = useRouter()

  const { bankUnitTypesOptions } = useBankUnitTypesBasicInfo({
    shouldQueryBankUnitTypesBasicInfo:
      selectedEntity === INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
  })

  const { getAllCustomFieldGroups } = useAllCustomFieldGroups(selectedEntity)

  // is used only to get the total number of custom fields
  const { getCustomFields } = useCustomFields(selectedEntity, {
    page: 1,
    limit: 1,
  })

  const handleTypeChange: SelectFieldProps['onChange'] = value => {
    setValues(values => ({
      ...values,
      properties: {},
      defaultValue: {
        value: null,
      },
      type: value,
    }))
  }

  const isLoading = !ready

  if (isLoading) {
    return <Spin fullscreen />
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(
      dirty && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  const customFieldStatusFieldOptions = getCustomFieldStatusFieldOptions(t)
  const customFieldDataTypesOptions = getCustomFieldDataTypesOptions(t)
  const customFieldEntityLevelSelectOptions = getCustomFieldEntityLevelSelectOptions(
    selectedEntity,
    {
      bankUnitTypesOptions,
    }
  )

  return (
    <>
      {CheckIfFormHasChanged(dirty, isSubmitting)}
      <InputField
        name="code"
        disabled={isSubmitting}
        label={t('custom-fields-create:form.fields.code.label')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        required
        extra=" "
        help={t('common:forms.helpMessages.canBeSetOnce')}
      />
      <InputField
        disabled={isSubmitting}
        name="fieldName"
        label={t('custom-fields-create:form.fields.name.label')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        required
      />
      <TextAreaField
        disabled={isSubmitting}
        name="fieldDescription"
        label={t('custom-fields-create:form.fields.description.label')}
      />
      <SelectField
        disabled={
          isSubmitting ||
          !selectedEntity ||
          !customFieldsEntitiesWithLevelOfDetail.includes(selectedEntity)
        }
        name="entityLevel"
        mode="multiple"
        showSearch
        options={customFieldEntityLevelSelectOptions}
        filterOption={(input, option) =>
          String(option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        label={t('custom-fields-create:form.fields.entityLevel.label')}
      />
      <SelectField
        disabled={isSubmitting}
        name="type"
        label={t('custom-fields-create:form.fields.fieldType.label')}
        options={customFieldDataTypesOptions}
        required
        onChange={handleTypeChange}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        extra=" "
        help={t('common:forms.helpMessages.canBeSetOnce')}
      />
      {values.type && getDataTypeSpecificFields(values.type, formProps, undefined, undefined)}
      <SelectField
        options={getAllCustomFieldGroups.data?.map(customFieldGroup => ({
          label: customFieldGroup.name,
          value: customFieldGroup.code,
        }))}
        disabled={isSubmitting}
        name="groupCode"
        label={t('custom-fields-create:form.fields.group.label')}
      />
      <InputNumberField
        disabled={isSubmitting}
        min={1}
        required
        max={getCustomFields.data ? getCustomFields.data.totalItems + 1 : undefined}
        name="order"
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        label={t('custom-fields-create:form.fields.order.label')}
      />
      <InputField
        disabled={isSubmitting}
        name="label"
        label={t('custom-fields-create:form.fields.label.label')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        required
      />
      <InputField
        disabled={isSubmitting}
        name="placeholder"
        label={t('custom-fields-create:form.fields.placeholder.label')}
      />
      <InputField
        disabled={isSubmitting}
        name="helpText"
        label={t('custom-fields-create:form.fields.helpText.label')}
      />
      <InputField
        disabled={isSubmitting}
        name="tooltip"
        label={t('custom-fields-create:form.fields.tooltip.label')}
      />
      <SelectField
        disabled={isSubmitting}
        name="status"
        required
        options={customFieldStatusFieldOptions}
        label={t('custom-fields-create:form.fields.status.label')}
      />
      <div className={styles.createCustomFieldFormContent__controls}>
        <Button
          onClick={() =>
            router.push({
              pathname: RoutesConsts.CustomFields,
              query: {
                entity: selectedEntity,
              },
            })
          }
        >
          {t('common:buttons.cancel')}
        </Button>

        <Popconfirm
          title={t('common:popconfirms.canBeSetOnceTitle')}
          description={t('common:popconfirms.canBeSetOnceDescription')}
          okText={t('common:buttons.yes')}
          disabled={!formProps.isValid}
          okButtonProps={{
            type: 'primary',
            danger: true,
            loading: formProps.isSubmitting,
            disabled: !formProps.dirty,
            onClick: formProps.submitForm,
          }}
          cancelButtonProps={{
            disabled: formProps.isSubmitting,
          }}
          cancelText={t('common:buttons.no')}
        >
          <Button
            block
            type="primary"
            htmlType={formProps.isValid ? 'button' : 'submit'}
            loading={formProps.isSubmitting}
            disabled={!formProps.dirty}
          >
            {t('common:buttons.create')}
          </Button>
        </Popconfirm>
      </div>
    </>
  )
}
