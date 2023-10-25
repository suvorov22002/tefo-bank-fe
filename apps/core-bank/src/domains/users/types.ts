import { INTEGRATED_RenderDynamicFields } from 'ui'

import { Paginated } from '@/types'

export enum UserStatuses {
  New = 'NEW',
  Pending = 'PENDING',
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
  Locked = 'LOCKED',
  Blocked = 'BLOCKED',
}

export interface GetUserDetailsTemplateResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate {}

export interface CreateUserRequestData extends Record<string, unknown> {
  userName: string
  firstName: string
  lastName: string
  title: string
  email: string
  phoneCountryCode: string
  phoneNumber: string
  allowMultipleSessions: boolean
  allowDefaultPassword: boolean
  languageDictionaryValueId: number
  defaultUnitId: number
}

export interface CreateUserResponseData
  extends Omit<CreateUserRequestData, 'allowMultipleSessions' | 'allowDefaultPassword'>,
    Record<string, unknown> {
  id: string
}

export interface EditUserRequestData extends CreateUserRequestData, Record<string, unknown> {
  id: string
}

export interface EditUserResponseData extends EditUserRequestData, Record<string, unknown> {}

export interface UserJobType {
  id: string
  jobTypeId: string
  jobTypeName: string
  unitId: string
  unitName: string
  validFrom: string
  validTo: string | null
  isActive: boolean
  includeSubordinatedUnits: boolean
  permissions: string[]
  createdAt: string
  updatedAt: string | null
  updatedBy: string | null
}

export type GetUserJobTypesResponseData = UserJobType[]

export interface CreateUserJobTypeRequestData
  extends Pick<
    UserJobType,
    'jobTypeId' | 'unitId' | 'includeSubordinatedUnits' | 'validFrom' | 'validTo'
  > {}

export interface EditUserJobTypeRequestData extends UserJobType {}

export interface UserCustomPermission extends Record<string, unknown> {
  id: string
  permissionGroupId: string
  permissionGroupName: string
  permissionId: string
  permissionName: string
  unitId: string
  unitName: string
  includeSubordinatedUnits: boolean
  validFrom: string
  validTo: string | null
  isActive: boolean
  createdAt: string
  updatedAt: string | null
  updatedBy: string | null
}

export type GetUserCustomPermissionsResponseData = UserCustomPermission[]

export type GetPermissionsBasicInfoResponseData = Array<{
  id: string
  name: string
}>

export interface CreateUserCustomPermissionRequestData
  extends Pick<
    UserCustomPermission,
    'permissionId' | 'unitId' | 'includeSubordinatedUnits' | 'validFrom' | 'validTo'
  > {}

export interface EditUserCustomPermissionRequestData extends UserCustomPermission {}

export interface GetUsersDataItem extends Record<string, unknown> {
  id: string
  userName: string
  firstName: string
  lastName: string
  title: string
  email: string
  status: UserStatuses
  lastLoginDate: string
}

export interface GetUsersResponseData extends Paginated<GetUsersDataItem[]> {}

export interface GetUserResponseData extends CreateUserRequestData {
  id: string
}

export interface OTPResponseData {
  password: string
}
