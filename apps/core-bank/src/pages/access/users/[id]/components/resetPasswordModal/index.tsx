import { Button, Modal, Text } from 'ui'

import { useTranslation } from '@/i18n'

export interface ResetPasswordModalProps {
  open: boolean
  onCancel: () => void
  otp?: string
}

export const ResetPasswordModal = (props: ResetPasswordModalProps) => {
  const { open, otp, onCancel } = props

  const { t } = useTranslation(['common', 'access-users-[id]'])

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={onCancel}
      title={t('access-users-[id]:modals.resetPassword.title')}
      footer={[
        <Button key="okButton" type="primary" onClick={onCancel}>
          {t('common:buttons.ok')}
        </Button>,
      ]}
    >
      <Text>{t('access-users-[id]:modals.resetPassword.otp')}</Text>
      <br />
      <Text copyable>{otp}</Text>
    </Modal>
  )
}
