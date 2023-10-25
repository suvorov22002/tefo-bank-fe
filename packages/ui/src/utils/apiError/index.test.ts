import { FormHelpers } from '../../components'
import { handleApiError } from './index'

const errorBodyMock = {
  message: 'test',
  fieldErrorDetails: [
    {
      fieldName: 'testField',
      errorMessage: 'testErrorMessage',
    },
  ],
}
const showMessageMock = jest.fn((message: string) => message)
const tMock = jest.fn((message: string) => message)
const helpersMock = {
  setFieldError: jest.fn(),
}

describe('handleApiError', () => {
  it('should show default error message if api error message is missing', () => {
    handleApiError({ message: '', fieldErrorDetails: [] }, showMessageMock, tMock)
    expect(showMessageMock).toBeCalledWith(tMock('common:notifications.error'))
  })

  it('should show api error message if it exists', () => {
    handleApiError(errorBodyMock, showMessageMock, tMock)
    expect(showMessageMock).toBeCalledWith(errorBodyMock.message)
  })

  it('should set field error if helpers were passed', () => {
    handleApiError(
      errorBodyMock,
      showMessageMock,
      tMock,
      helpersMock as unknown as FormHelpers<unknown>
    )
    expect(helpersMock.setFieldError).toBeCalledWith(
      errorBodyMock.fieldErrorDetails[0].fieldName,
      errorBodyMock.fieldErrorDetails[0].errorMessage
    )
  })
})
