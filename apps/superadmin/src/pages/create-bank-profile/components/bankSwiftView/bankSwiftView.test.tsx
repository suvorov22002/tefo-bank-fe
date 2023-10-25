import { Text } from 'ui'
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import { i18nMock } from '@/_tests/mocks/i18n'

import { BankSwiftFormValues } from '../../types'
import { BankSwiftView } from './index'

jest.mock('next-i18next', () => i18nMock)

describe('BankSwiftView', () => {
  const initialValues: BankSwiftFormValues = {
    codeGroup: '',
    swiftCode: '',
  }
  const mockFunctions = {} as {
    onSubmit: jest.Mock
  }

  beforeEach(() => {
    mockFunctions.onSubmit = jest.fn()
  })

  it('should render form', () => {
    const { container } = render(
      <BankSwiftView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />
    )

    expect(container.querySelector('form')).toBeInTheDocument()
  })

  it('should render step progress text', () => {
    render(
      <BankSwiftView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        stepProgressText={<Text>Step 1 of 4</Text>}
      />
    )

    expect(screen.getByText(/step 1 of 4/i)).toBeInTheDocument()
  })

  it('should render steps', () => {
    render(
      <BankSwiftView
        initialValues={initialValues}
        onSubmit={mockFunctions.onSubmit}
        renderSteps={() => <div data-testid="mockSteps" />}
      />
    )

    expect(screen.getByTestId('mockSteps')).toBeInTheDocument()
  })

  it('submit button should be disabled if form is invalid', async () => {
    render(<BankSwiftView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    const swiftCodeInput = document.querySelector('input[name="swiftCode"]')

    if (!swiftCodeInput) {
      throw new Error('Unable to find elements')
    }

    act(() => {
      fireEvent.change(swiftCodeInput, {
        target: {
          value: '@invalidSwiftCode',
        },
      })
    })

    await waitFor(() => {
      expect(screen.getByRole('button')).toBeDisabled()
    })
  })

  it('should handle onSubmit', async () => {
    render(<BankSwiftView initialValues={initialValues} onSubmit={mockFunctions.onSubmit} />)

    const swiftCodeInput = document.querySelector('input[name="swiftCode"]')

    const codeGroupInput = document.querySelector('input[name="codeGroup"]')

    if (!swiftCodeInput || !codeGroupInput) {
      throw new Error('Unable to find elements')
    }

    const continueButton = screen.getByRole('button')

    act(() => {
      fireEvent.change(swiftCodeInput, {
        target: {
          value: '23112321',
        },
      })

      fireEvent.change(codeGroupInput, {
        target: {
          value: '232131',
        },
      })

      fireEvent.click(continueButton)
    })

    await waitFor(() => {
      expect(mockFunctions.onSubmit).toBeCalledTimes(1)
      expect(mockFunctions.onSubmit).toBeCalledWith(
        {
          codeGroup: '232131',
          swiftCode: '23112321',
        },
        expect.any(Object)
      )
    })
  })
})
