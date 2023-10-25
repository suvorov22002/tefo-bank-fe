import validator from 'validator'
import { DateTime, dateTimeUtils } from 'utils'

import { PeriodTerm, dateTimePeriodTermMap } from '../integratedRenderDynamicFields'

export const isRequired = (value: string | number | boolean | Array<unknown> | null) => {
  if (typeof value === 'string') return !!value.trim().length
  if (typeof value === 'boolean') return value
  if (typeof value === 'number') return true
  if (Array.isArray(value)) return !!value.length

  return !!value
}

export const isEmail = (value: string) => validator.isEmail(value)

export const isPhoneNumberCode = (value: string) => {
  return /^\+[0-9]+$/.test(value)
}

export const minLength = (value: string, minLengthAmount = 0) => value.length >= minLengthAmount

export const maxLength = (value: string, maxLengthAmount = Infinity) =>
  value.length <= maxLengthAmount

export const testRegExp = (value: string, regExp: RegExp) => regExp.test(value)

export const numeric = (value: string) => /^[0-9]+$/.test(value)

export const alphaNumeric = (value: string) => /^[A-Za-z0-9]+$/.test(value)

export const upperCasedAlphaNumeric = (value: string) => /^[A-Z0-9]+$/.test(value)

export const alphaNumericApostropheHyphenSpace = (value: string) => /^[A-Za-z0-9 '-]+$/.test(value)

export const alphaNumericApostropheHyphenSpaceDotCommaSlash = (value: string) =>
  /^[A-Za-z0-9 '.,\\/-]+$/.test(value)

export const alphaNumericHyphenSpaceDotSlash = (value: string) => /^[A-Za-z0-9 .\\/-]+$/.test(value)

export const alphaNumericHyphenDotUnderscore = (value: string) => /^[A-Za-z0-9_.-]+$/.test(value)

export const alphaNumericHyphenDotUnderscoreHash = (value: string) =>
  /^[A-Za-z0-9_.#-]+$/.test(value)

export const min = (value: number, minValue: number) => value >= minValue

export const max = (value: number, maxValue: number) => value <= maxValue

export const minDate = (value: DateTime | string, minValue: DateTime | string) => {
  return dateTimeUtils.dateTime(value).isSameOrAfter(dateTimeUtils.dateTime(minValue))
}

export const maxDate = (value: DateTime | string, maxValue: DateTime | string) => {
  return dateTimeUtils.dateTime(value).isSameOrBefore(dateTimeUtils.dateTime(maxValue))
}

export const isValidRegExp = (value: string) => {
  try {
    new RegExp(value)

    return true
  } catch (error) {
    return false
  }
}

export const minFuture = (value: DateTime | string, unit: number, term: PeriodTerm) => {
  return dateTimeUtils
    .dateTime(value)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(unit, dateTimePeriodTermMap[term])
    .isSameOrAfter(dateTimeUtils.dateTime().hour(0).minute(0).second(0).millisecond(0))
}

export const maxFuture = (value: DateTime | string, unit: number, term: PeriodTerm) => {
  return dateTimeUtils
    .dateTime(value)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .subtract(unit, dateTimePeriodTermMap[term])
    .isSameOrBefore(dateTimeUtils.dateTime().hour(0).minute(0).second(0).millisecond(0))
}

export const minPast = (value: DateTime | string, unit: number, term: PeriodTerm) => {
  return dateTimeUtils
    .dateTime(value)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .add(unit, dateTimePeriodTermMap[term])
    .isSameOrBefore(dateTimeUtils.dateTime().hour(0).minute(0).second(0).millisecond(0))
}

export const maxPast = (value: DateTime | string, unit: number, term: PeriodTerm) => {
  return dateTimeUtils
    .dateTime(value)
    .hour(0)
    .minute(0)
    .second(0)
    .millisecond(0)
    .add(unit, dateTimePeriodTermMap[term])
    .isSameOrAfter(dateTimeUtils.dateTime().hour(0).minute(0).second(0).millisecond(0))
}

export const alphabetic = (value: string) => /^[A-Za-z]+$/.test(value)
export const upperCasedAlphabetic = (value: string) => /^[A-Z]+$/.test(value)

export const VALIDATE_EMAIL_REGEX = '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'

export const compareStrings = (a: string, b: string) => a === b
