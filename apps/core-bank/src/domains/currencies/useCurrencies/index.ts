import { useQuery } from 'ui'

import * as currenciesService from '../service'
import { CurrenciesCacheKeys } from '../consts'

export const useCurrencies = ({ page, limit }: { page: number; limit: number }) => {
  const getCurrencies = useQuery({
    queryKey: [CurrenciesCacheKeys.Currencies, page, limit],
    queryFn: () => currenciesService.getCurrencies(page, limit),
  })

  return {
    getCurrencies,
  }
}
