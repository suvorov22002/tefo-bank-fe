import { Form, FormikProps } from 'ui'
import { render, screen } from '@testing-library/react'

import { customFieldsMock } from '@/domains/customFields/api/mocks'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'
import { dictionariesMock, getDictionaryValuesMock } from '@/domains/dictionaries/api/mocks'

import { CustomFieldDetailsFormValues } from '../../types'
import { DictionaryDataTypeSpecificFields } from './index'
import { useAllDictionaries } from '../../../../domains/dictionaries/useAllDictionaries'
import { useAllDictionaryValuesByDictionaryCode } from '../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../../domains/dictionaries/useAllDictionaryValuesByDictionaryCode')
jest.mock('../../../../domains/dictionaries/useAllDictionaries')

const useAllDictionaryValuesByDictionaryCodeMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllDictionaryValuesByDictionaryCode as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAllDictionariesMock = useAllDictionaries as jest.MockedFunction<any>

describe('DictionaryDataTypeSpecificFields', () => {
  afterEach(() => {
    useAllDictionaryValuesByDictionaryCodeMock.mockReset()
  })

  it('should show content', () => {
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: getDictionaryValuesMock('1'),
      },
    })

    useAllDictionariesMock.mockReturnValue({
      getAllDictionaries: {
        isLoading: false,
        data: dictionariesMock.slice(0, 10),
      },
    })

    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
          properties: {
            dictionary: null,
          },
        }}
      >
        {formProps => (
          <DictionaryDataTypeSpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={undefined}
            isInEditMode={true}
          />
        )}
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('combobox', {
        name: 'properties.dictionary',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', {
        name: 'defaultValue.value',
      })
    )
  })

  it('should disable dictionary field on detailsView', () => {
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: getDictionaryValuesMock('1'),
      },
    })

    useAllDictionariesMock.mockReturnValue({
      getAllDictionaries: {
        isLoading: false,
        data: dictionariesMock.slice(0, 10),
      },
    })

    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
          properties: {
            dictionary: null,
          },
        }}
      >
        {formProps => (
          <DictionaryDataTypeSpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={{
              ...customFieldsMock[0],
              properties: {
                url: 'test',
              },
            }}
            isInEditMode={true}
          />
        )}
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('combobox', {
        name: 'properties.dictionary',
      })
    ).toBeDisabled()
  })

  it('should disable dictionary and defaultValue fields while isSubmitting is true', () => {
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: getDictionaryValuesMock('1'),
      },
    })

    useAllDictionariesMock.mockReturnValue({
      getAllDictionaries: {
        isLoading: false,
        data: dictionariesMock.slice(0, 10),
      },
    })

    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: null,
          properties: {
            dictionary: null,
          },
        }}
      >
        {formProps => (
          <DictionaryDataTypeSpecificFields
            formProps={
              {
                ...formProps,
                isSubmitting: true,
              } as unknown as FormikProps<CustomFieldDetailsFormValues>
            }
            customField={undefined}
            isInEditMode={true}
          />
        )}
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('combobox', {
        name: 'properties.dictionary',
      })
    ).toBeDisabled()

    expect(
      screen.getByRole('combobox', {
        name: 'defaultValue.value',
      })
    ).toBeDisabled()
  })

  it('should disable defaultValue field on details view in view mode', () => {
    useAllDictionaryValuesByDictionaryCodeMock.mockReturnValue({
      getAllDictionaryValuesByDictionaryCode: {
        isLoading: false,
        data: getDictionaryValuesMock('1'),
      },
    })

    useAllDictionariesMock.mockReturnValue({
      getAllDictionaries: {
        isLoading: false,
        data: dictionariesMock.slice(0, 10),
      },
    })

    render(
      <Form
        onSubmit={() => undefined}
        initialValues={{
          defaultValue: {
            value: null,
          },
          properties: {
            dictionary: null,
          },
        }}
      >
        {formProps => (
          <DictionaryDataTypeSpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={{
              ...customFieldsMock[0],
              properties: {
                url: 'test',
              },
            }}
            isInEditMode={false}
          />
        )}
      </Form>,
      { wrapper: getAppWrapper() }
    )

    expect(
      screen.getByRole('combobox', {
        name: 'defaultValue.value',
      })
    ).toBeDisabled()
  })
})
