import { useMemo, useState } from 'react'

import { getDynamicFieldsInitialValue } from '../../../getDynamicFieldsInitialValues/getDynamicFieldsInitialValue'
import { renderDynamicFieldGroups } from '../../utils'
import { Button, DeleteOutlinedIcon, Divider } from '../../../../../components'
import {
  DynamicField,
  DynamicFieldGroup,
  RenderTemplateModes,
  ValidationRuleTypes,
} from '../../../types'
import { DynamicFieldsProps, RenderDynamicField } from '../../../types'
import '../styles.scss'

interface RenderDynamicFieldsInCreateModeProps extends DynamicFieldsProps {}

export const RenderDynamicFieldsInCreateMode = ({
  renderOptions,
  renderDynamicFields,
  template,
  setValues,
}: RenderDynamicFieldsInCreateModeProps) => {
  const [addedCustomFields, setAddedCustomFields] = useState<DynamicField[]>([])

  const visiblePrimaryFields = useMemo(() => {
    return template.primaryFields.filter(primaryField => !primaryField.hiddenOnCreate)
  }, [template.primaryFields])

  const primaryFieldsWithoutGroupToRender = useMemo(() => {
    return template.primaryFields.filter(primaryField => !primaryField.groupCode)
  }, [template.primaryFields])

  const primaryFieldGroupsToRender = useMemo(() => {
    return template.groups.reduce(
      (
        primaryFieldGroupsToRender: Array<DynamicFieldGroup & { fields: DynamicField[] }>,
        group
      ) => {
        const fields = visiblePrimaryFields.filter(
          visiblePrimaryField => visiblePrimaryField.groupCode === group.code
        )

        if (fields.length) {
          primaryFieldGroupsToRender.push({
            ...group,
            fields,
          })
        }

        return primaryFieldGroupsToRender
      },
      []
    )
  }, [template.groups, visiblePrimaryFields])

  const requiredCustomFields = useMemo(() => {
    return template.customFields.filter(customField =>
      customField.validation.rules.find(
        validationRule => validationRule.type === ValidationRuleTypes.Required
      )
    )
  }, [template.customFields])

  const visibleCustomFields = useMemo(() => {
    return [...requiredCustomFields, ...addedCustomFields].reduce(
      (visibleCustomFields: DynamicField[], currCustomField) => {
        if (currCustomField.groupCode && !currCustomField.independent) {
          const fieldsInGroup = template.customFields.filter(
            customField => customField.groupCode === currCustomField.groupCode
          )

          visibleCustomFields.push(...fieldsInGroup)

          return visibleCustomFields
        }

        visibleCustomFields.push(currCustomField)

        return visibleCustomFields
      },
      []
    )
  }, [requiredCustomFields, addedCustomFields, template.customFields])

  const customFieldsWithoutGroupToRender = useMemo(() => {
    return visibleCustomFields.filter(visibleCustomField => !visibleCustomField.groupCode)
  }, [visibleCustomFields])

  const customFieldGroupsToRender = useMemo(() => {
    return template.groups.reduce(
      (customFieldGroupsToRender: Array<DynamicFieldGroup & { fields: DynamicField[] }>, group) => {
        const fields = visibleCustomFields.filter(
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
  }, [template.groups, visibleCustomFields])

  const customFieldsToAdd = useMemo(() => {
    return template.customFields.filter(
      customField =>
        !visibleCustomFields.find(
          visibleCustomField => visibleCustomField.code === customField.code
        )
    )
  }, [template.customFields, visibleCustomFields])

  const handleAddCustomField = (customFieldCode: DynamicField['code']) => {
    const field = customFieldsToAdd?.find(customField => customField.code === customFieldCode)

    if (!field) {
      return
    }
    setValues((values: Record<string, unknown>) => {
      return {
        ...values,
        [field.code]: getDynamicFieldsInitialValue(field),
      }
    })
    setAddedCustomFields(prev => [...prev, field])
  }

  const handleRemoveAddedCustomField = (customFieldCode: DynamicField['code']) => {
    setValues((values: Record<string, unknown>) => {
      const valuesCopy = { ...values }

      delete valuesCopy[customFieldCode]

      return valuesCopy
    })

    setAddedCustomFields(prev => prev.filter(field => field.code !== customFieldCode))
  }

  const renderDynamicField: RenderDynamicField = ({ Component, ...props }, i) => {
    return renderOptions && renderOptions.customRenderDynamicField ? (
      renderOptions.customRenderDynamicField({ Component, ...props }, i)
    ) : (
      <Component {...props} />
    )
  }

  const renderCustomDynamicField: RenderDynamicField = ({ Component, ...props }, i) => {
    if (addedCustomFields.find(field => field.code === props.name)) {
      return (
        <div className="dynamicFields__addedCustomFieldWrapper" key={props.key}>
          {renderDynamicField({ Component, ...props }, i)}
          <Button
            type="text"
            className={'dynamicFields__addedCustomFieldDeleteButton'}
            onClick={() => handleRemoveAddedCustomField(props.name)}
            icon={<DeleteOutlinedIcon />}
          />
        </div>
      )
    }

    return renderDynamicField({ Component, ...props }, i)
  }

  return (
    <>
      {renderDynamicFields(primaryFieldsWithoutGroupToRender, renderDynamicField)}
      {!!primaryFieldGroupsToRender.length &&
        renderDynamicFieldGroups(primaryFieldGroupsToRender, renderDynamicFields, {
          mode: RenderTemplateModes.Create,
          customRenderDynamicField: renderDynamicField,
        })}
      {!!visibleCustomFields.length && <Divider />}
      {renderDynamicFields(customFieldsWithoutGroupToRender, renderCustomDynamicField)}
      {!!customFieldGroupsToRender.length &&
        renderDynamicFieldGroups(customFieldGroupsToRender, renderDynamicFields, {
          mode: RenderTemplateModes.Create,
          customRenderDynamicField: renderCustomDynamicField,
        })}

      {renderOptions.renderAddCustomFields(handleAddCustomField, customFieldsToAdd)}
    </>
  )
}
