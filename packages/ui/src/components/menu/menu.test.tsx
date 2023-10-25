import { act, render, screen, waitFor } from '@testing-library/react'

import { Menu } from './menu'

describe('Menu', () => {
  it('should render', () => {
    render(<Menu data-testid="menu" items={[]} />)

    expect(screen.getByTestId('menu')).toBeInTheDocument()
  })

  it('should render items', async () => {
    act(() => {
      render(
        <Menu
          items={[
            {
              label: 'item value',
              key: '1',
            },
          ]}
        />
      )
    })

    await waitFor(() => {
      expect(screen.getByText(/item value/i)).toBeInTheDocument()
    })
  })
})
