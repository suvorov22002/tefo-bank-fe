import { apiClientService } from '@/services'

import {
  AppSettingsResponseData,
  BankSettingsAccess,
  BankSettingsAccounting,
  BankSettingsClosures,
  BankSettingsCustomers,
  BankSettingsFXPosition,
  BankSettingsGeneral,
  BankSettingsTime,
  BankSettingsTransactions,
} from '../types'

export const getBankSettingsGeneral = () =>
  apiClientService.get<BankSettingsGeneral>(
    '/core-bank-settings/api/v1.0/bank-settings/preferences'
  )

export const editBankSettingsGeneral = (data: BankSettingsGeneral) =>
  apiClientService.put<BankSettingsGeneral>(
    '/core-bank-settings/api/v1.0/bank-settings/preferences',
    { body: data }
  )

export const getBankSettingsTime = () =>
  apiClientService.get<BankSettingsTime>('/core-bank-settings/api/v1.0/bank-settings/time')

export const editBankSettingsTime = (data: BankSettingsTime) =>
  apiClientService.put<BankSettingsTime>('/core-bank-settings/api/v1.0/bank-settings/time', {
    body: data,
  })

export const getBankSettingsClosures = () =>
  apiClientService.get<BankSettingsClosures>('/core-bank-settings/api/v1.0/bank-settings/closure')

export const editBankSettingsClosures = (data: BankSettingsClosures) =>
  apiClientService.put<BankSettingsClosures>('/core-bank-settings/api/v1.0/bank-settings/closure', {
    body: data,
  })

export const getBankSettingsAccounting = () =>
  apiClientService.get<BankSettingsAccounting>(
    '/core-bank-settings/api/v1.0/bank-settings/accounting'
  )

export const editBankSettingsAccounting = (data: BankSettingsAccounting) =>
  apiClientService.put<BankSettingsAccounting>(
    '/core-bank-settings/api/v1.0/bank-settings/accounting',
    {
      body: data,
    }
  )

export const getBankSettingsAccess = () =>
  apiClientService.get<BankSettingsAccess>('/core-bank-settings/api/v1.0/bank-settings/access')

export const editBankSettingsAccess = (data: BankSettingsAccess) =>
  apiClientService.put<BankSettingsAccess>('/core-bank-settings/api/v1.0/bank-settings/access', {
    body: data,
  })

export const getAppSettings = () =>
  apiClientService.get<AppSettingsResponseData>('/core-bank-settings/api/v1.0/client-settings')

export const getBankSettingsCustomers = () =>
  apiClientService.get<BankSettingsCustomers>(
    '/core-bank-settings/api/v1.0/bank-settings/customers'
  )

export const editBankSettingsCustomers = (data: BankSettingsCustomers) =>
  apiClientService.put<BankSettingsCustomers>(
    '/core-bank-settings/api/v1.0/bank-settings/customers',
    {
      body: data,
    }
  )

export const getBankSettingsTransactions = () =>
  apiClientService.get<BankSettingsTransactions>(
    '/core-bank-settings/api/v1.0/bank-settings/transactions'
  )

export const editBankSettingsTransactions = (data: BankSettingsTransactions) =>
  apiClientService.put<BankSettingsTransactions>(
    '/core-bank-settings/api/v1.0/bank-settings/transactions',
    {
      body: data,
    }
  )

export const getBankSettingsFXPosition = () =>
  apiClientService.get<BankSettingsFXPosition>(
    '/core-bank-settings/api/v1.0/bank-settings/fx-position'
  )

export const editBankSettingsFXPosition = (data: BankSettingsFXPosition) =>
  apiClientService.put<BankSettingsFXPosition>(
    '/core-bank-settings/api/v1.0/bank-settings/fx-position',
    {
      body: data,
    }
  )
