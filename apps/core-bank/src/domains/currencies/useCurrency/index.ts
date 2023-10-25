import { queryClient, useMutation, useQuery } from 'ui'

import * as currenciesService from '../service'
import { CurrenciesCacheKeys } from '../consts'
import { CreateCurrencyRequestData, Currency } from '../types'

export const useCurrency = (currencyId?: Currency['id']) => {
  const getCurrency = useQuery({
    queryKey: [CurrenciesCacheKeys.Currencies, currencyId],
    queryFn: () => (currencyId ? currenciesService.getCurrency(currencyId) : undefined),
    enabled: !!currencyId,
  })

  const createCurrency = useMutation({
    mutationFn: (data: CreateCurrencyRequestData) => currenciesService.createCurrency(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [CurrenciesCacheKeys.Currencies],
      }),
  })

  const editCurrency = useMutation({
    mutationFn: (data: Currency) => currenciesService.editCurrency(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [CurrenciesCacheKeys.Currencies],
      }),
  })

  return {
    editCurrency,
    getCurrency,
    createCurrency,
  }
}
