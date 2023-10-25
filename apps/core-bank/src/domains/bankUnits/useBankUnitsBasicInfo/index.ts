import { useQuery } from 'ui'

import * as bankUnitsService from '../service'
import { BankUnitsCacheKeys } from '../consts'

export const useBankUnitsBasicInfo = ({
  shouldQueryBankUnitsBasicInfo = true,
}: {
  shouldQueryBankUnitsBasicInfo?: boolean
}) => {
  const getBankUnitsBasicInfo = useQuery({
    queryKey: [BankUnitsCacheKeys.BankUnitsBasicInfo],
    queryFn: bankUnitsService.getBankUnitsBasicInfo,
    enabled: shouldQueryBankUnitsBasicInfo,
  })

  const bankUnitOptions =
    getBankUnitsBasicInfo.data?.map(el => ({
      value: el.id,
      label: el.name,
    })) || []

  return {
    getBankUnitsBasicInfo,
    bankUnitOptions,
  }
}
