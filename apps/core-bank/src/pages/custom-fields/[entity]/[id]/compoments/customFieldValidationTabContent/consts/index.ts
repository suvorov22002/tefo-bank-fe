import { INTEGRATED_RenderDynamicFields } from 'ui'

import { TFunction } from '@/i18n'

export const getValidationRuleTermOptions = (t: TFunction) => [
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.periodTerm.day'),
    value: INTEGRATED_RenderDynamicFields.PeriodTerm.Day,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.periodTerm.week'),
    value: INTEGRATED_RenderDynamicFields.PeriodTerm.Week,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.periodTerm.month'),
    value: INTEGRATED_RenderDynamicFields.PeriodTerm.Month,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.periodTerm.quarter'),
    value: INTEGRATED_RenderDynamicFields.PeriodTerm.Quarter,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.periodTerm.year'),
    value: INTEGRATED_RenderDynamicFields.PeriodTerm.Year,
  },
]

export const getValidationRuleTypeOptions = (t: TFunction) => [
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.required'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Required,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.min'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Min,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.max'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Max,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.minLength'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinLength,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.maxLength'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxLength,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.allowedCharacters'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.AllowedCharacters,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.pattern'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Regex,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.email'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Email,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.phoneNumber'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.PhoneNumber,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.minFutureValue'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinFuture,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.maxFutureValue'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxFuture,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.minPastValue'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinPast,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.maxPastValue'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxPast,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.lessThanDate'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.LessDate,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.moreThanDate'),
    value: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MoreDate,
  },
]

export const getValidationRuleStatusOptions = (t: TFunction) => [
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleStatuses.active'),
    value: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active,
  },
  {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleStatuses.inactive'),
    value: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Inactive,
  },
]

export const validationRuleTypesEligibleForCustomFieldDataTypesMap: Record<
  INTEGRATED_RenderDynamicFields.ValidationRuleTypes,
  INTEGRATED_RenderDynamicFields.DynamicFieldTypes[]
> = {
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Required]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Boolean,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Checkbox,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Decimal,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DecimalPercent,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Dictionary,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedEntities,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedEntity,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedStructure,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedStructures,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Integer,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.IntegerPercent,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.PhoneNumber,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.RemoteEntities,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.RemoteEntity,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Min]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Integer,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Decimal,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DecimalPercent,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.IntegerPercent,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Max]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Integer,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Decimal,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DecimalPercent,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.IntegerPercent,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinLength]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxLength]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.AllowedCharacters]: [],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Regex]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Email]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.PhoneNumber]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.PhoneNumber,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinFuture]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxFuture]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinPast]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxPast]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.LessDate]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
  ],
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MoreDate]: [
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
    INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime,
  ],
}
