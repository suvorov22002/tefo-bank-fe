import { render, screen } from '@testing-library/react'

import { getAppWrapper } from '@/_tests/helpers/appWrapper'

import { WithUiSettings } from './index'
import { useAppSettings } from '../../domains/bankSettings/useAppSettings'

jest.mock('../../domains/bankSettings/useAppSettings')
jest.mock('ui', () => ({
  ...jest.requireActual('ui'),
  Spin: () => <div data-testid="loading-component" />,
}))

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const useAppSettingsMock = useAppSettings as jest.MockedFunction<any>

const Child = () => <div data-testid="child-component" />

describe('WithUiSettings component', () => {
  afterEach(() => {
    useAppSettingsMock.mockReset()
  })

  it('should show loading indicator while settings data is fetching', () => {
    useAppSettingsMock.mockReturnValue({
      getAppSettings: {
        data: undefined,
        isLoading: true,
      },
    })

    render(
      <WithUiSettings>
        <Child />
      </WithUiSettings>,
      { wrapper: getAppWrapper() }
    )

    expect(screen.queryByTestId('loading-component')).toBeInTheDocument()
    expect(screen.queryByTestId('child-component')).not.toBeInTheDocument()
  })

  it('should show content after settings data is fetched', () => {
    useAppSettingsMock.mockReturnValue({
      getAppSettings: {
        data: undefined,
        isLoading: false,
      },
    })

    render(
      <WithUiSettings>
        <Child />
      </WithUiSettings>,
      { wrapper: getAppWrapper() }
    )

    expect(screen.queryByTestId('loading-component')).not.toBeInTheDocument()
    expect(screen.queryByTestId('child-component')).toBeInTheDocument()
  })
})
