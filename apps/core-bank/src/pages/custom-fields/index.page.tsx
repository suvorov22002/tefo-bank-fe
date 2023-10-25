import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Checkbox,
  Content,
  Dropdown,
  Empty,
  EmptyPresentedImageSimple,
  Header,
  INTEGRATED_RenderDynamicFields,
  PlusSquareOutlinedIcon,
  Select,
  Spin,
  Table,
  TableColumnsAlignOptions,
  TableColumnsType,
  ThemeConfigProvider,
  usePagination,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { TFunction, useTranslation } from '@/i18n'
import { useAllCustomFieldGroups, useCustomFields } from '@/domains/customFields'

import { getCustomFieldsEntitiesOptions } from './consts'
import styles from './styles.module.scss'

const getCustomFieldStatusDisplay = (
  t: TFunction
): Record<
  INTEGRATED_RenderDynamicFields.DynamicFieldStatuses,
  { label: string; status: BadgeProps['status'] }
> => ({
  [INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active]: {
    label: t('custom-fields:customFieldsTable.customFieldStatuses.active'),
    status: 'success',
  },
  [INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Inactive]: {
    label: t('custom-fields:customFieldsTable.customFieldStatuses.inactive'),
    status: 'error',
  },
})

const getCustomFieldTableColumns = (t: TFunction): TableColumnsType<CustomFieldTableRecord> => [
  {
    title: t('custom-fields:customFieldsTable.columns.titles.code'),
    dataIndex: 'code',
    key: 'code',
    fixed: 'left',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.name'),
    dataIndex: 'fieldName',
    key: 'fieldName',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.dataType'),
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.independent'),
    dataIndex: 'isIndependent',
    key: 'isIndependent',
    align: TableColumnsAlignOptions.Center,
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.group'),
    dataIndex: 'groupName',
    key: 'groupName',
  },

  {
    title: t('custom-fields:customFieldsTable.columns.titles.index'),
    dataIndex: 'order',
    key: 'order',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.status'),
    dataIndex: 'status',
    key: 'status',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.createdAt'),
    dataIndex: 'createdAt',
    key: 'createdAt',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.updatedAt'),
    dataIndex: 'updatedAt',
    key: 'updatedAt',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.updatedBy'),
    dataIndex: 'updatedBy',
    key: 'updatedBy',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.approvedAt'),
    dataIndex: 'approvedAt',
    key: 'approvedAt',
  },
  {
    title: t('custom-fields:customFieldsTable.columns.titles.approvedBy'),
    dataIndex: 'approvedBy',
    key: 'approvedBy',
  },
  {
    title: t('common:tables.columns.titles.actions'),
    dataIndex: 'actions',
    key: 'actions',
    width: '80px',
    fixed: 'right',
  },
]

export const getCustomFieldsDataTypeDisplay = (
  t: TFunction
): Record<INTEGRATED_RenderDynamicFields.DynamicFieldTypes, ReactNode> => {
  return {
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Boolean]: t(
      'custom-fields:customFieldsTable.dataTypes.boolean'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Date]: t(
      'custom-fields:customFieldsTable.dataTypes.date'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DateTime]: t(
      'custom-fields:customFieldsTable.dataTypes.dateTime'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Decimal]: t(
      'custom-fields:customFieldsTable.dataTypes.decimal'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.DecimalPercent]: t(
      'custom-fields:customFieldsTable.dataTypes.decimalPercent'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Dictionary]: t(
      'custom-fields:customFieldsTable.dataTypes.dictionary'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Integer]: t(
      'custom-fields:customFieldsTable.dataTypes.integer'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.IntegerPercent]: t(
      'custom-fields:customFieldsTable.dataTypes.integerPercent'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List]: t(
      'custom-fields:customFieldsTable.dataTypes.list'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.PhoneNumber]: t(
      'custom-fields:customFieldsTable.dataTypes.phoneNumber'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text]: t(
      'custom-fields:customFieldsTable.dataTypes.string'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Checkbox]: t(
      'custom-fields:customFieldsTable.dataTypes.boolean'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedEntities]: t(
      'custom-fields:customFieldsTable.dataTypes.reference'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedEntity]: t(
      'custom-fields:customFieldsTable.dataTypes.reference'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedStructure]: t(
      'custom-fields:customFieldsTable.dataTypes.reference'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.RemoteEntities]: t(
      'custom-fields:customFieldsTable.dataTypes.reference'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.RemoteEntity]: t(
      'custom-fields:customFieldsTable.dataTypes.reference'
    ),
    [INTEGRATED_RenderDynamicFields.DynamicFieldTypes.EmbeddedStructures]: t(
      'custom-fields:customFieldsTable.dataTypes.reference'
    ),
  }
}

const getCustomFieldTableRowActions = (
  t: TFunction,
  router: NextRouter,
  customFieldId: INTEGRATED_RenderDynamicFields.DynamicField['id'],
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getCustomFieldDetailsRoute(entity, customFieldId),
        query: {
          isInitialModeEdit: true,
        },
      }),
  },
  {
    key: 'approve',
    label: t('common:tables.rowActions.approve'),
  },
  {
    key: 'inactivate',
    label: t('common:tables.rowActions.inactivate'),
  },
  {
    key: 'delete',
    label: t('common:tables.rowActions.delete'),
  },
]

interface CustomFieldTableRecord
  extends Pick<INTEGRATED_RenderDynamicFields.DynamicField, 'code' | 'fieldName' | 'order'>,
    Record<string, unknown> {
  status: ReactNode
  groupName: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['name'] | undefined
  required: ReactNode
  isIndependent: ReactNode
  actions: ReactNode
  source: INTEGRATED_RenderDynamicFields.DynamicField
}

const CustomFields: NextPageWithLayout = () => {
  const router = useRouter()
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'custom-fields'])

  const [selectedEntity, setSelectedEntity] =
    useState<INTEGRATED_RenderDynamicFields.DynamicFieldEntities | null>(
      (router.query.entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities) || null
    )

  const { getCustomFields } = useCustomFields(selectedEntity, {
    page: pagination.current,
    limit: pagination.pageSize,
  })

  const { getAllCustomFieldGroups } = useAllCustomFieldGroups(selectedEntity)

  const isLoading =
    !ready ||
    (selectedEntity && getCustomFields.isLoading) ||
    (selectedEntity && getAllCustomFieldGroups.isLoading)

  if (isLoading) {
    return <Spin fullscreen />
  }

  const customFieldTableColumns = getCustomFieldTableColumns(t)
  const customFieldStatusDisplay = getCustomFieldStatusDisplay(t)
  const customFieldsEntitiesOptions = getCustomFieldsEntitiesOptions(t)
  const customFieldsDataTypeDisplay = getCustomFieldsDataTypeDisplay(t)

  return (
    <div className={styles.customFields}>
      <Header
        title={t('custom-fields:title')}
        className={styles.customFields__header}
        extra={
          <>
            <div className={styles.customFields__entitySelectWrapper}>
              <Select
                options={customFieldsEntitiesOptions}
                value={selectedEntity}
                onChange={setSelectedEntity}
                placeholder={t('custom-fields:entitySelect.placeholder')}
              />
            </div>
          </>
        }
      />
      <Content>
        <Card
          title={t('custom-fields:subtitle')}
          className={styles.customFields__contentCard}
          extra={
            <Button
              icon={<PlusSquareOutlinedIcon />}
              onClick={() =>
                router.push({
                  pathname: RoutesConsts.CreateCustomField,
                  query: {
                    entity: selectedEntity,
                  },
                })
              }
            >
              {t('custom-fields:buttons.newCustomField')}
            </Button>
          }
        >
          <ThemeConfigProvider
            renderEmpty={() => {
              return (
                <Empty
                  image={EmptyPresentedImageSimple}
                  description={
                    selectedEntity
                      ? t('custom-fields:customFieldsTable.emptyNoAddedCustomFields')
                      : t('custom-fields:customFieldsTable.emptyNoSelectedEntity')
                  }
                />
              )
            }}
          >
            <Table<CustomFieldTableRecord>
              scroll={{ x: true }}
              columns={customFieldTableColumns}
              dataSource={getCustomFields.data?.data.map(customField => ({
                ...customField,
                key: customField.id,
                groupName: getAllCustomFieldGroups.data?.find(
                  ({ code }) => code === customField.groupCode
                )?.name,
                type: customFieldsDataTypeDisplay[customField.type],
                isIndependent: (
                  <Checkbox
                    name="isIndependent"
                    checked={customField.independent}
                    noStyle
                    disabled
                  />
                ),
                status: (
                  <Badge
                    status={customFieldStatusDisplay[customField.status].status}
                    text={customFieldStatusDisplay[customField.status].label}
                  />
                ),
                actions: (
                  <Dropdown
                    menu={{
                      items: getCustomFieldTableRowActions(
                        t,
                        router,
                        customField.id,
                        selectedEntity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities
                      ),
                    }}
                  >
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
                source: customField,
              }))}
              pagination={{
                ...pagination,
                total: getCustomFields.data?.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              onRow={customFieldTableRecord => ({
                onClick: () =>
                  router.push(
                    RoutesConsts.getCustomFieldDetailsRoute(
                      selectedEntity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
                      customFieldTableRecord.source.id
                    )
                  ),
              })}
            />
          </ThemeConfigProvider>
        </Card>
      </Content>
    </div>
  )
}

CustomFields.getLayout = getCoreBankDefaultLayout

export default CustomFields
