import { Content, Layout, theme } from 'ui'
import { FC, ReactNode } from 'react'

interface WelcomeLayoutProps {
  children?: ReactNode
}

export const WelcomeLayout: FC<WelcomeLayoutProps> = ({ children }) => {
  const { token } = theme.useToken()

  return (
    <Layout>
      <Content style={{ background: token.colorBgContainer }}>{children}</Content>
    </Layout>
  )
}

export const getWelcomeLayout = (page: ReactNode) => <WelcomeLayout>{page}</WelcomeLayout>
