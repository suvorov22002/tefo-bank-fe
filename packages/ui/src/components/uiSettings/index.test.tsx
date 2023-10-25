import { act, renderHook } from '@testing-library/react'

import { DEFAULT_UI_SETTINGS, UiSettings, UiSettingsProvider, useUiSettings } from './index'

describe('useUiSettings', () => {
  test('should return default uiSettings', () => {
    const { result } = renderHook(useUiSettings, { wrapper: UiSettingsProvider })

    expect(result.current.uiSettings).toStrictEqual<UiSettings>(DEFAULT_UI_SETTINGS)
  })

  test('should return updated settings after updateUiSettings action', () => {
    const { result } = renderHook(useUiSettings, { wrapper: UiSettingsProvider })

    act(() => {
      result.current.updateUiSettings({ defaultPageSize: 19 })
    })

    expect(result.current.uiSettings).toStrictEqual<UiSettings>({
      ...DEFAULT_UI_SETTINGS,
      defaultPageSize: 19,
    })
  })

  test('should return default settings after resetUiSettings action', () => {
    const { result } = renderHook(useUiSettings, { wrapper: UiSettingsProvider })

    act(() => {
      result.current.updateUiSettings({ defaultPageSize: 19 })
    })

    expect(result.current.uiSettings).toStrictEqual<UiSettings>({
      ...DEFAULT_UI_SETTINGS,
      defaultPageSize: 19,
    })

    act(() => {
      result.current.resetUiSettings()
    })

    expect(result.current.uiSettings).toStrictEqual<UiSettings>(DEFAULT_UI_SETTINGS)
  })
})
