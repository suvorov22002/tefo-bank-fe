import { render, screen } from '@testing-library/react'

import { Title } from './title'

describe('Title', () => {
  it('Should render', () => {
    render(<Title>Test text</Title>)

    expect(screen.getByText(/test text/i)).toBeInTheDocument()
  })
})
