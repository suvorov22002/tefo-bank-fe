import { StringifiableRecord } from 'utils'
import { useQuery } from 'ui'

import * as bankUnitsService from '../service'
import { BankUnitsCacheKeys } from '../consts'

type BankUnitTemplateParams = { templateId?: string } & StringifiableRecord

export const useBankUnitTemplate = ({
  bankUnitTemplateParams,
  shouldQueryBankUnitTemplate,
}: {
  bankUnitTemplateParams?: BankUnitTemplateParams
  shouldQueryBankUnitTemplate?: boolean
}) => {
  const getBankUnitTemplate = useQuery({
    queryKey: [BankUnitsCacheKeys.BankUnitTemplate, bankUnitTemplateParams],
    queryFn: () => {
      if (bankUnitTemplateParams) {
        const { templateId, ...query } = bankUnitTemplateParams

        return bankUnitsService.getBankUnitTemplate(templateId, query)
      }

      return bankUnitsService.getBankUnitTemplate()
    },
    enabled: !!shouldQueryBankUnitTemplate,
  })

  return {
    getBankUnitTemplate,
  }
}
