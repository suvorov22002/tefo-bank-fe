import { queryClient, useMutation, useQuery } from 'ui'

import * as bankUnitTypesService from '../service'
import { BankUnitTypesCacheKeys } from '../consts'
import { BankUnitType, CreateBankUnitTypeRequestData, EditBankUnitTypeRequestData } from '../types'

export const useBankUnitType = ({ id }: { id?: string }) => {
  const getBankUnitType = useQuery({
    queryKey: [BankUnitTypesCacheKeys.BankUnitType, id],
    queryFn: () => bankUnitTypesService.getBankUnitType(id as string),
    enabled: !!id,
  })

  const createBankUnitType = useMutation({
    mutationFn: (data: CreateBankUnitTypeRequestData) =>
      bankUnitTypesService.createBankUnitType(data),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [BankUnitTypesCacheKeys.BankUnitTypes],
      })

      queryClient.setQueryData<BankUnitType[]>(
        [BankUnitTypesCacheKeys.AllBankUnitTypes],
        cachedData => cachedData && [...cachedData, data]
      )
    },
  })

  const editBankUnitType = useMutation({
    mutationFn: (data: EditBankUnitTypeRequestData) => bankUnitTypesService.editBankUnitType(data),
    onSuccess: data => {
      queryClient.invalidateQueries({
        queryKey: [BankUnitTypesCacheKeys.BankUnitTypes],
      })

      queryClient.setQueryData<BankUnitType[]>(
        [BankUnitTypesCacheKeys.AllBankUnitTypes],
        cachedData =>
          cachedData?.map(bankUnitType => {
            if (bankUnitType.id === data.id) {
              return { ...data }
            }

            return bankUnitType
          })
      )
    },
  })

  return {
    editBankUnitType,
    getBankUnitType,
    createBankUnitType,
  }
}
