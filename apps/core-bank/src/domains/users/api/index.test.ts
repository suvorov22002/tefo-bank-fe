import * as usersApi from '../api'
import { apiClientService } from '../../../services/apiClient'
import {
  createUserCustomPermissionRequestDataMock,
  createUserJobTypeRequestDataMock,
  createUserMock,
  getUserCustomPermissionsMock,
  getUserJobTypesResponseMock,
  getUserResponseMock,
} from './mocks'

jest.mock('../../../services/apiClient')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('createUser', () => {
  it('should use apiClientService post method with proper data', async () => {
    await usersApi.createUser(createUserMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.any(String),
      expect.objectContaining({ body: expect.objectContaining(createUserMock) })
    )
  })
})

describe('getUserDetailsTemplate', () => {
  it('should use apiClientService get method with no data', async () => {
    await usersApi.getUserDetailsTemplate()

    expect(apiClientService.get).toBeCalled()
  })

  it('should use apiClientService get method with proper data', async () => {
    await usersApi.getUserDetailsTemplate('templateId123', { param: 'p123' })

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('templateId123'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('param'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('p123'))
  })
})

describe('getUsers', () => {
  it('should use apiClientService get method', async () => {
    await usersApi.getUsers(1, 10)

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('page=1'))
    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('size=10'))
  })
})

describe('getAllUsers', () => {
  it('should use apiClientService get method', async () => {
    await usersApi.getAllUsers()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('getUser', () => {
  it('should use apiClientService get method', async () => {
    await usersApi.getUser('345345345')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('345345345'))
  })
})

describe('getUserJobTypes', () => {
  it('should use apiClientService get method', async () => {
    await usersApi.getUserJobTypes('1231234')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('1231234'))
  })
})

describe('getUserCustomPermissions', () => {
  it('should use apiClientService get method', async () => {
    await usersApi.getUserCustomPermissions('32323243')

    expect(apiClientService.get).toBeCalledWith(expect.stringContaining('32323243'))
  })
})

describe('createUserJobType', () => {
  it('should use apiClientService post method with proper data', async () => {
    await usersApi.createUserJobType('userId123', createUserJobTypeRequestDataMock)

    expect(apiClientService.post).toBeCalledWith(
      expect.stringContaining('userId123'),
      expect.objectContaining({ body: expect.objectContaining(createUserJobTypeRequestDataMock) })
    )
  })
})

describe('editUserJobType', () => {
  it('should use apiClientService put method with proper data', async () => {
    await usersApi.editUserJobType('userId123', getUserJobTypesResponseMock[0])

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining('userId123'),
      expect.objectContaining({ body: expect.objectContaining(getUserJobTypesResponseMock[0]) })
    )
  })
})

describe('editUserDetails', () => {
  it('should use apiClientService put method with proper data', async () => {
    await usersApi.editUserDetails(getUserResponseMock)

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining(getUserResponseMock.id),
      expect.objectContaining({ body: expect.objectContaining(getUserResponseMock) })
    )
  })
})

describe('getPermissionsBasicInfo', () => {
  it('should use apiClientService get method', async () => {
    await usersApi.getPermissionsBasicInfo()

    expect(apiClientService.get).toBeCalled()
  })
})

describe('createUserCustomPermission', () => {
  it('should use apiClientService post method with proper data', async () => {
    await usersApi.createUserCustomPermission(
      'userId123',
      createUserCustomPermissionRequestDataMock
    )

    expect(apiClientService.post).toBeCalledWith(
      expect.stringContaining('userId123'),
      expect.objectContaining({
        body: expect.objectContaining(createUserCustomPermissionRequestDataMock),
      })
    )
  })
})

describe('editUserCustomPermission', () => {
  it('should use apiClientService put method with proper data', async () => {
    await usersApi.editUserCustomPermission('userId123', getUserCustomPermissionsMock[0])

    expect(apiClientService.put).toBeCalledWith(
      expect.stringContaining('userId123'),
      expect.objectContaining({ body: expect.objectContaining(getUserCustomPermissionsMock[0]) })
    )
  })
})
