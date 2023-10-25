import { getRenderDynamicFields } from './utils'
import { DynamicField, DynamicFieldApiClient, RenderTemplateModes } from '../types'
import { DynamicFieldsProps, RenderOptions } from '../types'
import {
  RenderDynamicFieldsInCreateMode,
  RenderDynamicFieldsInEditMode,
  RenderDynamicFieldsInViewMode,
} from './components'

export interface DynamicFieldsConfig {
  apiClient: DynamicFieldApiClient
  renderAddCustomFields: (
    onAddCustomField: (customFieldCode: DynamicField['code']) => void,
    customFieldsToAdd: DynamicField[]
  ) => JSX.Element
}

export const initDynamicFields = ({ apiClient, renderAddCustomFields }: DynamicFieldsConfig) => {
  const renderDynamicFields = getRenderDynamicFields(apiClient)

  return (
    props: Omit<DynamicFieldsProps, 'renderDynamicFields' | 'renderOptions'> & {
      renderOptions: Omit<RenderOptions, 'renderAddCustomFields'>
    }
  ) => (
    <DynamicFields
      {...props}
      renderDynamicFields={renderDynamicFields}
      renderOptions={{
        ...props.renderOptions,
        renderAddCustomFields,
      }}
    />
  )
}

const DynamicFields = ({ renderOptions, ...rest }: DynamicFieldsProps) => {
  switch (renderOptions.mode) {
    case RenderTemplateModes.Create:
      return <RenderDynamicFieldsInCreateMode renderOptions={renderOptions} {...rest} />
    case RenderTemplateModes.Edit:
      return <RenderDynamicFieldsInEditMode renderOptions={renderOptions} {...rest} />
    case RenderTemplateModes.View:
      return <RenderDynamicFieldsInViewMode renderOptions={renderOptions} {...rest} />
    default:
      return null
  }
}
