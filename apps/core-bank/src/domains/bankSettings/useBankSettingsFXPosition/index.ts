import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsFXPosition } from '../types'

export const useBankSettingsFXPosition = () => {
  const getBankSettingsFXPosition = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsFXPosition],
    queryFn: bankSettingsService.getBankSettingsFXPosition,
  })

  const editBankSettingsFXPosition = useMutation({
    mutationFn: bankSettingsService.editBankSettingsFXPosition,
    onSuccess(data) {
      queryClient.setQueryData<BankSettingsFXPosition>(
        [BankSettingsCacheKeys.BankSettingsFXPosition],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsFXPosition,
    editBankSettingsFXPosition,
  }
}
