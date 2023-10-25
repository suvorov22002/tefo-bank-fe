import { FC, ReactNode, createContext, useCallback, useContext, useState } from 'react'

export interface UiSettings {
  defaultPageSize: number
  paginationPageSizeOptions: number[]
}

export const DEFAULT_UI_SETTINGS = Object.freeze<UiSettings>({
  defaultPageSize: 10,
  paginationPageSizeOptions: [10, 20, 50, 100],
})

const initialContext = {
  uiSettings: DEFAULT_UI_SETTINGS,
  updateUiSettings: () => undefined,
  resetUiSettings: () => undefined,
}

interface UiSettingsContextProps {
  uiSettings: UiSettings
  updateUiSettings: (uiSettings: Partial<UiSettings> | undefined) => void
  resetUiSettings: () => void
}

const UiSettingsContext = createContext<UiSettingsContextProps>(initialContext)

export const UiSettingsProvider: FC<{ children?: ReactNode }> = ({ children }) => {
  const [uiSettings, setUiSettings] = useState<UiSettingsContextProps['uiSettings']>(
    initialContext.uiSettings
  )

  const updateUiSettings: UiSettingsContextProps['updateUiSettings'] = useCallback(
    newUiSettings =>
      setUiSettings(settings => ({
        ...settings,
        ...newUiSettings,
      })),
    []
  )

  const resetUiSettings: UiSettingsContextProps['resetUiSettings'] = useCallback(
    () => setUiSettings(DEFAULT_UI_SETTINGS),
    []
  )

  return (
    <UiSettingsContext.Provider value={{ uiSettings, updateUiSettings, resetUiSettings }}>
      {children}
    </UiSettingsContext.Provider>
  )
}

export const useUiSettings = () => useContext(UiSettingsContext)
