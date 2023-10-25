import { RenderDynamicFieldGroupsInCreateMode } from './renderDynamicFieldGroupsInCreateMode'
import { RenderDynamicFieldGroupsInEditMode } from './renderDynamicFieldGroupsInEditMode'
import { RenderDynamicFieldGroupsInViewMode } from './renderDynamicFieldGroupsInViewMode'
import { RenderOptions } from '../../../types'
import { getRenderDynamicFields } from '../renderDynamicFields'
import { DynamicField, DynamicFieldGroup, RenderTemplateModes } from '../../../types'

export const renderDynamicFieldGroups = (
  groups: (DynamicFieldGroup & {
    fields: DynamicField[]
  })[],
  renderDynamicFields: ReturnType<typeof getRenderDynamicFields>,
  renderOptions: Omit<RenderOptions, 'renderAddCustomFields'>
) => {
  const normalizedGroups = [...groups].sort(
    (prevGroup, currGroup) => prevGroup.index - currGroup.index
  )

  switch (renderOptions.mode) {
    case RenderTemplateModes.Create:
      return (
        <RenderDynamicFieldGroupsInCreateMode
          groups={normalizedGroups}
          renderDynamicFields={renderDynamicFields}
          renderOptions={renderOptions}
        />
      )
    case RenderTemplateModes.Edit:
      return (
        <RenderDynamicFieldGroupsInEditMode
          groups={normalizedGroups}
          renderDynamicFields={renderDynamicFields}
          renderOptions={renderOptions}
        />
      )

    case RenderTemplateModes.View:
      return (
        <RenderDynamicFieldGroupsInViewMode
          groups={normalizedGroups}
          renderDynamicFields={renderDynamicFields}
          renderOptions={renderOptions}
        />
      )

    default:
      return null
  }
}
