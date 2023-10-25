import { TFunction } from 'i18next'
import { INTEGRATED_RenderDynamicFields, SelectFieldProps } from 'ui'

export const getCustomFieldsEntitiesOptions = (t: TFunction): SelectFieldProps['options'] => {
  return [
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Account,
      label: t('custom-fields:entities.account'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank,
      label: t('custom-fields:entities.bank'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Client,
      label: t('custom-fields:entities.client'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Contract,
      label: t('custom-fields:entities.contract'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country,
      label: t('custom-fields:entities.country'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Product,
      label: t('custom-fields:entities.product'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Transaction,
      label: t('custom-fields:entities.transaction'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      label: t('custom-fields:entities.unit'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      label: t('custom-fields:entities.user'),
    },
  ]
}
export const getCustomFieldDataTypesOptions = (t: TFunction): SelectFieldProps['options'] => {
  return [
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Boolean,
      label: t('custom-fields-create:form.dataTypes.boolean'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
      label: t('custom-fields-create:form.dataTypes.date'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
      label: t('custom-fields-create:form.dataTypes.dateTime'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Decimal,
      label: t('custom-fields-create:form.dataTypes.decimal'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DecimalPercent,
      label: t('custom-fields-create:form.dataTypes.decimalPercent'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Dictionary,
      label: t('custom-fields-create:form.dataTypes.dictionary'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Integer,
      label: t('custom-fields-create:form.dataTypes.integer'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.IntegerPercent,
      label: t('custom-fields-create:form.dataTypes.integerPercent'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List,
      label: t('custom-fields-create:form.dataTypes.list'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.PhoneNumber,
      label: t('custom-fields-create:form.dataTypes.phoneNumber'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.RemoteEntity,
      label: t('custom-fields-create:form.dataTypes.reference'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      label: t('custom-fields-create:form.dataTypes.string'),
    },
  ]
}

export const getCustomFieldEntityLevelSelectOptions = (
  // TODO: Add other types when implemented on BE
  entityName: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  {
    bankUnitTypesOptions,
  }: {
    bankUnitTypesOptions: SelectFieldProps['options'] | undefined
  }
): SelectFieldProps['options'] => {
  switch (entityName) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return bankUnitTypesOptions

    default:
      return []
  }
}

export const getCustomFieldStatusFieldOptions = (t: TFunction): SelectFieldProps['options'] => [
  {
    value: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
    label: t('custom-fields-create:form.customFieldStatuses.active'),
  },
  {
    value: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Inactive,
    label: t('custom-fields-create:form.customFieldStatuses.inactive'),
  },
]

export const customFieldEntitiesDataUrl = {
  [INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit]:
    '/org-structure/api/v1.0/units/basic-info',
  [INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User]:
    '/identity-service/api/v1.0/users/all',
}

export const getCustomFieldAppearanceOptions = (t: TFunction): SelectFieldProps['options'] => [
  {
    value: INTEGRATED_RenderDynamicFields.DynamicFieldGroupAppearances.Expanded,
    label: t('custom-field-groups-create:form.customFieldGroupAppearances.expanded'),
  },
  {
    value: INTEGRATED_RenderDynamicFields.DynamicFieldGroupAppearances.Collapsed,
    label: t('custom-field-groups-create:form.customFieldGroupAppearances.collapsed'),
  },
]

export const getCustomFieldGroupStatusFieldOptions = (
  t: TFunction
): SelectFieldProps['options'] => [
  {
    value: INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Active,
    label: t('custom-field-groups-create:form.customFieldGroupStatuses.active'),
  },
  {
    value: INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Inactive,
    label: t('custom-field-groups-create:form.customFieldGroupStatuses.inactive'),
  },
]
