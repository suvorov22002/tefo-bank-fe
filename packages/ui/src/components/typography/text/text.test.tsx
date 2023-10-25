import { render, screen } from '@testing-library/react'

import { Text } from './text'

describe('Text', () => {
  it('Should render', () => {
    render(<Text>test text</Text>)

    expect(screen.getByText(/test text/i)).toBeInTheDocument()
  })
})
