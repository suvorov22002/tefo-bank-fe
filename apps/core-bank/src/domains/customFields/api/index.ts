import { INTEGRATED_RenderDynamicFields } from 'ui'
import { queryString } from 'utils'

import { apiClientService } from '@/services'

import {
  CreateCustomFieldGroupRequestData,
  CreateCustomFieldGroupResponseData,
  CreateCustomFieldRequestData,
  CreateCustomFieldResponseData,
  CreateCustomFieldValidationRuleRequestData,
  CreateCustomFieldValidationRuleResponseData,
  EditCustomFieldGroupRequestData,
  EditCustomFieldValidationRuleRequestData,
  EditCustomFieldValidationRuleResponseData,
  GetAllCustomFieldGroupsResponseData,
  GetCustomFieldGroupResponseData,
  GetCustomFieldGroupsResponseData,
  GetCustomFieldsResponseData,
} from '../types'

export const getBankProfileCustomFields = (page: number, size: number) => {
  const baseUrl = '/core-bank-settings/api/v1.0/bank-profile/custom-fields'

  return apiClientService.get<GetCustomFieldsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const getUserCustomFields = (page: number, size: number) => {
  const baseUrl = '/identity-service/api/v1.0/users/custom-fields'

  return apiClientService.get<GetCustomFieldsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const getUnitCustomFields = (page: number, size: number) => {
  const baseUrl = '/org-structure/api/v1.0/units/custom-fields'

  return apiClientService.get<GetCustomFieldsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const getCountryCustomFields = (page: number, size: number) => {
  const baseUrl = '/dictionary-service/api/v1/countries/custom-fields'

  return apiClientService.get<GetCustomFieldsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const createBankProfileCustomField = (data: CreateCustomFieldRequestData) => {
  return apiClientService.post<CreateCustomFieldResponseData>(
    '/core-bank-settings/api/v1.0/bank-profile/custom-fields',
    {
      body: data,
    }
  )
}

export const createUserCustomField = (data: CreateCustomFieldRequestData) => {
  return apiClientService.post<CreateCustomFieldResponseData>(
    '/identity-service/api/v1.0/users/custom-fields',
    {
      body: data,
    }
  )
}

export const createUnitCustomField = (data: CreateCustomFieldRequestData) => {
  return apiClientService.post<CreateCustomFieldResponseData>(
    '/org-structure/api/v1.0/units/custom-fields',
    {
      body: data,
    }
  )
}

export const createCountryCustomField = (data: CreateCustomFieldRequestData) => {
  return apiClientService.post<CreateCustomFieldResponseData>(
    '/dictionary-service/api/v1/countries/custom-fields',
    {
      body: data,
    }
  )
}

export const getBankProfileCustomField = (
  id: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-fields/${id}`
  )
}

export const getUserCustomField = (id: INTEGRATED_RenderDynamicFields.DynamicField['id']) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/identity-service/api/v1.0/users/custom-fields/${id}`
  )
}

export const getUnitCustomField = (id: INTEGRATED_RenderDynamicFields.DynamicField['id']) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/org-structure/api/v1.0/units/custom-fields/${id}`
  )
}

export const getCountryCustomField = (id: INTEGRATED_RenderDynamicFields.DynamicField['id']) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/dictionary-service/api/v1/countries/custom-fields/${id}`
  )
}

export const editBankProfileCustomField = (data: INTEGRATED_RenderDynamicFields.DynamicField) => {
  const { id, ...rest } = data

  return apiClientService.put<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-fields/${id}`,
    {
      body: rest,
    }
  )
}

export const editUserCustomField = (data: INTEGRATED_RenderDynamicFields.DynamicField) => {
  const { id, ...rest } = data

  return apiClientService.put<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/identity-service/api/v1.0/users/custom-fields/${id}`,
    {
      body: rest,
    }
  )
}

export const editUnitCustomField = (data: INTEGRATED_RenderDynamicFields.DynamicField) => {
  const { id, ...rest } = data

  return apiClientService.put<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/org-structure/api/v1.0/units/custom-fields/${id}`,
    {
      body: rest,
    }
  )
}

export const editCountryCustomField = (data: INTEGRATED_RenderDynamicFields.DynamicField) => {
  const { id, ...rest } = data

  return apiClientService.put<INTEGRATED_RenderDynamicFields.DynamicField>(
    `/dictionary-service/api/v1/countries/custom-fields/${id}`,
    {
      body: rest,
    }
  )
}

export const getBankProfileCustomFieldValidationRules = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.ValidationRule[]>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-fields/validation-rules/${customFieldId}`
  )
}

export const getUserCustomFieldValidationRules = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.ValidationRule[]>(
    `/identity-service/api/v1.0/users/custom-fields/validation-rules/${customFieldId}`
  )
}

export const getUnitCustomFieldValidationRules = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.ValidationRule[]>(
    `/org-structure/api/v1.0/units/custom-fields/validation-rules/${customFieldId}`
  )
}

export const getCountryCustomFieldValidationRules = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  return apiClientService.get<INTEGRATED_RenderDynamicFields.ValidationRule[]>(
    `/dictionary-service/api/v1/countries/custom-fields/validation-rules/${customFieldId}`
  )
}

export const createBankProfileCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: CreateCustomFieldValidationRuleRequestData
) => {
  return apiClientService.post<CreateCustomFieldValidationRuleResponseData>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-fields/validation-rules/${customFieldId}`,
    {
      body: data,
    }
  )
}

export const createUserCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: CreateCustomFieldValidationRuleRequestData
) => {
  return apiClientService.post<CreateCustomFieldValidationRuleResponseData>(
    `/identity-service/api/v1.0/users/custom-fields/validation-rules/${customFieldId}`,
    {
      body: data,
    }
  )
}

export const createUnitCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: CreateCustomFieldValidationRuleRequestData
) => {
  return apiClientService.post<CreateCustomFieldValidationRuleResponseData>(
    `/org-structure/api/v1.0/units/custom-fields/validation-rules/${customFieldId}`,
    {
      body: data,
    }
  )
}

export const createCountryCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: CreateCustomFieldValidationRuleRequestData
) => {
  return apiClientService.post<CreateCustomFieldValidationRuleResponseData>(
    `/dictionary-service/api/v1/countries/custom-fields/validation-rules/${customFieldId}`,
    {
      body: data,
    }
  )
}

export const editBankProfileCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: EditCustomFieldValidationRuleRequestData
) => {
  return apiClientService.put<EditCustomFieldValidationRuleResponseData>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-fields/validation-rules/${customFieldId}/${data.id}`,
    { body: data }
  )
}

export const editUserCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: EditCustomFieldValidationRuleRequestData
) => {
  return apiClientService.put<EditCustomFieldValidationRuleResponseData>(
    `/identity-service/api/v1.0/users/custom-fields/validation-rules/${customFieldId}/${data.id}`,
    { body: data }
  )
}

export const editUnitCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: EditCustomFieldValidationRuleRequestData
) => {
  return apiClientService.put<EditCustomFieldValidationRuleResponseData>(
    `/org-structure/api/v1.0/units/custom-fields/validation-rules/${customFieldId}/${data.id}`,
    { body: data }
  )
}

export const editCountryCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: EditCustomFieldValidationRuleRequestData
) => {
  return apiClientService.put<EditCustomFieldValidationRuleResponseData>(
    `/dictionary-service/api/v1/countries/custom-fields/validation-rules/${customFieldId}/${data.id}`,
    { body: data }
  )
}

export const deleteBankProfileCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
) => {
  return apiClientService.delete(
    `/core-bank-settings/api/v1.0/bank-profile/custom-fields/validation-rules/${customFieldId}/${validationRuleId}`
  )
}
export const deleteUserCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
) => {
  return apiClientService.delete(
    `/identity-service/api/v1.0/users/custom-fields/validation-rules/${customFieldId}/${validationRuleId}`
  )
}
export const deleteUnitCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
) => {
  return apiClientService.delete(
    `/org-structure/api/v1.0/units/custom-fields/validation-rules/${customFieldId}/${validationRuleId}`
  )
}
export const deleteCountryCustomFieldValidationRule = (
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
) => {
  return apiClientService.delete(
    `/dictionary-service/api/v1/countries/custom-fields/validation-rules/${customFieldId}/${validationRuleId}`
  )
}

export const getBankProfileCustomFieldGroups = (page: number, size: number) => {
  const baseUrl = '/core-bank-settings/api/v1.0/bank-profile/custom-groups'

  return apiClientService.get<GetCustomFieldGroupsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}
export const getUnitCustomFieldGroups = (page: number, size: number) => {
  const baseUrl = '/org-structure/api/v1.0/units/custom-groups'

  return apiClientService.get<GetCustomFieldGroupsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}
export const getUserCustomFieldGroups = (page: number, size: number) => {
  const baseUrl = '/identity-service/api/v1.0/users/custom-groups'

  return apiClientService.get<GetCustomFieldGroupsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const getCountryCustomFieldGroups = (page: number, size: number) => {
  const baseUrl = '/dictionary-service/api/v1/countries/custom-groups'

  return apiClientService.get<GetCustomFieldGroupsResponseData>(
    queryString.stringifyUrl({
      url: baseUrl,
      query: {
        page,
        size,
      },
    })
  )
}

export const createBankProfileCustomFieldGroup = (data: CreateCustomFieldGroupRequestData) => {
  return apiClientService.post<CreateCustomFieldGroupResponseData>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-groups`,
    {
      body: data,
    }
  )
}

export const createUserCustomFieldGroup = (data: CreateCustomFieldGroupRequestData) => {
  return apiClientService.post<CreateCustomFieldGroupResponseData>(
    `/identity-service/api/v1.0/users/custom-groups`,
    {
      body: data,
    }
  )
}

export const createUnitCustomFieldGroup = (data: CreateCustomFieldGroupRequestData) => {
  return apiClientService.post<CreateCustomFieldGroupResponseData>(
    `/org-structure/api/v1.0/units/custom-groups`,
    {
      body: data,
    }
  )
}

export const createCountryCustomFieldGroup = (data: CreateCustomFieldGroupRequestData) => {
  return apiClientService.post<CreateCustomFieldGroupResponseData>(
    `/dictionary-service/api/v1/countries/custom-groups`,
    {
      body: data,
    }
  )
}

export const getBankProfileCustomFieldGroup = (
  id: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
) => {
  return apiClientService.get<GetCustomFieldGroupResponseData>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-groups/${id}`
  )
}

export const getUnitCustomFieldGroup = (
  id: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
) => {
  return apiClientService.get<GetCustomFieldGroupResponseData>(
    `/org-structure/api/v1.0/units/custom-groups/${id}`
  )
}

export const getUserCustomFieldGroup = (
  id: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
) => {
  return apiClientService.get<GetCustomFieldGroupResponseData>(
    `/identity-service/api/v1.0/users/custom-groups/${id}`
  )
}

export const getCountryCustomFieldGroup = (
  id: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
) => {
  return apiClientService.get<GetCustomFieldGroupResponseData>(
    `/dictionary-service/api/v1/countries/custom-groups/${id}`
  )
}
export const editBankProfileCustomFieldGroup = (data: EditCustomFieldGroupRequestData) => {
  const { id, ...rest } = data

  return apiClientService.put<GetCustomFieldGroupResponseData>(
    `/core-bank-settings/api/v1.0/bank-profile/custom-groups/${id}`,
    {
      body: rest,
    }
  )
}

export const editUnitCustomFieldGroup = (data: EditCustomFieldGroupRequestData) => {
  const { id, ...rest } = data

  return apiClientService.put<GetCustomFieldGroupResponseData>(
    `/org-structure/api/v1.0/units/custom-groups/${id}`,
    {
      body: rest,
    }
  )
}

export const editUserCustomFieldGroup = (data: EditCustomFieldGroupRequestData) => {
  const { id, ...rest } = data

  return apiClientService.put<GetCustomFieldGroupResponseData>(
    `/identity-service/api/v1.0/users/custom-groups/${id}`,
    {
      body: rest,
    }
  )
}

export const editCountryCustomFieldGroup = (data: EditCustomFieldGroupRequestData) => {
  const { id, ...rest } = data

  return apiClientService.put<GetCustomFieldGroupResponseData>(
    `/dictionary-service/api/v1/countries/custom-groups/${id}`,
    {
      body: rest,
    }
  )
}

export const getCountryAllCustomFieldGroups = () => {
  return apiClientService.get<GetAllCustomFieldGroupsResponseData>(
    '/dictionary-service/api/v1/countries/custom-groups/all'
  )
}

export const getUnitAllCustomFieldGroups = () => {
  return apiClientService.get<GetAllCustomFieldGroupsResponseData>(
    '/org-structure/api/v1.0/units/custom-groups/all'
  )
}

export const getBankProfileAllCustomFieldGroups = () => {
  return apiClientService.get<GetAllCustomFieldGroupsResponseData>(
    '/core-bank-settings/api/v1.0/bank-profile/custom-groups/all'
  )
}

export const getUserAllCustomFieldGroups = () => {
  return apiClientService.get<GetAllCustomFieldGroupsResponseData>(
    '/identity-service/api/v1.0/users/custom-groups/all'
  )
}
