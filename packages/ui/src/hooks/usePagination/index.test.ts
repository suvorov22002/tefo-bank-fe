import { act, renderHook } from '@testing-library/react'

import { DEFAULT_UI_SETTINGS } from '../../components'
import { usePagination } from './index'

describe('usePagination', () => {
  test('should return pagination data based on ui settings', () => {
    const { result } = renderHook(usePagination)

    expect(result.current.current).toBe(1)
    expect(result.current.pageSize).toBe(DEFAULT_UI_SETTINGS.defaultPageSize)
    expect(result.current.pageSizeOptions).toBe(DEFAULT_UI_SETTINGS.paginationPageSizeOptions)
  })

  test('should handle change of current page', () => {
    const { result } = renderHook(usePagination)

    act(() => {
      result.current.onChange(2, 10)
    })

    expect(result.current.current).toBe(2)

    act(() => {
      result.current.onChange(3, 10)
    })

    expect(result.current.current).toBe(3)
  })

  test('should handle change of current page size', () => {
    const { result } = renderHook(usePagination)

    act(() => {
      result.current.onChange(1, 20)
    })

    expect(result.current.pageSize).toBe(20)

    act(() => {
      result.current.onChange(1, 30)
    })

    expect(result.current.pageSize).toBe(30)
  })

  test('should reset current page if page size has changed', () => {
    const { result } = renderHook(usePagination)

    act(() => {
      result.current.onChange(2, 10)
    })

    expect(result.current.current).toBe(2)
    expect(result.current.pageSize).toBe(10)

    act(() => {
      result.current.onChange(3, 10)
    })

    expect(result.current.current).toBe(3)
    expect(result.current.pageSize).toBe(10)

    act(() => {
      result.current.onChange(4, 50)
    })

    expect(result.current.current).toBe(1)
    expect(result.current.pageSize).toBe(50)

    act(() => {
      result.current.onChange(5, 100)
    })

    expect(result.current.current).toBe(1)
    expect(result.current.pageSize).toBe(100)
  })
})
