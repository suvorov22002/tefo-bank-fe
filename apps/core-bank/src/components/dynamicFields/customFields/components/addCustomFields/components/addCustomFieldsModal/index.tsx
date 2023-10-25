import { useState } from 'react'
import { INTEGRATED_RenderDynamicFields, Modal, Select } from 'ui'

import { useTranslation } from '@/i18n'

interface AddCustomFieldsModalProps {
  isOpen: boolean
  close: () => void
  onAdd: (field: INTEGRATED_RenderDynamicFields.DynamicField['code']) => void
  customFieldsToAdd: INTEGRATED_RenderDynamicFields.DynamicField[]
}

export const AddCustomFieldsModal = ({
  isOpen,
  close,
  onAdd,
  customFieldsToAdd,
}: AddCustomFieldsModalProps) => {
  const { t, ready } = useTranslation(['common'])

  const [selectedFieldCode, setSelectedFieldCode] = useState<
    INTEGRATED_RenderDynamicFields.DynamicField['code'] | null
  >(null)

  const handleClose = () => {
    setSelectedFieldCode(null)
    close()
  }

  const handleConfirm = () => {
    onAdd(selectedFieldCode as INTEGRATED_RenderDynamicFields.DynamicField['code'])
    handleClose()
  }

  if (!ready) {
    return null
  }

  return (
    <Modal
      open={isOpen}
      title={t('common:dynamicFields.addCustomFields.modal.title')}
      destroyOnClose
      onCancel={handleClose}
      okText={t('common:buttons.ok')}
      cancelText={t('common:buttons.cancel')}
      okButtonProps={{
        disabled: !selectedFieldCode,
      }}
      onOk={handleConfirm}
    >
      <Select
        labelCol={{ span: 24 }}
        value={selectedFieldCode}
        label={t('common:dynamicFields.addCustomFields.fields.fieldToAdd.label')}
        onChange={value => setSelectedFieldCode(value)}
        options={customFieldsToAdd?.map(field => ({ label: field.fieldName, value: field.code }))}
      />
    </Modal>
  )
}
