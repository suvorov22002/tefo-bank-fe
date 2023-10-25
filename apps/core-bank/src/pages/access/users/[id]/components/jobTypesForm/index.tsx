import { DateTime } from 'utils'
import { CheckboxField, DatePickerField, Form, FormProps, SelectField, formErrorUtils } from 'ui'

import { CreateUserJobTypeRequestData } from '@/domains/users'
import { useTranslation } from '@/i18n'

import styles from './styles.module.scss'

export interface UserJobTypesFormValues
  extends Omit<CreateUserJobTypeRequestData, 'validFrom' | 'validTo'> {
  validFrom: DateTime
  validTo: DateTime | null
}

//TODO: check this value after bank settings implementation
const DATE_FORMAT = 'DD.MM.YYYY'

export interface JobTypesFormProps {
  bankUnitOptions: { label: string; value: string }[] | undefined
  jobTypeOptions: { label: string; value: string }[] | undefined
  id: FormProps<UserJobTypesFormValues>['id']
  initialValues: FormProps<UserJobTypesFormValues>['initialValues']
  onSubmit: FormProps<UserJobTypesFormValues>['onSubmit']
}

export const JobTypesForm = (props: JobTypesFormProps) => {
  const { id, initialValues, bankUnitOptions, jobTypeOptions, onSubmit } = props

  const { t } = useTranslation(['common', 'access-users-[id]'])

  return (
    <Form<UserJobTypesFormValues>
      id={id}
      initialValues={initialValues}
      onSubmit={onSubmit}
      className={styles.jobTypesForm}
      enableReinitialize
      layout="vertical"
    >
      <SelectField
        name="unitId"
        label={t('access-users-[id]:tabs.jobTypes.forms.labels.unitId')}
        required
        options={bankUnitOptions}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
      />
      <CheckboxField
        name="includeSubordinatedUnits"
        label={t('access-users-[id]:tabs.jobTypes.forms.labels.includeSubordinatedUnits')}
      >
        {t('access-users-[id]:tabs.jobTypes.forms.labels.includeSubordinatedUnitsText')}
      </CheckboxField>
      <SelectField
        name="jobTypeId"
        label={t('access-users-[id]:tabs.jobTypes.forms.labels.jobTypeId')}
        required
        options={jobTypeOptions}
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
      />
      <div className={styles.jobTypesForm__dates}>
        <DatePickerField
          name="validFrom"
          placeholder={String(t('access-users-[id]:tabs.jobTypes.forms.labels.validFrom'))}
          format={DATE_FORMAT}
          required
          validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        />
        <DatePickerField
          name="validTo"
          placeholder={String(t('access-users-[id]:tabs.jobTypes.forms.labels.validTo'))}
          format={DATE_FORMAT}
        />
      </div>
    </Form>
  )
}
