import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useState } from 'react'
import {
  AppStatic,
  QueryClientProvider,
  ThemeConfigProvider,
  ThemeLocaleMap,
  UiSettingsProvider,
  queryClient,
} from 'ui'
import { RefreshTokenHandler, SessionProvider } from 'auth'
import 'ui/src/styles/globals.css'

import { AppPropsWithLayout } from '@/types'
import { appWithTranslation } from '@/i18n'
import { setApiClientAuthorizationHeader } from '@/utils'
import '@/styles/globals.css'

import nextI18nConfig from '../../next-i18next.config'

const DynamicStyleProvider = dynamic(() => import('ui').then(module => module.StyleProvider), {
  ssr: false,
})

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const locale = (router.locale && ThemeLocaleMap[router.locale]) || undefined
  const getLayout = Component.getLayout ?? (page => page)

  const [refreshTokenInterval, setRefreshTokenInterval] = useState<number>(0)

  return (
    <SessionProvider refetchInterval={refreshTokenInterval} session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <UiSettingsProvider>
          <ThemeConfigProvider locale={locale}>
            <DynamicStyleProvider>
              <AppStatic>
                <RefreshTokenHandler
                  setRefreshInterval={setRefreshTokenInterval}
                  onSessionUpdate={setApiClientAuthorizationHeader}
                />
                {getLayout(<Component {...pageProps} />)}
              </AppStatic>
            </DynamicStyleProvider>
          </ThemeConfigProvider>
        </UiSettingsProvider>
      </QueryClientProvider>
    </SessionProvider>
  )
}

export default appWithTranslation(App, nextI18nConfig)
