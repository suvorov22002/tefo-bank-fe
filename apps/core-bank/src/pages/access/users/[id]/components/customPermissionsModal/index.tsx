import { Button, Modal } from 'ui'

import { useAllJobTypesPermissions } from '@/domains/jobTypes'
import { useBankUnitsBasicInfo } from '@/domains/bankUnits'
import { useTranslation } from '@/i18n'

import { CustomPermissionsForm, CustomPermissionsFormProps } from '../customPermissionsForm'

const USER_CUSTOM_PERMISSION_FORM_ID = 'userCustomPermissionForm'

export interface CustomPermissionsModalProps {
  open: boolean
  loading: boolean
  customPermissionsFormProps: Omit<
    CustomPermissionsFormProps,
    'id' | 'bankUnitOptions' | 'allPermissionsTreeOptions'
  >
  onCancel: () => void
}

export const CustomPermissionsModal = (props: CustomPermissionsModalProps) => {
  const { open, loading, customPermissionsFormProps, onCancel } = props

  const { t } = useTranslation(['common', 'access-users-[id]'])
  const { getAllPermissionsTreeOptions } = useAllJobTypesPermissions({})
  const { bankUnitOptions } = useBankUnitsBasicInfo({})

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={onCancel}
      title={t('access-users-[id]:tabs.customPermissions.modals.create.title')}
      footer={[
        <Button
          key="okButton"
          type="primary"
          htmlType="submit"
          form={USER_CUSTOM_PERMISSION_FORM_ID}
          loading={loading}
        >
          {t('access-users-[id]:buttons.modalOkText')}
        </Button>,
      ]}
    >
      <CustomPermissionsForm
        id={USER_CUSTOM_PERMISSION_FORM_ID}
        bankUnitOptions={bankUnitOptions}
        allPermissionsTreeOptions={getAllPermissionsTreeOptions.data}
        {...customPermissionsFormProps}
      />
    </Modal>
  )
}
