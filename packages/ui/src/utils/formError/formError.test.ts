import { dateTimeUtils } from 'utils'

import { PeriodTerm } from '../integratedRenderDynamicFields'
import {
  alphaNumeric,
  alphaNumericApostropheHyphenSpace,
  alphaNumericApostropheHyphenSpaceDotCommaSlash,
  alphaNumericHyphenDotUnderscore,
  alphaNumericHyphenDotUnderscoreHash,
  alphaNumericHyphenSpaceDotSlash,
  alphabetic,
  compareStrings,
  email,
  isPhoneNumberCode,
  max,
  maxDate,
  maxFuture,
  maxLength,
  maxPast,
  min,
  minDate,
  minFuture,
  minLength,
  minPast,
  numeric,
  required,
  upperCasedAlphaNumeric,
  upperCasedAlphabetic,
} from './formError'

const errorMessagesMock = {
  required: 'required ErrorMessage',
  minLength: 'minLength ErrorMessage',
  maxLength: 'maxLength ErrorMessage',
  isEmail: 'isEmail ErrorMessage',
  alphaNumeric: 'alphaNumeric ErrorMessage',
  alphaNumericApostropheHyphenSpace: 'alphaNumericApostropheHyphenSpace ErrorMessage',
  alphaNumericApostropheHyphenSpaceDotCommaSlash:
    'alphaNumericApostropheHyphenSpaceDotCommaSlash ErrorMessage',
  alphaNumericHyphenSpaceDotSlash: 'alphaNumericHyphenSpaceDotSlash ErrorMessage',
  alphaNumericHyphenDotUnderscore: 'alphaNumericHyphenDotUnderscore ErrorMessage',
  alphaNumericHyphenDotUnderscoreHash: 'alphaNumericHyphenDotUnderscoreHash ErrorMessage',
  isPhoneNumberCode: 'isPhoneNumberCode ErrorMessage',
  numeric: 'numeric ErrorMessage',
  upperCasedAlphaNumeric: 'upperCasedAlphaNumeric ErrorMessage',
  min: 'min ErrorMessage',
  max: 'max ErrorMessage',
  minDate: 'minDate ErrorMessage',
  maxDate: 'maxDate ErrorMessage',
  minFuture: 'minFuture ErrorMessage',
  maxFuture: 'maxFuture ErrorMessage',
  minPast: 'minPast ErrorMessage',
  maxPast: 'maxPast ErrorMessage',
  alphabetic: 'alphabetic ErrorMessage',
  upperCasedAlphabetic: 'upperCasedAlphabetic ErrorMessage',
  compareStrings: 'compareStrings ErrorMessage',
}

describe('required', () => {
  it('should return undefined for non-empty string values', () => {
    expect(required('requiredErrorMessage')()('test')).toBe(undefined)
  })

  it('should return form error message for empty string values', () => {
    expect(required(errorMessagesMock.required)()('   ')).toBe(errorMessagesMock.required)
  })

  it('should return undefined for true', () => {
    expect(required(errorMessagesMock.required)()(true)).toBe(undefined)
  })

  it('should return form error message for false', () => {
    expect(required(errorMessagesMock.required)()(false)).toBe(errorMessagesMock.required)
  })

  it('should return undefined for number values', () => {
    expect(required(errorMessagesMock.required)()(0)).toBe(undefined)
    expect(required(errorMessagesMock.required)()(1)).toBe(undefined)
    expect(required(errorMessagesMock.required)()(-1)).toBe(undefined)
  })

  it('should return form error message for empty arrays', () => {
    expect(required(errorMessagesMock.required)()([])).toBe(errorMessagesMock.required)
  })

  it('should return undefined for non-empty arrays', () => {
    expect(required(errorMessagesMock.required)()([1, 2, 3])).toBe(undefined)
  })
})

describe('minLength', () => {
  it('should return undefined if value length is greater than or equal to minLengthAmount', () => {
    const minLength3Validator = minLength(errorMessagesMock.minLength)(3)
    const minLength5Validator = minLength(errorMessagesMock.minLength)(5)

    expect(minLength3Validator('hello')).toBeUndefined()
    expect(minLength5Validator('world')).toBeUndefined()
  })

  it('should return error message if value length is less than minLengthAmount', () => {
    const minLength5Validator = minLength(errorMessagesMock.minLength)(5)
    const minLength10Validator = minLength(errorMessagesMock.minLength)(10)

    expect(minLength5Validator('hi')).toBe(errorMessagesMock.minLength)
    expect(minLength10Validator('foo')).toBe(errorMessagesMock.minLength)
  })

  it('should handle edge case where value is an empty string', () => {
    const minLength1Validator = minLength(errorMessagesMock.minLength)(1)
    const minLength0Validator = minLength(errorMessagesMock.minLength)(0)

    expect(minLength1Validator('')).toBe(errorMessagesMock.minLength)
    expect(minLength0Validator('')).toBeUndefined()
  })
})

describe('maxLength', () => {
  it('should return undefined if the value is shorter than the maxLengthAmount', () => {
    const maxLength10Validator = maxLength(errorMessagesMock.maxLength)(10)

    expect(maxLength10Validator('hello')).toBe(undefined)
  })

  it('should return error message if the value is longer than the maxLengthAmount', () => {
    const maxLength5Validator = maxLength(errorMessagesMock.maxLength)(5)

    expect(maxLength5Validator('this is too long')).toBe(errorMessagesMock.maxLength)
  })
})

describe('isEmail', () => {
  it('should return undefined if value is a valid email', () => {
    const emailValidator = email(errorMessagesMock.isEmail)()

    expect(emailValidator('test@example.com')).toBeUndefined()
    expect(emailValidator('john.doe@gmail.com')).toBeUndefined()
  })

  it('should return error message if value is not a valid email', () => {
    const emailValidator = email(errorMessagesMock.isEmail)()

    expect(emailValidator('notanemail')).toBe(errorMessagesMock.isEmail)
    expect(emailValidator('john.doe@')).toBe(errorMessagesMock.isEmail)
    expect(emailValidator('@gmail.com')).toBe(errorMessagesMock.isEmail)
  })

  it('should return error message if value is an empty string', () => {
    const emailValidator = email(errorMessagesMock.isEmail)()

    expect(emailValidator('')).toBe(errorMessagesMock.isEmail)
  })
})

describe('alphaNumeric', () => {
  it('should return undefined for an alphanumeric string', () => {
    expect(alphaNumeric(errorMessagesMock.alphaNumeric)('hello123')).toBe(undefined)
  })

  it('should return error message for a non-alphanumeric string', () => {
    expect(alphaNumeric(errorMessagesMock.alphaNumeric)('hello world!')).toBe(
      errorMessagesMock.alphaNumeric
    )
  })
})

describe('alphaNumericApostropheHyphenSpace', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(
      alphaNumericApostropheHyphenSpace(errorMessagesMock.alphaNumericApostropheHyphenSpace)(
        "I'm a 123 -"
      )
    ).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(
      alphaNumericApostropheHyphenSpace(errorMessagesMock.alphaNumericApostropheHyphenSpace)(
        'hello_world'
      )
    ).toBe(errorMessagesMock.alphaNumericApostropheHyphenSpace)
  })
})

describe('alphaNumericApostropheHyphenSpaceDotCommaSlash', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(
      alphaNumericApostropheHyphenSpaceDotCommaSlash(
        errorMessagesMock.alphaNumericApostropheHyphenSpaceDotCommaSlash
      )("I'm a 123 - .,\\/")
    ).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(
      alphaNumericApostropheHyphenSpaceDotCommaSlash(
        errorMessagesMock.alphaNumericApostropheHyphenSpaceDotCommaSlash
      )('hello_world')
    ).toBe(errorMessagesMock.alphaNumericApostropheHyphenSpaceDotCommaSlash)
  })
})

describe('alphaNumericHyphenSpaceDotSlash', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(
      alphaNumericHyphenSpaceDotSlash(errorMessagesMock.alphaNumericHyphenSpaceDotSlash)(
        'hello-world/123. '
      )
    ).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(
      alphaNumericHyphenSpaceDotSlash(errorMessagesMock.alphaNumericHyphenSpaceDotSlash)(
        'hello_world'
      )
    ).toBe(errorMessagesMock.alphaNumericHyphenSpaceDotSlash)
  })
})

describe('alphaNumericHyphenDotUnderscore', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(
      alphaNumericHyphenDotUnderscore(errorMessagesMock.alphaNumericHyphenDotUnderscore)(
        'hello_world-123.'
      )
    ).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(
      alphaNumericHyphenDotUnderscore(errorMessagesMock.alphaNumericHyphenDotUnderscore)(
        'hello world!'
      )
    ).toBe(errorMessagesMock.alphaNumericHyphenDotUnderscore)
  })
})

describe('alphaNumericHyphenDotUnderscoreHash', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(
      alphaNumericHyphenDotUnderscoreHash(errorMessagesMock.alphaNumericHyphenDotUnderscoreHash)(
        'hello_world-123.#'
      )
    ).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(
      alphaNumericHyphenDotUnderscoreHash(errorMessagesMock.alphaNumericHyphenDotUnderscoreHash)(
        'hello world!'
      )
    ).toBe(errorMessagesMock.alphaNumericHyphenDotUnderscoreHash)
  })
})

describe('isPhoneNumberCode', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(isPhoneNumberCode(errorMessagesMock.isPhoneNumberCode)('+380')).toBe(undefined)
    expect(isPhoneNumberCode(errorMessagesMock.isPhoneNumberCode)('+237')).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(isPhoneNumberCode(errorMessagesMock.isPhoneNumberCode)('3+80')).toBe(
      errorMessagesMock.isPhoneNumberCode
    )
    expect(isPhoneNumberCode(errorMessagesMock.isPhoneNumberCode)('fds')).toBe(
      errorMessagesMock.isPhoneNumberCode
    )
  })
})

describe('numeric', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(numeric(errorMessagesMock.numeric)('213123123')).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(numeric(errorMessagesMock.numeric)('letters')).toBe(errorMessagesMock.numeric)
  })
})

describe('upperCasedAlphaNumeric', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(
      upperCasedAlphaNumeric(errorMessagesMock.upperCasedAlphaNumeric)('LETTERS213123123')
    ).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(upperCasedAlphaNumeric(errorMessagesMock.upperCasedAlphaNumeric)('letters223112')).toBe(
      errorMessagesMock.upperCasedAlphaNumeric
    )
  })
})

describe('min', () => {
  it('should return undefined if value is greater than or equal to minValue', () => {
    const minValidator = min(errorMessagesMock.min)(1)

    expect(minValidator(2)).toBeUndefined()
  })

  it('should return error message if value is less than minValue', () => {
    const minValidator = min(errorMessagesMock.min)(2)

    expect(minValidator(1)).toBe(errorMessagesMock.min)
  })
})

describe('max', () => {
  it('should return error message if value is greater than or equal to maxValue', () => {
    const minValidator = max(errorMessagesMock.max)(2)

    expect(minValidator(1)).toBeUndefined()
  })

  it('should return undefined if value is less than maxValue', () => {
    const minValidator = max(errorMessagesMock.max)(1)

    expect(minValidator(2)).toBe(errorMessagesMock.max)
  })
})

describe('minDate', () => {
  it('should return undefined when value is after minValue', () => {
    const minValue = dateTimeUtils.dateTime('2023-09-24')
    const minDateValidator = minDate(errorMessagesMock.minDate)({
      targetDate: minValue,
    })
    const value = dateTimeUtils.dateTime('2023-09-25')

    expect(minDateValidator(value)).toBeUndefined()
  })

  it('should return undefined when value is equal to minValue', () => {
    const minValue = dateTimeUtils.dateTime('2023-09-25')
    const minDateValidator = minDate(errorMessagesMock.minDate)({
      targetDate: minValue,
    })
    const value = dateTimeUtils.dateTime('2023-09-25')

    expect(minDateValidator(value)).toBeUndefined()
  })

  it('should return error message when value is before minValue', () => {
    const minValue = dateTimeUtils.dateTime('2023-09-24')
    const minDateValidator = minDate(errorMessagesMock.maxDate)({
      targetDate: minValue,
    })
    const value = dateTimeUtils.dateTime('2023-09-21')

    expect(minDateValidator(value)).toBe(errorMessagesMock.maxDate)
  })
})

describe('maxDate', () => {
  it('should return undefined when value is before maxValue', () => {
    const maxValue = dateTimeUtils.dateTime('2023-09-26')
    const maxDateValidator = maxDate(errorMessagesMock.maxDate)({
      targetDate: maxValue,
    })

    const value = dateTimeUtils.dateTime('2023-09-25')

    expect(maxDateValidator(value)).toBeUndefined()
  })

  it('should return undefined when value is equal to minValue', () => {
    const maxValue = dateTimeUtils.dateTime('2023-09-25')
    const maxDateValidator = maxDate(errorMessagesMock.maxDate)({
      targetDate: maxValue,
    })
    const value = dateTimeUtils.dateTime('2023-09-25')

    expect(maxDateValidator(value)).toBeUndefined()
  })

  it('should return errorMessage when value is after minValue', () => {
    const maxValue = dateTimeUtils.dateTime('2023-09-23')
    const maxDateValidator = maxDate(errorMessagesMock.maxDate)({
      targetDate: maxValue,
    })
    const value = dateTimeUtils.dateTime('2023-09-24')

    expect(maxDateValidator(value)).toBe(errorMessagesMock.maxDate)
  })
})

describe('minFuture', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return undefined when value is after targetDate', () => {
    const minFutureValidator = minFuture(errorMessagesMock.minFuture)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-28')

    expect(minFutureValidator(value)).toBeUndefined()
  })

  it('should return undefined when value is equal to targetDate', () => {
    const minFutureValidator = minFuture(errorMessagesMock.minFuture)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-27')

    expect(minFutureValidator(value)).toBeUndefined()
  })

  it('should return errorMessage when value is before targetDate', () => {
    const minFutureValidator = minFuture(errorMessagesMock.minFuture)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-26')

    expect(minFutureValidator(value)).toBe(errorMessagesMock.minFuture)
  })
})

describe('maxFuture', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return undefined when value is before targetDate', () => {
    const maxFutureValidator = maxFuture(errorMessagesMock.maxFuture)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'd')

    expect(maxFutureValidator(value)).toBeUndefined()
  })

  it('should return undefined when value is equal to targetDate', () => {
    const maxFutureValidator = maxFuture(errorMessagesMock.maxFuture)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'd')

    expect(maxFutureValidator(value)).toBeUndefined()
  })

  it('should return error message when value is after targetDate', () => {
    const maxFutureValidator = maxFuture(errorMessagesMock.maxFuture)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'd')

    expect(maxFutureValidator(value)).toBe(errorMessagesMock.maxFuture)
  })
})

describe('minPast', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return undefined when value is before targetDate', () => {
    const minPastValidator = minPast(errorMessagesMock.minPast)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'd')

    expect(minPastValidator(value)).toBeUndefined()
  })

  it('should return undefined when value is equal to targetDate', () => {
    const minPastValidator = minPast(errorMessagesMock.minPast)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'd')

    expect(minPastValidator(value)).toBeUndefined()
  })

  it('should return error message when value is after targetDate', () => {
    const minPastValidator = minPast(errorMessagesMock.minPast)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'd')

    expect(minPastValidator(value)).toBe(errorMessagesMock.minPast)
  })
})

describe('maxPast', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return undefined when value is after targetDate', () => {
    const maxPastValidator = maxPast(errorMessagesMock.maxPast)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'd')

    expect(maxPastValidator(value)).toBeUndefined()
  })

  it('should return undefined when value is equal to targetDate', () => {
    const maxPastValidator = maxPast(errorMessagesMock.maxPast)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'd')

    expect(maxPastValidator(value)).toBeUndefined()
  })

  it('should return errorMessage when value is before targetDate', () => {
    const maxPastValidator = maxPast(errorMessagesMock.maxPast)({
      unit: 2,
      term: PeriodTerm.Day,
    })

    jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

    const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'd')

    expect(maxPastValidator(value)).toBe(errorMessagesMock.maxPast)
  })
})

describe('alphabetic', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(alphabetic(errorMessagesMock.alphabetic)('helloWorld')).toBe(undefined)
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(alphabetic(errorMessagesMock.alphabetic)('hello wo123rld!')).toBe(
      errorMessagesMock.alphabetic
    )
  })
})

describe('upperCasedAlphabetic', () => {
  it('should return undefined for a string with allowed characters', () => {
    expect(upperCasedAlphabetic(errorMessagesMock.upperCasedAlphabetic)('HELLOWORLD')).toBe(
      undefined
    )
  })

  it('should return error message for a string with disallowed characters', () => {
    expect(upperCasedAlphabetic(errorMessagesMock.upperCasedAlphabetic)('Hello?/W123_ORLD!')).toBe(
      errorMessagesMock.upperCasedAlphabetic
    )
  })
})

describe('compareStrings', () => {
  it('should return undefined if values is not same', () => {
    const compareStringsValidator = compareStrings(errorMessagesMock.compareStrings)('world')

    expect(compareStringsValidator('world')).toBeUndefined()
  })

  it('should return error message if value is same', () => {
    const compareStringsValidator = compareStrings(errorMessagesMock.compareStrings)('world')

    expect(compareStringsValidator('word')).toBe(errorMessagesMock.compareStrings)
    expect(compareStringsValidator('wold')).toBe(errorMessagesMock.compareStrings)
    expect(compareStringsValidator('wor')).toBe(errorMessagesMock.compareStrings)
  })

  it('should handle edge case where value is an empty string', () => {
    const compareStringsValidator = compareStrings(errorMessagesMock.minLength)('')

    expect(compareStringsValidator('')).toBeUndefined()
  })
})
