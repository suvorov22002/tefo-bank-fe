import { Logger } from '../logger'
import { ApiError, ApiErrorBody, ApiResponse } from './types'
import { ContentTypeConsts, HeaderConsts } from './consts'

interface IEncodedObject {
  [key: string]: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface IApiConfig<T extends Record<string, unknown> = any> extends Omit<RequestInit, 'body'> {
  body?: T | RequestInit['body']
  type?: ContentTypeConsts
  skipBaseUrl?: true
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiMethod = <T = any>(path: string, config?: IApiConfig) => Promise<ApiResponse<T>>
type MethodType = 'get' | 'post' | 'put' | 'delete' | 'patch'

export interface ApiClient {
  get: ApiMethod
  post: ApiMethod
  put: ApiMethod
  delete: ApiMethod
  patch: ApiMethod
  setHeader(key: string, value: string): void
  deleteHeader(key: string): void
}

export class ApiClientService implements ApiClient {
  private static methods: MethodType[] = ['get', 'post', 'put', 'delete', 'patch']

  public get!: ApiMethod
  public post!: ApiMethod
  public put!: ApiMethod
  public delete!: ApiMethod
  public patch!: ApiMethod

  private headers: Headers = new Headers({
    [HeaderConsts.ContentType]: ContentTypeConsts.Json,
  })

  public constructor(
    private apiHost: string,
    private logger: Logger
  ) {
    ApiClientService.methods.forEach(this.createMethod)
  }

  public setHeader(key: string, value: string): void {
    this.headers.set(key, value)
  }

  public deleteHeader(key: string): void {
    this.headers.delete(key)
  }

  private createMethod = (method: MethodType) => {
    const newMethod: ApiMethod = async (path, config = {}) => {
      const { body, ...compatibleConfig } = config
      const requestConfig: RequestInit = { ...compatibleConfig, method }

      requestConfig.headers = this.prepareHeaders(config)

      if (body) {
        requestConfig.body = this.prepareBody(config)
      }

      const url = this.formatUrl(path, config)
      const response = await fetch(url, requestConfig)

      if (!response.ok) {
        const error = await this.prepareApiError(response)

        throw error
      }

      const apiResponse = await this.prepareApiResponse(response)

      return apiResponse
    }

    this[method] = newMethod
  }

  private prepareHeaders(config: IApiConfig): Headers {
    // Create current call headers from the default ones
    const currentHeaders = new Headers(this.headers)

    if (config.headers) {
      const providedHeaders = new Headers(config.headers)

      // Apply provided headers and in case override default ones
      for (const [key, value] of providedHeaders.entries()) {
        currentHeaders.set(key, value)
      }
    }

    if (config.type === ContentTypeConsts.Json) {
      currentHeaders.set(HeaderConsts.ContentType, ContentTypeConsts.Json)
    }

    if (config.type === ContentTypeConsts.Urlencoded) {
      currentHeaders.set(HeaderConsts.ContentType, ContentTypeConsts.Urlencoded)
    }

    // In case form data is passed, the content type header should be taken from it.
    // So we need to clear any content type taken from the default headers or from the passed ones.
    if (config.type === ContentTypeConsts.FormData && config.body instanceof FormData) {
      currentHeaders.delete(HeaderConsts.ContentType)
    }

    return currentHeaders
  }

  private prepareBody({ body, type }: IApiConfig): RequestInit['body'] {
    if (!body) {
      return null
    }

    if (this.isBodyCustomObj(body)) {
      if (type === ContentTypeConsts.Urlencoded) {
        const encoded = this.encodeBody(body)

        return new URLSearchParams(encoded).toString()
      } else {
        return JSON.stringify(body)
      }
    } else {
      return body
    }
  }

  private async prepareApiResponse(response: Response): Promise<ApiResponse> {
    this.logger.debug(`Preparing an API response: ${response}`)
    let body = {}

    try {
      body = await response.json()
    } catch (err: unknown) {
      this.logger.warn(err)
    }

    return { body, response }
  }

  private async prepareApiError(response: Response): Promise<ApiError> {
    this.logger.debug(`Preparing an API error: ${response}`)
    let body: ApiErrorBody = {} as ApiErrorBody

    try {
      body = await response.json()
    } catch (err: unknown) {
      this.logger.warn(err)
    }

    return { body, response }
  }

  private isBodyCustomObj(body: IApiConfig['body']): body is Record<string, string> {
    return (
      typeof body === 'object' &&
      !(body instanceof ArrayBuffer) &&
      !(body instanceof FormData) &&
      !(body instanceof URLSearchParams)
    )
  }

  private encodeBody(body: Record<string, string>): IEncodedObject {
    return Object.entries(body).reduce<IEncodedObject>((encoded, [key, value]) => {
      encoded[key] = encodeURIComponent(value)

      return encoded
    }, {})
  }

  private adjustPath = (path: string): string => (path[0] !== '/' ? `/${path}` : path)

  private formatUrl = (path: string, config: IApiConfig): string => {
    const adjustedPath = this.adjustPath(path)

    if (config.skipBaseUrl) {
      return adjustedPath
    }

    return this.apiHost + adjustedPath
  }
}
