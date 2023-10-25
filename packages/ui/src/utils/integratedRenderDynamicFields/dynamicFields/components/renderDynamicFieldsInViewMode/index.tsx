import { useMemo } from 'react'

import { Divider } from '../../../../../components'
import { renderDynamicFieldGroups } from '../../utils'
import { DynamicField, DynamicFieldGroup, RenderTemplateModes } from '../../../types'
import { DynamicFieldsProps, RenderDynamicField } from '../../../types'

export interface RenderDynamicFieldsInViewModeProps extends DynamicFieldsProps {}

export const RenderDynamicFieldsInViewMode = ({
  values,
  template,
  renderDynamicFields,
  renderOptions,
}: RenderDynamicFieldsInViewModeProps) => {
  const customFieldsWithValue = useMemo(() => {
    return template.customFields.filter(customField =>
      Object.prototype.hasOwnProperty.call(values, customField.code)
    )
  }, [values, template.customFields])

  const customFieldsWithoutGroupToRender = useMemo(() => {
    return customFieldsWithValue.filter(visibleCustomField => !visibleCustomField.groupCode)
  }, [customFieldsWithValue])

  const customFieldGroupsToRender = useMemo(() => {
    return template.groups.reduce(
      (customFieldGroupsToRender: Array<DynamicFieldGroup & { fields: DynamicField[] }>, group) => {
        const fields = customFieldsWithValue.filter(
          visibleCustomField => visibleCustomField.groupCode === group.code
        )

        if (fields.length) {
          customFieldGroupsToRender.push({
            ...group,
            fields,
          })
        }

        return customFieldGroupsToRender
      },
      []
    )
  }, [template.groups, customFieldsWithValue])

  const renderDynamicField: RenderDynamicField = ({ Component, ...props }, i) => {
    return renderOptions && renderOptions.customRenderDynamicField ? (
      renderOptions.customRenderDynamicField({ Component, ...props }, i)
    ) : (
      <Component {...props} />
    )
  }

  return (
    <>
      {renderDynamicFields(template.primaryFields, renderDynamicField)}
      {!!customFieldsWithValue.length && <Divider />}
      {renderDynamicFields(customFieldsWithoutGroupToRender, renderDynamicField)}
      {!!customFieldGroupsToRender.length &&
        renderDynamicFieldGroups(customFieldGroupsToRender, renderDynamicFields, {
          mode: RenderTemplateModes.View,
          customRenderDynamicField: renderDynamicField,
        })}
    </>
  )
}
