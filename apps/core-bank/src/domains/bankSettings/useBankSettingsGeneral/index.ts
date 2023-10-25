import { queryClient, useMutation, useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsCacheKeys } from '../consts'
import { BankSettingsGeneral } from '../types'

export const useBankSettingsGeneral = () => {
  const getBankSettingsGeneral = useQuery({
    queryKey: [BankSettingsCacheKeys.BankSettingsGeneral],
    queryFn: bankSettingsService.getBankSettingsGeneral,
  })

  const editBankSettingsGeneral = useMutation({
    mutationFn: bankSettingsService.editBankSettingsGeneral,
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [BankSettingsCacheKeys.AppSettings],
      })
      queryClient.setQueryData<BankSettingsGeneral>(
        [BankSettingsCacheKeys.BankSettingsGeneral],
        cachedData => ({
          ...cachedData,
          ...data,
        })
      )
    },
  })

  return {
    getBankSettingsGeneral,
    editBankSettingsGeneral,
  }
}
