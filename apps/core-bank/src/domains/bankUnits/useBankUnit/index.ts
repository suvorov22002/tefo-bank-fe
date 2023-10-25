import { queryClient, useMutation, useQuery } from 'ui'

import * as bankUnitsService from '../service'
import { BankUnitsCacheKeys } from '../consts'
import { CreateBankUnitRequestData, EditBankUnitRequestData } from '../types'

export const useBankUnit = ({ unitId }: { unitId?: string }) => {
  const getBankUnit = useQuery({
    queryKey: [BankUnitsCacheKeys.BankUnit, unitId],
    queryFn: () => bankUnitsService.getBankUnit(unitId as string),
    enabled: !!unitId,
  })

  const createBankUnit = useMutation({
    mutationFn: (data: CreateBankUnitRequestData) => bankUnitsService.createBankUnit(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [BankUnitsCacheKeys.BankUnits],
      }),
  })

  const editBankUnit = useMutation({
    mutationFn: (data: EditBankUnitRequestData) => bankUnitsService.editBankUnit(data),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [BankUnitsCacheKeys.BankUnits],
      }),
  })

  return {
    getBankUnit,
    createBankUnit,
    editBankUnit,
  }
}
