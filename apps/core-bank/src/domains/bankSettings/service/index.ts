import * as bankSettingsApi from '../api'
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

export const getBankSettingsGeneral = (): Promise<BankSettingsGeneral> =>
  bankSettingsApi.getBankSettingsGeneral().then(({ body }) => body)

export const editBankSettingsGeneral = (data: BankSettingsGeneral): Promise<BankSettingsGeneral> =>
  bankSettingsApi.editBankSettingsGeneral(data).then(({ body }) => body)

export const getBankSettingsTime = (): Promise<BankSettingsTime> =>
  bankSettingsApi.getBankSettingsTime().then(({ body }) => body)

export const editBankSettingsTime = (data: BankSettingsTime): Promise<BankSettingsTime> =>
  bankSettingsApi.editBankSettingsTime(data).then(({ body }) => body)

export const getBankSettingsClosures = (): Promise<BankSettingsClosures> =>
  bankSettingsApi.getBankSettingsClosures().then(({ body }) => body)

export const editBankSettingsClosures = (
  data: BankSettingsClosures
): Promise<BankSettingsClosures> =>
  bankSettingsApi.editBankSettingsClosures(data).then(({ body }) => body)

export const getBankSettingsAccounting = (): Promise<BankSettingsAccounting> =>
  bankSettingsApi.getBankSettingsAccounting().then(({ body }) => body)

export const editBankSettingsAccounting = (
  data: BankSettingsAccounting
): Promise<BankSettingsAccounting> =>
  bankSettingsApi.editBankSettingsAccounting(data).then(({ body }) => body)

export const getBankSettingsAccess = (): Promise<BankSettingsAccess> =>
  bankSettingsApi.getBankSettingsAccess().then(({ body }) => body)

export const editBankSettingsAccess = (data: BankSettingsAccess): Promise<BankSettingsAccess> =>
  bankSettingsApi.editBankSettingsAccess(data).then(({ body }) => body)

export const getAppSettings = (): Promise<AppSettingsResponseData> =>
  bankSettingsApi.getAppSettings().then(({ body }) => body)

export const getBankSettingsCustomers = (): Promise<BankSettingsCustomers> =>
  bankSettingsApi.getBankSettingsCustomers().then(({ body }) => body)

export const editBankSettingsCustomers = (
  data: BankSettingsCustomers
): Promise<BankSettingsCustomers> =>
  bankSettingsApi.editBankSettingsCustomers(data).then(({ body }) => body)

export const getBankSettingsTransactions = (): Promise<BankSettingsTransactions> =>
  bankSettingsApi.getBankSettingsTransactions().then(({ body }) => body)

export const editBankSettingsTransactions = (
  data: BankSettingsTransactions
): Promise<BankSettingsTransactions> =>
  bankSettingsApi.editBankSettingsTransactions(data).then(({ body }) => body)

export const getBankSettingsFXPosition = (): Promise<BankSettingsFXPosition> =>
  bankSettingsApi.getBankSettingsFXPosition().then(({ body }) => body)

export const editBankSettingsFXPosition = (
  data: BankSettingsFXPosition
): Promise<BankSettingsFXPosition> =>
  bankSettingsApi.editBankSettingsFXPosition(data).then(({ body }) => body)
