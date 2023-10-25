import { DateTime } from 'utils'

import * as validationUtils from '../validation/validation'
import { PeriodTerm } from '../integratedRenderDynamicFields'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Validator = (val: any) => string | undefined

export const compose =
  (...validators: Validator[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (value: any) => {
    for (const validator of validators) {
      const res = validator(value)

      if (res !== undefined) {
        return res
      }
    }

    return undefined
  }

export const optionalCompose =
  (...validators: Validator[]) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (value: any) => {
    if (!validationUtils.isRequired(value)) return undefined

    for (const validator of validators) {
      const res = validator(value)

      if (res !== undefined) {
        return res
      }
    }

    return undefined
  }

export const required =
  (errorMessage: string) => () => (value: string | number | boolean | Array<unknown>) =>
    validationUtils.isRequired(value) ? undefined : errorMessage

export const minLength = (errorMessage: string) => (minLengthAmount: number) => (value: string) =>
  validationUtils.minLength(value, minLengthAmount) ? undefined : errorMessage

export const maxLength = (errorMessage: string) => (maxLengthAmount: number) => (value: string) =>
  validationUtils.maxLength(value, maxLengthAmount) ? undefined : errorMessage

export const testRegExp = (errorMessage: string) => (regExp: RegExp) => (value: string) =>
  validationUtils.testRegExp(value, regExp) ? undefined : errorMessage

export const email = (errorMessage: string) => () => (value: string) =>
  validationUtils.isEmail(value) ? undefined : errorMessage

export const alphaNumeric = (errorMessage: string) => (value: string) =>
  validationUtils.alphaNumeric(value) ? undefined : errorMessage

export const alphaNumericApostropheHyphenSpace = (errorMessage: string) => (value: string) =>
  validationUtils.alphaNumericApostropheHyphenSpace(value) ? undefined : errorMessage

export const alphaNumericApostropheHyphenSpaceDotCommaSlash =
  (errorMessage: string) => (value: string) =>
    validationUtils.alphaNumericApostropheHyphenSpaceDotCommaSlash(value) ? undefined : errorMessage

export const alphaNumericHyphenSpaceDotSlash = (errorMessage: string) => (value: string) =>
  validationUtils.alphaNumericHyphenSpaceDotSlash(value) ? undefined : errorMessage

export const alphaNumericHyphenDotUnderscore = (errorMessage: string) => (value: string) =>
  validationUtils.alphaNumericHyphenDotUnderscore(value) ? undefined : errorMessage

export const alphaNumericHyphenDotUnderscoreHash = (errorMessage: string) => (value: string) =>
  validationUtils.alphaNumericHyphenDotUnderscoreHash(value) ? undefined : errorMessage

export const isPhoneNumberCode = (errorMessage: string) => (value: string) =>
  validationUtils.isPhoneNumberCode(value) ? undefined : errorMessage

export const numeric = (errorMessage: string) => (value: string) =>
  validationUtils.numeric(value) ? undefined : errorMessage

export const upperCasedAlphaNumeric = (errorMessage: string) => (value: string) =>
  validationUtils.upperCasedAlphaNumeric(value) ? undefined : errorMessage

export const min = (errorMessage: string) => (minValue: number) => (value: number) =>
  validationUtils.min(value, minValue) ? undefined : errorMessage

export const max = (errorMessage: string) => (maxValue: number) => (value: number) =>
  validationUtils.max(value, maxValue) ? undefined : errorMessage

export const minDate =
  (errorMessage: string) =>
  ({ targetDate }: { targetDate: DateTime }) =>
  (value: DateTime) =>
    validationUtils.minDate(value, targetDate) ? undefined : errorMessage

export const maxDate =
  (errorMessage: string) =>
  ({ targetDate }: { targetDate: DateTime }) =>
  (value: DateTime) =>
    validationUtils.maxDate(value, targetDate) ? undefined : errorMessage

export const isValidRegExp = (errorMessage: string) => () => (value: string) =>
  validationUtils.isValidRegExp(value) ? undefined : errorMessage

export const minFuture =
  (errorMessage: string) =>
  ({ unit, term }: { unit: number; term: PeriodTerm }) =>
  (value: DateTime) =>
    validationUtils.minFuture(value, unit, term) ? undefined : errorMessage

export const maxFuture =
  (errorMessage: string) =>
  ({ unit, term }: { unit: number; term: PeriodTerm }) =>
  (value: DateTime) =>
    validationUtils.maxFuture(value, unit, term) ? undefined : errorMessage

export const minPast =
  (errorMessage: string) =>
  ({ unit, term }: { unit: number; term: PeriodTerm }) =>
  (value: DateTime) =>
    validationUtils.minPast(value, unit, term) ? undefined : errorMessage

export const maxPast =
  (errorMessage: string) =>
  ({ unit, term }: { unit: number; term: PeriodTerm }) =>
  (value: DateTime) =>
    validationUtils.maxPast(value, unit, term) ? undefined : errorMessage
export const alphabetic = (errorMessage: string) => (value: string) =>
  validationUtils.alphabetic(value) ? undefined : errorMessage

export const upperCasedAlphabetic = (errorMessage: string) => (value: string) =>
  validationUtils.upperCasedAlphabetic(value) ? undefined : errorMessage

export const compareStrings = (errorMessage: string) => (a: string) => (b: string) =>
  validationUtils.compareStrings(b, a) ? undefined : errorMessage
