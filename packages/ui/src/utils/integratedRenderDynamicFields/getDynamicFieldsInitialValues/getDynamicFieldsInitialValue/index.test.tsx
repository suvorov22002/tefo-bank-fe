import { getDynamicFieldsInitialValue } from '.'
import { DynamicField, DynamicFieldTypes } from '../../types'

describe('getDynamicFieldInitialValue', () => {
  describe('DynamicFieldTypes.Text', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      expect(
        getDynamicFieldsInitialValue({
          code: 'fieldCode',
          defaultValue: {
            value: 'string',
          },
          type: DynamicFieldTypes.Text,
        } as DynamicField)
      ).toBe('string')
    })

    it('should return empty string as a default value if there is no default value and no values are passed', () => {
      expect(
        getDynamicFieldsInitialValue({
          code: 'fieldCode',
          defaultValue: {
            value: null,
          },
          type: DynamicFieldTypes.Text,
        } as DynamicField)
      ).toBe('')
    })

    it('should return value from values if values are passed', () => {
      expect(
        getDynamicFieldsInitialValue(
          {
            code: 'fieldCode',
            defaultValue: {
              value: 'string',
            },
            type: DynamicFieldTypes.Text,
          } as DynamicField,
          {
            fieldCode: 'hello',
          }
        )
      ).toBe('hello')
    })
  })

  describe('DynamicFieldTypes.Boolean', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: true,
        },
        type: DynamicFieldTypes.Boolean,
      } as DynamicField)

      expect(result).toBe(true)
    })

    it('should return false as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.Boolean,
      } as DynamicField)

      expect(result).toBe(false)
    })

    it('should return value from values if values are passed', () => {
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: false,
          },
          type: DynamicFieldTypes.Boolean,
        } as DynamicField,
        {
          fieldCode: true,
        }
      )

      expect(result).toBe(true)
    })
  })

  describe('DynamicFieldTypes.Date', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = new Date()
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.Date,
      } as DynamicField)

      expect(result).toEqual(defaultValue)
    })

    it('should return null as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.Date,
      } as DynamicField)

      expect(result).toBeNull()
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = new Date()
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.Date,
        } as DynamicField,
        {
          fieldCode: new Date('2023-10-19'),
        }
      )

      expect(result).toEqual(new Date('2023-10-19'))
    })
  })

  describe('DynamicFieldTypes.DateTime', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = new Date('2023-10-19T12:00:00')
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.DateTime,
      } as DynamicField)

      expect(result).toEqual(defaultValue)
    })

    it('should return null as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.DateTime,
      } as DynamicField)

      expect(result).toBeNull()
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = new Date('2023-10-19T12:00:00')
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.DateTime,
        } as DynamicField,
        {
          fieldCode: new Date('2023-10-20T12:00:00'),
        }
      )

      expect(result).toEqual(new Date('2023-10-20T12:00:00'))
    })
  })

  describe('DynamicFieldTypes.Decimal', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = 42.5
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.Decimal,
      } as DynamicField)

      expect(result).toBe(defaultValue)
    })

    it('should return an empty string as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.Decimal,
      } as DynamicField)

      expect(result).toBe('')
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = 42.5
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.Decimal,
        } as DynamicField,
        {
          fieldCode: 99.9,
        }
      )

      expect(result).toBe(99.9)
    })
  })

  describe('DynamicFieldTypes.DecimalPercent', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = '50%'
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.DecimalPercent,
      } as DynamicField)

      expect(result).toBe(defaultValue)
    })

    it('should return an empty string as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.DecimalPercent,
      } as DynamicField)

      expect(result).toBe('')
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = '50%'
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.DecimalPercent,
        } as DynamicField,
        {
          fieldCode: '75%',
        }
      )

      expect(result).toBe('75%')
    })
  })

  describe('DynamicFieldTypes.Dictionary', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = { key: 'value' }
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.Dictionary,
      } as DynamicField)

      expect(result).toEqual(defaultValue)
    })

    it('should return null as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.Dictionary,
      } as DynamicField)

      expect(result).toBeNull()
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = { key: 'value' }
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.Dictionary,
        } as DynamicField,
        {
          fieldCode: { newKey: 'newValue' },
        }
      )

      expect(result).toEqual({ newKey: 'newValue' })
    })
  })

  describe('DynamicFieldTypes.Integer', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = 42
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.Integer,
      } as DynamicField)

      expect(result).toBe(defaultValue)
    })

    it('should return an empty string as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.Integer,
      } as DynamicField)

      expect(result).toBe('')
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = 42
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.Integer,
        } as DynamicField,
        {
          fieldCode: 99,
        }
      )

      expect(result).toBe(99)
    })
  })

  describe('DynamicFieldTypes.IntegerPercent', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = 50
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.IntegerPercent,
      } as DynamicField)

      expect(result).toBe(defaultValue)
    })

    it('should return an empty string as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.IntegerPercent,
      } as DynamicField)

      expect(result).toBe('')
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = 50
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.IntegerPercent,
        } as DynamicField,
        {
          fieldCode: 75,
        }
      )

      expect(result).toBe(75)
    })
  })

  describe('DynamicFieldTypes.RemoteEntity', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = { id: 1, name: 'Default Entity' }
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.RemoteEntity,
      } as DynamicField)

      expect(result).toEqual(defaultValue)
    })

    it('should return null as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.RemoteEntity,
      } as DynamicField)

      expect(result).toBeNull()
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = { id: 1, name: 'Default Entity' }
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.RemoteEntity,
        } as DynamicField,
        {
          fieldCode: { id: 2, name: 'New Entity' },
        }
      )

      expect(result).toEqual({ id: 2, name: 'New Entity' })
    })
  })

  describe('DynamicFieldTypes.Text', () => {
    it('should return default value if there is a default value and no values are passed', () => {
      const defaultValue = 'Default Text'
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: defaultValue,
        },
        type: DynamicFieldTypes.Text,
      } as DynamicField)

      expect(result).toBe(defaultValue)
    })

    it('should return an empty string as a default value if there is no default value and no values are passed', () => {
      const result = getDynamicFieldsInitialValue({
        code: 'fieldCode',
        defaultValue: {
          value: null,
        },
        type: DynamicFieldTypes.Text,
      } as DynamicField)

      expect(result).toBe('')
    })

    it('should return value from values if values are passed', () => {
      const defaultValue = 'Default Text'
      const result = getDynamicFieldsInitialValue(
        {
          code: 'fieldCode',
          defaultValue: {
            value: defaultValue,
          },
          type: DynamicFieldTypes.Text,
        } as DynamicField,
        {
          fieldCode: 'New Text',
        }
      )

      expect(result).toBe('New Text')
    })
  })

  describe('Default Case', () => {
    it('should return an empty string for unknown field type', () => {
      const unknownFieldType: DynamicField = {
        code: 'unknownCode',
        type: 'UnknownType' as DynamicFieldTypes,
      } as DynamicField
      const result = getDynamicFieldsInitialValue(unknownFieldType)

      expect(result).toBe('')
    })
  })
})
