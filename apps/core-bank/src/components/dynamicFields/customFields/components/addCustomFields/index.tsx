import {
  Button,
  Divider,
  INTEGRATED_RenderDynamicFields,
  PlusSquareOutlinedIcon,
  useModal,
} from 'ui'

import { useTranslation } from '@/i18n'

import { AddCustomFieldsModal } from './components'
import styles from './styles.module.scss'

interface AddCustomFieldsProps {
  customFieldsToAdd: INTEGRATED_RenderDynamicFields.DynamicField[]
  onAddCustomField: (customFieldCode: INTEGRATED_RenderDynamicFields.DynamicField['code']) => void
}

export const AddCustomFields = ({ customFieldsToAdd, onAddCustomField }: AddCustomFieldsProps) => {
  const { t, ready } = useTranslation(['common'])

  const {
    open: openAddCustomFieldsModal,
    isOpen: isAddCustomFieldsModalOpen,
    close: closeAddCustomFieldsModal,
  } = useModal()

  if (!ready) {
    return null
  }

  return (
    <>
      <Divider />
      <Button
        block
        icon={<PlusSquareOutlinedIcon />}
        onClick={() => openAddCustomFieldsModal()}
        className={styles.addCustomFields__addCustomFieldButton}
        disabled={!customFieldsToAdd?.length}
      >
        {t('common:dynamicFields.addCustomFields.buttons.addCustomFieldButton')}
      </Button>
      <AddCustomFieldsModal
        customFieldsToAdd={customFieldsToAdd}
        isOpen={isAddCustomFieldsModalOpen}
        close={closeAddCustomFieldsModal}
        onAdd={onAddCustomField}
      />
    </>
  )
}
