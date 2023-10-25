import {
  Button,
  DatePickerField,
  FormikProps,
  INTEGRATED_RenderDynamicFields,
  InputField,
  InputNumberField,
  PlusSquareOutlinedIcon,
  SelectField,
  SelectFieldProps,
  Spin,
  TextAreaField,
  formErrorUtils,
} from 'ui'

import { useBankUnitTypesBasicInfo } from '@/domains/bankUnitTypes'
import { useTranslation } from '@/i18n'
import {
  customFieldsEntitiesWithLevelOfDetail,
  useAllCustomFieldGroups,
  useCustomFields,
} from '@/domains/customFields'

import { getDataTypeSpecificFields } from '../../../../utils'
import styles from './styles.module.scss'
import { CustomFieldDetailsFormValues, CustomFieldTabsKeys } from '../../../../types'
import {
  getCustomFieldDataTypesOptions,
  getCustomFieldEntityLevelSelectOptions,
  getCustomFieldStatusFieldOptions,
} from '../../../../consts'

// TODO: Remove after global date format handling implementation
const DATE_FORMAT = 'YYYY-MM-DDThh:mm:ss'

interface CustomFieldDetailsFormContentProps {
  formProps: FormikProps<CustomFieldDetailsFormValues>
  customField: INTEGRATED_RenderDynamicFields.DynamicField
  selectedEntity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities
  isInEditMode: boolean
  setIsInEditMode: (value: boolean) => void
  setActiveTabKey: (activeKey: CustomFieldTabsKeys) => void
}

export const CustomFieldDetailsFormContent = ({
  formProps,
  selectedEntity,
  isInEditMode,
  customField,
  setIsInEditMode,
  setActiveTabKey,
}: CustomFieldDetailsFormContentProps) => {
  const { values, isSubmitting, setValues } = formProps
  const { t, ready } = useTranslation([
    'common',
    'custom-fields-create',
    'custom-fields-[entity]-[id]',
  ])

  // is used only to get the total number of custom fields
  const { getCustomFields } = useCustomFields(selectedEntity, {
    page: 1,
    limit: 1,
  })

  const { bankUnitTypesOptions } = useBankUnitTypesBasicInfo({
    shouldQueryBankUnitTypesBasicInfo:
      selectedEntity === INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
  })

  const { getAllCustomFieldGroups } = useAllCustomFieldGroups(selectedEntity)

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

  const customFieldStatusFieldOptions = getCustomFieldStatusFieldOptions(t)
  const customFieldEntityLevelSelectOptions = getCustomFieldEntityLevelSelectOptions(
    selectedEntity,
    {
      bankUnitTypesOptions,
    }
  )
  const customFieldDataTypesOptions = getCustomFieldDataTypesOptions(t)

  return (
    <>
      <InputField
        name="code"
        disabled
        label={t('custom-fields-create:form.fields.code.label')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        required
      />
      <InputField
        disabled={!isInEditMode || isSubmitting}
        name="fieldName"
        label={t('custom-fields-create:form.fields.name.label')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        required
      />
      <TextAreaField
        disabled={!isInEditMode || isSubmitting}
        name="fieldDescription"
        label={t('custom-fields-create:form.fields.description.label')}
      />
      <SelectField
        disabled={
          !isInEditMode ||
          isSubmitting ||
          !selectedEntity ||
          !customFieldsEntitiesWithLevelOfDetail.includes(selectedEntity)
        }
        mode="multiple"
        showSearch
        filterOption={(input, option) =>
          String(option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={customFieldEntityLevelSelectOptions}
        name="entityLevel"
        label={t('custom-fields-create:form.fields.entityLevel.label')}
      />
      <SelectField
        disabled
        name="type"
        label={t('custom-fields-create:form.fields.fieldType.label')}
        required
        onChange={handleTypeChange}
        options={customFieldDataTypesOptions}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
      />
      {getDataTypeSpecificFields(values.type, formProps, isInEditMode, customField)}
      <SelectField
        options={getAllCustomFieldGroups.data?.map(customFieldGroup => ({
          label: customFieldGroup.name,
          value: customFieldGroup.code,
        }))}
        disabled={!isInEditMode || isSubmitting}
        name="groupCode"
        label={t('custom-fields-create:form.fields.group.label')}
      />
      <InputNumberField
        disabled={!isInEditMode || isSubmitting}
        min={1}
        required
        max={getCustomFields.data ? getCustomFields.data.totalItems + 1 : undefined}
        name="order"
        label={t('custom-fields-create:form.fields.order.label')}
      />
      <InputField
        disabled={!isInEditMode || isSubmitting}
        name="label"
        label={t('custom-fields-create:form.fields.label.label')}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        required
      />
      <InputField
        disabled={!isInEditMode || isSubmitting}
        name="placeholder"
        label={t('custom-fields-create:form.fields.placeholder.label')}
      />
      <InputField
        disabled={!isInEditMode || isSubmitting}
        name="helpText"
        label={t('custom-fields-create:form.fields.helpText.label')}
      />
      <InputField
        disabled={!isInEditMode || isSubmitting}
        name="tooltip"
        label={t('custom-fields-create:form.fields.tooltip.label')}
      />
      <SelectField
        disabled={!isInEditMode || isSubmitting}
        name="status"
        required
        options={customFieldStatusFieldOptions}
        label={t('custom-fields-create:form.fields.status.label')}
      />
      <DatePickerField
        name="createdAt"
        suffixIcon={null}
        disabled
        format={DATE_FORMAT}
        label={t('custom-fields-[entity]-[id]:tabs.general.form.fields.createdAt.label')}
      />
      <DatePickerField
        name="updatedAt"
        suffixIcon={null}
        placeholder=""
        disabled
        format={DATE_FORMAT}
        label={t('custom-fields-[entity]-[id]:tabs.general.form.fields.updatedAt.label')}
      />
      <InputField
        name="updatedBy"
        disabled
        label={t('custom-fields-[entity]-[id]:tabs.general.form.fields.updatedBy.label')}
      />
      <DatePickerField
        name="approvedAt"
        placeholder=""
        disabled
        suffixIcon={null}
        format={DATE_FORMAT}
        label={t('custom-fields-[entity]-[id]:tabs.general.form.fields.approvedAt.label')}
      />
      <InputField
        name="approvedBy"
        disabled
        label={t('custom-fields-[entity]-[id]:tabs.general.form.fields.approvedBy.label')}
      />

      {isInEditMode && (
        <div className={styles.customFieldDetailsFormContent__controls}>
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
      {!isInEditMode && (
        <Button
          icon={<PlusSquareOutlinedIcon />}
          block
          onClick={() => setActiveTabKey(CustomFieldTabsKeys.Validation)}
        >
          {t('custom-fields-[entity]-[id]:tabs.general.buttons.addValidation')}
        </Button>
      )}
    </>
  )
}
