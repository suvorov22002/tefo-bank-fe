import { useUnsavedChangesWarning } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'
import { i18nMock } from '@/_tests/mocks/i18n'

import CreateUserDictionary from './index.page'

import { useUserDictionary } from '../../../domains/dictionaries/useUserDictionary'

jest.mock('next-i18next', () => i18nMock)
jest.mock('next/router', () => require('next-router-mock'))
jest.mock('../../../domains/dictionaries/useUserDictionary')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
  useUnsavedChangesWarning: jest.fn(),
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useUserDictionaryMock = useUserDictionary as jest.MockedFunction<any>

describe('Create user dictionary page', () => {
  afterEach(() => {
    useUserDictionaryMock.mockReset()
  })

  it('should show page content', () => {
    useUserDictionaryMock.mockReturnValue({
      createUserDictionaryAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateUserDictionary />)

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.getByText('dictionaries-create:title')).toBeInTheDocument()
    expect(screen.getByText('dictionaries-create:subtitle')).toBeInTheDocument()
    expect(screen.getByRole('form')).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: 'code',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('combobox', {
        name: 'status',
      })
    ).toBeInTheDocument()
    expect(
      screen.getByRole('textbox', {
        name: 'name',
      })
    )
  })

  it('should handle success submit of the form', async () => {
    useUserDictionaryMock.mockReturnValue({
      createUserDictionaryAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.resolve()),
      },
    })

    render(<CreateUserDictionary />, { wrapper: getAppWrapper() })

    const codeInput = screen.getByRole('textbox', { name: 'code' })
    const nameInput = screen.getByRole('textbox', {
      name: 'name',
    })
    const statusSelect = screen.getByRole('combobox', {
      name: 'status',
    })

    const createUserDictionaryButton = screen.getByRole('button', {
      name: 'dictionaries-create:buttons.createDataDictionary',
    })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'test Dictionary name',
        },
      })

      fireEvent.change(codeInput, {
        target: {
          value: 'testCode',
        },
      })

      fireEvent.mouseDown(statusSelect)

      fireEvent.click(
        screen.getByText('dictionaries-create:createDictionaryForm.statusOptions.active')
      )

      fireEvent.click(createUserDictionaryButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.success')).toBeInTheDocument()
    })
  })

  it('should handle failed submit of the form', async () => {
    useUserDictionaryMock.mockReturnValue({
      createUserDictionaryAction: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) =>
          Promise.reject({
            body: {
              message: '',
            },
          })
        ),
      },
    })

    render(<CreateUserDictionary />, { wrapper: getAppWrapper() })

    const codeInput = screen.getByRole('textbox', { name: 'code' })
    const nameInput = screen.getByRole('textbox', {
      name: 'name',
    })
    const statusSelect = screen.getByRole('combobox', {
      name: 'status',
    })

    const createUserDictionaryButton = screen.getByRole('button', {
      name: 'dictionaries-create:buttons.createDataDictionary',
    })

    act(() => {
      fireEvent.change(nameInput, {
        target: {
          value: 'test Dictionary name',
        },
      })

      fireEvent.change(codeInput, {
        target: {
          value: 'testCode',
        },
      })

      fireEvent.mouseDown(statusSelect)

      fireEvent.click(
        screen.getByText('dictionaries-create:createDictionaryForm.statusOptions.active')
      )

      fireEvent.click(createUserDictionaryButton)
    })

    await waitFor(() => {
      expect(screen.queryByText('common:notifications.error')).toBeInTheDocument()
      expect(codeInput).toHaveValue('testCode')
      expect(createUserDictionaryButton).toBeInTheDocument()
      expect(createUserDictionaryButton).not.toBeDisabled()
    })
  })

  it('should have unsaved changes handling', async () => {
    useUserDictionaryMock.mockReturnValue({
      createUserDictionary: {
        isLoading: false,
        mutateAsync: jest.fn((_data: Record<string, unknown>) => Promise.reject()),
      },
    })

    render(<CreateUserDictionary />, { wrapper: getAppWrapper() })

    expect(useUnsavedChangesWarning).toBeCalled()
  })
})
