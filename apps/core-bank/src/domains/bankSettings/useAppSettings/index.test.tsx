import { renderHook, waitFor } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { getAppSettingsResponseMock } from '../api/mock'
import { useAppSettings } from './index'

jest.mock('../service', () => ({
  getAppSettings: jest.fn(() => getAppSettingsResponseMock),
}))

describe('useAppSettings', () => {
  it('should query getAppSettings', async () => {
    const { result } = renderHook(() => useAppSettings(), {
      wrapper: getAppWrapper(),
    })

    await waitFor(() => result.current.getAppSettings.isSuccess)

    expect(result.current.getAppSettings.isFetchedAfterMount).toBe(true)
    expect(result.current.getAppSettings.data).toBeDefined()
  })
})
