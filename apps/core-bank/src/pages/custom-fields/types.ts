import { INTEGRATED_RenderDynamicFields } from 'ui'

import {
  CreateCustomFieldGroupRequestData,
  CreateCustomFieldRequestData,
} from '@/domains/customFields'

export interface CreateCustomFieldFormValues
  extends Omit<CreateCustomFieldRequestData, 'entityName' | 'type' | 'order' | 'entityLevel'> {
  order: number | null
  type: CreateCustomFieldRequestData['type'] | null
  entityLevel: unknown[] | null
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>
}

export interface CustomFieldDetailsFormValues
  extends Omit<
    INTEGRATED_RenderDynamicFields.DynamicField,
    'properties' | 'createdAt' | 'updatedAt'
  > {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  properties: Record<string, any>
  createdAt: Date
  updatedAt: null | Date
}

export enum CustomFieldTabsKeys {
  General = 'general',
  Validation = 'validation',
}

export interface CreateCustomFieldGroupFormValues
  extends Omit<CreateCustomFieldGroupRequestData, 'index'> {
  index: CreateCustomFieldGroupRequestData['index'] | null
}
