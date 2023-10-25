import { useQuery } from 'ui'

import * as bankUnitTypesService from '../service'
import { BankUnitTypesCacheKeys } from '../consts'

export const useBankUnitTypeTemplate = () => {
  const getBankUnitTypeTemplate = useQuery({
    queryKey: [BankUnitTypesCacheKeys.BankUnitTypeTemplate],
    queryFn: () => bankUnitTypesService.getBankUnitTypeTemplate(),
  })

  return {
    getBankUnitTypeTemplate,
  }
}
