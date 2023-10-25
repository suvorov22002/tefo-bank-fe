import { DateTime } from 'utils'
import { Calendar as AntdCalendar, CalendarProps as AntdCalendarProps } from 'antd'

export interface CalendarProps {
  value?: AntdCalendarProps<DateTime>['value']
  defaultValue?: AntdCalendarProps<DateTime>['defaultValue']
  mode?: AntdCalendarProps<DateTime>['mode']
  fullscreen?: AntdCalendarProps<DateTime>['fullscreen']
  locale?: AntdCalendarProps<DateTime>['locale']
  disabledDate?: AntdCalendarProps<DateTime>['disabledDate']
  onChange?: AntdCalendarProps<DateTime>['onChange']
  onPanelChange?: AntdCalendarProps<DateTime>['onPanelChange']
  onSelect?: AntdCalendarProps<DateTime>['onSelect']
  cellRender?: AntdCalendarProps<DateTime>['cellRender']
  fullCellRender?: AntdCalendarProps<DateTime>['fullCellRender']
  headerRender?: AntdCalendarProps<DateTime>['headerRender']
  rootClassName?: AntdCalendarProps<DateTime>['rootClassName']
  style?: AntdCalendarProps<DateTime>['style']
  className?: AntdCalendarProps<DateTime>['className']
}

export const Calendar = (props: CalendarProps) => {
  return <AntdCalendar {...props} />
}
