import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd'
import { ComponentProps, InputHTMLAttributes } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { withInputHelpers } from '../withInputHelpers'

export interface BaseSelectProps {
  className?: AntdSelectProps['className']
  style?: AntdSelectProps['style']
  allowClear?: AntdSelectProps['allowClear']
  autoClearSearchValue?: AntdSelectProps['autoClearSearchValue']
  autoFocus?: AntdSelectProps['autoFocus']
  bordered?: AntdSelectProps['bordered']
  clearIcon?: AntdSelectProps['clearIcon']
  defaultActiveFirstOption?: AntdSelectProps['defaultActiveFirstOption']
  defaultOpen?: AntdSelectProps['defaultOpen']
  defaultValue?: AntdSelectProps['defaultValue']
  disabled?: AntdSelectProps['disabled']
  popupClassName?: AntdSelectProps['popupClassName']
  dropdownMatchSelectWidth?: AntdSelectProps['dropdownMatchSelectWidth']
  dropdownRender?: AntdSelectProps['dropdownRender']
  dropdownStyle?: AntdSelectProps['dropdownStyle']
  fieldNames?: AntdSelectProps['fieldNames']
  filterOption?: AntdSelectProps['filterOption']
  filterSort?: AntdSelectProps['filterSort']
  getPopupContainer?: AntdSelectProps['getPopupContainer']
  labelInValue?: AntdSelectProps['labelInValue']
  listHeight?: AntdSelectProps['listHeight']
  loading?: AntdSelectProps['loading']
  maxTagCount?: AntdSelectProps['maxTagCount']
  maxTagPlaceholder?: AntdSelectProps['maxTagPlaceholder']
  maxTagTextLength?: AntdSelectProps['maxTagTextLength']
  menuItemSelectedIcon?: AntdSelectProps['menuItemSelectedIcon']
  mode?: AntdSelectProps['mode']
  notFoundContent?: AntdSelectProps['notFoundContent']
  name?: InputHTMLAttributes<HTMLSelectElement>['name']
  open?: AntdSelectProps['open']
  optionFilterProp?: AntdSelectProps['optionFilterProp']
  optionLabelProp?: AntdSelectProps['optionLabelProp']
  options?: AntdSelectProps['options']
  placeholder?: AntdSelectProps['placeholder']
  placement?: AntdSelectProps['placement']
  removeIcon?: AntdSelectProps['removeIcon']
  searchValue?: AntdSelectProps['searchValue']
  showArrow?: AntdSelectProps['showArrow']
  showSearch?: AntdSelectProps['showSearch']
  size?: AntdSelectProps['size']
  status?: AntdSelectProps['status']
  suffixIcon?: AntdSelectProps['suffixIcon']
  tagRender?: AntdSelectProps['tagRender']
  tokenSeparators?: AntdSelectProps['tokenSeparators']
  value?: AntdSelectProps['value']
  virtual?: AntdSelectProps['virtual']
  onBlur?: AntdSelectProps['onBlur']
  onChange?: AntdSelectProps['onChange']
  onClear?: AntdSelectProps['onClear']
  onDeselect?: AntdSelectProps['onDeselect']
  onDropdownVisibleChange?: AntdSelectProps['onDropdownVisibleChange']
  onFocus?: AntdSelectProps['onFocus']
  onInputKeyDown?: AntdSelectProps['onInputKeyDown']
  onMouseEnter?: AntdSelectProps['onMouseEnter']
  onMouseLeave?: AntdSelectProps['onMouseLeave']
  onPopupScroll?: AntdSelectProps['onPopupScroll']
  onSearch?: AntdSelectProps['onSearch']
  onSelect?: AntdSelectProps['onSelect']

  prefixCls?: string
  id?: string
  backfill?: boolean
}

const BaseSelect = (props: BaseSelectProps) => {
  return <AntdSelect aria-label={props.name} allowClear {...props} />
}

export const Select = withInputHelpers<BaseSelectProps>(BaseSelect)

export interface SelectProps extends ComponentProps<typeof Select> {}

// prettier-ignore
export const SelectField = <Values=string,>(
  props: ComponentProps<typeof Select> & Omit<FieldHookConfig<Values>, 'onChange' | 'onBlur'>
) => {
  const { name, validate, type, innerRef, onChange, onBlur, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<Values> = { name, validate, type, innerRef }
  const [field, meta, helpers] = useField(fieldProps)

  const handleOnChange: ComponentProps<typeof Select>['onChange'] = (value, option) => {
    helpers.setValue(value as Values)
    onChange && onChange(value, option)
  }

  const handleOnBlur: ComponentProps<typeof Select>['onBlur'] = e => {
    field.onBlur(e)
    helpers.setTouched(true)
    onBlur && onBlur(e)
  }

  return (
    <Select
      validateStatus={meta.touched && meta.error ? 'error' : undefined}
      help={meta.touched && meta.error ? meta.error : help || <div />}
      getPopupContainer={trigger => trigger.parentNode}
      showSearch={false}
      // Side effect of onClear execution that can't be overridden unregister the field from formik (only default Select, without mode prop)
      // https://github.com/react-component/select/blob/1f3c35fc0950476295c56f1b3d0c210110b78fbd/src/BaseSelect.tsx#L694
      onClear={() =>
        !componentProps.mode
          ? setTimeout(() => helpers.setValue(null as unknown as Values, true))
          : null
      }
      {...field}
      {...componentProps}
      onChange={handleOnChange}
      onBlur={handleOnBlur}
    />
  )
}

export interface SelectFieldProps extends ComponentProps<typeof SelectField> {}
