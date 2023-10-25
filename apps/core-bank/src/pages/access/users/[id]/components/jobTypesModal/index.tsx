import { Button, Modal } from 'ui'

import { useBankUnitsBasicInfo } from '@/domains/bankUnits'
import { useJobTypesBasicInfo } from '@/domains/jobTypes'
import { useTranslation } from '@/i18n'

import { JobTypesForm, JobTypesFormProps } from '../jobTypesForm'

const USER_JOB_TYPE_FORM_ID = 'userJobTypeFormId'

export interface JobTypesModalProps {
  open: boolean
  loading: boolean
  jobTypesFormProps: Omit<JobTypesFormProps, 'id' | 'bankUnitOptions' | 'jobTypeOptions'>
  onCancel: () => void
}

export const JobTypesModal = (props: JobTypesModalProps) => {
  const { open, loading, jobTypesFormProps, onCancel } = props

  const { t, ready } = useTranslation(['common', 'access-users-[id]'])
  const { bankUnitOptions } = useBankUnitsBasicInfo({})
  const { jobTypeOptions } = useJobTypesBasicInfo({})

  if (!ready) {
    return null
  }

  return (
    <Modal
      destroyOnClose
      open={open}
      onCancel={onCancel}
      title={t('access-users-[id]:tabs.jobTypes.modals.create.title')}
      footer={[
        <Button
          key="okButton"
          type="primary"
          htmlType="submit"
          form={USER_JOB_TYPE_FORM_ID}
          loading={loading}
        >
          {t('access-users-[id]:buttons.modalOkText')}
        </Button>,
      ]}
    >
      <JobTypesForm
        id={USER_JOB_TYPE_FORM_ID}
        bankUnitOptions={bankUnitOptions}
        jobTypeOptions={jobTypeOptions}
        {...jobTypesFormProps}
      />
    </Modal>
  )
}
