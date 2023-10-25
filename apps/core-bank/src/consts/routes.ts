import { INTEGRATED_RenderDynamicFields } from 'ui'

export const RoutesConsts = Object.freeze({
  Home: '/',
  BankProfile: '/bank-profile',
  BankSettings: '/bank-settings',
  BankUnits: '/structure/bank-units',
  getBankUnitRoute: (unitId: string) => `/structure/bank-units/${unitId}`,
  CreateBankUnit: '/structure/bank-units/create',
  BankUnitTypes: '/structure/bank-unit-types',
  getBankUnitTypeRoute: (id: string) => `/structure/bank-unit-types/${id}`,
  CreateBankUnitType: '/structure/bank-unit-types/create',
  Dictionaries: '/dictionaries',
  CreateDictionary: '/dictionaries/create',
  getDictionaryRoute: (dictionaryId: string | number) => `/dictionaries/${dictionaryId}`,
  getDictionaryAddValueRoute: (dictionaryId: string | number) =>
    `/dictionaries/${dictionaryId}/add-value`,
  getDictionaryValueRoute: (dictionaryId: string | number, valueId: string | number) =>
    `/dictionaries/${dictionaryId}/${valueId}`,
  JobTypes: '/access/job-types',
  CreateJobType: '/access/job-types/create',
  getJobTypeRoute: (jobTypeId: string) => `/access/job-types/${jobTypeId}`,
  Users: '/access/users',
  CreateUser: '/access/users/create',
  getUserRoute: (id: string) => `/access/users/${id}`,
  CustomFields: '/custom-fields',
  CreateCustomField: '/custom-fields/create',
  Currencies: '/currencies',
  CreateCurrency: '/currencies/create',
  getCurrencyRoute: (id: string) => `/currencies/${id}`,
  getCustomFieldDetailsRoute: (
    entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
    id: INTEGRATED_RenderDynamicFields.DynamicField['id']
  ) => `/custom-fields/${entity}/${id}`,
  Countries: '/countries',
  getCountryRoute: (id: string) => `/countries/${id}`,
  CreateCountry: '/countries/create',
  CustomFieldGroups: '/custom-fields/custom-field-groups',
  CreateCustomFieldGroup: '/custom-fields/custom-field-groups/create',
  getCustomFieldGroupDetailsRoute: (
    entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
    id: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id']
  ) => `/custom-fields/custom-field-groups/${entity}/${id}`,
  Customers: '/customers',
  CreateCustomer: '/customers/create',
  getCustomerRoute: (id: string) => `/customers/${id}`,
  HolidayCalendar: '/holiday-calendar',
  getHolidayCalendarRoute: (calendarId: string) => `/holiday-calendar/${calendarId}`,
  CreateHolidayCalendar: '/holiday-calendar/create',
})
