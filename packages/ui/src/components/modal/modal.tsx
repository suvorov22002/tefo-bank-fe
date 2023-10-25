import { Modal as AntdModal, ModalProps as AntdModalProps } from 'antd'

import { classes } from '../../utils'
import './styles.scss'

export interface ModalProps {
  open?: AntdModalProps['open']
  confirmLoading?: AntdModalProps['confirmLoading']
  title?: AntdModalProps['title']
  closable?: AntdModalProps['closable']
  centered?: AntdModalProps['centered']
  width?: AntdModalProps['width']
  footer?: AntdModalProps['footer']
  okText?: AntdModalProps['okText']
  okType?: AntdModalProps['okType']
  cancelText?: AntdModalProps['cancelText']
  maskClosable?: AntdModalProps['maskClosable']
  forceRender?: AntdModalProps['forceRender']
  okButtonProps?: AntdModalProps['okButtonProps']
  cancelButtonProps?: AntdModalProps['cancelButtonProps']
  destroyOnClose?: AntdModalProps['destroyOnClose']
  style?: AntdModalProps['style']
  wrapClassName?: AntdModalProps['wrapClassName']
  className?: AntdModalProps['className']
  getContainer?: AntdModalProps['getContainer']
  zIndex?: AntdModalProps['zIndex']
  bodyStyle?: AntdModalProps['bodyStyle']
  maskStyle?: AntdModalProps['maskStyle']
  mask?: AntdModalProps['mask']
  keyboard?: AntdModalProps['keyboard']
  closeIcon?: AntdModalProps['closeIcon']
  focusTriggerAfterClose?: AntdModalProps['focusTriggerAfterClose']
  children?: AntdModalProps['children']
  modalRender?: AntdModalProps['modalRender']
  onOk?: AntdModalProps['onOk']
  onCancel?: AntdModalProps['onCancel']
  afterClose?: AntdModalProps['afterClose']
}

export const Modal = ({ className, ...rest }: ModalProps) => {
  return <AntdModal {...rest} className={classes(className, 'modal')} />
}

Modal.useModal = AntdModal.useModal
Modal.destroyAll = AntdModal.destroyAll
Modal.config = AntdModal.config
Modal.info = AntdModal.info
Modal.success = AntdModal.success
Modal.error = AntdModal.error
Modal.warning = AntdModal.warning
Modal.confirm = AntdModal.confirm
