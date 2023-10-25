import { CurrencyStatus } from '@/domains/currencies'
import { TFunction } from '@/i18n'

export const getCurrencyStatusOptions = (t: TFunction) => [
  {
    label: t('currencies:currenciesTable.currencyStatuses.active'),
    value: CurrencyStatus.Active,
  },
  {
    label: t('currencies:currenciesTable.currencyStatuses.inactive'),
    value: CurrencyStatus.Inactive,
  },
]
