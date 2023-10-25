export interface BankSettingsGeneral {
  defaultLanguageDictionaryValueId: number
  dateFormatDictionaryValueId: number
  timeModeDictionaryValueId: number
  decimalMarkDictionaryValueId: number
  thousandSeparatorDictionaryValueId: number
  defaultPageSizeDictionaryValueId: number
}

export interface BankSettingsTime {
  timeZoneWinterDictionaryValueId: number
  timeZoneSummerDictionaryValueId: number
  isNonBusinessDayMonday: boolean
  isNonBusinessDayTuesday: boolean
  isNonBusinessDayWednesday: boolean
  isNonBusinessDayThursday: boolean
  isNonBusinessDayFriday: boolean
  isNonBusinessDaySaturday: boolean
  isNonBusinessDaySunday: boolean
}

export interface BankSettingsClosures {
  cutOffTime: [number, number] | null
  shouldBlockUsersDuringEOD: boolean
  minutesForUserNotificationAboutEODStart: number
  EOMDaysForAdjustments: number | null
  EOQDaysForAdjustments: number | null
  EOYDaysForAdjustments: number | null
}

export interface BankSettingsAccounting {
  accountingMethodDictionaryValueId: number | null
  accountingSystemTypeDictionaryValueId: number | null
  accountNumberLength: string | number | null
  isUsedIBAN: true
  accountNumberAllowedSymbolsDictionaryValueId: number | null
  accountNumberFreeSegmentDictionaryValueId: number | null
  IBANLength: number | null
}

export interface BankSettingsAccess {
  shouldEnableTwoFactorAuthentication: boolean
  shouldEnableUserLoginSelfNotification: boolean
  shouldEnableUserLoginSupervisorNotification: boolean
  defaultPassword: string | null
  invitationText: string | null
  invitationValidityDuration: number | null
  minimumPasswordLength: number | null
  minimumNumberOfNumChars: number | null
  minimumNumberOfSpecialChars: number | null
  minimumNumberOfUpperCaseChars: number | null
  passwordResetPeriod: number | null
  passwordReuseCycles: number | null
  failedLoginLimit: number | null
  failedLoginAttemptsTillCoolDown: number | null
  failedLoginCooldownPeriod: number | null
  timeoutDuration: number
}

export interface AppSettingsResponseData {
  defaultPageSize: number
  paginationPageSizeOptions: number[]
}

export interface BankSettingsCustomers {
  internalCodeLength: number
  isUsedUnitCodeInInternalCode: boolean
  internalCodeAllowedSymbolsDictionaryValueId: number
  internalCodeFreeSegmentDictionaryValueId: number
  minAgeForOnboarding: number
  KYCPeriod: number | null
  documentTypeForPhotoDictionaryValueId: number
  documentTypeForSignatureDictionaryValueId: number
  defaultLegalFormForNaturalPersonDictionaryValueId: number | null
  defaultEconomicSectorForNaturalPersonDictionaryValueId: number | null
}

export interface BankSettingsTransactions {
  transactionNumberLength: number
  transactionNumberSymbolsDictionaryValueId: number
  transactionNumberUniquenessTermDictionaryValueId: number
}

export interface BankSettingsFXPosition {
  FXRateType: string
  FXPosition: string
  FXPositionEquivalent: string
  FXRevaluationGain: string
  FXRevaluationLost: string
  FXRevaluationTransactionType: string
}
