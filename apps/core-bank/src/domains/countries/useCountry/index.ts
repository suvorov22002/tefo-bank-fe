import { queryClient, useMutation, useQuery } from 'ui'

import * as countriesService from '../service'
import { CountriesCacheKeys } from '../consts'
import { Country, CreateCountryRequestData } from '../types'

export const useCountry = ({ countryId }: { countryId?: string }) => {
  const getCountry = useQuery({
    queryKey: [CountriesCacheKeys.Countries, countryId],
    queryFn: () => countriesService.getCountry(countryId as string),
    enabled: !!countryId,
  })

  const editCountry = useMutation({
    mutationFn: (data: Country) => countriesService.editCountry(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [CountriesCacheKeys.Countries],
      }),
  })

  const createCountry = useMutation({
    mutationFn: (data: CreateCountryRequestData) => countriesService.createCountry(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [CountriesCacheKeys.Countries],
      }),
  })

  return {
    getCountry,
    editCountry,
    createCountry,
  }
}
