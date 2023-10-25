import { ReactNode, useEffect } from 'react'
import { Spin, useUiSettings } from 'ui'

import { useAppSettings } from '@/domains/bankSettings'

export interface WithUiSettingsProps {
  children?: ReactNode
}

export const WithUiSettings = ({ children }: WithUiSettingsProps) => {
  const { getAppSettings } = useAppSettings()
  const { updateUiSettings } = useUiSettings()

  useEffect(() => {
    updateUiSettings(getAppSettings.data)
  }, [getAppSettings.data, updateUiSettings])

  const isLoading = getAppSettings.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  return <>{children}</>
}
