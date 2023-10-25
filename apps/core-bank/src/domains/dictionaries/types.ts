import { Paginated } from '@/types'

export enum DictionaryStatuses {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum DictionaryTypes {
  User = 'USER',
  System = 'SYSTEM',
}

export enum DictionaryValueStatuses {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum DictionaryCodeConsts {
  ThousandSeparator = '_thousandSeparator',
  ExchangeRateType = '_exchangeRateType',
  DecimalMark = '_decimalMark',
  InterfaceLanguage = '_interfaceLanguage',
  AccountingMethod = '_accountingMethod',
  AccountingSystemType = '_accountingSystemType',
  DateFormat = '_dateFormat',
  TimeZone = '_timeZone',
  TimeMode = '_timeMode',
  PageSize = '_pageSize',
  SymbolTypes = '_symbolTypes',
  InternalCodeFreeSegment = '_internalCodeFreeSegment',
  DocumentType = '_documentType',
  CustomerLegalForm = '_customerLegalForm',
  EconomicSector = '_economicSector',
  PeriodTerm = '_periodTerm',
}

export interface Dictionary {
  type: DictionaryTypes
  id: number
  name: string
  code: string
  status: DictionaryStatuses
}

interface GetDictionariesResponseData extends Paginated<Dictionary[]> {}

export interface GetSystemDictionariesResponseData extends GetDictionariesResponseData {}
export interface GetUserDictionariesResponseData extends GetDictionariesResponseData {}

export interface CreateUserDictionaryRequestData extends Omit<Dictionary, 'id' | 'type'> {}

export interface DictionaryValue extends Record<string, unknown> {
  id: string | number
  name: string
  code: string
  status: DictionaryValueStatuses
}

export interface GetDictionaryValuesResponseData extends Paginated<DictionaryValue[]> {}

export interface CreateDictionaryValueRequestData extends Omit<DictionaryValue, 'id'> {}

export interface EditDictionaryValueRequestData extends DictionaryValue {}
