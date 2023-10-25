import { useQuery } from 'ui'

import * as bankUnitsService from '../service'
import { BankUnitsCacheKeys } from '../consts'

export const useBankUnitEntityLevelTemplate = ({
  shouldQueryBankUnitEntityLevelTemplate,
}: {
  shouldQueryBankUnitEntityLevelTemplate?: boolean
}) => {
  const getBankUnitEntityLevelTemplate = useQuery({
    queryKey: [BankUnitsCacheKeys.BankUnitEntityLevelTemplate],
    queryFn: bankUnitsService.getBankUnitEntityLevelTemplate,
    enabled: !!shouldQueryBankUnitEntityLevelTemplate,
  })

  return {
    getBankUnitEntityLevelTemplate,
  }
}
