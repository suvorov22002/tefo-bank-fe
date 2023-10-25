import { CSSProperties } from 'react'
import { ComponentStory, Meta } from '@storybook/react'

import { Content } from './content'
import { Footer } from './footer'
import { Header } from './header'
import { Sider } from './sider'
import { Layout, LayoutProps } from './layout'
import { StoriesThemeWrapper, disableArgTypesTableControl } from '../../__storybook__'

export default {
  title: 'Layout',
  subcomponents: { Header, Content, Footer, Sider },
  component: Layout,
  argTypes: {
    children: {
      ...disableArgTypesTableControl,
    },
  },
} as Meta<LayoutProps>

const Template: ComponentStory<typeof Layout> = (args: LayoutProps) => (
  <StoriesThemeWrapper>
    <Layout {...args} />
  </StoriesThemeWrapper>
)

const headerStyle: CSSProperties = {
  justifyContent: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#7dbcea',
}

const contentStyle: CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#108ee9',
}

const footerStyle: CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#7dbcea',
}

const siderStyle: CSSProperties = {
  textAlign: 'center',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#3ba0e9',
}

export const Default = Template.bind({})
export const WithSider = Template.bind({})

Default.args = {
  children: (
    <>
      <Header title={<span>Header</span>} style={headerStyle} />
      <Content style={contentStyle}>Content</Content>
      <Footer style={footerStyle}>Footer</Footer>
    </>
  ),
}

WithSider.args = {
  children: (
    <>
      <Header title={<span>Header</span>} style={headerStyle} />
      <Layout>
        <Sider style={siderStyle}>Sider</Sider>
        <Content style={contentStyle}>Content</Content>
      </Layout>
      <Footer style={footerStyle}>Footer</Footer>
    </>
  ),
}
