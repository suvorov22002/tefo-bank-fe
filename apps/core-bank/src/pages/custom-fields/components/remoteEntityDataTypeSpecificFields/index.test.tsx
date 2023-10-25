import { Form, FormikProps } from 'ui'
import { render, screen } from '@testing-library/react'

import { customFieldsMock } from '@/domains/customFields/api/mocks'
import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { getBankUnitsBasicInfoResponseMock } from '@/domains/bankUnits/api/mock'
import { getUsersResponseMock } from '@/domains/users/api/mocks'
import { i18nMock } from '@/_tests/mocks/i18n'

import { CustomFieldDetailsFormValues } from '../../types'
import { RemoteEntitySpecificFields } from './index'
import { useAllUsers } from '../../../../domains/users/useAllUsers'
import { useBankUnitsBasicInfo } from '../../../../domains/bankUnits/useBankUnitsBasicInfo'

jest.mock('next-i18next', () => i18nMock)
jest.mock('../../../../domains/bankUnits/useBankUnitsBasicInfo')
jest.mock('../../../../domains/users/useAllUsers')

const useAllUsersMock =
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useAllUsers as jest.MockedFunction<any>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useBankUnitsBasicInfoMock = useBankUnitsBasicInfo as jest.MockedFunction<any>

describe('RemoteEntitySpecificFields', () => {
  afterEach(() => {
    useAllUsersMock.mockReset()
    useBankUnitsBasicInfoMock.mockReset()
  })

  it('should show content', () => {
    useAllUsersMock.mockReturnValue({
      getAllUsers: {
        isLoading: false,
        data: getUsersResponseMock.data,
      },
    })

    useBankUnitsBasicInfoMock.mockReturnValue({
      getBankUnitsBasicInfo: {
        isLoading: false,
        data: getBankUnitsBasicInfoResponseMock,
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
            entity: null,
          },
        }}
      >
        {formProps => (
          <RemoteEntitySpecificFields
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
        name: 'properties.entity',
      })
    ).toBeInTheDocument()

    expect(
      screen.getByRole('combobox', {
        name: 'defaultValue.value',
      })
    )
  })

  it('should disable entity field on detailsView', () => {
    useAllUsersMock.mockReturnValue({
      getAllUsers: {
        isLoading: false,
        data: getUsersResponseMock.data,
      },
    })

    useBankUnitsBasicInfoMock.mockReturnValue({
      getBankUnitsBasicInfo: {
        isLoading: false,
        data: getBankUnitsBasicInfoResponseMock,
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
            entity: null,
          },
        }}
      >
        {formProps => (
          <RemoteEntitySpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={{
              ...customFieldsMock[0],
              properties: {
                url: 'test',
                keyField: 'test',
                valueField: 'test1',
                fields: ['test', 'test1'],
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
        name: 'properties.entity',
      })
    ).toBeDisabled()
  })

  it('should disable entity and defaultValue fields while isSubmitting is true', () => {
    useAllUsersMock.mockReturnValue({
      getAllUsers: {
        isLoading: false,
        data: getUsersResponseMock.data,
      },
    })

    useBankUnitsBasicInfoMock.mockReturnValue({
      getBankUnitsBasicInfo: {
        isLoading: false,
        data: getBankUnitsBasicInfoResponseMock,
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
            entity: null,
          },
        }}
      >
        {formProps => (
          <RemoteEntitySpecificFields
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
        name: 'properties.entity',
      })
    ).toBeDisabled()

    expect(
      screen.getByRole('combobox', {
        name: 'defaultValue.value',
      })
    ).toBeDisabled()
  })

  it('should disable defaultValue field on details view in view mode', () => {
    useAllUsersMock.mockReturnValue({
      getAllUsers: {
        isLoading: false,
        data: getUsersResponseMock.data,
      },
    })

    useBankUnitsBasicInfoMock.mockReturnValue({
      getBankUnitsBasicInfo: {
        isLoading: false,
        data: getBankUnitsBasicInfoResponseMock,
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
            entity: null,
          },
        }}
      >
        {formProps => (
          <RemoteEntitySpecificFields
            formProps={formProps as unknown as FormikProps<CustomFieldDetailsFormValues>}
            customField={{
              ...customFieldsMock[0],
              properties: {
                url: 'test',
                keyField: 'test',
                valueField: 'test1',
                fields: ['test', 'test1'],
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
