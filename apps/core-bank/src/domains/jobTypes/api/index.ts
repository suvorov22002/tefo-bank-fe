import { StringifiableRecord, queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  CreateJobTypeRequestData,
  GetAllPermissionsTreeOptionsResponseData,
  GetJobTypeTemplateResponseData,
  GetJobTypesBasicInfoResponseData,
  GetJobTypesResponseData,
  GetPermissionsTreeOptionsResponseData,
  JobType,
} from '../types'

export const getJobTypeTemplate = (templateId = 'default', query?: StringifiableRecord) => {
  const url = `/identity-service/api/v1.0/job-types/templates/${templateId}`

  return apiClientService.get<GetJobTypeTemplateResponseData>(
    queryString.stringifyUrl({
      url,
      query,
    })
  )
}

export const getJobTypes = (page: number, size: number) =>
  apiClientService.get<GetJobTypesResponseData>(
    queryString.stringifyUrl({
      url: '/identity-service/api/v1.0/job-types',
      query: {
        page,
        size,
      },
    })
  )

export const getJobTypesBasicInfo = () =>
  apiClientService.get<GetJobTypesBasicInfoResponseData>(
    '/identity-service/api/v1.0/job-types/basic-info'
  )

export const getJobType = (id: string) =>
  apiClientService.get<JobType>(`/identity-service/api/v1.0/job-types/${id}`)

export const createJobType = (data: CreateJobTypeRequestData) =>
  apiClientService.post<JobType>('/identity-service/api/v1.0/job-types', {
    body: data,
  })

export const getPermissionsTreeOptions = (page: number, size: number) =>
  apiClientService.get<GetPermissionsTreeOptionsResponseData>(
    queryString.stringifyUrl({
      url: '/identity-service/api/v1.0/permission-groups',
      query: {
        page,
        size,
      },
    })
  )

export const editJobType = (data: JobType) =>
  apiClientService.put<JobType>(`/identity-service/api/v1.0/job-types/${data.id}`, {
    body: data,
  })

export const getAllPermissionsTreeOptions = () =>
  apiClientService.get<GetAllPermissionsTreeOptionsResponseData>(
    '/identity-service/api/v1.0/permission-groups/all'
  )
