import { useMutation, useQuery } from 'ui'

import * as bankProfileService from '../service'
import { BankProfileCacheKeys } from '../consts'

export const useBankProfile = () => {
  const createBankProfileAction = useMutation({
    mutationFn: bankProfileService.createBankProfile,
  })

  const getBankProfile = useQuery({
    queryKey: [BankProfileCacheKeys.BankProfile],
    queryFn: bankProfileService.getBankProfile,
  })

  return {
    createBankProfileAction,
    getBankProfile,
  }
}
