import { percentageValueFormatter, percentageValueParser } from './heap'

describe('percentageValueFormatter', () => {
  it('should format value with default percentage sign', () => {
    expect(percentageValueFormatter(24)).toBe(`24%`)
    expect(percentageValueFormatter('24')).toBe('24%')
  })

  it('should format value with custom percentage sign', () => {
    expect(percentageValueFormatter(24, { percentageSign: 'percent' })).toBe('24percent')
    expect(percentageValueFormatter('24', { percentageSign: 'percent' })).toBe('24percent')
  })
})

describe('percentageValueParser', () => {
  it('should parse value with default percentage sign', () => {
    expect(percentageValueParser('24%')).toBe(24)
  })

  it('should parse value with custom percentage sign', () => {
    expect(
      percentageValueParser('24percent', {
        percentageSign: 'percent',
      })
    ).toBe(24)
  })

  it('should parse value with default percentage sign in string mode', () => {
    expect(percentageValueParser('24%', { stringMode: true })).toBe('24')
  })

  it('should parse value with custom percentage sign in string mode', () => {
    expect(
      percentageValueParser('24percent', {
        percentageSign: 'percent',
        stringMode: true,
      })
    ).toBe('24')
  })
})
