export interface ApiErrorMessage {
  fieldName: string
  errorMessage: string
}

export interface ApiErrorBody {
  message: string
  fieldErrorDetails: Array<ApiErrorMessage>
}

export interface ApiError {
  body: ApiErrorBody
  response: Response
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface ApiResponse<T = any> {
  body: T
  response: Response
}
