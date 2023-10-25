import { useQuery } from 'ui'

import * as customersService from '../service'
import { CustomersCacheKeys } from '../consts'

export const useCustomers = ({ page, limit }: { page: number; limit: number }) => {
  const getCustomers = useQuery({
    queryKey: [CustomersCacheKeys.Customers, page, limit],
    queryFn: () => customersService.getCustomers(page, limit),
  })

  return {
    getCustomers,
  }
}
