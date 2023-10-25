import { ApiClientService } from './apiClient'
import { ContentTypeConsts, HeaderConsts } from './consts'

const mockLogger = {
  debug: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}

const mockRequestBody = { test: 'test data' }
const mockResponseBody = { data: 'test data' }

const mockFetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve(mockResponseBody),
  })
)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
;(global as any).fetch = mockFetch

const mockBaseUrl = 'http://example.com'
const mockRoute = '/test'
const mockFullUrl = 'http://example.com/test'

describe('ApiClientService', () => {
  let apiClientService: ApiClientService

  beforeEach(() => {
    apiClientService = new ApiClientService(mockBaseUrl, mockLogger)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should create a apiClientService instance', () => {
    expect(apiClientService).toBeInstanceOf(ApiClientService)
  })

  it('should set headers', () => {
    apiClientService.setHeader(HeaderConsts.ContentType, ContentTypeConsts.Json)
    expect(apiClientService['headers'].get(HeaderConsts.ContentType)).toBe(ContentTypeConsts.Json)
  })

  it('should delete headers', () => {
    apiClientService.deleteHeader(HeaderConsts.ContentType)
    expect(apiClientService['headers'].get(HeaderConsts.ContentType)).toBeNull()
  })

  it('should make a GET request', async () => {
    const response = await apiClientService.get(mockRoute)

    expect(mockFetch).toHaveBeenCalledWith(mockFullUrl, {
      headers: expect.any(Headers),
      method: 'get',
    })
    expect(response.body).toEqual(mockResponseBody)
  })

  it('should make a POST request', async () => {
    const response = await apiClientService.post(mockRoute, {
      body: mockRequestBody,
    })

    expect(mockFetch).toHaveBeenCalledWith(mockFullUrl, {
      headers: expect.any(Headers),
      method: 'post',
      body: JSON.stringify(mockRequestBody),
    })
    expect(response.body).toEqual(mockResponseBody)
  })

  it('should make a PUT request', async () => {
    const response = await apiClientService.put(mockRoute, {
      body: mockRequestBody,
    })

    expect(mockFetch).toHaveBeenCalledWith(mockFullUrl, {
      headers: expect.any(Headers),
      method: 'put',
      body: JSON.stringify(mockRequestBody),
    })
    expect(response.body).toEqual(mockResponseBody)
  })

  it('should make a DELETE request', async () => {
    const response = await apiClientService.delete(mockRoute)

    expect(mockFetch).toHaveBeenCalledWith(mockFullUrl, {
      headers: expect.any(Headers),
      method: 'delete',
    })
    expect(response.body).toEqual(mockResponseBody)
  })

  it('should make a PATCH request', async () => {
    const response = await apiClientService.patch(mockRoute, {
      body: mockRequestBody,
    })

    expect(mockFetch).toHaveBeenCalledWith(mockFullUrl, {
      headers: expect.any(Headers),
      method: 'patch',
      body: JSON.stringify(mockRequestBody),
    })
    expect(response.body).toEqual(mockResponseBody)
  })
})
