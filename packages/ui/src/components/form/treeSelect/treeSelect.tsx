import { ComponentProps } from 'react'
import { TreeSelect as AntdTreeSelect, TreeSelectProps as AntdTreeSelectProps } from 'antd'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'

export interface BaseTreeSelectProps {
  allowClear?: AntdTreeSelectProps['allowClear']
  autoClearSearchValue?: AntdTreeSelectProps['autoClearSearchValue']
  bordered?: AntdTreeSelectProps['bordered']
  defaultValue?: AntdTreeSelectProps['defaultValue']
  disabled?: AntdTreeSelectProps['disabled']
  popupClassName?: AntdTreeSelectProps['popupClassName']
  dropdownRender?: AntdTreeSelectProps['dropdownRender']
  dropdownStyle?: AntdTreeSelectProps['dropdownStyle']
  fieldNames?: AntdTreeSelectProps['fieldNames']
  filterTreeNode?: AntdTreeSelectProps['filterTreeNode']
  getPopupContainer?: AntdTreeSelectProps['getPopupContainer']
  labelInValue?: AntdTreeSelectProps['labelInValue']
  listHeight?: AntdTreeSelectProps['listHeight']
  loadData?: AntdTreeSelectProps['loadData']
  maxTagCount?: AntdTreeSelectProps['maxTagCount']
  maxTagPlaceholder?: AntdTreeSelectProps['maxTagPlaceholder']
  maxTagTextLength?: AntdTreeSelectProps['maxTagTextLength']
  multiple?: AntdTreeSelectProps['multiple']
  notFoundContent?: AntdTreeSelectProps['notFoundContent']
  placeholder?: AntdTreeSelectProps['placeholder']
  placement?: AntdTreeSelectProps['placement']
  searchValue?: AntdTreeSelectProps['searchValue']
  showArrow?: AntdTreeSelectProps['showArrow']
  showCheckedStrategy?: AntdTreeSelectProps['showCheckedStrategy']
  showSearch?: AntdTreeSelectProps['showSearch']
  size?: AntdTreeSelectProps['size']
  status?: AntdTreeSelectProps['status']
  suffixIcon?: AntdTreeSelectProps['suffixIcon']
  switcherIcon?: AntdTreeSelectProps['switcherIcon']
  tagRender?: AntdTreeSelectProps['tagRender']
  treeCheckable?: AntdTreeSelectProps['treeCheckable']
  treeCheckStrictly?: AntdTreeSelectProps['treeCheckStrictly']
  treeData?: AntdTreeSelectProps['treeData']
  treeDataSimpleMode?: AntdTreeSelectProps['treeDataSimpleMode']
  treeDefaultExpandAll?: AntdTreeSelectProps['treeDefaultExpandAll']
  treeDefaultExpandedKeys?: AntdTreeSelectProps['treeDefaultExpandedKeys']
  treeExpandAction?: AntdTreeSelectProps['treeExpandAction']
  treeExpandedKeys?: AntdTreeSelectProps['treeExpandedKeys']
  treeIcon?: AntdTreeSelectProps['treeIcon']
  treeLoadedKeys?: AntdTreeSelectProps['treeLoadedKeys']
  treeLine?: AntdTreeSelectProps['treeLine']
  treeNodeFilterProp?: AntdTreeSelectProps['treeNodeFilterProp']
  treeNodeLabelProp?: AntdTreeSelectProps['treeNodeLabelProp']
  value?: AntdTreeSelectProps['value']
  virtual?: AntdTreeSelectProps['virtual']
  onChange?: AntdTreeSelectProps['onChange']
  onDropdownVisibleChange?: AntdTreeSelectProps['onDropdownVisibleChange']
  onSearch?: AntdTreeSelectProps['onSearch']
  onSelect?: AntdTreeSelectProps['onSelect']
  onBlur?: AntdTreeSelectProps['onBlur']
  onTreeExpand?: AntdTreeSelectProps['onTreeExpand']
  className?: AntdTreeSelectProps['className']
  style?: AntdTreeSelectProps['style']
}

const BaseTreeSelect = (props: BaseTreeSelectProps) => {
  return <AntdTreeSelect {...props} />
}

export const TreeSelect = withInputHelpers<BaseTreeSelectProps>(BaseTreeSelect)

export interface TreeSelectProps extends ComponentProps<typeof TreeSelect> {}

//prettier-ignore
export const TreeSelectField = <Values=string,>(
  props: ComponentProps<typeof TreeSelect> & Omit<FieldHookConfig<Values>, 'onChange' | 'onBlur'>
) => {
  const { name, validate, type, innerRef, onChange, onBlur, help, ...componentProps } = props
  const fieldProps = { name, validate, type, innerRef }
  const [field, meta, helpers] = useField(fieldProps)

  const handleOnChange: ComponentProps<typeof TreeSelect>['onChange'] = (
    value,
    labelList,
    extra
  ) => {
    helpers.setValue(value)
    onChange && onChange(value, labelList, extra)
  }

  const handleOnBlur: ComponentProps<typeof TreeSelect>['onBlur'] = e => {
    field.onBlur(e)
    helpers.setTouched(true)
    onBlur && onBlur(e)
  }

  return (
    <TreeSelect
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      getPopupContainer={trigger => trigger.parentNode}
      showSearch={false}
      {...field}
      {...componentProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export interface TreeSelectFieldProps extends ComponentProps<typeof TreeSelectField> {}
