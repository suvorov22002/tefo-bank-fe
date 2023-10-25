import {
  FormikProps,
  INTEGRATED_RenderDynamicFields,
  SelectField,
  SelectFieldProps,
  formErrorUtils,
} from 'ui'

import { BankUnitBasicInfo, useBankUnitsBasicInfo } from '@/domains/bankUnits'
import { GetUsersDataItem, useAllUsers } from '@/domains/users'
import { TFunction, useTranslation } from '@/i18n'

import { customFieldEntitiesDataUrl } from '../../consts'
import { CreateCustomFieldFormValues, CustomFieldDetailsFormValues } from '../../types'

const getCustomFieldRemoteEntityEntityOptions = (t: TFunction): SelectFieldProps['options'] => {
  return [
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Account,
      label: t('custom-fields-create:entities.account'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Client,
      label: t('custom-fields-create:entities.client'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Contract,
      label: t('custom-fields-create:entities.contract'),
      disabled: true,
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
      label: t('custom-fields-create:entities.unit'),
    },
    {
      value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
      label: t('custom-fields-create:entities.user'),
    },
  ]
}

const getRemoteEntityDefaultValueOptionsByEntity = (
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
  data: {
    users: GetUsersDataItem[] | undefined
    bankUnits: BankUnitBasicInfo[] | undefined
  }
): SelectFieldProps['options'] => {
  switch (entity) {
    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
      return data.bankUnits?.map(bankUnit => ({
        label: bankUnit.name,
        value: bankUnit.id,
      }))

    case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
      return data.users?.map(user => ({
        label: user.userName,
        value: user.id,
      }))

    default:
      return []
  }
}

interface RemoteEntitySpecificFieldsProps {
  formProps: FormikProps<CreateCustomFieldFormValues> | FormikProps<CustomFieldDetailsFormValues>
  isInEditMode: boolean
  customField:
    | INTEGRATED_RenderDynamicFields.DynamicField<INTEGRATED_RenderDynamicFields.DynamicReferenceFieldProps>
    | undefined
}

export const RemoteEntitySpecificFields = ({
  formProps,
  isInEditMode,
  customField,
}: RemoteEntitySpecificFieldsProps) => {
  const { t, ready } = useTranslation(['common', 'custom-fields-create'])

  const entity = formProps.values.properties.entity

  const { getBankUnitsBasicInfo } = useBankUnitsBasicInfo({
    shouldQueryBankUnitsBasicInfo:
      entity === INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit,
  })

  const { getAllUsers } = useAllUsers({
    shouldQueryAllUsers: entity === INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User,
  })

  const isDetailsView = !!customField
  const isLoading = !ready

  const handleChangeEntity = (value: INTEGRATED_RenderDynamicFields.DynamicFieldEntities) => {
    formProps.setFieldValue('defaultValue', null)
    switch (value) {
      case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit:
        formProps.setFieldValue('properties', {
          url: customFieldEntitiesDataUrl[INTEGRATED_RenderDynamicFields.DynamicFieldEntities.Unit],
          keyField: 'name',
          valueField: 'id',
          entity: value,
          fields: ['name', 'id'],
        })
        break

      case INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User:
        formProps.setFieldValue('properties', {
          url: customFieldEntitiesDataUrl[INTEGRATED_RenderDynamicFields.DynamicFieldEntities.User],
          keyField: 'userName',
          valueField: 'id',
          entity: value,
          fields: ['userName', 'id'],
        })
    }
  }

  if (isLoading) {
    return null
  }

  return (
    <>
      <SelectField
        name="properties.entity"
        validate={formErrorUtils.required(t('common:forms.validations.required'))()}
        label={t('custom-fields-create:form.fields.referenceEntity.label')}
        options={getCustomFieldRemoteEntityEntityOptions(t)}
        extra={isDetailsView ? undefined : ' '}
        help={isDetailsView ? undefined : t('common:forms.helpMessages.canBeSetOnce')}
        disabled={formProps.isSubmitting || isDetailsView}
        onChange={value => {
          handleChangeEntity(value)
        }}
      />
      <SelectField
        name="defaultValue.value"
        showSearch
        disabled={formProps.isSubmitting || (isDetailsView && !isInEditMode)}
        filterOption={(input, option) =>
          String(option?.label ?? '')
            .toLowerCase()
            .includes(input.toLowerCase())
        }
        options={getRemoteEntityDefaultValueOptionsByEntity(entity, {
          users: getAllUsers.data,
          bankUnits: getBankUnitsBasicInfo.data,
        })}
        label={t('custom-fields-create:form.fields.defaultValue.label')}
      />
    </>
  )
}
