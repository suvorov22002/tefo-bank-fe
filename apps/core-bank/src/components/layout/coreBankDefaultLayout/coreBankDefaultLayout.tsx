import { WithAuth } from 'auth'
import {
  Button,
  DashboardOutlinedIcon,
  INTEGRATED_RenderDynamicFields,
  Layout,
  Menu,
  MenuFoldOutlinedIcon,
  MenuProps,
  MenuUnfoldOutlinedIcon,
  Sider,
} from 'ui'
import { NextRouter, useRouter } from 'next/router'
import { ReactNode, useState } from 'react'

import { RoutesConsts } from '@/consts'
import { TFunction, useTranslation } from '@/i18n'

import { CoreBankDefaultHeader } from './components'
import { WithUiSettings } from '../../withUiSettings'

import styles from './styles.module.scss'

const SIDER_WIDTH = 208
const SIDER_COLLAPSED_WIDTH = 56
const HEADER_HEIGHT = 56

export const getNavigationItems = (t: TFunction, router: NextRouter): MenuProps['items'] => [
  {
    key: 0,
    icon: <DashboardOutlinedIcon />,
    label: t('common:navigation.links.administration'),
    children: [
      {
        key: RoutesConsts.Customers,
        label: t('common:navigation.links.customers'),
        onClick: () => router.push(RoutesConsts.Customers),
      },
      {
        key: RoutesConsts.BankProfile,
        label: t('common:navigation.links.profile'),
        onClick: () => router.push(RoutesConsts.BankProfile),
      },
      {
        key: RoutesConsts.BankSettings,
        label: t('common:navigation.links.settings'),
        onClick: () => router.push(RoutesConsts.BankSettings),
      },
      {
        key: 3,
        label: t('common:navigation.links.structure'),
        children: [
          {
            key: RoutesConsts.BankUnitTypes,
            label: t('common:navigation.links.unitTypes'),
            onClick: () => router.push(RoutesConsts.BankUnitTypes),
          },
          {
            key: RoutesConsts.BankUnits,
            label: t('common:navigation.links.unit'),
            onClick: () => router.push(RoutesConsts.BankUnits),
          },
        ],
      },
      {
        key: RoutesConsts.CustomFields,
        label: t('common:navigation.links.customFields'),
        onClick: () => router.push(RoutesConsts.CustomFields),
      },
      {
        key: RoutesConsts.CustomFieldGroups,
        label: t('common:navigation.links.customFieldGroups'),
        onClick: () => router.push(RoutesConsts.CustomFieldGroups),
      },
      {
        key: RoutesConsts.Dictionaries,
        label: t('common:navigation.links.dataDictionaries'),
        onClick: () => router.push(RoutesConsts.Dictionaries),
      },
      {
        key: RoutesConsts.Currencies,
        label: t('common:navigation.links.currencies'),
        onClick: () => router.push(RoutesConsts.Currencies),
      },
      {
        key: 9,
        label: t('common:navigation.links.eod'),
      },
      {
        key: 10,
        label: t('common:navigation.links.access'),
        children: [
          {
            key: RoutesConsts.Users,
            label: t('common:navigation.links.users'),

            onClick: () => router.push(RoutesConsts.Users),
          },
          {
            key: RoutesConsts.JobTypes,
            label: t('common:navigation.links.jobTypes'),
            onClick: () => router.push(RoutesConsts.JobTypes),
          },
        ],
      },
      {
        key: RoutesConsts.Countries,
        label: t('common:navigation.links.countries'),
        onClick: () => router.push(RoutesConsts.Countries),
      },
      {
        key: RoutesConsts.HolidayCalendar,
        label: t('common:navigation.links.holidayCalendar'),
        onClick: () => router.push(RoutesConsts.HolidayCalendar),
      },
    ],
  },
]

const getActiveKeys = (pathname: string) => {
  switch (pathname) {
    case RoutesConsts.Home:
      return [RoutesConsts.BankProfile]

    case RoutesConsts.CreateBankUnit:
    case RoutesConsts.BankUnits:
    case RoutesConsts.getBankUnitRoute('[unitId]'):
      return [RoutesConsts.BankUnits]

    case RoutesConsts.CreateBankUnitType:
    case RoutesConsts.BankUnitTypes:
    case RoutesConsts.getBankUnitTypeRoute('[id]'):
      return [RoutesConsts.BankUnitTypes]

    case RoutesConsts.Dictionaries:
    case RoutesConsts.CreateDictionary:
    case RoutesConsts.getDictionaryRoute('[dictionaryId]'):
    case RoutesConsts.getDictionaryAddValueRoute('[dictionaryId]'):
    case RoutesConsts.getDictionaryValueRoute('[dictionaryId]', '[valueId]'):
      return [RoutesConsts.Dictionaries]

    case RoutesConsts.Users:
    case RoutesConsts.CreateUser:
    case RoutesConsts.getUserRoute('[id]'):
      return [RoutesConsts.Users]

    case RoutesConsts.JobTypes:
    case RoutesConsts.CreateJobType:
    case RoutesConsts.getJobTypeRoute('[jobTypeId]'):
      return [RoutesConsts.JobTypes]

    case RoutesConsts.CustomFields:
    case RoutesConsts.CreateCustomField:
    case RoutesConsts.getCustomFieldDetailsRoute(
      '[entity]' as INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
      '[id]'
    ):
      return [RoutesConsts.CustomFields]

    case RoutesConsts.Countries:
    case RoutesConsts.getCountryRoute('[countryId]'):
    case RoutesConsts.CreateCountry:
      return [RoutesConsts.Countries]

    case RoutesConsts.Currencies:
    case RoutesConsts.getCurrencyRoute('[currencyId]'):
    case RoutesConsts.CreateCurrency:
      return [RoutesConsts.Currencies]

    case RoutesConsts.HolidayCalendar:
    case RoutesConsts.getHolidayCalendarRoute('[calendarId]'):
    case RoutesConsts.CreateHolidayCalendar:
      return [RoutesConsts.HolidayCalendar]

    case RoutesConsts.CustomFieldGroups:
    case RoutesConsts.CreateCustomFieldGroup:
    case RoutesConsts.getCustomFieldGroupDetailsRoute(
      '[entity]' as INTEGRATED_RenderDynamicFields.DynamicFieldEntities,
      '[id]'
    ):
      return [RoutesConsts.CustomFieldGroups]

    default:
      return [pathname]
  }
}

export interface CoreBankDefaultLayoutProps {
  children?: ReactNode
}

// To achieve desired flexibility <Content /> is omitted from the Layout,
// so it should be used directly in the Page
export const CoreBankDefaultLayout = ({ children }: CoreBankDefaultLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)
  const { t, ready } = useTranslation(['common'])
  const router = useRouter()

  if (!ready) {
    return null
  }

  return (
    <>
      <CoreBankDefaultHeader />
      <Layout
        className={styles.coreBankDefaultLayout}
        style={{ maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)` }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          width={SIDER_WIDTH}
          collapsedWidth={SIDER_COLLAPSED_WIDTH}
          className={styles.coreBankDefaultLayout__sider}
          theme="light"
          trigger={
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlinedIcon /> : <MenuFoldOutlinedIcon />}
              onClick={() => setCollapsed(!collapsed)}
            />
          }
        >
          <Menu
            defaultOpenKeys={['0']}
            mode="inline"
            selectedKeys={getActiveKeys(router.pathname)}
            className={styles.coreBankDefaultLayout__menu}
            items={getNavigationItems(t, router)}
          />
        </Sider>
        <Layout>{children}</Layout>
      </Layout>
    </>
  )
}

export const getCoreBankDefaultLayout = (page: ReactNode) => (
  <WithAuth>
    <WithUiSettings>
      <CoreBankDefaultLayout>{page}</CoreBankDefaultLayout>
    </WithUiSettings>
  </WithAuth>
)
