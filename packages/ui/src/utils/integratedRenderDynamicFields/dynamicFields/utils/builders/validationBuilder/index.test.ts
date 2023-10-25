import { validationBuilder } from './index'
import {
  DynamicFieldValidationRuleStatuses,
  ValidationRule,
  ValidationRuleTypes,
} from '../../../../types'

describe('validationBuilder', () => {
  const validationRulesMock = [
    {
      type: ValidationRuleTypes.Regex,
      priority: 0,
      value: /^[A-Z]+$/,
      message: 'Wrong Format',
    },
    {
      type: ValidationRuleTypes.MinLength,
      priority: 1,
      value: 3,
      message: 'Min Length',
    },
    {
      type: ValidationRuleTypes.MaxLength,
      priority: 2,
      value: 5,
      message: 'Max Length',
    },
  ] as ValidationRule[]

  it('should return function', () => {
    expect(typeof validationBuilder(validationRulesMock)).toBe('function')
  })

  it('should handle validation rule', () => {
    const validate = validationBuilder([
      {
        type: ValidationRuleTypes.Regex,
        id: '3',
        status: DynamicFieldValidationRuleStatuses.Active,
        priority: 0,
        value: /^[A-Z]+$/,
        message: 'testMessage',
      },
    ])

    expect(validate?.('23')).toBe('testMessage')
    expect(validate?.('UPPERCASEDSTRING')).toBe(undefined)
  })

  it('should handle multiple validation rules according to priority', () => {
    const validate = validationBuilder(validationRulesMock)

    expect(validate?.('/')).toBe('Wrong Format')
    expect(validate?.('A')).toBe('Min Length')
    expect(validate?.('MAXLENGTH')).toBe('Max Length')
  })

  it('should handle unknown validation rule', () => {
    const validate = validationBuilder([
      {
        id: '0',
        status: DynamicFieldValidationRuleStatuses.Active,
        type: 'UnknownValidationRule' as ValidationRule['type'],
        value: 2,
        message: 'messageForUnknownValidationRule',
        priority: 0,
      },
    ])

    expect(validate?.('')).toBe(undefined)
    expect(validate?.('123123')).toBe(undefined)
    expect(validate?.('random string')).toBe(undefined)
    expect(validate?.('UPPERCASEDLETTERS')).toBe(undefined)
  })
})
