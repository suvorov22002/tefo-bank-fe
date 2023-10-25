import { INTEGRATED_RenderDynamicFields } from 'ui'

import * as customFieldsApi from '../api'
import {
  CreateCustomFieldGroupRequestData,
  CreateCustomFieldRequestData,
  CreateCustomFieldValidationRuleRequestData,
  EditCustomFieldGroupRequestData,
  EditCustomFieldValidationRuleRequestData,
} from '../types'

export const getCustomFields = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  page: number,
  limit: number
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.getBankProfileCustomFields(page, limit).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.getUserCustomFields(page, limit).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.getUnitCustomFields(page, limit).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.getCountryCustomFields(page, limit).then(({ body }) => body)
    default:
      return customFieldsApi.getBankProfileCustomFields(page, limit).then(({ body }) => body)
  }
}

export const createCustomField = (data: CreateCustomFieldRequestData) => {
  switch (data.entityName) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.createBankProfileCustomField(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.createUserCustomField(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.createUnitCustomField(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.createCountryCustomField(data).then(({ body }) => body)
    default:
      return customFieldsApi.createBankProfileCustomField(data).then(({ body }) => body)
  }
}

export const getCustomField = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  id: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.getBankProfileCustomField(id).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.getUnitCustomField(id).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.getUserCustomField(id).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.getCountryCustomField(id).then(({ body }) => body)
  }
}

export const editCustomField = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  data: INTEGRATED_RenderDynamicFields.DynamicField
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.editBankProfileCustomField(data).then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.editUnitCustomField(data).then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.editUserCustomField(data).then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.editCountryCustomField(data).then(({ body }) => body)

    default:
      return customFieldsApi.editBankProfileCustomField(data).then(({ body }) => body)
  }
}

export const getCustomFieldValidationRules = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id']
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi
        .getBankProfileCustomFieldValidationRules(customFieldId)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi
        .getUnitCustomFieldValidationRules(customFieldId)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi
        .getUserCustomFieldValidationRules(customFieldId)
        .then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi
        .getCountryCustomFieldValidationRules(customFieldId)
        .then(({ body }) => body)

    default:
      return customFieldsApi
        .getBankProfileCustomFieldValidationRules(customFieldId)
        .then(({ body }) => body)
  }
}

export const createCustomFieldValidationRule = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: CreateCustomFieldValidationRuleRequestData
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi
        .createBankProfileCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi
        .createUnitCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi
        .createUserCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi
        .createCountryCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)

    default:
      return customFieldsApi
        .createBankProfileCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)
  }
}

export const editCustomFieldValidationRule = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  data: EditCustomFieldValidationRuleRequestData
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi
        .editBankProfileCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi
        .editUnitCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi
        .editUserCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi
        .editCountryCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)

    default:
      return customFieldsApi
        .editBankProfileCustomFieldValidationRule(customFieldId, data)
        .then(({ body }) => body)
  }
}

export const deleteCustomFieldValidationRule = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi
        .deleteBankProfileCustomFieldValidationRule(customFieldId, validationRuleId)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi
        .deleteUnitCustomFieldValidationRule(customFieldId, validationRuleId)
        .then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi
        .deleteUserCustomFieldValidationRule(customFieldId, validationRuleId)
        .then(({ body }) => body)

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi
        .deleteCountryCustomFieldValidationRule(customFieldId, validationRuleId)
        .then(({ body }) => body)

    default:
      return customFieldsApi
        .deleteBankProfileCustomFieldValidationRule(customFieldId, validationRuleId)
        .then(({ body }) => body)
  }
}

export const getCustomFieldGroups = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  page: number,
  limit: number
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.getBankProfileCustomFieldGroups(page, limit).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.getUserCustomFieldGroups(page, limit).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.getUnitCustomFieldGroups(page, limit).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.getCountryCustomFieldGroups(page, limit).then(({ body }) => body)
    default:
      return customFieldsApi.getBankProfileCustomFieldGroups(page, limit).then(({ body }) => body)
  }
}

export const createCustomFieldGroup = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  data: CreateCustomFieldGroupRequestData
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.createBankProfileCustomFieldGroup(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.createUserCustomFieldGroup(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.createUnitCustomFieldGroup(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.createCountryCustomFieldGroup(data).then(({ body }) => body)
    default:
      return customFieldsApi.createBankProfileCustomFieldGroup(data).then(({ body }) => body)
  }
}

export const getCustomFieldGroup = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  id: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.getBankProfileCustomFieldGroup(id).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.getUserCustomFieldGroup(id).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.getUnitCustomFieldGroup(id).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.getCountryCustomFieldGroup(id).then(({ body }) => body)
    default:
      return customFieldsApi.getBankProfileCustomFieldGroup(id).then(({ body }) => body)
  }
}

export const editCustomFieldGroup = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  data: EditCustomFieldGroupRequestData
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.editBankProfileCustomFieldGroup(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.editUserCustomFieldGroup(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.editUnitCustomFieldGroup(data).then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.editCountryCustomFieldGroup(data).then(({ body }) => body)
    default:
      return customFieldsApi.editBankProfileCustomFieldGroup(data).then(({ body }) => body)
  }
}

export const getAllCustomFieldGroups = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities
) => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Bank:
      return customFieldsApi.getBankProfileAllCustomFieldGroups().then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Country:
      return customFieldsApi.getCountryAllCustomFieldGroups().then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return customFieldsApi.getUnitAllCustomFieldGroups().then(({ body }) => body)
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return customFieldsApi.getUserAllCustomFieldGroups().then(({ body }) => body)
    default:
      return customFieldsApi.getBankProfileAllCustomFieldGroups().then(({ body }) => body)
  }
}
