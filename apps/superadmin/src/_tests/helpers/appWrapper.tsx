import { ReactNode } from 'react'
import { AppStatic, QueryClient, QueryClientProvider, queryClient } from 'ui'

export const getAppWrapper =
  (customQueryClient?: QueryClient) =>
  ({ children }: { children?: ReactNode }) => (
    <QueryClientProvider client={customQueryClient || queryClient}>
      <AppStatic>{children}</AppStatic>
    </QueryClientProvider>
  )
