import { useQuery } from 'ui'

import * as bankUnitsService from '../service'
import { BankUnitsCacheKeys } from '../consts'

export const useBankUnits = ({ page, limit }: { page: number; limit: number }) => {
  const getBankUnits = useQuery({
    queryKey: [BankUnitsCacheKeys.BankUnits, page, limit],
    queryFn: () => bankUnitsService.getBankUnits(page, limit),
  })

  return {
    getBankUnits,
  }
}
