import {
  InputField,
  InputFieldProps,
  PhoneNumberInputField,
  PhoneNumberInputFieldProps,
  formErrorUtils,
} from 'ui'

import { TFunction } from '@/i18n'

import { Field } from '../types'

export const getBankNameFields = (t: TFunction): Field<InputFieldProps>[] => [
  {
    name: 'shortName',
    label: t('common:forms.labels.bank.shortName'),
    required: true,
    validate: formErrorUtils.compose(
      formErrorUtils.required(t('common:forms.validations.required'))(),
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 2 }))(2),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 100 }))(100),
      formErrorUtils.alphaNumericApostropheHyphenSpaceDotCommaSlash(
        t('common:forms.validations.alphaNumericApostropheHyphenSpaceDotCommaSlash')
      )
    ),
    Component: InputField,
    key: 0,
  },
  {
    name: 'longName',
    label: t('common:forms.labels.bank.longName'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 2 }))(2),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 100 }))(100),
      formErrorUtils.alphaNumericApostropheHyphenSpaceDotCommaSlash(
        t('common:forms.validations.alphaNumericApostropheHyphenSpaceDotCommaSlash')
      )
    ),
    key: 1,
  },
]

export const getBankAddressFields = (t: TFunction): Field<InputFieldProps>[] => [
  {
    name: 'streetLine',
    label: t('common:forms.labels.bank.street'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 5 }))(5),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 100 }))(100),
      formErrorUtils.alphaNumericApostropheHyphenSpaceDotCommaSlash(
        t('common:forms.validations.alphaNumericApostropheHyphenSpaceDotCommaSlash')
      )
    ),
    key: 0,
  },
  {
    name: 'city',
    label: t('common:forms.labels.bank.city'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 2 }))(2),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 100 }))(100),
      formErrorUtils.alphaNumericApostropheHyphenSpace(
        t('common:forms.validations.alphaNumericApostropheHyphenSpace')
      )
    ),
    key: 1,
  },
  {
    name: 'region',
    label: t('common:forms.labels.bank.region'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 5 }))(5),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 100 }))(100),
      formErrorUtils.alphaNumericApostropheHyphenSpace(
        t('common:forms.validations.alphaNumericApostropheHyphenSpace')
      )
    ),
    key: 2,
  },
  {
    name: 'zipCode',
    label: t('common:forms.labels.bank.zipCode'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 3 }))(3),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 10 }))(10),
      formErrorUtils.alphaNumericHyphenSpaceDotSlash(
        t('common:forms.validations.alphaNumericHyphenSpaceDotSlash')
      )
    ),
    key: 3,
  },
  {
    name: 'country',
    label: t('common:forms.labels.bank.country'),
    required: true,
    validate: formErrorUtils.required(t('common:forms.validations.required'))(),
    Component: InputField,
    key: 4,
  },
]

export const getBankContactsFields = (
  t: TFunction
): Field<InputFieldProps | PhoneNumberInputFieldProps>[] => [
  {
    label: t('common:forms.labels.bank.phoneNumber'),
    codeInputProps: {
      name: 'phoneCode',
      validate: formErrorUtils.optionalCompose(
        formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 2 }))(2),
        formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 4 }))(4),
        formErrorUtils.isPhoneNumberCode(t('common:forms.validations.isPhoneNumberCode'))
      ),
    },
    numberInputProps: {
      name: 'shortPhoneNumber',
      validate: formErrorUtils.optionalCompose(
        formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 3 }))(3),
        formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 12 }))(12),
        formErrorUtils.numeric(t('common:forms.validations.numeric'))
      ),
    },
    Component: PhoneNumberInputField,
    key: 0,
  },
  {
    name: 'email',
    label: t('common:forms.labels.bank.email'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.email(t('common:forms.validations.email'))()
    ),
    key: 1,
  },
]

export const getBankSwiftFields = (t: TFunction): Field<InputFieldProps>[] => [
  {
    name: 'codeGroup',
    label: t('common:forms.labels.bank.codeGroup'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 2 }))(2),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 100 }))(100),
      formErrorUtils.alphaNumericHyphenDotUnderscore(
        t('common:forms.validations.alphaNumericHyphenDotUnderscore')
      )
    ),
    key: 0,
  },
  {
    name: 'swiftCode',
    label: t('common:forms.labels.bank.swiftCode'),
    Component: InputField,
    validate: formErrorUtils.optionalCompose(
      formErrorUtils.minLength(t('common:forms.validations.minLength', { minLength: 8 }))(8),
      formErrorUtils.maxLength(t('common:forms.validations.maxLength', { maxLength: 11 }))(11),
      formErrorUtils.upperCasedAlphaNumeric(t('common:forms.validations.upperCasedAlphaNumeric'))
    ),
    key: 1,
  },
]

export const getBankInformationVerifyFields = (t: TFunction) => [
  ...getBankNameFields(t),
  ...getBankAddressFields(t),
  ...getBankContactsFields(t),
  ...getBankSwiftFields(t),
]
