import {
  Button,
  Calendar,
  ClockCircleOutlinedIcon,
  Modal,
  Popconfirm,
  handleApiError,
  useAppStatic,
  useModal,
} from 'ui'
import { DateTime, dateTimeUtils } from 'utils'
import { useMemo, useState } from 'react'

import { DateTimeFormatConsts } from '@/consts'
import { useInitialBusinessDay } from '@/domains/businessDays'
import { useTranslation } from '@/i18n'

import styles from './styles.module.scss'

export const SetInitialBusinessDay = () => {
  const { t, ready } = useTranslation(['common', 'business-days'])
  const { message } = useAppStatic()

  const {
    open: openSetInitialBusinessDayModal,
    close: closeSetInitialBusinessDayModal,
    isOpen: setInitialBusinessDayModalIsOpen,
  } = useModal()

  const [activeMonthDate, setActiveMonthDate] = useState<DateTime>(dateTimeUtils.dateTime())
  const [selectedDate, setSelectedDate] = useState<DateTime>(dateTimeUtils.dateTime())

  const { getInitialBusinessDayAvailableSlots, setInitialBusinessDay } = useInitialBusinessDay({
    date: setInitialBusinessDayModalIsOpen
      ? activeMonthDate.format(DateTimeFormatConsts.DefaultDateTime)
      : '',
  })

  const selectedDateValid = useMemo(() => {
    if (!selectedDate || getInitialBusinessDayAvailableSlots.isLoading) return false

    const dateString = selectedDate.startOf('day').format(DateTimeFormatConsts.DefaultDateTime)

    return !!getInitialBusinessDayAvailableSlots.data?.includes(dateString)
  }, [
    getInitialBusinessDayAvailableSlots.data,
    selectedDate,
    getInitialBusinessDayAvailableSlots.isLoading,
  ])

  const handleCloseSetInitialBusinessDayModal = () => {
    setActiveMonthDate(dateTimeUtils.dateTime())
    setSelectedDate(dateTimeUtils.dateTime())
    closeSetInitialBusinessDayModal()
  }

  const showSuccessMessage = () => message.success(t('common:notifications.success'))
  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })

  const handleSetInitialBusinessDay = () => {
    if (!selectedDateValid) return

    showSubmitMessage(0)

    return setInitialBusinessDay
      .mutateAsync(selectedDate?.format(DateTimeFormatConsts.DefaultDateTime))
      .then(() => {
        showSuccessMessage()
        handleCloseSetInitialBusinessDayModal()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  if (!ready) {
    return null
  }

  return (
    <div className={styles.setInitialBusinessDay}>
      <Button size="small" danger onClick={() => openSetInitialBusinessDayModal()}>
        <ClockCircleOutlinedIcon />
        {t('business-days:buttons.setInitialBusinessDay')}
      </Button>
      <Modal
        destroyOnClose
        open={setInitialBusinessDayModalIsOpen}
        onCancel={handleCloseSetInitialBusinessDayModal}
        title={t('business-days:setInitialBusinessDayModal.title')}
        footer={[
          <Popconfirm
            key="okConfirmButton"
            title={t('business-days:popconfirms.canBeSetOnceTitle')}
            description={t('business-days:popconfirms.canBeSetOnceDescription')}
            okText={t('common:buttons.yes')}
            okButtonProps={{
              type: 'primary',
              danger: true,
              loading: setInitialBusinessDay.isLoading,
              onClick: handleSetInitialBusinessDay,
            }}
            cancelText={t('common:buttons.no')}
            cancelButtonProps={{
              loading: setInitialBusinessDay.isLoading,
            }}
          >
            <Button
              key="okButton"
              type="primary"
              disabled={!selectedDateValid}
              loading={setInitialBusinessDay.isLoading}
            >
              {t('common:buttons.ok')}
            </Button>
          </Popconfirm>,
        ]}
      >
        <Calendar
          fullscreen={false}
          mode="month"
          className={styles.setInitialBusinessDay__calendar}
          onPanelChange={date => setActiveMonthDate(date.startOf('day'))}
          value={selectedDate}
          onSelect={date => setSelectedDate(date.startOf('day'))}
          disabledDate={date =>
            !(getInitialBusinessDayAvailableSlots.data || [])?.some(el =>
              dateTimeUtils.dateTime(el).isSame(date, 'day')
            )
          }
        />
      </Modal>
    </div>
  )
}
