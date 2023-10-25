import { getValueByPath, setValueByPath } from './index'

describe('setValueByPath', () => {
  it('it sets a nested value in an object based on a path', () => {
    const myObject = {}

    setValueByPath(myObject, 'a.b.c', 'valueHere')
    expect(myObject).toEqual({ a: { b: { c: 'valueHere' } } })
  })

  it('it sets value for a simple path', () => {
    const myObject = {}

    setValueByPath(myObject, 'a', 'valueHere')

    expect(myObject).toEqual({ a: 'valueHere' })
  })
})

describe('getValueByPath', () => {
  it('it gets a nested value from an object based on a path', () => {
    const myObject = { a: { b: { c: 'valueHere' } } }
    const result = getValueByPath(myObject, 'a.b.c')

    expect(result).toBe('valueHere')
  })

  it('it returns undefined for non-existent paths', () => {
    const myObject = { a: { b: { c: 'valueHere' } } }
    const result = getValueByPath(myObject, 'x.y.z')

    expect(result).toBeUndefined()
  })

  it('it gets a value from an object based on simple path', () => {
    const myObject = { a: 24 }
    const result = getValueByPath(myObject, 'a')

    expect(result).toBe(24)
  })
})
