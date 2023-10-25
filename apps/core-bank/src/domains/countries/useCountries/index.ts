import { useQuery } from 'ui'

import * as countriesService from '../service'
import { CountriesCacheKeys } from '../consts'

export const useCountries = ({ page, limit }: { page: number; limit: number }) => {
  const getCountries = useQuery({
    queryKey: [CountriesCacheKeys.Countries, page, limit],
    queryFn: () => countriesService.getCountries(page, limit),
  })

  return {
    getCountries,
  }
}
