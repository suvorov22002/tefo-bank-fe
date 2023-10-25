import { useRouter } from 'next/router'
import {
  Button,
  Card,
  CheckboxField,
  Content,
  DatePickerField,
  Form,
  FormProps,
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

import { NextPageWithLayout } from '@/types'
import { getCoreBankDefaultLayout } from '@/components'
import { useOpenBusinessDay } from '@/domains/businessDays'
import { useTranslation } from '@/i18n'
import {
  CreateHolidayCalendarRequestData,
  HolidayCalendarStatus,
  useHolidayCalendar,
} from '@/domains/holidayCalendar'
import { DateTimeFormatConsts, RoutesConsts } from '@/consts'

import styles from './styles.module.scss'
import {
  DATE_FORMAT,
  getHolidayCalendarsDayTypeOptions,
  getHolidayCalendarsStatusOptions,
} from '../utils'

interface CreateHolidayCalendarFormValues extends Omit<CreateHolidayCalendarRequestData, 'date'> {
  date: DateTime
}

const CreateHolidayCalendar: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'holiday-calendar'])
  const { message } = useAppStatic()
  const { createHolidayCalendar } = useHolidayCalendar({})
  const { getOpenBusinessDayDate } = useOpenBusinessDay()

  const isLoading = !ready

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })
  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const handleCreateHolidayCalendarSubmit: FormProps<CreateHolidayCalendarFormValues>['onSubmit'] =
    async (values, helpers) => {
      showSubmitMessage(0)

      return createHolidayCalendar
        .mutateAsync({
          ...values,
          date: values.date.format(DateTimeFormatConsts.DefaultDateTime),
        })
        .then(() => {
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

  const CheckIfFormHasChanged = (dirty: boolean, isSubmitting: boolean) =>
    useUnsavedChangesWarning(
      dirty && !isSubmitting && !isLoading,
      t('common:notifications.unsavedChanges')
    )

  if (isLoading || !getOpenBusinessDayDate.data) {
    return <Spin fullscreen />
  }

  const holidayCalendarsDayTypeDisplay = getHolidayCalendarsDayTypeOptions(t)
  const holidayCalendarsStatusDisplay = getHolidayCalendarsStatusOptions(t)

  return (
    <div className={styles.createHolidayCalendar}>
      <Header
        title={t('holiday-calendar:title')}
        className={styles.createHolidayCalendar__header}
        onBack={() => router.push(RoutesConsts.HolidayCalendar)}
      />
      <Content>
        <Card
          title={t('holiday-calendar:createDayTitle')}
          className={styles.createHolidayCalendar__contentCard}
        >
          <Form<CreateHolidayCalendarFormValues>
            initialValues={
              {
                date: undefined,
                name: undefined,
                type: undefined,
                recurring: undefined,
                status: HolidayCalendarStatus.ACTIVE,
              } as unknown as CreateHolidayCalendarFormValues
            }
            onSubmit={handleCreateHolidayCalendarSubmit}
            enableReinitialize
            layout="vertical"
            size="large"
            className={styles.createHolidayCalendar__form}
          >
            {formProps => {
              return (
                <>
                  {CheckIfFormHasChanged(formProps.dirty, formProps.isSubmitting)}
                  <div className={styles.holidayCalendar__dates}>
                    <DatePickerField
                      name="date"
                      data-testid="dateId"
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
                    />
                  </div>
                  <InputField
                    name="name"
                    label={t('holiday-calendar:holidayCalendarTable.columns.titles.name')}
                  />
                  <SelectField
                    name="type"
                    label={t('holiday-calendar:holidayCalendarTable.columns.titles.type')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    options={holidayCalendarsDayTypeDisplay}
                  />
                  <CheckboxField name="recurring">
                    {t('holiday-calendar:holidayCalendarTable.columns.titles.recurring')}
                  </CheckboxField>
                  <SelectField
                    name="status"
                    label={t('holiday-calendar:holidayCalendarTable.columns.titles.status')}
                    required
                    validate={formErrorUtils.required(t('common:forms.validations.required'))()}
                    options={holidayCalendarsStatusDisplay}
                  />
                  <Button type="primary" htmlType="submit" block loading={formProps.isSubmitting}>
                    {t('common:buttons.create')}
                  </Button>
                </>
              )
            }}
          </Form>
        </Card>
      </Content>
    </div>
  )
}

CreateHolidayCalendar.getLayout = getCoreBankDefaultLayout

export default CreateHolidayCalendar
