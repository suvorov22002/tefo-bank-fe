import { INTEGRATED_RenderDynamicFields } from 'ui'

import { apiClientService } from '@/services'

import { AddCustomFields } from './customFields'

export const DynamicFields = INTEGRATED_RenderDynamicFields.initDynamicFields({
  apiClient: apiClientService,
  renderAddCustomFields: (onAddCustomField, customFieldsToAdd) => (
    <AddCustomFields onAddCustomField={onAddCustomField} customFieldsToAdd={customFieldsToAdd} />
  ),
})
