import { Paginated } from '@/types'

export enum CurrencyStatus {
  Active = 'ACTIVE',
  Inactive = 'INACTIVE',
}

export enum CurrencyUsageInBank {
  Cash = 'CASH_OPERATIONS',
  LegalTender = 'LEGAL_TENDER',
  NonCash = 'NON_CASH_OPERATIONS',
  Reference = 'REFERENCE_CURRENCY',
}

export interface Currency {
  id: string
  name: string
  alphabeticCode: string
  numericCode: number
  symbol: string
  numberOfDecimals: number
  status: CurrencyStatus
  usageInBank: CurrencyUsageInBank[]
}

export interface CreateCurrencyRequestData
  extends Pick<
      Currency,
      | 'name'
      | 'alphabeticCode'
      | 'numericCode'
      | 'symbol'
      | 'numberOfDecimals'
      | 'status'
      | 'usageInBank'
    >,
    Record<string, unknown> {}

export interface GetCurrenciesResponseData extends Paginated<Currency[]> {}
