import { useState } from 'react'

export const useModal = <T>() => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [modalProps, setModalProps] = useState<T>()

  const open = (props?: T) => {
    setModalProps(props)
    setIsModalOpen(true)
  }
  const close = () => {
    setModalProps(undefined)
    setIsModalOpen(false)
  }

  return {
    open,
    close,
    props: modalProps,
    isOpen: isModalOpen,
  }
}
