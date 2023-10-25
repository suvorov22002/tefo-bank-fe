import { useQuery } from 'ui'

import * as bankUnitTypesService from '../service'
import { BankUnitTypesCacheKeys } from '../consts'

export const useBankUnitTypesBasicInfo = ({
  shouldQueryBankUnitTypesBasicInfo = true,
}: {
  shouldQueryBankUnitTypesBasicInfo?: boolean
}) => {
  const getBankUnitTypesBasicInfo = useQuery({
    queryKey: [BankUnitTypesCacheKeys.BankUnitTypesBasicInfo],
    queryFn: bankUnitTypesService.getBankUnitTypesBasicInfo,
    enabled: shouldQueryBankUnitTypesBasicInfo,
  })

  const bankUnitTypesOptions =
    getBankUnitTypesBasicInfo.data?.map(el => ({
      value: el.id,
      label: el.name,
    })) || []

  return {
    getBankUnitTypesBasicInfo,
    bankUnitTypesOptions,
  }
}
