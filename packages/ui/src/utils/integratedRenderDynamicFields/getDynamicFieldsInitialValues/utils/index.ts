// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getValueByPath = (obj: Record<string, any>, path: string) => {
  const keys = path.split('.')

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]

    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      obj = obj[key]
    } else {
      return undefined
    }
  }

  return obj
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const setValueByPath = (obj: Record<string, any>, path: string, value: unknown) => {
  const keys = path.split('.')
  let currentObj = obj

  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i]

    if (!currentObj[key]) {
      currentObj[key] = {}
    }

    currentObj = currentObj[key]
  }

  currentObj[keys[keys.length - 1]] = value
}
