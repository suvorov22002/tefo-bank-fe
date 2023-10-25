import { FormHelpers } from '../../components'

interface ApiErrorMessage {
  fieldName: string
  errorMessage: string
}

interface ApiErrorBody {
  message: string
  fieldErrorDetails: Array<ApiErrorMessage>
}

export const handleApiError = <T>(
  e: ApiErrorBody,
  showMessage: (message: string) => void,
  t: (message: string) => string,
  helpers?: FormHelpers<T>
) => {
  if (helpers && e.fieldErrorDetails && e.fieldErrorDetails.length) {
    const fieldError = e.fieldErrorDetails[0]

    helpers.setFieldError(fieldError.fieldName, fieldError.errorMessage)
  }

  showMessage(e.message || t('common:notifications.error'))
}
