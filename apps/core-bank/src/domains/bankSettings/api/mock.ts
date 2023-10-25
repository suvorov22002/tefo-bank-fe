import {
  AppSettingsResponseData,
  BankSettingsAccess,
  BankSettingsAccounting,
  BankSettingsClosures,
  BankSettingsCustomers,
  BankSettingsFXPosition,
  BankSettingsGeneral,
  BankSettingsTime,
  BankSettingsTransactions,
} from '../types'

export const languageOptionsMock = [
  { label: 'English', value: 'English' },
  { label: 'French', value: 'French' },
  { label: 'Arabic', value: 'Arabic' },
]

export const timeZoneOptionsMock = [
  { label: 'UTC +14:00', value: 'UTC +14:00' },
  { label: 'UTC +13:45', value: 'UTC +13:45' },
  { label: 'UTC +13:00', value: 'UTC +13:00' },
  { label: 'UTC +12:45', value: 'UTC +12:45' },
  { label: 'UTC +12:00', value: 'UTC +12:00' },
  { label: 'UTC +11:30', value: 'UTC +11:30' },
  { label: 'UTC +11:00', value: 'UTC +11:00' },
  { label: 'UTC +10:30', value: 'UTC +10:30' },
  { label: 'UTC +10:00', value: 'UTC +10:00' },
  { label: 'UTC +9:30', value: 'UTC +9:30' },
  { label: 'UTC +9:00', value: 'UTC +9:00' },
  { label: 'UTC +8:45', value: 'UTC +8:45' },
  { label: 'UTC +8:00', value: 'UTC +8:00' },
  { label: 'UTC +7:00', value: 'UTC +7:00' },
  { label: 'UTC +6:30', value: 'UTC +6:30' },
  { label: 'UTC +6:00', value: 'UTC +6:00' },
  { label: 'UTC +5:45', value: 'UTC +5:45' },
  { label: 'UTC +5:30', value: 'UTC +5:30' },
  { label: 'UTC +5:00', value: 'UTC +5:00' },
  { label: 'UTC +4:30', value: 'UTC +4:30' },
  { label: 'UTC +4:00', value: 'UTC +4:00' },
  { label: 'UTC +3:30', value: 'UTC +3:30' },
  { label: 'UTC +3:00', value: 'UTC +3:00' },
  { label: 'UTC +2:00', value: 'UTC +2:00' },
  { label: 'UTC +1:00', value: 'UTC +1:00' },
  { label: 'UTC +0:00', value: 'UTC +0:00' },
  { label: 'UTC -1:00', value: 'UTC -1:00' },
  { label: 'UTC -2:00', value: 'UTC -2:00' },
  { label: 'UTC -2:30', value: 'UTC -2:30' },
  { label: 'UTC -3:00', value: 'UTC -3:00' },
  { label: 'UTC -3:30', value: 'UTC -3:30' },
  { label: 'UTC -4:00', value: 'UTC -4:00' },
  { label: 'UTC -4:30', value: 'UTC -4:30' },
  { label: 'UTC -5:00', value: 'UTC -5:00' },
  { label: 'UTC -6:00', value: 'UTC -6:00' },
  { label: 'UTC -7:00', value: 'UTC -7:00' },
  { label: 'UTC -8:00', value: 'UTC -8:00' },
  { label: 'UTC -9:00', value: 'UTC -9:00' },
  { label: 'UTC -9:30', value: 'UTC -9:30' },
  { label: 'UTC -10:00', value: 'UTC -10:00' },
  { label: 'UTC -11:00', value: 'UTC -11:00' },
  { label: 'UTC -12:00', value: 'UTC -12:00' },
]

export const dateFormatOptionsMock = [
  { label: 'dd.MM.yyyy', value: 'dd.MM.yyyy' },
  { label: 'dd-MM-yyyy', value: 'dd-MM-yyyy' },
  { label: 'dd/MM/yyyy', value: 'dd/MM/yyyy' },
  { label: 'MM.dd.yyyy', value: 'MM.dd.yyyy' },
  { label: 'MM-dd-yyyy', value: 'MM-dd-yyyy' },
  { label: 'MM/dd/yyyy', value: 'MM/dd/yyyy' },
  { label: 'yyyy.MM.dd', value: 'yyyy.MM.dd' },
  { label: 'yyyy-MM-dd', value: 'yyyy-MM-dd' },
  { label: 'yyyy/MM/dd', value: 'yyyy/MM/dd' },
]

export const timeFormatOptionsMock = [
  { label: 'HH:mm', value: 'HH:mm' },
  { label: 'HH:mm:ss', value: 'HH:mm:ss' },
]

export const decimalMarkOptionsMock = [
  { label: 'Dot', value: 'Dot' },
  { label: 'Comma', value: 'Comma' },
]

export const thousandSeparatorOptionsMock = [
  { label: 'No separator', value: 'No separator' },
  { label: 'Space', value: 'Space' },
  { label: 'Apostrophe', value: 'Apostrophe' },
  { label: 'Comma', value: 'Comma' },
]

export const pageSizeOptionsMock = [
  { label: '10', value: 10 },
  { label: '20', value: 20 },
  { label: '50', value: 50 },
  { label: '100', value: 100 },
]

export const accountingMethodOptionsMock = [
  { label: 'Accrual', value: 'Accrual' },
  { label: 'Cash', value: 'Cash' },
]

export const accountingSystemTypeOptionsMock = [
  { label: 'Value dated', value: 'Value dated' },
  { label: 'Trade dated', value: 'Trade dated' },
]

export const getBankSettingsGeneralResponseMock: BankSettingsGeneral = {
  defaultLanguageDictionaryValueId: 1,
  dateFormatDictionaryValueId: 1,
  timeModeDictionaryValueId: 1,
  decimalMarkDictionaryValueId: 1,
  thousandSeparatorDictionaryValueId: 1,
  defaultPageSizeDictionaryValueId: 10,
}

export const getBankSettingsTimeResponseMock: BankSettingsTime = {
  timeZoneWinterDictionaryValueId: 1,
  timeZoneSummerDictionaryValueId: 2,
  isNonBusinessDayMonday: false,
  isNonBusinessDayTuesday: false,
  isNonBusinessDayWednesday: false,
  isNonBusinessDayThursday: false,
  isNonBusinessDayFriday: false,
  isNonBusinessDaySaturday: false,
  isNonBusinessDaySunday: false,
}

export const getBankSettingsClosuresResponseMock: BankSettingsClosures = {
  cutOffTime: [20, 23],
  shouldBlockUsersDuringEOD: true,
  minutesForUserNotificationAboutEODStart: 10,
  EOMDaysForAdjustments: 5,
  EOQDaysForAdjustments: 5,
  EOYDaysForAdjustments: 15,
}

export const getBankSettingsAccountingResponseMock: BankSettingsAccounting = {
  accountingMethodDictionaryValueId: 1,
  accountingSystemTypeDictionaryValueId: 1,
  accountNumberLength: 20,
  isUsedIBAN: true,
  accountNumberAllowedSymbolsDictionaryValueId: 1,
  accountNumberFreeSegmentDictionaryValueId: 1,
  IBANLength: 27,
}

export const getBankSettingsAccessResponseMock: BankSettingsAccess = {
  shouldEnableTwoFactorAuthentication: false,
  shouldEnableUserLoginSelfNotification: false,
  shouldEnableUserLoginSupervisorNotification: false,
  defaultPassword: 'AfriLand1stB@nk',
  invitationText:
    'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id es',
  invitationValidityDuration: 48,
  minimumPasswordLength: 8,
  minimumNumberOfNumChars: 1,
  minimumNumberOfSpecialChars: 1,
  minimumNumberOfUpperCaseChars: 1,
  passwordResetPeriod: 180,
  passwordReuseCycles: 3,
  failedLoginLimit: 6,
  failedLoginAttemptsTillCoolDown: 3,
  failedLoginCooldownPeriod: 30,
  timeoutDuration: 20,
}

export const getAppSettingsResponseMock: AppSettingsResponseData = {
  defaultPageSize: 3,
  paginationPageSizeOptions: [10, 19, 20, 50, 100],
}

export const getBankSettingsCustomersResponseMock: BankSettingsCustomers = {
  internalCodeLength: 20,
  isUsedUnitCodeInInternalCode: true,
  internalCodeAllowedSymbolsDictionaryValueId: 1,
  internalCodeFreeSegmentDictionaryValueId: 2,
  minAgeForOnboarding: 20,
  KYCPeriod: 20,
  documentTypeForPhotoDictionaryValueId: 3,
  documentTypeForSignatureDictionaryValueId: 4,
  defaultLegalFormForNaturalPersonDictionaryValueId: 5,
  defaultEconomicSectorForNaturalPersonDictionaryValueId: 6,
}

export const getBankSettingsTransactionsResponseMock: BankSettingsTransactions = {
  transactionNumberLength: 20,
  transactionNumberSymbolsDictionaryValueId: 1,
  transactionNumberUniquenessTermDictionaryValueId: 2,
}

export const getBankSettingsFXPositionResponseMock: BankSettingsFXPosition = {
  FXRateType: '1',
  FXPosition: '2',
  FXPositionEquivalent: '3',
  FXRevaluationGain: '4',
  FXRevaluationLost: '5',
  FXRevaluationTransactionType: '6',
}
