import { act, render, screen, waitFor } from '@testing-library/react'

import {
  DynamicField,
  DynamicFieldApiClient,
  DynamicFieldEntities,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  DynamicReferenceFieldProps,
} from '../../../../types'
import { ReferenceFieldDataWrapper, referenceFieldBuilder } from './index'

jest.mock('../../../../../../components', () => ({
  SelectField: jest.fn(() => <div data-testid="selectField" />),
}))

const apiClientMock: DynamicFieldApiClient = {
  get: jest.fn(() => Promise.resolve({ body: [], response: {} })),
} as unknown as DynamicFieldApiClient

const dynamicReferenceFieldMock: DynamicField<DynamicReferenceFieldProps> = {
  id: 'f1',
  fieldName: 'f1_',
  entityName: DynamicFieldEntities.Bank,
  hiddenOnCreate: false,
  entityLevel: null,
  independent: true,
  required: true,
  status: DynamicFieldStatuses.Active,
  defaultValue: {},
  code: 'name',
  type: DynamicFieldTypes.EmbeddedEntity,
  label: 'label',
  properties: {
    url: 'testDataUrl',
    valueField: 'testValueField',
    keyField: 'testKeyField',
    fields: ['testValueField', 'testKeyField'],
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

describe('referenceFieldBuilder', () => {
  it('should return ReferenceFieldDataWrapper component', () => {
    expect(referenceFieldBuilder(dynamicReferenceFieldMock, apiClientMock).Component).toBe(
      ReferenceFieldDataWrapper
    )
  })
})

describe('ReferenceFieldDataWrapper', () => {
  it('should render SelectField component', async () => {
    act(() => {
      render(
        <ReferenceFieldDataWrapper
          name="referenceFiled"
          apiClient={apiClientMock}
          properties={{
            url: 'testDataUrl',
            valueField: 'testValueField',
            keyField: 'testKeyField',
            fields: ['testValueField', 'testKeyField'],
          }}
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
        <ReferenceFieldDataWrapper
          name="testName"
          apiClient={apiClientMock}
          properties={{
            url: 'testDataUrl',
            valueField: 'testValueField',
            keyField: 'testKeyField',
            fields: ['testValueField', 'testKeyField'],
          }}
        />
      )
    })

    await waitFor(() => {
      expect(apiClientMock.get).toBeCalledWith('testDataUrl')
    })
  })
})
