import { Paginated } from '@/types'

export enum CustomerStatuses {
  Prospect = 'Prospect',
  PendingAuthorization = 'Pending Authorization',
  Inactive = 'Inactive',
  Active = 'Active',
  Rejected = 'Rejected',
  Closed = 'Closed',
}

export enum CustomerTypes {
  NaturalPerson = 'Natural person',
  LegalEntity = 'Legal entity',
}

export interface CustomerListItem extends Record<string, unknown> {
  residency: boolean
  createdAt: string
  updatedBy: string
  code: number
  unitName: string
  id: number
  shortName: string
  updatedAt: string
  relationshipManagerName: string
  status: CustomerStatuses
  type: CustomerTypes
}

export interface GetCustomersResponseData extends Paginated<CustomerListItem[]> {}
