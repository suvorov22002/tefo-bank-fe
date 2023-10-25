import { useQuery } from 'ui'

import * as bankSettingsService from '../service'
import { BankSettingsCacheKeys } from '../consts'

export const useAppSettings = () => {
  const getAppSettings = useQuery({
    queryKey: [BankSettingsCacheKeys.AppSettings],
    queryFn: bankSettingsService.getAppSettings,
  })

  return {
    getAppSettings,
  }
}
