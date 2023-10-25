import { clientConfig } from '@/configs'

export const RoutesConsts = Object.freeze({
  Home: '/',
  Welcome: '/welcome',
  CreateBankProfile: '/create-bank-profile',
  BankCreationRedirectPath: clientConfig.coreBankUrl + clientConfig.bankCreationRedirectPath,
})
