import { DateTime } from 'utils'
import { Key } from 'react'
import {
  CheckboxField,
  DatePickerField,
  Form,
  FormProps,
  SelectField,
  TreeSelectField,
  formErrorUtils,
} from 'ui'

import { CreateUserCustomPermissionRequestData } from '@/domains/users'
import { PermissionsTreeOption } from '@/domains/jobTypes'
import { useTranslation } from '@/i18n'

import styles from './styles.module.scss'

const DATE_FORMAT = 'DD.MM.YYYY'

export interface NormalizedPermissionsTreeOption extends Record<string, unknown> {
  id: string
  key: Key
  title: string
  value: string
  children?: NormalizedPermissionsTreeOption[]
  selectable?: boolean
}

const normalizeAllPermissionsTreeOptions = (
  data: PermissionsTreeOption[] | undefined
): NormalizedPermissionsTreeOption[] =>
  (data || []).map(el => {
    if (Array.isArray(el.items)) {
      return {
        id: el.id,
        key: el.id,
        title: el.label,
        value: el.id,
        selectable: false,
        children: normalizeAllPermissionsTreeOptions(el.items),
      }
    } else {
      return { id: el.id, key: el.id, title: el.label, value: el.id }
    }
  })

export interface CustomPermissionsFormValues
  extends Omit<CreateUserCustomPermissionRequestData, 'validFrom' | 'validTo'> {
  validFrom: DateTime
  validTo: DateTime | null
}

export interface CustomPermissionsFormProps {
  bankUnitOptions: { label: string; value: string }[] | undefined
  allPermissionsTreeOptions: PermissionsTreeOption[] | undefined
  id: FormProps<CustomPermissionsFormValues>['id']
  initialValues: FormProps<CustomPermissionsFormValues>['initialValues']
  onSubmit: FormProps<CustomPermissionsFormValues>['onSubmit']
}

export const CustomPermissionsForm = (props: CustomPermissionsFormProps) => {
  const { id, initialValues, bankUnitOptions, allPermissionsTreeOptions, onSubmit } = props

  const { t } = useTranslation(['common', 'access-users-[id]'])

  const normalizedAllPermissionsTreeOptions =
    normalizeAllPermissionsTreeOptions(allPermissionsTreeOptions)

  return (
    <Form<CustomPermissionsFormValues>
      onSubmit={onSubmit}
      initialValues={initialValues}
      id={id}
      className={styles.customPermissionsForm}
      enableReinitialize
      layout="vertical"
    >
      {formProps => {
        return (
          <>
            <SelectField
              name="unitId"
              label={t('access-users-[id]:tabs.customPermissions.forms.labels.unitId')}
              required
              validate={formErrorUtils.required(t('common:forms.validations.required'))()}
              options={bankUnitOptions}
            />
            <CheckboxField
              name="includeSubordinatedUnits"
              label={t(
                'access-users-[id]:tabs.customPermissions.forms.labels.includeSubordinatedUnits'
              )}
            >
              {t(
                'access-users-[id]:tabs.customPermissions.forms.labels.includeSubordinatedUnitsText'
              )}
            </CheckboxField>
            <TreeSelectField
              name="permissionId"
              label={t('access-users-[id]:tabs.customPermissions.forms.labels.permissionId')}
              required
              validate={formErrorUtils.required(t('common:forms.validations.required'))()}
              treeData={normalizedAllPermissionsTreeOptions}
              showSearch
              treeExpandAction="click"
              treeNodeFilterProp="title"
              treeDefaultExpandedKeys={[formProps.values.permissionId]}
            />
            <div className={styles.customPermissionsForm__dates}>
              <DatePickerField
                name="validFrom"
                placeholder={String(
                  t('access-users-[id]:tabs.customPermissions.forms.labels.validFrom')
                )}
                format={DATE_FORMAT}
                required
                validate={formErrorUtils.required(t('common:forms.validations.required'))()}
              />
              <DatePickerField
                name="validTo"
                placeholder={String(
                  t('access-users-[id]:tabs.customPermissions.forms.labels.validTo')
                )}
                format={DATE_FORMAT}
              />
            </div>
          </>
        )
      }}
    </Form>
  )
}
