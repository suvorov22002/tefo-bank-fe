import { useQuery } from 'ui'

import * as bankUnitTypesService from '../service'
import { BankUnitTypesCacheKeys } from '../consts'

export const useBankUnitTypes = ({ page, limit }: { page: number; limit: number }) => {
  const getBankUnitTypes = useQuery({
    queryKey: [BankUnitTypesCacheKeys.BankUnitTypes, page, limit],
    queryFn: () => bankUnitTypesService.getBankUnitTypes(page, limit),
  })

  return {
    getBankUnitTypes,
  }
}
