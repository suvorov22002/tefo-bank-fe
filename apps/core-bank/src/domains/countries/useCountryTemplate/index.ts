import { StringifiableRecord } from 'utils'
import { useQuery } from 'ui'

import * as countriesService from '../service'
import { CountriesCacheKeys } from '../consts'

type CountryTemplateParams = { templateId?: string } & StringifiableRecord

export const useCountryTemplate = ({
  countryTemplateParams,
  shouldQueryCountryTemplate,
}: {
  countryTemplateParams?: CountryTemplateParams
  shouldQueryCountryTemplate?: boolean
}) => {
  const getCountryTemplate = useQuery({
    queryKey: [CountriesCacheKeys.CountryTemplate, countryTemplateParams],
    queryFn: () => {
      if (countryTemplateParams) {
        const { templateId, ...query } = countryTemplateParams

        return countriesService.getCountryTemplate(templateId, query)
      }

      return countriesService.getCountryTemplate()
    },
    enabled: !!shouldQueryCountryTemplate,
  })

  return {
    getCountryTemplate,
  }
}
