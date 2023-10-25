import { CreateBankProfileRequestData } from '@/domains'
import { ElementType } from 'react'

export enum CreateBankProfileViews {
  BankName,
  BankAddress,
  BankContacts,
  BankSwift,
  BankInformationVerify,
  Success,
  Error,
}

export interface BankNameFormValues {
  shortName: string
  longName: string
}

export interface BankContactsFormValues {
  phoneCode: string
  shortPhoneNumber: string
  email: string
}

export interface BankAddressFormValues {
  streetLine: string
  city: string
  region: string
  zipCode: string
  country: string
}

export interface BankSwiftFormValues {
  codeGroup: string
  swiftCode: string
}

export interface CreateBankProfileFormValues extends CreateBankProfileRequestData {}

export interface BankInformationVerifyViewFormValues extends CreateBankProfileFormValues {
  informationVerified: boolean
}

export type Field<C> = C & {
  Component: ElementType
  key: number
}
