import { useEffect } from 'react'
import { Form as AntdForm, FormProps as AntdFormProps } from 'antd'
import {
  FormikProps as DefaultFormikProps,
  Field,
  FieldArray,
  FieldProps,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
} from 'formik'

import { classes } from '../../../utils'
import './styles.scss'

export { FieldArray }

export type FormHelpers<TValues> = FormikHelpers<TValues>

export type FormikProps<T> = DefaultFormikProps<T>

export type FormValues = FormikValues

const FormikValidate = <TValues,>({
  formikProps,
  children,
}: {
  formikProps: FormikProps<TValues>
  children?: FormikConfig<TValues>['children']
}) => {
  const { values, validateForm } = formikProps

  useEffect(() => {
    setTimeout(() => validateForm())
  }, [values, validateForm])

  return <>{children}</>
}

type UIAntFormProps = {
  colon?: AntdFormProps['colon']
  labelAlign?: AntdFormProps['labelAlign']
  labelWrap?: AntdFormProps['labelWrap']
  labelCol?: AntdFormProps['labelCol']
  layout?: AntdFormProps['layout']
  requiredMark?: AntdFormProps['requiredMark']
  size?: AntdFormProps['size']
  wrapperCol?: AntdFormProps['wrapperCol']
  className?: AntdFormProps['className']
  style?: AntdFormProps['style']
  id?: AntdFormProps['id']
  role?: AntdFormProps['role']
}

type FormConfig<TValues> = {
  component?: FormikConfig<TValues>['component']
  children?: FormikConfig<TValues>['children']
  initialValues: FormikConfig<TValues>['initialValues']
  initialStatus?: FormikConfig<TValues>['initialStatus']
  initialErrors?: FormikConfig<TValues>['initialErrors']
  initialTouched?: FormikConfig<TValues>['initialTouched']
  onReset?: FormikConfig<TValues>['onReset']
  onSubmit: FormikConfig<TValues>['onSubmit']
  validate?: FormikConfig<TValues>['validate']
  innerRef?: FormikConfig<TValues>['innerRef']
  validateOnChange?: FormikConfig<TValues>['validateOnChange']
  validateOnBlur?: FormikConfig<TValues>['validateOnBlur']
  validateOnMount?: FormikConfig<TValues>['validateOnMount']
  isInitialValid?: FormikConfig<TValues>['isInitialValid']
  enableReinitialize?: FormikConfig<TValues>['enableReinitialize']
}

export interface FormProps<TValues> extends UIAntFormProps, FormConfig<TValues> {}

export const Form = <TValues extends FormValues>(props: FormProps<TValues>) => {
  const {
    colon,
    labelAlign,
    labelWrap,
    labelCol,
    layout,
    requiredMark,
    size,
    wrapperCol,
    className,
    style,
    id,
    role = 'form',
    // AntdForm props
    children,
    ...rest
  } = props

  const formikConfig: FormikConfig<TValues> = rest
  const antFormProps: UIAntFormProps = {
    colon,
    labelAlign,
    labelWrap,
    labelCol,
    layout,
    requiredMark,
    size,
    wrapperCol,
    role,
    style,
    id,
  }

  return (
    <Formik {...formikConfig}>
      {formikProps => (
        <Field>
          {({ form: { handleReset, handleSubmit } }: FieldProps) => (
            <AntdForm
              onReset={handleReset}
              onFinish={handleSubmit}
              className={classes('form', className)}
              {...antFormProps}
            >
              <FormikValidate<TValues> formikProps={formikProps}>
                {typeof children === 'function' ? children(formikProps) : children}
              </FormikValidate>
            </AntdForm>
          )}
        </Field>
      )}
    </Formik>
  )
}
