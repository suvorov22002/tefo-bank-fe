import { DictionaryValue, DictionaryValueStatuses } from '@/domains/dictionaries'

import { getSelectOptionsFromDictionaryValues } from './index'

const dictionaryValuesMock: DictionaryValue[] = [
  {
    id: 1,
    name: 'Name1',
    code: '1',
    status: DictionaryValueStatuses.Active,
    index: 1,
  },
  {
    id: 2,
    name: 'Name2',
    code: '2',
    status: DictionaryValueStatuses.Active,
    index: 2,
  },
]

describe('getSelectOptionsFromDictionaryValues', () => {
  it('should return empty options array when no input dictionary', async () => {
    const result = getSelectOptionsFromDictionaryValues(undefined)
    const result2 = getSelectOptionsFromDictionaryValues([])

    expect(result).toEqual([])
    expect(result2).toEqual([])
  })

  it('should return options array when input dictionary provided', async () => {
    const result = getSelectOptionsFromDictionaryValues(dictionaryValuesMock)

    expect(result).toHaveLength(dictionaryValuesMock.length)
    expect(result).toEqual<Array<{ label: DictionaryValue['name']; value: DictionaryValue['id'] }>>(
      [
        { label: dictionaryValuesMock[0].name, value: dictionaryValuesMock[0].id },
        { label: dictionaryValuesMock[1].name, value: dictionaryValuesMock[1].id },
      ]
    )
  })
})
