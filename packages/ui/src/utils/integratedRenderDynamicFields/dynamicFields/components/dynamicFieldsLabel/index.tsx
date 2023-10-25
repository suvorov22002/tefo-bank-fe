import { DynamicField } from '../../../types'
import { InfoCircleOutlined, Tooltip } from '../../../../../components'

interface DynamicFieldsLabelProps {
  label: DynamicField['label']
  tooltip?: DynamicField['tooltip']
}

export const DynamicFieldsLabel = ({ tooltip, label }: DynamicFieldsLabelProps) => {
  return (
    <>
      {label}
      {tooltip && (
        <>
          &nbsp;
          <Tooltip title={tooltip}>
            <InfoCircleOutlined />
          </Tooltip>
        </>
      )}
    </>
  )
}
