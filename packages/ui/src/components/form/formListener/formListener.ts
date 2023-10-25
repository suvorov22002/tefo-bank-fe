import { useEffect } from 'react'

export const FormListener = <T>({ data, callback }: { data: T; callback: (data: T) => void }) => {
  useEffect(() => {
    callback(data)
  }, [callback, data])

  return null
}
