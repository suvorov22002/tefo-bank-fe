import { useEffect, useState } from 'react'

import { useUiSettings } from '../../components'

export interface UsePaginationResults {
  current: number
  pageSize: number
  pageSizeOptions: number[]
  setCurrent: (current: number) => void
  setPageSize: (pageSize: number) => void
  onChange: (current: number, pageSize: number) => void
}

export const usePagination = () => {
  const { uiSettings } = useUiSettings()

  const settingsPageSize = uiSettings.defaultPageSize
  const settingsPageSizeOptions = uiSettings.paginationPageSizeOptions

  const [current, setCurrent] = useState<number>(1)
  const [pageSize, setPageSize] = useState<number>(settingsPageSize)

  useEffect(() => {
    setPageSize(settingsPageSize)
  }, [settingsPageSize])

  const onChange = (newPage: number, newPageSize: number) => {
    setPageSize(newPageSize)

    if (newPageSize !== pageSize) {
      setCurrent(1)
    } else {
      setCurrent(newPage)
    }
  }

  return {
    current,
    pageSize,
    pageSizeOptions: settingsPageSizeOptions,
    setCurrent,
    setPageSize,
    onChange,
  }
}
