import { useQuery } from 'ui'

import * as currencyService from '../service'
import { CurrenciesCacheKeys } from '../consts'

export const useAllCurrencies = () => {
  const getAllCurrencies = useQuery({
    queryKey: [CurrenciesCacheKeys.Currencies],
    queryFn: () => currencyService.getAllCurrencies(),
  })

  return {
    getAllCurrencies,
  }
}
