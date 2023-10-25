import { ChangeEvent, ComponentProps, FocusEvent } from 'react'
import { FieldHookConfig, useField } from 'formik'

import { theme } from '../../theme'
import { withInputHelpers } from '../withInputHelpers'
import { BaseInput, BaseInputProps } from '../input'

import './styles.scss'

export interface BasePhoneNumberInputProps {
  codeInputProps?: BaseInputProps
  numberInputProps?: BaseInputProps
  disabled?: boolean
}

const BasePhoneNumberInput = ({
  codeInputProps,
  numberInputProps,
  disabled,
  ...rest
}: BasePhoneNumberInputProps) => {
  const { token } = theme.useToken()

  return (
    <div
      {...rest}
      className="phoneNumberInput"
      style={{
        backgroundColor: disabled ? token.colorBgContainerDisabled : undefined,
      }}
    >
      <BaseInput
        className="phoneNumberInput__codeInput"
        style={{
          backgroundColor: disabled ? 'unset' : undefined,
        }}
        disabled={disabled}
        {...codeInputProps}
      />
      <BaseInput
        className="phoneNumberInput__numberInput"
        style={{
          backgroundColor: disabled ? 'unset' : undefined,
        }}
        disabled={disabled}
        {...numberInputProps}
      />
    </div>
  )
}

export const PhoneNumberInput = withInputHelpers<BasePhoneNumberInputProps>(BasePhoneNumberInput)

export interface PhoneNumberInputProps extends ComponentProps<typeof PhoneNumberInput> {}

// prettier-ignore
export const PhoneNumberInputField = <Values=string,>({
  codeInputProps,
  numberInputProps,
  ...rest
}: {
  codeInputProps: BasePhoneNumberInputProps['codeInputProps'] & FieldHookConfig<Values>
  numberInputProps: BasePhoneNumberInputProps['numberInputProps'] & FieldHookConfig<Values>
} & Omit<PhoneNumberInputProps, 'codeInputProps' | 'numberInputProps'>) => {
  const {help, ...phoneNumberComponentProps} = rest
  const {name: codeInputName, validate: codeInputValidate, type: codeInputType, innerRef: codeInputInnerRef, ...codeComponentProps} = codeInputProps
  const {name: numberInputName, validate: numberInputValidate, type: numberInputType, innerRef: numberInputInnerRef, ...numberConponentProps} = numberInputProps
  const codeInputFieldProps:FieldHookConfig<Values> = {
    name: codeInputName,
    validate: codeInputValidate,
    type: codeInputType,
    innerRef: codeInputInnerRef,
  }

  const numberInputFieldProps:FieldHookConfig<Values> = {
    name: numberInputName,
    validate: numberInputValidate,
    type: numberInputType,
    innerRef: numberInputInnerRef,
  }


  const [codeInputField, codeInputMeta] = useField(codeInputFieldProps)
  const [numberInputField, numberInputMeta] = useField(numberInputFieldProps)

  const handleCodeInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    codeInputField.onChange(e)
    codeInputProps.onChange && codeInputProps.onChange(e)
  }

  const handleCodeInputOnBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    codeInputField.onBlur(e)
    codeInputProps.onBlur && codeInputProps.onBlur(e)
  }
  const handleNumberInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    numberInputField.onChange(e)
    numberInputProps.onChange && numberInputProps.onChange(e)
  }

  const handleNumberInputOnBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
    numberInputField.onBlur(e)
    numberInputProps.onBlur && numberInputProps.onBlur(e)
  }

  return (
    <PhoneNumberInput
     {...phoneNumberComponentProps}
      validateStatus={
        (codeInputMeta.touched && codeInputMeta.error) ||
        (numberInputMeta.touched && numberInputMeta.error)
          ? 'error'
          : undefined
      }
      help={
        (codeInputMeta.touched && codeInputMeta.error) ||
        (numberInputMeta.touched && numberInputMeta.error)
          ? codeInputMeta.error || numberInputMeta.error
          : help || undefined
      }
      codeInputProps={{
        ...codeInputField,
        ...codeComponentProps,
        onChange: handleCodeInputOnChange,
        onBlur: handleCodeInputOnBlur,
      }}
      numberInputProps={{
        ...numberInputField,
        ...numberConponentProps,
        onChange: handleNumberInputOnChange,
        onBlur: handleNumberInputOnBlur,
      }}
      
    />
  )
}

export type PhoneNumberInputFieldProps = ComponentProps<typeof PhoneNumberInputField>
