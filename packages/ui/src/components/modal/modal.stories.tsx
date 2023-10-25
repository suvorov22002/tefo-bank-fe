import { useState } from 'react'
import { ComponentStory, Meta } from '@storybook/react'

import { Button } from '../button'
import { Modal, ModalProps } from './modal'
import {
  StoriesThemeWrapper,
  disableArgTypesTableControl,
  setArgTypesNumberControl,
} from '../../__storybook__'

export default {
  title: 'Modal',
  component: Modal,
  argTypes: {
    open: {
      description: 'Whether the modal dialog is visible or not',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    confirmLoading: {
      description: 'Whether to apply loading visual effect for OK button or not',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    title: {
      ...disableArgTypesTableControl,
      description: `The modal dialog's title`,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    closable: {
      description:
        'Whether a close (x) button is visible on top right of the confirm dialog or not',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    centered: {
      description: 'Centered Modal',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    width: {
      ...setArgTypesNumberControl,
      description: 'Width of the modal dialog',
      table: {
        defaultValue: {
          summary: '416',
        },
      },
    },
    footer: {
      description: `Footer content, set as footer: null when you don't need default buttons`,
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    okText: {
      ...disableArgTypesTableControl,
      description: 'Text of the OK button',
      table: {
        defaultValue: {
          summary: 'OK',
        },
      },
    },
    okType: {
      description: 'Button type of the OK button',
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
    cancelText: {
      ...disableArgTypesTableControl,
      description: 'Text of the Cancel button with Modal.confirm',
      table: {
        defaultValue: {
          summary: 'Cancel',
        },
      },
    },
    maskClosable: {
      description:
        'Whether to close the modal dialog when the mask (area outside the modal) is clicked',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    forceRender: {
      description: 'Force render Modal',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    okButtonProps: {
      ...disableArgTypesTableControl,
      description: 'The ok button props',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    cancelButtonProps: {
      ...disableArgTypesTableControl,
      description: 'The cancel button props',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    destroyOnClose: {
      description: 'Whether to unmount child components on onClose',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    style: {
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    wrapClassName: {
      description: 'The class name of the container of the modal dialog',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    className: {
      description: 'The className of container',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    getContainer: {
      ...disableArgTypesTableControl,
      description: 'Return the mount node for Modal',
      table: {
        defaultValue: {
          summary: 'document.body',
        },
      },
    },
    zIndex: {
      description: 'The z-index of the Modal',
      table: {
        defaultValue: {
          summary: '1000',
        },
      },
    },
    bodyStyle: {
      ...disableArgTypesTableControl,
      description: 'Body style for modal body element. Such as height, padding etc',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    maskStyle: {
      ...disableArgTypesTableControl,
      description: `Style for modal's mask element`,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    mask: {
      description: 'Whether show mask or not',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    keyboard: {
      description: 'Whether support press esc to close',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    closeIcon: {
      ...disableArgTypesTableControl,
      description: 'Custom close icon',
      table: {
        defaultValue: {
          summary: 'undefined',
        },
      },
    },
    focusTriggerAfterClose: {
      description: 'Whether need to focus trigger element after dialog is closed',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    children: {
      ...disableArgTypesTableControl,
      description: 'Inner content',
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    modalRender: {
      description: 'Custom modal content render',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onOk: {
      description: 'Specify a function that will be called when a user clicks the OK button',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    onCancel: {
      description:
        'Specify a function that will be called when the user clicks the Cancel button. The parameter of this function is a function whose execution should include closing the dialog. If the function does not take any parameter (!onCancel.length) then modal dialog will be closed unless returned value is true (!!onCancel()). You can also just return a promise and when the promise is resolved, the modal dialog will also be closed',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
    afterClose: {
      description: 'Specify a function that will be called when modal is closed completely',
      ...disableArgTypesTableControl,
      table: {
        defaultValue: {
          summary: '-',
        },
      },
    },
  },
} as Meta<ModalProps>

const Template: ComponentStory<typeof Modal> = (args: ModalProps) => {
  const [open, setOpen] = useState(false)

  return (
    <StoriesThemeWrapper>
      <Modal
        {...args}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        open={open}
      ></Modal>
      <Button type="primary" onClick={() => setOpen(true)}>
        Open Modal
      </Button>
    </StoriesThemeWrapper>
  )
}

export const Basic = Template.bind({})
export const Custom = Template.bind({})

Basic.args = {
  children: (
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>
  ),
}

Custom.args = {
  title: 'Modal Title',
  children: (
    <>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </>
  ),
  okText: 'Custom Ok text',
  cancelText: 'Custom Cancel text',
}
