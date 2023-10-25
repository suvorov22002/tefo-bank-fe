import { useQuery } from 'ui'

import * as bankProfileService from '../service'
import { BankProfileCacheKeys } from '../consts'

export const useBankProfileTemplate = () => {
  const getBankProfileTemplate = useQuery({
    queryKey: [BankProfileCacheKeys.BankProfileTemplate],
    queryFn: bankProfileService.getBankProfileTemplate,
  })

  return {
    getBankProfileTemplate,
  }
}
