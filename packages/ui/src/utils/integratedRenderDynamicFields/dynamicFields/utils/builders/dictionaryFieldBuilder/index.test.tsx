import { act, render, screen, waitFor } from '@testing-library/react'

import { DictionaryFieldDataWrapper, dictionaryFieldBuilder } from './index'
import {
  DynamicDictionaryFieldProps,
  DynamicField,
  DynamicFieldApiClient,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
} from '../../../../types'

jest.mock('../../../../../../components', () => ({
  SelectField: jest.fn(() => <div data-testid="selectField" />),
}))

const apiClientMock: DynamicFieldApiClient = {
  get: jest.fn(() => Promise.resolve({ body: [], response: {} })),
} as unknown as DynamicFieldApiClient

describe('dictionaryFieldBuilder', () => {
  const dynamicDictionaryFieldMock: DynamicField<DynamicDictionaryFieldProps> = {
    id: 'f1',
    fieldName: 'f1_',
    entityName: DynamicFieldEntities.Bank,
    hiddenOnCreate: false,
    status: DynamicFieldStatuses.Active,
    entityLevel: null,
    independent: true,
    required: true,
    defaultValue: {},
    code: 'name',
    type: DynamicFieldTypes.Dictionary,
    label: 'label',
    properties: {
      url: 'testDataUrl',
    },
    order: 0,
    validation: {
      rules: [],
    },
    groupCode: null,
    placeholder: null,
    helpText: null,
    tooltip: null,
  }

  it('should return enumerationFieldDataWrapper component', () => {
    expect(dictionaryFieldBuilder(dynamicDictionaryFieldMock, apiClientMock).Component).toBe(
      DictionaryFieldDataWrapper
    )
  })
})

describe('EnumerationFieldDataWrapper', () => {
  it('should render SelectField component', async () => {
    act(() => {
      render(
        <DictionaryFieldDataWrapper
          name="testName"
          apiClient={apiClientMock}
          dataUrl="testDataUrl"
        />
      )
    })

    await waitFor(() => {
      expect(screen.getByTestId('selectField')).toBeInTheDocument()
    })
  })

  it('should query data', async () => {
    act(() => {
      render(
        <DictionaryFieldDataWrapper
          name="testName"
          apiClient={apiClientMock}
          dataUrl="testDataUrl"
        />
      )
    })

    await waitFor(() => {
      expect(apiClientMock.get).toBeCalledWith('testDataUrl')
    })
  })
})
