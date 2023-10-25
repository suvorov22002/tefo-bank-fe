import { Select as AntdSelect, SelectProps as AntdSelectProps } from 'antd'
import { ChangeEvent, ComponentProps, InputHTMLAttributes, useRef, useState } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { Button } from '../../button'
import { Divider } from '../../divider'
import { PlusOutlinedIcon } from '../../icon'
import { withInputHelpers } from '../withInputHelpers'
import { BaseInput, InputRef } from '../input'
import './styles.scss'

export interface BaseListProps {
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
  onAddNewItem?: (newItem: { label: string; value: string }) => void

  prefixCls?: string
  id?: string
  backfill?: boolean
  addNewItemInputPlaceholder?: string
  addNewItemButtonText: string
}

const BaseList = ({
  options,
  addNewItemInputPlaceholder,
  addNewItemButtonText,
  onAddNewItem,
  ...rest
}: BaseListProps) => {
  const [items, setItems] = useState(options || [])
  const [newItemLabel, setNewItemLabel] = useState('')
  const newItemInputRef = useRef<InputRef>(null)

  const handleNewItemLabelChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewItemLabel(e.target.value)
  }

  const handleAddItem = () => {
    const newItem = { label: newItemLabel, value: newItemLabel }

    if (items.find(item => item.value === newItem.value)) {
      return
    }

    setItems(prevItems => [...prevItems, newItem])
    onAddNewItem && onAddNewItem(newItem)
    setNewItemLabel('')
    newItemInputRef.current?.focus()
  }

  return (
    <AntdSelect
      aria-label={rest.name}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <div className="list__newItemWrapper">
            <BaseInput
              placeholder={addNewItemInputPlaceholder}
              className="newItemInput"
              ref={newItemInputRef}
              value={newItemLabel}
              onChange={handleNewItemLabelChange}
            />
            <Button type="text" icon={<PlusOutlinedIcon />} onClick={() => handleAddItem()}>
              {addNewItemButtonText}
            </Button>
          </div>
        </>
      )}
      allowClear
      options={items}
      {...rest}
    />
  )
}

export const List = withInputHelpers<BaseListProps>(BaseList)

export interface ListProps extends ComponentProps<typeof List> {}

// prettier-ignore
export const ListField = <Values=string,>(
  props: ComponentProps<typeof List> & Omit<FieldHookConfig<Values>, 'onChange' | 'onBlur'>
) => {
  const { name, validate, type, innerRef, onChange, onBlur, help, ...componentProps } = props
  const fieldProps: FieldHookConfig<Values> = { name, validate, type, innerRef }
  const [field, meta, helpers] = useField(fieldProps)

  const handleOnChange: ComponentProps<typeof List>['onChange'] = (value, option) => {
    helpers.setValue(value as Values)
    onChange && onChange(value, option)
  }

  const handleOnBlur: ComponentProps<typeof List>['onBlur'] = e => {
    field.onBlur(e)
    helpers.setTouched(true)
    onBlur && onBlur(e)
  }

  return (
    <List
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

export interface ListFieldProps extends ComponentProps<typeof ListField> {}
