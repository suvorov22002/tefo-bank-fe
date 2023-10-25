/* eslint-disable @typescript-eslint/no-explicit-any */
import { DateTime } from 'utils'

import { formErrorUtils } from '../../../../../formError'
import { ValidationRule, ValidationRuleTypes } from '../../../../types'

type validator<V = unknown> = (
  errorMessage: string
) => (...args: any[]) => (value: V) => undefined | string

const ValidationRuleUtilsMap: Record<
  ValidationRule['type'],
  validator<number> | validator<string> | validator<DateTime>
> = {
  [ValidationRuleTypes.MinLength]: formErrorUtils.minLength,
  [ValidationRuleTypes.MaxLength]: formErrorUtils.maxLength,
  [ValidationRuleTypes.Regex]: formErrorUtils.testRegExp,
  [ValidationRuleTypes.Required]: formErrorUtils.required,
  [ValidationRuleTypes.Min]: formErrorUtils.min,
  [ValidationRuleTypes.Max]: formErrorUtils.max,
  [ValidationRuleTypes.Email]: formErrorUtils.testRegExp,
  [ValidationRuleTypes.AllowedCharacters]: () => () => () => undefined,
  [ValidationRuleTypes.PhoneNumber]: () => () => () => undefined,
  [ValidationRuleTypes.MinFuture]: formErrorUtils.minFuture,
  [ValidationRuleTypes.MaxFuture]: formErrorUtils.maxFuture,
  [ValidationRuleTypes.MinPast]: formErrorUtils.minPast,
  [ValidationRuleTypes.MaxPast]: formErrorUtils.maxPast,
  [ValidationRuleTypes.LessDate]: formErrorUtils.maxDate,
  [ValidationRuleTypes.MoreDate]: formErrorUtils.minDate,
}

export const validationBuilder = (validationRules: ValidationRule[] | undefined) => {
  if (!validationRules) {
    return undefined
  }

  if (
    validationRules.some(
      validationRule =>
        validationRule.type !== ValidationRuleTypes.MaxLength &&
        validationRule.type !== ValidationRuleTypes.MinLength &&
        validationRule.type !== ValidationRuleTypes.Regex &&
        validationRule.type !== ValidationRuleTypes.Required &&
        validationRule.type !== ValidationRuleTypes.Min &&
        validationRule.type !== ValidationRuleTypes.Max &&
        validationRule.type !== ValidationRuleTypes.MinFuture &&
        validationRule.type !== ValidationRuleTypes.MaxFuture &&
        validationRule.type !== ValidationRuleTypes.MinPast &&
        validationRule.type !== ValidationRuleTypes.MaxPast &&
        validationRule.type !== ValidationRuleTypes.LessDate &&
        validationRule.type !== ValidationRuleTypes.MoreDate &&
        validationRule.type !== ValidationRuleTypes.Email
    )
  ) {
    return () => undefined
  }

  const isRequired = validationRules.some(rule => rule.type === ValidationRuleTypes.Required)
  const sortedValidationRules = [...validationRules].sort((a, b) => a.priority - b.priority)
  const validators = sortedValidationRules.map(({ type, value: ruleValue, message }) => {
    if (type === ValidationRuleTypes.Regex || type === ValidationRuleTypes.Email) {
      return ValidationRuleUtilsMap[type](message)(new RegExp(ruleValue))
    }

    return ValidationRuleUtilsMap[type](message)(ruleValue)
  })

  return isRequired
    ? formErrorUtils.compose(...validators)
    : formErrorUtils.optionalCompose(...validators)
}
