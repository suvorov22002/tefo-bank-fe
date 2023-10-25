import { StringifiableRecord } from 'utils'

import * as jobTypesApi from '../api'
import {
  CreateJobTypeRequestData,
  GetAllPermissionsTreeOptionsResponseData,
  GetJobTypeTemplateResponseData,
  GetJobTypesBasicInfoResponseData,
  GetJobTypesResponseData,
  GetPermissionsTreeOptionsResponseData,
  JobType,
} from '../types'

export const getJobTypes = (page: number, limit: number): Promise<GetJobTypesResponseData> =>
  jobTypesApi.getJobTypes(page, limit).then(({ body }) => body)

export const getJobTypesBasicInfo = (): Promise<GetJobTypesBasicInfoResponseData> =>
  jobTypesApi.getJobTypesBasicInfo().then(({ body }) => body)

export const getJobTypeTemplate = (
  templateId?: string,
  query?: StringifiableRecord
): Promise<GetJobTypeTemplateResponseData> =>
  jobTypesApi.getJobTypeTemplate(templateId, query).then(({ body }) => body)

export const createJobType = (data: CreateJobTypeRequestData): Promise<JobType> =>
  jobTypesApi.createJobType(data).then(({ body }) => body)

export const getJobType = (jobTypeId: string): Promise<JobType> =>
  jobTypesApi.getJobType(jobTypeId).then(({ body }) => body)

export const getPermissionsTreeOptions = (
  page: number,
  limit: number
): Promise<GetPermissionsTreeOptionsResponseData> =>
  jobTypesApi.getPermissionsTreeOptions(page, limit).then(({ body }) => body)

export const editJobType = (data: JobType): Promise<JobType> =>
  jobTypesApi.editJobType(data).then(({ body }) => body)

export const getAllPermissionsTreeOptions = (): Promise<GetAllPermissionsTreeOptionsResponseData> =>
  jobTypesApi.getAllPermissionsTreeOptions().then(({ body }) => body)
