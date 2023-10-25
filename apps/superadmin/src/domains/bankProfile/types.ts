export interface CreateBankProfileRequestData {
  shortName: string
  longName: string
  streetLine: string
  city: string
  zipCode: string
  region: string
  country: string
  shortPhoneNumber: string
  phoneCode: string
  email: string
  codeGroup: string
  swiftCode: string
}

export interface GetBankProfileResponseData extends CreateBankProfileRequestData {}
