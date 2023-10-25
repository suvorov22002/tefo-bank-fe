import * as usersApi from '../api'
import * as usersService from './index'
import {
  createUserCustomPermissionRequestDataMock,
  createUserJobTypeRequestDataMock,
  createUserMock,
  getUserCustomPermissionsMock,
  getUserJobTypesResponseMock,
} from '../api/mocks'

jest.mock('../api', () => {
  return {
    getUserDetailsTemplate: jest.fn(() => Promise.resolve({})),
    createUser: jest.fn(() => Promise.resolve({})),
    getUsers: jest.fn(() => Promise.resolve({})),
    getUser: jest.fn(() => Promise.resolve({})),
    editUserDetails: jest.fn(() => Promise.resolve({})),
    resetUserPassword: jest.fn(() => Promise.resolve({})),
    getUserJobTypes: jest.fn(() => Promise.resolve({})),
    createUserJobType: jest.fn(() => Promise.resolve({})),
    editUserJobType: jest.fn(() => Promise.resolve({})),
    getUserCustomPermissions: jest.fn(() => Promise.resolve({})),
    getPermissionsBasicInfo: jest.fn(() => Promise.resolve({})),
    createUserCustomPermission: jest.fn(() => Promise.resolve({})),
    editUserCustomPermission: jest.fn(() => Promise.resolve({})),
    getAllUsers: jest.fn(() => Promise.resolve({})),
  }
})

describe('getUserDetailsTemplate', () => {
  it('should call usersApi getUserDetailsTemplate method without params', async () => {
    await usersService.getUserDetailsTemplate()

    expect(usersApi.getUserDetailsTemplate).toBeCalled()
  })

  it('should call usersApi getUserDetailsTemplate method with params', async () => {
    await usersService.getUserDetailsTemplate('templateId123', { userId: 'userId123' })

    expect(usersApi.getUserDetailsTemplate).toBeCalledWith('templateId123', {
      userId: 'userId123',
    })
  })
})

describe('createUser', () => {
  it('should call usersApi createUser method', async () => {
    await usersService.createUser(createUserMock)

    expect(usersApi.createUser).toBeCalledWith(createUserMock)
  })
})

describe('getUsers', () => {
  it('should call usersApi getUsers method', async () => {
    await usersService.getUsers(1, 10)

    expect(usersApi.getUsers).toBeCalledWith(1, 10)
  })
})

describe('getUser', () => {
  it('should call usersApi createUser method', async () => {
    await usersService.getUser('userId')

    expect(usersApi.getUser).toBeCalledWith('userId')
  })
})

describe('editJobType', () => {
  it('should call usersApi editJobType method', async () => {
    const updatedUserDetails = { ...createUserMock, id: 'test' }

    await usersService.editUserDetails(updatedUserDetails)

    expect(usersApi.editUserDetails).toBeCalledWith(updatedUserDetails)
  })
})

describe('resetUserPassword', () => {
  it('should call usersApi resetUserPassword method', async () => {
    await usersService.resetUserPassword('userId')

    expect(usersApi.resetUserPassword).toBeCalledWith('userId')
  })
})

describe('getUserJobTypes', () => {
  it('should call usersApi getUserJobTypes method', async () => {
    await usersService.getUserJobTypes('userId')

    expect(usersApi.getUserJobTypes).toBeCalledWith('userId')
  })
})

describe('createUserJobType', () => {
  it('should call usersApi createUserJobType method', async () => {
    await usersService.createUserJobType('userId123', createUserJobTypeRequestDataMock)

    expect(usersApi.createUserJobType).toBeCalledWith('userId123', createUserJobTypeRequestDataMock)
  })
})

describe('editUserJobType', () => {
  it('should call usersApi editUserJobType method', async () => {
    const data = getUserJobTypesResponseMock[0]

    await usersService.editUserJobType('userId1234567', data)

    expect(usersApi.editUserJobType).toBeCalledWith('userId1234567', data)
  })
})

describe('getUserCustomPermissions', () => {
  it('should call usersApi getUserCustomPermissions method', async () => {
    await usersService.getUserCustomPermissions('userId')

    expect(usersApi.getUserCustomPermissions).toBeCalledWith('userId')
  })
})

describe('getPermissionsBasicInfo', () => {
  it('should call usersApi getPermissionsBasicInfo method', async () => {
    await usersService.getPermissionsBasicInfo()

    expect(usersApi.getPermissionsBasicInfo).toBeCalled()
  })
})

describe('createUserCustomPermission', () => {
  it('should call usersApi createUserCustomPermission method', async () => {
    await usersService.createUserCustomPermission(
      'userId1759',
      createUserCustomPermissionRequestDataMock
    )

    expect(usersApi.createUserCustomPermission).toBeCalledWith(
      'userId1759',
      createUserCustomPermissionRequestDataMock
    )
  })
})

describe('editUserCustomPermission', () => {
  it('should call usersApi editUserCustomPermission method', async () => {
    const data = getUserCustomPermissionsMock[0]

    await usersService.editUserCustomPermission('userId136', data)

    expect(usersApi.editUserCustomPermission).toBeCalledWith('userId136', data)
  })
})

describe('getAllUsers', () => {
  it('should call usersApi getAllUsers method', async () => {
    await usersService.getAllUsers()

    expect(usersApi.getAllUsers).toBeCalled()
  })
})
