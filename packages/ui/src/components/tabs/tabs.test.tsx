import { render, screen } from '@testing-library/react'

import { Tabs, TabsProps } from './tabs'

describe('Tabs', () => {
  const items: TabsProps['items'] = [
    {
      key: '1',
      label: `Tab 1`,
      children: `Content of Tab Pane 1`,
    },
    {
      key: '2',
      label: `Tab 2`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: '3',
      label: `Tab 3`,
      children: `Content of Tab Pane 3`,
    },
  ]

  it('should render', () => {
    render(<Tabs items={items} data-testid="tabs" />)

    expect(screen.getByTestId('tabs')).toBeInTheDocument()
  })
})
