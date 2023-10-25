import { useQuery } from 'ui'

import * as bankUnitTypesService from '../service'
import { BankUnitTypesCacheKeys } from '../consts'

export const useAllBankUnitTypes = ({
  shouldQueryAllBankUnitTypes = true,
}: {
  shouldQueryAllBankUnitTypes?: boolean
}) => {
  const getAllBankUnitTypes = useQuery({
    queryKey: [BankUnitTypesCacheKeys.AllBankUnitTypes],
    queryFn: () => bankUnitTypesService.getAllBankUnitTypes(),
    enabled: shouldQueryAllBankUnitTypes,
  })

  return {
    getAllBankUnitTypes,
  }
}
