import { ReactNode } from 'react'
import {
  Badge,
  BadgeProps,
  Button,
  Card,
  Content,
  Dropdown,
  Empty,
  EmptyDefaultSvg,
  Header,
  PlusSquareOutlinedIcon,
  Spin,
  Table,
  TableColumnsType,
  usePagination,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'

import { NextPageWithLayout } from '@/types'
import { RoutesConsts } from '@/consts'
import { getCoreBankDefaultLayout } from '@/components'
import { Country, CountryStatus, useCountries } from '@/domains/countries'
import { TFunction, useTranslation } from '@/i18n'

import styles from './styles.module.scss'

interface CountriesTableRecord extends Omit<Country, 'status'> {
  source: Country
  status: ReactNode
}

const getCountryStatusDisplay = (
  t: TFunction
): Record<Country['status'], { label: string; status: BadgeProps['status'] }> => ({
  [CountryStatus.ACTIVE]: {
    label: t('countries:countriesTable.countryStatuses.active'),
    status: 'success',
  },
  [CountryStatus.INACTIVE]: {
    label: t('countries:countriesTable.countryStatuses.inactive'),
    status: 'error',
  },
})

const getCountriesTableColumns = (t: TFunction): TableColumnsType<CountriesTableRecord> => [
  {
    title: t('countries:countriesTable.columns.titles.shortName'),
    dataIndex: 'shortName',
    key: 'shortName',
    fixed: 'left',
  },
  {
    title: t('countries:countriesTable.columns.titles.name'),
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: t('countries:countriesTable.columns.titles.ISOAlpha3Code'),
    dataIndex: 'ISOAlpha3Code',
    key: 'ISOAlpha3Code',
  },
  {
    title: t('countries:countriesTable.columns.titles.ISOAlpha2Code'),
    dataIndex: 'ISOAlpha2Code',
    key: 'ISOAlpha2Code',
  },
  {
    title: t('countries:countriesTable.columns.titles.ISONumericCode'),
    dataIndex: 'ISONumericCode',
    key: 'ISONumericCode',
  },
  {
    title: t('countries:countriesTable.columns.titles.phoneCode'),
    dataIndex: 'phoneCode',
    key: 'phoneCode',
  },
  {
    title: t('countries:countriesTable.columns.titles.status'),
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

const getCountriesTableRowActions = (
  t: TFunction,
  router: NextRouter,
  countryId: Country['id']
) => [
  {
    key: 'edit',
    label: t('common:tables.rowActions.edit'),
    onClick: () =>
      router.push({
        pathname: RoutesConsts.getCountryRoute(String(countryId)),
        query: {
          isInitialModeEdit: true,
        },
      }),
  },
]

const Countries: NextPageWithLayout = () => {
  const router = useRouter()
  const { t, ready } = useTranslation(['common', 'countries'])
  const pagination = usePagination()

  const { getCountries } = useCountries({ page: pagination.current, limit: pagination.pageSize })

  const isLoading = !ready || getCountries.isLoading

  if (isLoading) {
    return <Spin fullscreen />
  }

  const countryStatusDisplay = getCountryStatusDisplay(t)
  const countriesTableColumns = getCountriesTableColumns(t)

  return (
    <div className={styles.countries}>
      <Header title={t('countries:title')} className={styles.countries__header} />
      <Content>
        {getCountries.data?.data.length ? (
          <Card
            className={styles.countries__contentCard}
            title={t('countries:subtitle')}
            extra={
              <>
                <Button
                  icon={<PlusSquareOutlinedIcon />}
                  onClick={() => router.push(RoutesConsts.CreateCountry)}
                >
                  {t('countries:buttons.addNewCountry')}
                </Button>
              </>
            }
          >
            <Table<CountriesTableRecord>
              scroll={{ x: true }}
              columns={countriesTableColumns}
              pagination={{
                ...pagination,
                total: getCountries.data.totalItems,
                showTotal: (total, range) =>
                  t('common:tables.pagination.totalItems', { from: range[0], to: range[1], total }),
              }}
              dataSource={getCountries.data.data.map(country => ({
                ...country,
                key: country.id,
                source: country,
                status: (
                  <Badge
                    status={countryStatusDisplay[country.status].status}
                    text={countryStatusDisplay[country.status].label}
                  />
                ),
                actions: (
                  <Dropdown menu={{ items: getCountriesTableRowActions(t, router, country.id) }}>
                    <Button type="link">...</Button>
                  </Dropdown>
                ),
              }))}
              onRow={record => ({
                onClick: () => router.push(RoutesConsts.getCountryRoute(String(record.source.id))),
              })}
            />
          </Card>
        ) : (
          <Empty
            className={styles.countries__empty}
            image={<EmptyDefaultSvg />}
            description={t('countries:empty.noCountries')}
          >
            <Button
              type="primary"
              size="large"
              onClick={() => router.push(RoutesConsts.CreateCountry)}
            >
              {t('common:buttons.create')}
            </Button>
          </Empty>
        )}
      </Content>
    </div>
  )
}

Countries.getLayout = getCoreBankDefaultLayout

export default Countries
