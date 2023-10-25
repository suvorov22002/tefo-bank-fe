import { queryClient, useMutation, useQuery } from 'ui'

import * as bankProfileService from '../service'
import { BankProfileCacheKeys } from '../consts'
import { GetBankProfileResponseData } from '../types'

export const useBankProfile = () => {
  const getBankProfile = useQuery({
    queryKey: [BankProfileCacheKeys.BankProfile],
    queryFn: bankProfileService.getBankProfile,
  })

  const editBankProfileAction = useMutation({
    mutationFn: bankProfileService.editBankProfile,
    onSuccess(data) {
      queryClient.setQueryData<GetBankProfileResponseData>(
        [BankProfileCacheKeys.BankProfile],
        () => ({
          ...data,
        })
      )
    },
  })

  return {
    getBankProfile,
    editBankProfileAction,
  }
}
