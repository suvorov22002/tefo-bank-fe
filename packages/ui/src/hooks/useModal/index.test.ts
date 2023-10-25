import { act, renderHook } from '@testing-library/react'

import { useModal } from './index'

describe('useModal', () => {
  test('should open and close the modal', () => {
    const { result } = renderHook(() => useModal())

    expect(result.current.isOpen).toBe(false)

    act(() => {
      result.current.open()
    })

    expect(result.current.isOpen).toBe(true)

    act(() => {
      result.current.close()
    })

    expect(result.current.isOpen).toBe(false)
  })

  test('should set and clear modal props', () => {
    const { result } = renderHook(() => useModal<string>())

    act(() => {
      result.current.open('Modal content')
    })

    expect(result.current.props).toBe('Modal content')

    act(() => {
      result.current.close()
    })

    expect(result.current.props).toBeUndefined()
  })
})
