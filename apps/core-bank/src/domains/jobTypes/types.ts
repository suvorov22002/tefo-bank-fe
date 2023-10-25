import { INTEGRATED_RenderDynamicFields } from 'ui'

import { Paginated } from '@/types'

export enum JobTypeStatuses {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export interface PermissionsTreeOption {
  id: string
  label: string
  items?: PermissionsTreeOption[]
}

export interface JobType extends Record<string, unknown> {
  id: string
  name: string
  status: JobTypeStatuses
  notes: string
  units: number
  users: number
  permissions: string[]
}

export interface JobTypeBasicInfo extends Pick<JobType, 'id' | 'name'> {}

export type GetJobTypesBasicInfoResponseData = JobTypeBasicInfo[]

export interface GetJobTypeTemplateResponseData
  extends INTEGRATED_RenderDynamicFields.DynamicFieldsTemplate {}

export interface CreateJobTypeRequestData
  extends Pick<JobType, 'name' | 'status' | 'notes'>,
    Record<string, unknown> {
  permissions?: string[]
}

export interface GetJobTypesResponseData extends Paginated<JobType[]> {}

export interface GetPermissionsTreeOptionsResponseData extends Paginated<PermissionsTreeOption[]> {}

export type GetAllPermissionsTreeOptionsResponseData = PermissionsTreeOption[]
