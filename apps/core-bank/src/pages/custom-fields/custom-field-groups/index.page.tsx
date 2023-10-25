import { useState } from 'react'
import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Content,
  Dropdown,
  Empty,
  EmptyDefaultSvg,
  EmptyPresentedImageSimple,
  Header,
  INTEGRATED_RenderDynamicFields,
  PlusSquareOutlinedIcon,
  Select,
  Spin,
  Table,
  TableColumnsType,
  ThemeConfigProvider,
  usePagination,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { useCustomFieldGroups } from '@/domains/customFields'
import { TFunction, useTranslation } from '@/i18n'

import { getCustomFieldsEntitiesOptions } from '../consts'
import styles from './styles.module.scss'

const getCustomFieldGroupStatusDisplay = (
  t: TFunction
): Record<
  INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses,
  { label: string; status: BadgeProps['status'] }
> => ({
  [INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Active]: {
    label: t('custom-field-groups:customFieldGroupsTable.customFieldGroupStatuses.active'),
    status: 'success',
  },
  [INTEGRATED_RenderDynamicFields.DynamicFieldGroupStatuses.Inactive]: {
    label: t('custom-field-groups:customFieldGroupsTable.customFieldGroupStatuses.inactive'),
    status: 'error',
  },
})

const getCustomFieldGroupTableColumns = (
  t: TFunction
): TableColumnsType<CustomFieldGroupTableRecord> => [
  {
    title: t('custom-field-groups:customFieldGroupsTable.columns.titles.name'),
    dataIndex: 'name',
    key: 'name',
    fixed: 'left',
  },
  {
    title: t('custom-field-groups:customFieldGroupsTable.columns.titles.index'),
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: t('custom-field-groups:customFieldGroupsTable.columns.titles.status'),
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

const getCustomFieldGroupTableRowActions = (
  t: TFunction,
  router: NextRouter,
  customFieldGroupId: INTEGRATED_RenderDynamicFields.DynamicFieldGroup['id'],
  entity: INTEGRATED_RenderDynamicFields.DynamicFieldEntities
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getCustomFieldGroupDetailsRoute(entity, customFieldGroupId),
        query: {
          isInitialModeEdit: true,
        },
      }),
  },
  {
    key: 'delete',
    label: t('common:tables.rowActions.delete'),
  },
]

interface CustomFieldGroupTableRecord
  extends Pick<INTEGRATED_RenderDynamicFields.DynamicFieldGroup, 'index' | 'name'>,
    Record<string, unknown> {
  status: JSX.Element
  source: INTEGRATED_RenderDynamicFields.DynamicFieldGroup
}

const CustomFieldGroups: NextPageWithLayout = () => {
  const router = useRouter()
  const pagination = usePagination()
  const { t, ready } = useTranslation(['common', 'custom-field-groups', 'custom-fields'])

  const [selectedEntity, setSelectedEntity] =
    useState<INTEGRATED_RenderDynamicFields.DynamicFieldEntities | null>(
      (router.query.entity as INTEGRATED_RenderDynamicFields.DynamicFieldEntities) || null
    )

  const { getCustomFieldGroups } = useCustomFieldGroups(selectedEntity, {
    page: pagination.current,
    limit: pagination.pageSize,
  })

  const isLoading = !ready || (selectedEntity && getCustomFieldGroups.isLoading)

  if (isLoading) {
    return <Spin fullscreen />
  }

  const customFieldGroupStatusDisplay = getCustomFieldGroupStatusDisplay(t)
  const customFieldGroupTableColumns = getCustomFieldGroupTableColumns(t)
  const customFieldsEntitiesOptions = getCustomFieldsEntitiesOptions(t)

  return (
    <div className={styles.customFieldGroups}>
      <Header
        title={t('custom-field-groups:title')}
        className={styles.customFieldGroups__header}
        extra={
          <>
            {selectedEntity && (
              <div className={styles.customFieldGroups__entitySelectWrapper}>
                <Select
                  options={customFieldsEntitiesOptions}
                  value={selectedEntity}
                  onChange={setSelectedEntity}
                  placeholder={t('custom-fields:entitySelect.placeholder')}
                />
              </div>
            )}
          </>
        }
      />

      <Content>
        {selectedEntity ? (
          <Card
            className={styles.customFieldGroups__contentCard}
            title={t('custom-field-groups:subtitle')}
            extra={
              <Button
                icon={<PlusSquareOutlinedIcon />}
                onClick={() =>
                  router.push({
                    pathname: RoutesConsts.CreateCustomFieldGroup,
                    query: {
                      entity: selectedEntity,
                    },
                  })
                }
              >
                {t('custom-field-groups:buttons.addGroup')}
              </Button>
            }
          >
            <ThemeConfigProvider
              renderEmpty={() => {
                return (
                  <Empty
                    image={EmptyPresentedImageSimple}
                    description={t('custom-field-groups:emptyNoCustomFieldGroups.description')}
                  />
                )
              }}
            >
              <Table<CustomFieldGroupTableRecord>
                scroll={{ x: true }}
                columns={customFieldGroupTableColumns}
                dataSource={getCustomFieldGroups.data?.data.map(customFieldGroup => ({
                  ...customFieldGroup,
                  key: customFieldGroup.id,
                  status: (
                    <Badge
                      status={customFieldGroupStatusDisplay[customFieldGroup.status]?.status}
                      text={customFieldGroupStatusDisplay[customFieldGroup.status]?.label}
                    />
                  ),
                  actions: (
                    <Dropdown
                      menu={{
                        items: getCustomFieldGroupTableRowActions(
                          t,
                          router,
                          customFieldGroup.id,
                          selectedEntity
                        ),
                      }}
                    >
                      <Button type="link">...</Button>
                    </Dropdown>
                  ),
                  source: customFieldGroup,
                }))}
                onRow={customFieldGroup => ({
                  onClick: () =>
                    router.push(
                      RoutesConsts.getCustomFieldGroupDetailsRoute(
                        selectedEntity,
                        customFieldGroup.source.id
                      )
                    ),
                })}
                pagination={{
                  ...pagination,
                  total: getCustomFieldGroups.data?.totalItems,
                  showTotal: (total, range) =>
                    t('common:tables.pagination.totalItems', {
                      from: range[0],
                      to: range[1],
                      total,
                    }),
                }}
              />
            </ThemeConfigProvider>
          </Card>
        ) : (
          <Empty
            className={styles.customFieldGroups__empty}
            image={<EmptyDefaultSvg />}
            description={t('custom-field-groups:emptyNoSelectedEntity.description')}
          >
            <div className={styles.customFieldGroups__entitySelectWrapper}>
              <Select
                options={customFieldsEntitiesOptions}
                value={selectedEntity}
                onChange={setSelectedEntity}
                placeholder={t('custom-fields:entitySelect.placeholder')}
              />
            </div>
          </Empty>
        )}
      </Content>
    </div>
  )
}

CustomFieldGroups.getLayout = getCoreBankDefaultLayout

export default CustomFieldGroups
