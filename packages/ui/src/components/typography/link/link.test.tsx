import { render, screen } from '@testing-library/react'

import { Link } from './link'

describe('Link', () => {
  it('Should render', () => {
    render(<Link>test link</Link>)

    expect(screen.getByText(/test link/i)).toBeInTheDocument()
  })
})
