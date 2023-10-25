import { Layout } from 'ui'
import { FC, ReactNode } from 'react'

interface CreateBankProfileLayoutProps {
  children?: ReactNode
}

export const CreateBankProfileLayout: FC<CreateBankProfileLayoutProps> = ({ children }) => {
  return <Layout>{children}</Layout>
}

export const getCreateBankProfileLayout = (page: ReactNode) => (
  <CreateBankProfileLayout>{page}</CreateBankProfileLayout>
)
