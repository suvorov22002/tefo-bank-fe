import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import {
  AppStatic,
  QueryClientProvider,
  ThemeConfigProvider,
  ThemeLocaleMap,
  queryClient,
} from 'ui'
import 'ui/src/styles/globals.css'

import { AppPropsWithLayout } from '@/types'
import { appWithTranslation } from '@/i18n'
import '@/styles/globals.css'

import nextI18nConfig from '../../next-i18next.config'

const DynamicStyleProvider = dynamic(() => import('ui').then(module => module.StyleProvider), {
  ssr: false,
})

function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter()
  const locale = (router.locale && ThemeLocaleMap[router.locale]) || undefined
  const getLayout = Component.getLayout ?? (page => page)

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeConfigProvider locale={locale}>
        <DynamicStyleProvider>
          <AppStatic>{getLayout(<Component {...pageProps} />)}</AppStatic>
        </DynamicStyleProvider>
      </ThemeConfigProvider>
    </QueryClientProvider>
  )
}

export default appWithTranslation(App, nextI18nConfig)
