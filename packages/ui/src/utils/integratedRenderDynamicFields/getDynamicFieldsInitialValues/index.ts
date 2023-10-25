import { getDynamicFieldsInitialValuesInCreateMode } from './getDynamicFieldsInitialValuesInCreateMode'
import { getDynamicFieldsInitialValuesInEditMode } from './getDynamicFieldsInitialValuesInEditMode'
import { DynamicFieldsTemplate, RenderTemplateModes } from '../types'

type GetDynamicFieldsInitialValuesParams = {
  template: DynamicFieldsTemplate
} & (
  | {
      mode: RenderTemplateModes.Create
    }
  | {
      mode: RenderTemplateModes.Edit | RenderTemplateModes.View
      values: Record<string, unknown>
    }
)

export function getDynamicFieldsInitialValues<V>(params: GetDynamicFieldsInitialValuesParams) {
  switch (params.mode) {
    case RenderTemplateModes.Create:
      return getDynamicFieldsInitialValuesInCreateMode<V>(params.template)
    case RenderTemplateModes.Edit:
    case RenderTemplateModes.View:
      return getDynamicFieldsInitialValuesInEditMode<V>(params.template, params.values)
    default:
      return {} as V
  }
}
