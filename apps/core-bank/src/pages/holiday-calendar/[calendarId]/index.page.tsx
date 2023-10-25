import { useRouter } from 'next/router'
import {
  Button,
  Card,
  CheckboxField,
  Content,
  DatePickerField,
  EditFilledIcon,
  Form,
  FormHelpers,
  Header,
  InputField,
  SelectField,
  Spin,
  formErrorUtils,
  handleApiError,
  useAppStatic,
  useUnsavedChangesWarning,
} from 'ui'
import { DateTime, dateTimeUtils } from 'utils'
import { useEffect, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { getCoreBankDefaultLayout } from '@/components'
import { useOpenBusinessDay } from '@/domains/businessDays'
import { useTranslation } from '@/i18n'
import { DateTimeFormatConsts, RoutesConsts } from '@/consts'
import { EditHolidayCalendarRequestData, useHolidayCalendar } from '@/domains/holidayCalendar'

import styles from './styles.module.scss'
import {
  DATE_FORMAT,
  getHolidayCalendarsDayTypeOptions,
  getHolidayCalendarsStatusOptions,
} from '../utils'

export interface HolidayCalendarDetailsFormValues
  extends Omit<EditHolidayCalendarRequestData, 'date'> {
  date: DateTime
}

const HolidayCalendarDetails: NextPageWithLayout = () => {
  const router = useRouter()
  const holidayCalendarId = router.query.calendarId ? String(router.query.calendarId) : ''

  const { t, ready } = useTranslation(['common', 'holiday-calendar'])
  const { message } = useAppStatic()
  const { getHolidayCalendar, editHolidayCalendar } = useHolidayCalendar({
    calendarId: holidayCalendarId,
  })
  const { getOpenBusinessDayDate } = useOpenBusinessDay()

  const holidayCalendarExists =
    holidayCalendarId && getHolidayCalendar.isSuccess && getHolidayCalendar.data

  const isLoading = !ready || getHolidayCalendar.isLoading

  useEffect(() => {
    if (
      (!getHolidayCalendar.isLoading &&
        !holidayCalendarExists &&
        !getOpenBusinessDayDate.isLoading) ||
      getHolidayCalendar.isError ||
      getOpenBusinessDayDate.isError
    ) {
      router.back()
    }
  }, [
    getHolidayCalendar.isError,
    getHolidayCalendar.isLoading,
    router,
    holidayCalendarExists,
    getOpenBusinessDayDate,
  ])

  const [isHolidayCalendarDetailsFormInEditMode, setIsHolidayCalendarFormInEditMode] =
    useState<boolean>(!!router.query.isInitialModeEdit)

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleHolidayCalendarSubmit = async (
    values: HolidayCalendarDetailsFormValues,
    helpers: FormHelpers<HolidayCalendarDetailsFormValues>
  ) => {
    showSubmitMessage(0)

    return editHolidayCalendar
      .mutateAsync({
        ...getHolidayCalendar.data,
        ...values,
        date: values.date.format(DateTimeFormatConsts.DefaultDateTime),
      })
      .then(() => {
        setIsHolidayCalendarFormInEditMode(false)
        showSuccessMessage()
        router.push(RoutesConsts.HolidayCalendar)
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  if (isLoading || !getHolidayCalendar.data) {
    return <Spin fullscreen />
  }

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(dirty && !isSubmitting && !isLoading)

  const disabledForm = !isHolidayCalendarDetailsFormInEditMode || editHolidayCalendar.isLoading

  const holidayCalendarsDayTypeDisplay = getHolidayCalendarsDayTypeOptions(t)
  const holidayCalendarsStatusDisplay = getHolidayCalendarsStatusOptions(t)

  return (
    <div className={styles.holidayCalendar}>
      <Header
        title={t('holiday-calendar:title')}
        className={styles.holidayCalendar__header}
        onBack={() => router.push(RoutesConsts.HolidayCalendar)}
      />
      <Content>
        <Card
          title={getHolidayCalendar.data?.name}
          className={styles.countryDetails__contentCard}
          extra={
            <Button
              icon={<EditFilledIcon />}
              onClick={() => setIsHolidayCalendarFormInEditMode(true)}
              disabled={isHolidayCalendarDetailsFormInEditMode}
            >
              {t('common:buttons.edit')}
            </Button>
          }
        >
          <Form<HolidayCalendarDetailsFormValues>
            initialValues={
              {
                id: getHolidayCalendar.data.id,
                date: dateTimeUtils.dateTime(getHolidayCalendar.data?.date),
                name: getHolidayCalendar.data.name,
                type: getHolidayCalendar.data.type,
                recurring: getHolidayCalendar.data.recurring,
                status: getHolidayCalendar.data.status,
              } as unknown as HolidayCalendarDetailsFormValues
            }
            onSubmit={handleHolidayCalendarSubmit}
            layout="vertical"
            size="large"
            className={styles.holidayCalendar__form}
            enableReinitialize
          >
            {formProps => {
              return (
                <>
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <div className={styles.holidayCalendar__dates}>
                    <DatePickerField
                      name="date"
                      label={t('holiday-calendar:holidayCalendarTable.columns.titles.date')}
                      placeholder={String(
                        t('holiday-calendar:holidayCalendarTable.columns.titles.date')
                      )}
                      format={DATE_FORMAT}
                      required
                      validate={formErrorUtils.compose(
                        formErrorUtils.required(t('common:forms.validations.required'))(),
                        formErrorUtils.compareStrings(
                          t('holiday-calendar:errorMessages.sameBusinessDay', {
                            dateValueForm: dateTimeUtils
                              .dateTime(getOpenBusinessDayDate.data?.date)
                              .startOf('day')
                              .format(DATE_FORMAT),
                          })
                        )(
                          dateTimeUtils
                            .dateTime(getOpenBusinessDayDate.data?.date)
                            .startOf('day')
                            .format(DATE_FORMAT)
                        )
                      )}
                      disabled={disabledForm}
                    />
                  </div>
                  <InputField
                    name="name"
                    label={t('holiday-calendar:holidayCalendarTable.columns.titles.name')}
                    disabled={disabledForm}
                  />
                  <SelectField
                    name="type"
                    label={t('holiday-calendar:holidayCalendarTable.columns.titles.type')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    options={holidayCalendarsDayTypeDisplay}
                    disabled={disabledForm}
                  />
                  <CheckboxField name="recurring" disabled={disabledForm}>
                    {t('holiday-calendar:holidayCalendarTable.columns.titles.recurring')}
                  </CheckboxField>
                  <SelectField
                    name="status"
                    label={t('holiday-calendar:holidayCalendarTable.columns.titles.status')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    options={holidayCalendarsStatusDisplay}
                    disabled={disabledForm}
                  />
                  {isHolidayCalendarDetailsFormInEditMode && (
                    <div className={styles.holidayCalendar__controls}>
                      <Button
                        htmlType="reset"
                        disabled={formProps.isSubmitting}
                        onClick={() => {
                          formProps.resetForm()
                          setIsHolidayCalendarFormInEditMode(false)
                        }}
                      >
                        {t('common:buttons.cancel')}
                      </Button>
                      <Button
                        type="primary"
                        htmlType="submit"
                        block
                        loading={formProps.isSubmitting}
                        disabled={!formProps.dirty}
                      >
                        {t('common:buttons.save')}
                      </Button>
                    </div>
                  )}
                </>
              )
            }}
          </Form>
        </Card>
      </Content>
    </div>
  )
}

HolidayCalendarDetails.getLayout = getCoreBankDefaultLayout

export default HolidayCalendarDetails
