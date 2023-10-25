import { BankUnitTypeStatus, GetBankUnitTypesResponseData } from '../types'

export const bankUnitTypesMock = [
  { id: '1', name: 'ZY5-C', isVirtual: true, status: BankUnitTypeStatus.Active },
  { id: '2', name: 'VS5-D', isVirtual: false, status: BankUnitTypeStatus.Inactive },
  { id: '3', name: 'HG4-D', isVirtual: false, status: BankUnitTypeStatus.Inactive },
  { id: '4', name: 'KC8-B', isVirtual: false, status: BankUnitTypeStatus.Active },
  { id: '5', name: 'PP7-D', isVirtual: true, status: BankUnitTypeStatus.Inactive },
  { id: '6', name: 'IL9-B', isVirtual: false, status: BankUnitTypeStatus.Active },
  { id: '7', name: 'VS5-D', isVirtual: false, status: BankUnitTypeStatus.Inactive },
]

export const getBankUnitTypesResponseMock: GetBankUnitTypesResponseData = {
  page: 1,
  limit: 10,
  totalItems: 7,
  data: bankUnitTypesMock,
}

export const getBankUnitTypeResponseMock = {
  id: '1',
  name: 'ZY5-C',
  isVirtual: true,
  status: BankUnitTypeStatus.Active,
}
