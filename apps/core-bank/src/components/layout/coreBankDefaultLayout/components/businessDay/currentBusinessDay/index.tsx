import { ClockCircleOutlinedIcon } from 'ui'
import { dateTimeUtils } from 'utils'
import { useEffect, useMemo } from 'react'

import { useBankSettingsClosures } from '@/domains/bankSettings'

import styles from './styles.module.scss'

const CURRENT_BUSINESS_DAY_CHECKING_INTERVAL = 60 * 1000

interface CurrentBusinessDayProps {
  businessDay: string
  refetchOpenBusinessDayDateData: () => void
}

export const CurrentBusinessDay = ({
  businessDay,
  refetchOpenBusinessDayDateData,
}: CurrentBusinessDayProps) => {
  const { getBankSettingsClosures } = useBankSettingsClosures()

  const currentBusinessDayDate = dateTimeUtils.dateTime(businessDay)

  const cutOffTime: [number, number] = useMemo(
    () => getBankSettingsClosures.data?.cutOffTime || [0, 0],
    [getBankSettingsClosures.data?.cutOffTime]
  )

  const cutOffDateTime = useMemo(
    () => dateTimeUtils.dateTime(businessDay).hour(cutOffTime[0]).minute(cutOffTime[1]).second(0),
    [businessDay, cutOffTime]
  )

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (dateTimeUtils.dateTime().isAfter(cutOffDateTime)) {
        refetchOpenBusinessDayDateData()
      }
    }, CURRENT_BUSINESS_DAY_CHECKING_INTERVAL)

    return () => clearInterval(intervalId)
  }, [cutOffDateTime, refetchOpenBusinessDayDateData])

  return (
    <div className={styles.currentBusinessDay}>
      <ClockCircleOutlinedIcon />
      {/* TODO: Replace the format during global date format handling implementation */}
      {currentBusinessDayDate.format('DD.MM.YYYY')}
    </div>
  )
}
