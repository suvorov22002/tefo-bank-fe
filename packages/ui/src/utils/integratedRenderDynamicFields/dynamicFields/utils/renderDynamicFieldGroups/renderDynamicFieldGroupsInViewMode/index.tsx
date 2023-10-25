import { DynamicFieldsLabel } from '../../../components'
import { RenderOptions } from '../../../../types'
import { getRenderDynamicFields } from '../../renderDynamicFields'
import { Collapse, Panel } from '../../../../../../components'
import { DynamicField, DynamicFieldGroup, DynamicFieldGroupAppearances } from '../../../../types'

interface RenderDynamicFieldGroupsInViewModeProps {
  groups: (DynamicFieldGroup & {
    fields: DynamicField[]
  })[]
  renderDynamicFields: ReturnType<typeof getRenderDynamicFields>
  renderOptions?: Omit<RenderOptions, 'renderAddCustomFields'>
}

export const RenderDynamicFieldGroupsInViewMode = ({
  groups,
  renderDynamicFields,
  renderOptions,
}: RenderDynamicFieldGroupsInViewModeProps) => {
  return (
    <Collapse
      defaultActiveKey={groups.reduce((defaultActiveKeys: string[], group) => {
        if (group.appearance === DynamicFieldGroupAppearances.Expanded)
          defaultActiveKeys.push(group.code)

        return defaultActiveKeys
      }, [])}
    >
      {groups.map(group => (
        <Panel
          key={group.code}
          header={<DynamicFieldsLabel label={group.label} tooltip={group.tooltip} />}
          showArrow
        >
          {renderDynamicFields(group.fields, renderOptions?.customRenderDynamicField)}
        </Panel>
      ))}
    </Collapse>
  )
}
