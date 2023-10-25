import * as jobTypesApi from '../api'
import * as jobTypesService from '../service'
import { createJobTypeRequestMock, getJobTypesResponseMock } from '../api/mock'

jest.mock('../api', () => ({
  getJobTypeTemplate: jest.fn(() => Promise.resolve({})),
  createJobType: jest.fn(() => Promise.resolve({})),
  getJobTypes: jest.fn(() => Promise.resolve({})),
  getJobTypesBasicInfo: jest.fn(() => Promise.resolve({})),
  getJobType: jest.fn(() => Promise.resolve({})),
  editJobType: jest.fn(() => Promise.resolve({})),
  getPermissionsTreeOptions: jest.fn(() => Promise.resolve({})),
  getAllPermissionsTreeOptions: jest.fn(() => Promise.resolve({})),
}))

describe('getJobTypes', () => {
  it('should call jobTypesApi getJobTypes method', async () => {
    jobTypesService.getJobTypes(1, 10)

    expect(jobTypesApi.getJobTypes).toBeCalledTimes(1)
    expect(jobTypesApi.getJobTypes).toBeCalledWith(1, 10)
  })
})

describe('getJobTypesBasicInfo', () => {
  it('should call jobTypesApi getJobTypesBasicInfo method', async () => {
    jobTypesService.getJobTypesBasicInfo()

    expect(jobTypesApi.getJobTypes).toBeCalled()
  })
})

describe('getJobTypeTemplate', () => {
  it('should call jobTypesApi getJobTypeTemplate method', async () => {
    await jobTypesService.getJobTypeTemplate('t1')

    expect(jobTypesApi.getJobTypeTemplate).toBeCalledWith('t1', undefined)
  })
})

describe('createJobType', () => {
  it('should call jobTypesApi createJobType method', async () => {
    await jobTypesService.createJobType(createJobTypeRequestMock)

    expect(jobTypesApi.createJobType).toBeCalledWith(createJobTypeRequestMock)
  })
})

describe('getJobType', () => {
  it('should call jobTypesApi getJobType method', async () => {
    await jobTypesService.getJobType('1')

    expect(jobTypesApi.getJobType).toBeCalledWith('1')
  })
})

describe('editJobType', () => {
  it('should call jobTypesApi editJobType method', async () => {
    await jobTypesService.editJobType(getJobTypesResponseMock.data[0])

    expect(jobTypesApi.editJobType).toBeCalledWith(getJobTypesResponseMock.data[0])
  })
})

describe('getPermissionsTreeOptions', () => {
  it('should call jobTypesApi getPermissionsTreeOptions method', async () => {
    jobTypesService.getPermissionsTreeOptions(1, 10)

    expect(jobTypesApi.getPermissionsTreeOptions).toBeCalledTimes(1)
    expect(jobTypesApi.getPermissionsTreeOptions).toBeCalledWith(1, 10)
  })
})

describe('getAllPermissionsTreeOptions', () => {
  it('should call jobTypesApi getAllPermissionsTreeOptions method', async () => {
    jobTypesService.getAllPermissionsTreeOptions()

    expect(jobTypesApi.getAllPermissionsTreeOptions).toBeCalled()
  })
})
