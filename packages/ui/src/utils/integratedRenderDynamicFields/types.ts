import { FormikProps } from '../../components'
import { getRenderDynamicFields } from './dynamicFields/utils/renderDynamicFields'
import {
  booleanFieldBuilder,
  dateFieldBuilder,
  dateTimeFieldBuilder,
  decimalFieldBuilder,
  decimalPercentFieldBuilder,
  dictionaryFieldBuilder,
  integerFieldBuilder,
  listFieldBuilder,
  phoneNumberFieldBuilder,
  referenceFieldBuilder,
  textFieldBuilder,
} from './dynamicFields/utils/builders'

export interface RenderOptions {
  mode: RenderTemplateModes
  customRenderDynamicField: RenderDynamicField
  renderAddCustomFields: (
    onAddCustomField: (customFieldCode: DynamicField['code']) => void,
    customFieldsToAdd: DynamicField[]
  ) => JSX.Element
}

export interface DynamicFieldsProps {
  renderDynamicFields: ReturnType<typeof getRenderDynamicFields>
  template: DynamicFieldsTemplate
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setValues: FormikProps<any>['setValues']
  values: Record<string, unknown>
  renderOptions: RenderOptions
}

export type RenderDynamicField = (
  field: ReturnType<
    | typeof booleanFieldBuilder
    | typeof dateFieldBuilder
    | typeof dateTimeFieldBuilder
    | typeof decimalFieldBuilder
    | typeof decimalPercentFieldBuilder
    | typeof dictionaryFieldBuilder
    | typeof referenceFieldBuilder
    | typeof integerFieldBuilder
    | typeof listFieldBuilder
    | typeof phoneNumberFieldBuilder
    | typeof textFieldBuilder
  >,
  i: number
) => JSX.Element

import { ElementType, Key } from 'react'

export interface DynamicFieldApiClient {
  get: <R = unknown>(path: string) => Promise<{ body: R; response: Response }>
}

export interface DynamicFieldsTemplate {
  id: string
  name: string
  groups: DynamicFieldGroup[]
  primaryFields: DynamicField[]
  customFields: DynamicField[]
}

export enum RenderTemplateModes {
  Create,
  Edit,
  View,
}

export type Field<ComponentProps, FieldProps> = ComponentProps & {
  Component: ElementType
  key: Key
  group: string | null
  properties: FieldProps
  name: string
}

export enum DynamicFieldEntities {
  Bank = 'BNK',
  Unit = 'UNT',
  User = 'USR',
  Client = 'CLN',
  Product = 'PRD',
  Contract = 'CNT',
  Account = 'ACC',
  Transaction = 'TRN',
  Country = 'CTR',
}

export enum DynamicFieldGroupAppearances {
  Expanded = 'EXPANDED',
  Collapsed = 'COLLAPSED',
}

export enum DynamicFieldGroupStatuses {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum DynamicFieldStatuses {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum DynamicFieldValidationRuleStatuses {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum ValidationRuleTypes {
  MinLength = 'MIN_LENGTH',
  MaxLength = 'MAX_LENGTH',
  Regex = 'REGEX',
  Required = 'REQUIRED',
  Min = 'MIN',
  Max = 'MAX',
  Email = 'EMAIL',
  PhoneNumber = 'PHONE_NUMBER',
  AllowedCharacters = 'ALLOWED_CHARS',
  MinFuture = 'MIN_FUTURE',
  MaxFuture = 'MAX_FUTURE',
  MinPast = 'MIN_PAST',
  MaxPast = 'MAX_PAST',
  LessDate = 'LESS_DATE',
  MoreDate = 'MORE_DATE',
}

export interface ValidationRule {
  id: string
  type: ValidationRuleTypes
  priority: number
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any
  message: string
  status: DynamicFieldValidationRuleStatuses
}

export enum DynamicFieldTypes {
  Decimal = 'DOUBLE_NUMBER',
  DecimalPercent = 'DOUBLE_NUMBER_PERCENT',
  Boolean = 'BOOLEAN',
  Checkbox = 'CHECKBOX',
  Integer = 'INT_NUMBER',
  IntegerPercent = 'INT_NUMBER_PERCENT',
  Date = 'DATE',
  DateTime = 'DATE_TIME',
  PhoneNumber = 'PHONE_NUMBER',
  Text = 'TEXT',
  List = 'LIST',
  Dictionary = 'DICTIONARY',
  RemoteEntity = 'REMOTE_ENTITY',
  RemoteEntities = 'REMOTE_ENTITIES',
  EmbeddedEntity = 'EMBEDDED_ENTITY',
  EmbeddedEntities = 'EMBEDDED_ENTITIES',
  EmbeddedStructure = 'EMBEDDED_STRUCTURE',
  EmbeddedStructures = 'EMBEDDED_STRUCTURES',
}

export interface DynamicFieldGroup {
  id: string
  name: string
  code: string
  entity?: DynamicFieldEntities
  label: string
  tooltip?: string
  appearance: DynamicFieldGroupAppearances
  index: number
  status: DynamicFieldGroupStatuses
  createdAt?: string
  updatedAt?: string
}

export interface DynamicField<T = unknown> {
  id: string
  code: string
  fieldName: string | null
  fieldDescription?: string | null
  defaultValue: {
    value?: unknown
  }
  entityName: DynamicFieldEntities | null
  entityLevel: unknown[] | null
  type: DynamicFieldTypes
  status: DynamicFieldStatuses
  required: boolean
  groupCode: DynamicFieldGroup['code'] | null
  independent: boolean
  visible?: boolean | null
  hiddenOnCreate: boolean
  order: number
  label: string
  validation: {
    rules: ValidationRule[]
  }
  placeholder: string | null
  helpText: string | null
  tooltip: string | null
  properties: T
  approvedAt?: string
  createdAt?: string
  updatedAt?: string
  updatedBy?: string
  approvedBy?: string
}

export interface DynamicDecimalFieldProps {
  decimals: number | null
}

export interface DynamicDecimalPercentFieldProps {
  decimals: number | null
}

export interface DynamicPhoneNumberFieldProps {
  phoneCodeLength?: number
  phoneNumberLength?: number
  phoneCodeName: string
  phoneValueName: string
}

export interface DynamicDictionaryFieldProps {
  url: string
}

export interface DynamicReferenceFieldProps {
  url: string
  valueField: string
  keyField: string
  fields: [string, string]
}

export interface DynamicBooleanFieldProps {}

export interface DynamicCheckboxFieldProps {}

export interface DynamicDateFieldProps {}

export interface DynamicDateTimeFieldProps {}

export interface DynamicIntegerFieldProps {}

export interface DynamicIntegerPercentFieldProps {}

export interface DynamicTextFieldProps {}

export interface DynamicListFieldProps {
  options: { label: string; value: string }[]
}

export enum PeriodTerm {
  Day = 'DAY',
  Week = 'WEEK',
  Month = 'MONTH',
  Quarter = 'QUARTER',
  Year = 'YEAR',
}
