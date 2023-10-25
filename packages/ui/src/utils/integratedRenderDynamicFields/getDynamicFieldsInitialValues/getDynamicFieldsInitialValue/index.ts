import { getValueByPath } from '../utils'
import { DynamicField, DynamicFieldTypes } from '../../types'

export const getDynamicFieldsInitialValue = (
  field: DynamicField,
  values?: Record<string, unknown>
) => {
  switch (field.type) {
    case DynamicFieldTypes.List: {
      const defaultValue = field.defaultValue?.value ?? null

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.Boolean: {
      const defaultValue = field.defaultValue?.value ?? false

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.Date: {
      const defaultValue = field.defaultValue?.value ? field.defaultValue.value : null

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.DateTime: {
      const defaultValue = field.defaultValue?.value ? field.defaultValue.value : null

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.Decimal: {
      const defaultValue = field.defaultValue?.value ?? ''

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.DecimalPercent: {
      const defaultValue = field.defaultValue?.value ?? ''

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.Dictionary: {
      const defaultValue = field.defaultValue?.value ?? null

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.Integer: {
      const defaultValue = field.defaultValue?.value ?? ''

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.IntegerPercent: {
      const defaultValue = field.defaultValue?.value ?? ''

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.EmbeddedEntities:
    case DynamicFieldTypes.EmbeddedEntity:
    case DynamicFieldTypes.EmbeddedStructure:
    case DynamicFieldTypes.EmbeddedStructures:
    case DynamicFieldTypes.RemoteEntities:
    case DynamicFieldTypes.RemoteEntity: {
      const defaultValue = field.defaultValue?.value ?? null

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    case DynamicFieldTypes.Text: {
      const defaultValue = field.defaultValue?.value ?? ''

      if (values) {
        return Object.prototype.hasOwnProperty.call(values, field.code)
          ? getValueByPath(values, field.code)
          : defaultValue
      }

      return defaultValue
    }

    default:
      return ''
  }
}
