import { DynamicFieldsLabel } from '../../../components'
import { RenderOptions } from '../../../../types'
import { getRenderDynamicFields } from '../../renderDynamicFields'
import { Collapse, Panel } from '../../../../../../components'
import { DynamicField, DynamicFieldGroup } from '../../../../types'

interface RenderDynamicFieldGroupsInEditModeProps {
  groups: (DynamicFieldGroup & {
    fields: DynamicField[]
  })[]
  renderDynamicFields: ReturnType<typeof getRenderDynamicFields>
  renderOptions?: Omit<RenderOptions, 'renderAddCustomFields'>
}

export const RenderDynamicFieldGroupsInEditMode = ({
  groups,
  renderDynamicFields,
  renderOptions,
}: RenderDynamicFieldGroupsInEditModeProps) => {
  return (
    <Collapse defaultActiveKey={groups.map(group => group.code)}>
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
