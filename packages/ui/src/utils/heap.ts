import clsx from 'clsx'

export const classes = clsx

export const percentageValueFormatter = (
  value: string | number | undefined,
  formatOptions?: {
    percentageSign?: string
  }
) => {
  if (!value) {
    return ''
  }

  return `${value}${formatOptions?.percentageSign || '%'}`
}

export const percentageValueParser = (
  value: string | undefined,
  parseOptions?: {
    percentageSign?: string
    stringMode?: boolean
  }
) => {
  const normalizedValue = value?.replace(parseOptions?.percentageSign || '%', '')

  if (!normalizedValue?.length) {
    return ''
  }

  return parseOptions?.stringMode ? normalizedValue || '' : Number(normalizedValue)
}
