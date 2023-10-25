import { StringifiableRecord, queryString } from 'utils'

import { apiClientService } from '@/services'

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
  GetUsersDataItem,
  GetUsersResponseData,
  OTPResponseData,
  UserCustomPermission,
  UserJobType,
} from '../types'

export const getUserDetailsTemplate = (templateId = 'default', query?: StringifiableRecord) => {
  const url = `/identity-service/api/v1.0/users/templates/${templateId}`

  return apiClientService.get<GetUserDetailsTemplateResponseData>(
    queryString.stringifyUrl({
      url,
      query,
    })
  )
}

export const createUser = (data: CreateUserRequestData) =>
  apiClientService.post<CreateUserResponseData>('/identity-service/api/v1.0/users', {
    body: data,
  })

export const getUsers = (page: number, size: number) =>
  apiClientService.get<GetUsersResponseData>(
    queryString.stringifyUrl({
      url: '/identity-service/api/v1.0/users',
      query: {
        page,
        size,
      },
    })
  )

export const getUser = (id: string) =>
  apiClientService.get<GetUserResponseData>(`/identity-service/api/v1.0/users/${id}`)

export const editUserDetails = (data: EditUserRequestData) =>
  apiClientService.put<EditUserResponseData>(`/identity-service/api/v1.0/users/${data.id}`, {
    body: data,
  })

export const resetUserPassword = (userId: string) =>
  apiClientService.put<OTPResponseData>(`/identity-service/api/v1.0/users/reset-password/${userId}`)

export const approveUser = (userId: string) =>
  apiClientService.put<OTPResponseData>(`/identity-service/api/v1.0/users/approve/${userId}`)

export const inactivateUser = (userId: string) =>
  apiClientService.put<EditUserResponseData>(
    `/identity-service/api/v1.0/users/inactivate/${userId}`
  )

export const getUserJobTypes = (userId: string) =>
  apiClientService.get<GetUserJobTypesResponseData>(
    `/identity-service/api/v1.0/users/${userId}/job-types`
  )

export const createUserJobType = (userId: string, data: CreateUserJobTypeRequestData) =>
  apiClientService.post<UserJobType>(`/identity-service/api/v1.0/users/${userId}/job-types`, {
    body: data,
  })

export const editUserJobType = (userId: string, data: UserJobType) =>
  apiClientService.put<UserJobType>(
    `/identity-service/api/v1.0/users/${userId}/job-types/${data.id}`,
    {
      body: data,
    }
  )

export const getUserCustomPermissions = (userId: string) =>
  apiClientService.get<GetUserCustomPermissionsResponseData>(
    `/identity-service/api/v1.0/users/${userId}/custom-permissions`
  )

export const getPermissionsBasicInfo = () =>
  apiClientService.get<GetPermissionsBasicInfoResponseData>(
    '/identity-service/api/v1.0/permissions/basic-info'
  )

export const createUserCustomPermission = (
  userId: string,
  data: CreateUserCustomPermissionRequestData
) =>
  apiClientService.post<UserCustomPermission>(
    `/identity-service/api/v1.0/users/${userId}/custom-permissions`,
    {
      body: data,
    }
  )

export const editUserCustomPermission = (
  userId: string,
  data: EditUserCustomPermissionRequestData
) =>
  apiClientService.put<UserCustomPermission>(
    `/identity-service/api/v1.0/users/${userId}/custom-permissions/${data.id}`,
    {
      body: data,
    }
  )

export const getAllUsers = () => {
  return apiClientService.get<GetUsersDataItem[]>('/identity-service/api/v1.0/users/all')
}
