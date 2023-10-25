import * as jobTypesApi from '../api'
import { apiClientService } from '../../../services/apiClient'
import { createJobTypeRequestMock, getJobTypesResponseMock } from './mock'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('getBankUnitTemplate', () => {
  it('should use apiClientService get method with no data', async () => {
    await jobTypesApi.getJobTypeTemplate()

    expect(apiClientService.get).toBeCalled()
  })

  it('should use apiClientService get method with proper data', async () => {
    await jobTypesApi.getJobTypeTemplate('templateId123', { jobTypeId: 'jobTypeId123' })

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('templateId123'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('jobTypeId'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('jobTypeId123'))
  })
})

describe('createJobType', () => {
  it('should use apiClientService post method with proper data', async () => {
    await jobTypesApi.createJobType(createJobTypeRequestMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(createJobTypeRequestMock) })
    )
  })
})

describe('getJobTypes', () => {
  it('should use apiClientService get method', async () => {
    await jobTypesApi.getJobTypes(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getJobTypesBasicInfo', () => {
  it('should use apiClientService get method', async () => {
    await jobTypesApi.getJobTypesBasicInfo()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getPermissionsTreeOptions', () => {
  it('should use apiClientService get method', async () => {
    await jobTypesApi.getPermissionsTreeOptions(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getJobType', () => {
  it('should use apiClientService get method', async () => {
    await jobTypesApi.getJobType('100')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('100'))
  })
})

describe('editJobType', () => {
  it('should use apiClientService put method with proper data', async () => {
    await jobTypesApi.editJobType({
      ...getJobTypesResponseMock.data[0],
      notes: 'updated notes 7878',
    })

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(getJobTypesResponseMock.data[0].id),
      {
        body: {
          ...getJobTypesResponseMock.data[0],
          notes: 'updated notes 7878',
        },
      }
    )
  })
})

describe('getAllPermissionsTreeOptions', () => {
  it('should use apiClientService get method', async () => {
    await jobTypesApi.getAllPermissionsTreeOptions()

    expect(apiClientService.get).toBeCalled()
  })
})
