import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../../button'
import { InputField } from '../input'
import { StoriesThemeWrapper } from '../../../__storybook__'
import { Form, FormProps } from './form'

type Values = {
  firstName: string
  lastName: string
}

export default {
  title: 'Form',
  component: Form,
  argTypes: {
    colon: {
      description:
        'Configure the default value of colon for Form.Item. Indicates whether the colon after the label is displayed (only effective when prop layout is horizontal)',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    labelAlign: {
      description: 'The text align of label of all items',
      table: {
        defaultValue: {
          summary: 'right',
        },
      },
    },
    labelWrap: {
      description: 'whether label can be wrap',
      table: {
        defaultValue: {
          summary: false,
        },
      },
    },
    labelCol: {
      description:
        'Label layout, like `<Col>` component. Set span offset value like `{span: 3, offset: 12}` or `sm: {span: 3, offset: 12}`',
    },
    layout: {
      description: 'Form layout',
      table: {
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    requiredMark: {
      description:
        'Required mark style. Can use required mark or optional mark. You can not config to single Form.Item since this is a Form level config',
      table: {
        defaultValue: {
          summary: true,
        },
      },
    },
    size: {
      description: 'Set field component size',
    },
    wrapperCol: {
      description: 'The layout for input controls, same as `labelCol`',
    },
    component: {
      description: 'Form component to render',
    },
    children: {
      description: 'React children or child render callback',
    },
    initialValues: {
      description: 'Form initial values',
    },
    initialStatus: {
      description: 'Initial status',
    },
    initialErrors: {
      description: 'Initial object map of field names to specific error for that field',
    },
    initialTouched: {
      description: 'Initial object map of field names to whether the field has been touched',
    },
    onReset: {
      description: 'Reset handler',
    },
    onSubmit: {
      description: 'Submission handler',
    },
    validate: {
      description:
        'Validation function. Must return an error object or promise that throws an error object where that object keys map to corresponding value.',
    },
    innerRef: {
      description: 'Inner ref',
    },
    validateOnChange: {
      description: "Whether validate the form on each input's onChange event",
    },
    validateOnBlur: {
      description: "Tells Formik to validate the form on each input's onBlur event",
    },
    validateOnMount: {
      description: 'Tells Formik to validate upon mount',
    },
    isInitialValid: {
      description: 'Tell Formik if initial form values are valid or not on first render',
    },
    enableReinitialize: {
      description: 'Should Formik reset the form when new initialValues change',
    },
  },
} as Meta<FormProps<Values>>

const Template: ComponentStory<typeof Form<Values>> = (args: FormProps<Values>) => (
  <StoriesThemeWrapper>
    <Form {...args} />
  </StoriesThemeWrapper>
)

const children: FormProps<Values>['children'] = () => (
  <>
    <InputField name="firstName" label="First name" required />
    <InputField name="lastName" label="Last name" required />
    <Button htmlType="submit">Submit</Button>
  </>
)

const initialValues = {
  firstName: '',
  lastName: '',
}

export const Default = Template.bind({})
export const WithFormLevelValidation = Template.bind({})

Default.args = {
  initialValues,
  children,
  onSubmit: values => {
    alert(JSON.stringify(values))
  },
}

WithFormLevelValidation.args = {
  initialValues,
  children,
  validate: values => {
    const errors: Partial<Values> = {}

    if (!values.firstName) errors.firstName = 'Required'
    if (!values.lastName) errors.lastName = 'Required'

    return errors
  },
}
