import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Dropdown,
  Empty,
  EmptyDefaultSvg,
  FormHelpers,
  FormProps,
  INTEGRATED_RenderDynamicFields,
  PlusSquareOutlinedIcon,
  Table,
  TableColumnsType,
  handleApiError,
  useAppStatic,
  useModal,
  validationUtils,
} from 'ui'

import { DateTimeFormatConsts } from '@/consts'
import {
  CreateCustomFieldValidationRuleRequestData,
  EditCustomFieldValidationRuleRequestData,
  GetCustomFieldValidationRulesResponseData,
  useCustomFieldValidationRule,
  useCustomFieldValidationRules,
} from '@/domains/customFields'
import { TFunction, useTranslation } from '@/i18n'

import { getValidationRuleTypeOptionsByCustomFieldType } from './utils'
import styles from './styles.module.scss'
import { CustomFieldValidationRuleFormValues, ValidationRuleModal } from './components'

interface CustomFieldValidationTableRecord
  extends Omit<INTEGRATED_RenderDynamicFields.ValidationRule, 'status' | 'type'>,
    Record<string, unknown> {
  actions: JSX.Element
  status: JSX.Element
  type: string
}

const getCustomFieldValidationRuleTypeDisplay = (
  t: TFunction
): Record<INTEGRATED_RenderDynamicFields.ValidationRuleTypes, string> => ({
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Required]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.required'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Max]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.max'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Min]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.min'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxLength]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.maxLength'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinLength]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.minLength'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.AllowedCharacters]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.allowedCharacters'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Regex]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.pattern'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Email]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.email'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.PhoneNumber]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.phoneNumber'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinFuture]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.minFutureValue'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxFuture]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.maxFutureValue'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinPast]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.minPastValue'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxPast]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.maxPastValue'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.LessDate]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.lessThanDate'
  ),
  [INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MoreDate]: t(
    'custom-fields-[entity]-[id]:tabs.validation.validationRuleTypes.moreThanDate'
  ),
})

const getCustomFieldValidationTableColumns = (
  t: TFunction
): TableColumnsType<CustomFieldValidationTableRecord> => [
  {
    title: t('custom-fields-[entity]-[id]:tabs.validation.table.columns.titles.rule'),
    dataIndex: 'type',
    key: 'type',
    fixed: 'left',
  },
  {
    title: t('custom-fields-[entity]-[id]:tabs.validation.table.columns.titles.index'),
    dataIndex: 'priority',
    key: 'priority',
  },
  {
    title: t('custom-fields-[entity]-[id]:tabs.validation.table.columns.titles.status'),
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: t('common:tables.columns.titles.actions'),
    dataIndex: 'actions',
    key: 'actions',
    width: '80px',
    fixed: 'right',
  },
]

const getCustomFieldValidationRuleStatusDisplay = (
  t: TFunction
): Record<
  INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses,
  { label: string; status: BadgeProps['status'] }
> => ({
  [INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active]: {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleStatuses.active'),
    status: 'success',
  },
  [INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Inactive]: {
    label: t('custom-fields-[entity]-[id]:tabs.validation.validationRuleStatuses.inactive'),
    status: 'error',
  },
})

const getCustomFieldValidationRuleTableRowActions = (
  t: TFunction,
  record: GetCustomFieldValidationRulesResponseData[number],
  openValidationRuleModal: (
    props: GetCustomFieldValidationRulesResponseData[number] | undefined
  ) => void,
  openDeleteValidationRuleConfirmationModal: (
    validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
  ) => void
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () => openValidationRuleModal(record),
  },
  {
    key: 'delete',
    label: t('common:tables.rowActions.delete'),
    onClick: () => openDeleteValidationRuleConfirmationModal(record.id),
  },
]

interface CustomFieldValidationTabContentProps {
  customField: INTEGRATED_RenderDynamicFields.DynamicField
  selectedEntity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities
}

export const CustomFieldValidationTabContent = ({
  customField,
  selectedEntity,
}: CustomFieldValidationTabContentProps) => {
  const { t, ready } = useTranslation(['common', 'custom-fields-[entity]-[id]'])
  const { message, modal } = useAppStatic()
  const { getCustomFieldValidationRules } = useCustomFieldValidationRules(
    selectedEntity,
    customField.id
  )

  const {
    createCustomFieldValidationRule,
    editCustomFieldValidationRule,
    deleteCustomFieldValidationRule,
  } = useCustomFieldValidationRule(selectedEntity, customField.id)

  const handleDeleteCustomFieldValidationRule = (
    validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
  ) => {
    showSubmitMessage(0)

    return deleteCustomFieldValidationRule
      .mutateAsync(validationRuleId)
      .then(() => {
        showSuccessMessage()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const openDeleteConfirmationModal = (
    validationRuleId: INTEGRATED_RenderDynamicFields.ValidationRule['id']
  ) => {
    modal.confirm({
      title: t('common:modals.deleteConfirmationTitle'),
      content: t('common:modals.deleteConfirmationDescription'),
      cancelText: t('common:buttons.no'),
      onOk: () => handleDeleteCustomFieldValidationRule(validationRuleId),
      okText: t('common:buttons.yes'),
      okButtonProps: {
        danger: true,
        disabled: deleteCustomFieldValidationRule.isLoading,
      },
    })
  }

  const showSubmitMessage = (duration?: number | undefined) =>
    message.loading({
      key: 'submitMessage',
      content: t('common:notifications.inProgress'),
      duration,
    })

  const showSuccessMessage = () => message.success(t('common:notifications.success'))

  const {
    open: openValidationRuleModal,
    close: closeValidationRuleModal,
    isOpen: validationRuleModalIsOpen,
    props: validationRuleModalProps,
  } = useModal<GetCustomFieldValidationRulesResponseData[number]>()

  const normalizeCustomFieldValidationRuleFormValues = <
    T extends CreateCustomFieldValidationRuleRequestData | EditCustomFieldValidationRuleRequestData,
  >(
    values: T
  ): T => {
    const normalizedValues = { ...values }

    switch (values.type) {
      case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.LessDate:
      case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MoreDate:
        normalizedValues.value = {
          targetDate: normalizedValues.value.targetDate.format(
            DateTimeFormatConsts.DefaultDateTime
          ),
        }
        break
      case INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Email:
        normalizedValues.value = validationUtils.VALIDATE_EMAIL_REGEX
    }

    return normalizedValues
  }

  const handleCreateCustomFieldValidationRule = ({
    values,
    helpers,
  }: {
    values: CreateCustomFieldValidationRuleRequestData
    helpers: FormHelpers<CustomFieldValidationRuleFormValues>
  }) => {
    showSubmitMessage(0)

    return createCustomFieldValidationRule
      .mutateAsync(values)
      .then(() => {
        showSuccessMessage()
        closeValidationRuleModal()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const handleEditCustomFieldValidationRule = ({
    values,
    helpers,
  }: {
    values: EditCustomFieldValidationRuleRequestData
    helpers: FormHelpers<CustomFieldValidationRuleFormValues>
  }) => {
    return editCustomFieldValidationRule
      .mutateAsync(values)
      .then(() => {
        showSuccessMessage()
        closeValidationRuleModal()
      })
      .catch(e => {
        handleApiError(e.body, message.error, t, helpers)
      })
      .finally(() => {
        message.destroy('submitMessage')
      })
  }

  const handleSubmit: FormProps<CustomFieldValidationRuleFormValues>['onSubmit'] = (
    formValues,
    helpers
  ) => {
    if (validationRuleModalProps?.id) {
      const values = normalizeCustomFieldValidationRuleFormValues({
        ...validationRuleModalProps,
        ...formValues,
      } as EditCustomFieldValidationRuleRequestData)

      return handleEditCustomFieldValidationRule({ values, helpers })
    }

    const values = normalizeCustomFieldValidationRuleFormValues({
      ...formValues,
    } as CreateCustomFieldValidationRuleRequestData)

    return handleCreateCustomFieldValidationRule({ values, helpers })
  }

  const hasValidationRulesToAdd = !getValidationRuleTypeOptionsByCustomFieldType(
    customField.type,
    t
  ).every(
    validationRuleOption =>
      getCustomFieldValidationRules.data?.find(
        validationRule => validationRule.type === validationRuleOption.value
      )
  )

  const isLoading = !ready || getCustomFieldValidationRules.isLoading

  if (isLoading) {
    return null
  }

  const customFieldValidationTableColumns = getCustomFieldValidationTableColumns(t)
  const customFieldValidationRuleStatusDisplay = getCustomFieldValidationRuleStatusDisplay(t)
  const customFieldValidationRuleTypeDisplay = getCustomFieldValidationRuleTypeDisplay(t)

  return (
    <>
      {getCustomFieldValidationRules.data?.length ? (
        <Card
          className={styles.customFieldValidationTab__contentCard}
          title={t('custom-fields-[entity]-[id]:tabs.validation.subtitle')}
          extra={
            <Button
              icon={<PlusSquareOutlinedIcon />}
              onClick={() => openValidationRuleModal()}
              disabled={!hasValidationRulesToAdd}
            >
              {t('custom-fields-[entity]-[id]:tabs.validation.buttons.addValidation')}
            </Button>
          }
        >
          <Table<CustomFieldValidationTableRecord>
            columns={customFieldValidationTableColumns}
            dataSource={getCustomFieldValidationRules.data?.map(validationRule => ({
              ...validationRule,

              status: (
                <Badge
                  status={customFieldValidationRuleStatusDisplay[validationRule?.status]?.status}
                  text={customFieldValidationRuleStatusDisplay[validationRule?.status]?.label}
                />
              ),
              actions: (
                <Dropdown
                  menu={{
                    items: getCustomFieldValidationRuleTableRowActions(
                      t,
                      validationRule,
                      openValidationRuleModal,
                      openDeleteConfirmationModal
                    ),
                  }}
                >
                  <Button type="link">...</Button>
                </Dropdown>
              ),
              type: customFieldValidationRuleTypeDisplay[validationRule.type],
              key: validationRule.id,
            }))}
            pagination={false}
          />
        </Card>
      ) : (
        <Empty
          className={styles.customFieldValidationTab__empty}
          image={<EmptyDefaultSvg />}
          description={t('custom-fields-[entity]-[id]:tabs.validation.emptyDescription')}
        >
          <Button type="primary" size="large" onClick={() => openValidationRuleModal()}>
            {t('common:buttons.create')}
          </Button>
        </Empty>
      )}
      {getCustomFieldValidationRules.data && (
        <ValidationRuleModal
          open={validationRuleModalIsOpen}
          onCancel={closeValidationRuleModal}
          validationRule={validationRuleModalProps}
          validationRuleFormProps={{
            initialValues: {
              status: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active,
              type: null,
              priority: getCustomFieldValidationRules.data.length + 1,
              value: null,
            },
            onSubmit: handleSubmit,
            customField,
            addedValidationRules: getCustomFieldValidationRules.data,
          }}
        />
      )}
    </>
  )
}
