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
  isEmail,
  isPhoneNumberCode,
  isRequired,
  isValidRegExp,
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
  upperCasedAlphaNumeric,
  upperCasedAlphabetic,
} from './validation'

describe('isRequired', () => {
  it('should return true for non-empty string values', () => {
    expect(isRequired('test')).toBe(true)
  })

  it('should return false for empty string values', () => {
    expect(isRequired('   ')).toBe(false)
  })

  it('should return true for boolean values', () => {
    expect(isRequired(true)).toBe(true)
    expect(isRequired(false)).toBe(false)
  })

  it('should return true for number values', () => {
    expect(isRequired(0)).toBe(true)
    expect(isRequired(1)).toBe(true)
    expect(isRequired(-1)).toBe(true)
  })

  it('should return false for empty arrays', () => {
    expect(isRequired([])).toBe(false)
  })

  it('should return true for non-empty arrays', () => {
    expect(isRequired([1, 2, 3])).toBe(true)
  })
})

describe('minLength', () => {
  it('should return true if value length is greater than or equal to minLengthAmount', () => {
    expect(minLength('hello', 3)).toBe(true)
    expect(minLength('world', 5)).toBe(true)
  })

  it('should return false if value length is less than minLengthAmount', () => {
    expect(minLength('hi', 3)).toBe(false)
    expect(minLength('foo', 10)).toBe(false)
  })

  it('should return true if minLengthAmount is not provided', () => {
    expect(minLength('test')).toBe(true)
  })

  it('should handle edge case where value is an empty string', () => {
    expect(minLength('', 1)).toBe(false)
    expect(minLength('', 0)).toBe(true)
  })
})

describe('maxLength', () => {
  it('should return true if the value is shorter than the maxLengthAmount', () => {
    expect(maxLength('hello', 10)).toBe(true)
  })

  it('should return false if the value is longer than the maxLengthAmount', () => {
    expect(maxLength('this is too long', 5)).toBe(false)
  })

  it('should return true if maxLengthAmount is not specified', () => {
    expect(maxLength('this is a test')).toBe(true)
  })
})

describe('isEmail', () => {
  it('should return true if value is a valid email', () => {
    expect(isEmail('test@example.com')).toBe(true)
    expect(isEmail('john.doe@gmail.com')).toBe(true)
  })

  it('should return false if value is not a valid email', () => {
    expect(isEmail('notanemail')).toBe(false)
    expect(isEmail('john.doe@')).toBe(false)
    expect(isEmail('@gmail.com')).toBe(false)
  })

  it('should handle edge case where value is an empty string', () => {
    expect(isEmail('')).toBe(false)
  })
})

describe('alphaNumeric', () => {
  it('should return true for an alphanumeric string', () => {
    expect(alphaNumeric('hello123')).toBe(true)
  })

  it('should return false for a non-alphanumeric string', () => {
    expect(alphaNumeric('hello world!')).toBe(false)
  })
})

describe('alphaNumericApostropheHyphenSpace', () => {
  it('should return true for a string with allowed characters', () => {
    expect(alphaNumericApostropheHyphenSpace("I'm a 123 -")).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(alphaNumericApostropheHyphenSpace('hello_world')).toBe(false)
  })
})

describe('alphaNumericApostropheHyphenSpaceDotCommaSlash', () => {
  it('should return true for a string with allowed characters', () => {
    expect(alphaNumericApostropheHyphenSpaceDotCommaSlash("I'm a 123 - .,\\/")).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(alphaNumericApostropheHyphenSpaceDotCommaSlash('hello_world')).toBe(false)
  })
})

describe('alphaNumericHyphenSpaceDotSlash', () => {
  it('should return true for a string with allowed characters', () => {
    expect(alphaNumericHyphenSpaceDotSlash('hello-world/123. ')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(alphaNumericHyphenSpaceDotSlash('hello_world')).toBe(false)
  })
})

describe('alphaNumericHyphenDotUnderscore', () => {
  it('should return true for a string with allowed characters', () => {
    expect(alphaNumericHyphenDotUnderscore('hello_world-123.')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(alphaNumericHyphenDotUnderscore('hello world!')).toBe(false)
  })
})

describe('alphaNumericHyphenDotUnderscoreHash', () => {
  it('should return true for a string with allowed characters', () => {
    expect(alphaNumericHyphenDotUnderscoreHash('hello_world-123.#')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(alphaNumericHyphenDotUnderscoreHash('hello world!')).toBe(false)
  })
})

describe('isPhoneNumberCode', () => {
  it('should return true for a string with allowed characters', () => {
    expect(isPhoneNumberCode('+380')).toBe(true)
    expect(isPhoneNumberCode('+237')).toBe(true)
    expect(isPhoneNumberCode('+44')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(isPhoneNumberCode('3+8')).toBe(false)
    expect(isPhoneNumberCode('sada')).toBe(false)
  })
})

describe('numeric', () => {
  it('should return true for a string with allowed characters', () => {
    expect(numeric('213123123')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(numeric('letters')).toBe(false)
  })
})

describe('upperCasedAlphaNumeric', () => {
  it('should return true for a string with allowed characters', () => {
    expect(upperCasedAlphaNumeric('LETTERS213123123')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(upperCasedAlphaNumeric('letters223112')).toBe(false)
  })
})

describe('min', () => {
  it('should return true if value is bigger then min value', () => {
    expect(min(2, 1)).toBe(true)
  })

  it('should return false if value is less then min value', () => {
    expect(min(1, 2)).toBe(false)
  })
})

describe('max', () => {
  it('should return true if value is less then max value', () => {
    expect(max(1, 2)).toBe(true)
  })

  it('should return false if value is bigger then max value', () => {
    expect(max(2, 1)).toBe(false)
  })
})

describe('isValidRegExp', () => {
  it('should return true for valid regular expressions', () => {
    expect(isValidRegExp('abc')).toBe(true)
    expect(isValidRegExp('[0-9]+')).toBe(true)
    expect(isValidRegExp('^abc$i')).toBe(true)
  })

  it('should return false for invalid regular expressions', () => {
    expect(isValidRegExp('[abc')).toBe(false)
    expect(isValidRegExp('[0-9+')).toBe(false)
  })
})

describe('minDate', () => {
  it('should return true when value is after minValue', () => {
    const value = dateTimeUtils.dateTime('2023-09-25')
    const minValue = dateTimeUtils.dateTime('2023-09-24')

    expect(minDate(value, minValue)).toBe(true)
  })

  it('should return true when value is equal to minValue', () => {
    const value = dateTimeUtils.dateTime('2023-09-25')
    const minValue = dateTimeUtils.dateTime('2023-09-25')

    expect(minDate(value, minValue)).toBe(true)
  })

  it('should return false when value is before minValue', () => {
    const value = dateTimeUtils.dateTime('2023-09-21')
    const minValue = dateTimeUtils.dateTime('2023-09-25')

    expect(minDate(value, minValue)).toBe(false)
  })
})

describe('maxDate', () => {
  it('should return true when value is before maxValue', () => {
    const value = dateTimeUtils.dateTime('2023-09-23')
    const maxValue = dateTimeUtils.dateTime('2023-09-24')

    expect(maxDate(value, maxValue)).toBe(true)
  })

  it('should return true when value is equal to maxValue', () => {
    const value = dateTimeUtils.dateTime('2023-09-25')
    const maxValue = dateTimeUtils.dateTime('2023-09-25')

    expect(maxDate(value, maxValue)).toBe(true)
  })

  it('should return false when value is after maxValue', () => {
    const value = dateTimeUtils.dateTime('2023-09-26')
    const minValue = dateTimeUtils.dateTime('2023-09-25')

    expect(maxDate(value, minValue)).toBe(false)
  })
})

describe('minFuture', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('should work with days', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-28')

      expect(minFuture(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-27')

      expect(minFuture(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-26')

      expect(minFuture(value, 2, PeriodTerm.Day)).toBe(false)
    })
  })

  describe('should work with weeks', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'week')

      expect(minFuture(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'week')

      expect(minFuture(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'week')

      expect(minFuture(value, 2, PeriodTerm.Week)).toBe(false)
    })
  })

  describe('should work with quarters', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'quarter')

      expect(minFuture(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'quarter')

      expect(minFuture(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'quarter')

      expect(minFuture(value, 2, PeriodTerm.Quarter)).toBe(false)
    })
  })

  describe('should work with years', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'year')

      expect(minFuture(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'year')

      expect(minFuture(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'year')

      expect(minFuture(value, 2, PeriodTerm.Year)).toBe(false)
    })
  })
})

describe('maxFuture', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('should work with days', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'd')

      expect(maxFuture(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'd')

      expect(maxFuture(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'd')

      expect(maxFuture(value, 2, PeriodTerm.Day)).toBe(false)
    })
  })

  describe('should work with weeks', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'week')

      expect(maxFuture(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'week')

      expect(maxFuture(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'week')

      expect(maxFuture(value, 2, PeriodTerm.Week)).toBe(false)
    })
  })

  describe('should work with quarters', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'quarter')

      expect(maxFuture(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'quarter')

      expect(maxFuture(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'quarter')

      expect(maxFuture(value, 2, PeriodTerm.Quarter)).toBe(false)
    })
  })

  describe('should work with years', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(1, 'year')

      expect(maxFuture(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(2, 'year')

      expect(maxFuture(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').add(3, 'year')

      expect(maxFuture(value, 2, PeriodTerm.Year)).toBe(false)
    })
  })
})

describe('minPast', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('should work with days', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'd')

      expect(minPast(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'd')

      expect(minPast(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'd')

      expect(minPast(value, 2, PeriodTerm.Day)).toBe(false)
    })
  })

  describe('should work with weeks', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'week')

      expect(minPast(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'week')

      expect(minPast(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'week')

      expect(minPast(value, 2, PeriodTerm.Week)).toBe(false)
    })
  })

  describe('should work with quarters', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'quarter')

      expect(minPast(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'quarter')

      expect(minPast(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'quarter')

      expect(minPast(value, 2, PeriodTerm.Quarter)).toBe(false)
    })
  })

  describe('should work with years', () => {
    it('should return true when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'year')

      expect(minPast(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'year')

      expect(minPast(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return false when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'year')

      expect(minPast(value, 2, PeriodTerm.Year)).toBe(false)
    })
  })
})

describe('maxPast', () => {
  afterEach(() => {
    jest.useRealTimers()
  })

  describe('should work with days', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'd')

      expect(maxPast(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'd')

      expect(maxPast(value, 2, PeriodTerm.Day)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'd')

      expect(maxPast(value, 2, PeriodTerm.Day)).toBe(false)
    })
  })

  describe('should work with weeks', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'week')

      expect(maxPast(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'week')

      expect(maxPast(value, 2, PeriodTerm.Week)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'week')

      expect(maxPast(value, 2, PeriodTerm.Week)).toBe(false)
    })
  })

  describe('should work with quarters', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'quarter')

      expect(maxPast(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'quarter')

      expect(maxPast(value, 2, PeriodTerm.Quarter)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'quarter')

      expect(maxPast(value, 2, PeriodTerm.Quarter)).toBe(false)
    })
  })

  describe('should work with years', () => {
    it('should return true when value is after targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(1, 'year')

      expect(maxPast(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return true when value is equal to targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(2, 'year')

      expect(maxPast(value, 2, PeriodTerm.Year)).toBe(true)
    })

    it('should return false when value is before targetDate', () => {
      jest.useFakeTimers().setSystemTime(new Date('2023-09-25'))

      const value = dateTimeUtils.dateTime('2023-09-25').subtract(3, 'year')

      expect(maxPast(value, 2, PeriodTerm.Year)).toBe(false)
    })
  })
})

describe('alphabetic', () => {
  it('should return true for a string with allowed characters', () => {
    expect(alphabetic('TestValue')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(alphabetic('123test_***d54-value')).toBe(false)
  })
})

describe('upperCasedAlphabetic', () => {
  it('should return true for a string with allowed characters', () => {
    expect(upperCasedAlphabetic('TESTVALUE')).toBe(true)
  })

  it('should return false for a string with disallowed characters', () => {
    expect(upperCasedAlphabetic('tEST VA_/LUe')).toBe(false)
  })
})

describe('compareStrings', () => {
  it('should return true if values is same', () => {
    expect(compareStrings('a', 'a')).toBe(true)
  })

  it('should return false if values is not same', () => {
    expect(compareStrings('a', 'b')).toBe(false)
    expect(compareStrings('a', 'c')).toBe(false)
    expect(compareStrings('a', 'd')).toBe(false)
  })

  it('should handle edge case where value is an empty string', () => {
    expect(compareStrings('', '')).toBe(true)
  })
})
