import { ReactElement } from 'react'
import { render } from '@testing-library/react'
import { FormikProps, INTEGRATED_RenderDynamicFields } from 'ui'

import { CreateCustomFieldFormValues } from '../../types'
import { getDataTypeSpecificFields } from '.'
import {
  BooleanDataTypeSpecificFields,
  DateDataTypeSpecificFields,
  DecimalDataTypeSpecificFields,
  DecimalPercentDataTypeSpecificFields,
  DictionaryDataTypeSpecificFields,
  IntegerDataTypeSpecificField,
  IntegerPercentDataTypeSpecificFields,
  ListDataTypeSpecificFields,
  RemoteEntitySpecificFields,
  TextDataTypeSpecificFields,
} from '../../components'

jest.mock('../../components', () => ({
  BooleanDataTypeSpecificFields: jest.fn(),
  DateDataTypeSpecificFields: jest.fn(),
  DecimalDataTypeSpecificFields: jest.fn(),
  DecimalPercentDataTypeSpecificFields: jest.fn(),
  DictionaryDataTypeSpecificFields: jest.fn(),
  IntegerDataTypeSpecificField: jest.fn(),
  IntegerPercentDataTypeSpecificFields: jest.fn(),
  ListDataTypeSpecificFields: jest.fn(),
  RemoteEntitySpecificFields: jest.fn(),
  TextDataTypeSpecificFields: jest.fn(),
}))

describe('getDataTypeSpecificFields', () => {
  it('should call BooleanDataTypeSpecificFields when data type is Boolean', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Boolean,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(BooleanDataTypeSpecificFields).toBeCalled()
  })

  it('should call DateDataTypeSpecificFields when data type is Date', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(DateDataTypeSpecificFields).toBeCalled()
  })

  it('should call DecimalDataTypeSpecificFields when data type is Decimal', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Decimal,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(DecimalDataTypeSpecificFields).toBeCalled()
  })

  it('should call DecimalPercentDataTypeSpecificFields when data type is DecimalPercent', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DecimalPercent,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(DecimalPercentDataTypeSpecificFields).toBeCalled()
  })

  it('should call DictionaryDataTypeSpecificFields when data type is Dictionary', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Dictionary,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(DictionaryDataTypeSpecificFields).toBeCalled()
  })

  it('should call IntegerDataTypeSpecificField when data type is Integer', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Integer,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(IntegerDataTypeSpecificField).toBeCalled()
  })

  it('should call IntegerPercentDataTypeSpecificFields when data type is IntegerPercent', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.IntegerPercent,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(IntegerPercentDataTypeSpecificFields).toBeCalled()
  })

  it('should call ListDataTypeSpecificFields when data type is List', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(ListDataTypeSpecificFields).toBeCalled()
  })

  it('should call RemoteEntitySpecificFields when data type is RemoteEntity', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.RemoteEntity,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(RemoteEntitySpecificFields).toBeCalled()
  })

  it('should call TextDataTypeSpecificFields when data type is Text', () => {
    render(
      getDataTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
        {} as FormikProps<CreateCustomFieldFormValues>,
        undefined,
        undefined
      ) as ReactElement
    )

    expect(TextDataTypeSpecificFields).toBeCalled()
  })
})
