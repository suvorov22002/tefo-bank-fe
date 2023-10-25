import { render, screen } from '@testing-library/react'

import { Modal } from './modal'

describe('Modal', () => {
  it('should mount', () => {
    expect(() => render(<Modal />)).not.toThrow()
  })

  it('should render', () => {
    render(<Modal open={true} data-testid="modal" />)
    expect(screen.getByTestId('modal')).toBeInTheDocument()
  })
})
