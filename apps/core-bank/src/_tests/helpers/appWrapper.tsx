import { ReactNode } from 'react'
import { AppStatic, QueryClient, QueryClientProvider, UiSettingsProvider, queryClient } from 'ui'

export const getAppWrapper =
  (customQueryClient?: QueryClient) =>
  ({ children }: { children?: ReactNode }) => (
    <QueryClientProvider client={customQueryClient || queryClient}>
      <UiSettingsProvider>
        <AppStatic>{children}</AppStatic>
      </UiSettingsProvider>
    </QueryClientProvider>
  )
