import { StringifiableRecord } from 'utils'

import * as usersApi from '../api'
import {
  CreateUserCustomPermissionRequestData,
  CreateUserJobTypeRequestData,
  CreateUserRequestData,
  CreateUserResponseData,
  EditUserCustomPermissionRequestData,
  EditUserRequestData,
  EditUserResponseData,
  GetPermissionsBasicInfoResponseData,
  GetUserCustomPermissionsResponseData,
  GetUserDetailsTemplateResponseData,
  GetUserJobTypesResponseData,
  GetUserResponseData,
  GetUsersResponseData,
  OTPResponseData,
  UserCustomPermission,
  UserJobType,
} from '../types'

export const getUserDetailsTemplate = (
  templateId?: string,
  query?: StringifiableRecord
): Promise<GetUserDetailsTemplateResponseData> => {
  return usersApi.getUserDetailsTemplate(templateId, query).then(({ body }) => body)
}

export const createUser = (data: CreateUserRequestData): Promise<CreateUserResponseData> =>
  usersApi.createUser(data).then(({ body }) => body)

export const getUsers = (page: number, limit: number): Promise<GetUsersResponseData> =>
  usersApi.getUsers(page, limit).then(({ body }) => body)

export const getUser = (userId: string): Promise<GetUserResponseData> =>
  usersApi.getUser(userId).then(({ body }) => body)

export const editUserDetails = (data: EditUserRequestData): Promise<EditUserResponseData> =>
  usersApi.editUserDetails(data).then(({ body }) => body)

export const resetUserPassword = (userId: string): Promise<OTPResponseData> =>
  usersApi.resetUserPassword(userId).then(({ body }) => body)

export const approveUser = (userId: string): Promise<OTPResponseData> =>
  usersApi.approveUser(userId).then(({ body }) => body)

export const inactivateUser = (userId: string): Promise<EditUserResponseData> =>
  usersApi.inactivateUser(userId).then(({ body }) => body)

export const getUserJobTypes = (userId: string): Promise<GetUserJobTypesResponseData> =>
  usersApi.getUserJobTypes(userId).then(({ body }) => body)

export const createUserJobType = (
  userId: string,
  data: CreateUserJobTypeRequestData
): Promise<UserJobType> => usersApi.createUserJobType(userId, data).then(({ body }) => body)

export const editUserJobType = (userId: string, data: UserJobType): Promise<UserJobType> =>
  usersApi.editUserJobType(userId, data).then(({ body }) => body)

export const getPermissionsBasicInfo = (): Promise<GetPermissionsBasicInfoResponseData> =>
  usersApi.getPermissionsBasicInfo().then(({ body }) => body)

export const getUserCustomPermissions = (
  userId: string
): Promise<GetUserCustomPermissionsResponseData> =>
  usersApi.getUserCustomPermissions(userId).then(({ body }) => body)

export const createUserCustomPermission = (
  userId: string,
  data: CreateUserCustomPermissionRequestData
): Promise<UserCustomPermission> =>
  usersApi.createUserCustomPermission(userId, data).then(({ body }) => body)

export const editUserCustomPermission = (
  userId: string,
  data: EditUserCustomPermissionRequestData
): Promise<UserCustomPermission> =>
  usersApi.editUserCustomPermission(userId, data).then(({ body }) => body)

export const getAllUsers = () => usersApi.getAllUsers().then(({ body }) => body)
