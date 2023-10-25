import { render, screen } from '@testing-library/react'

import { Result } from './result'

describe('Result', () => {
  it('should mount', () => {
    expect(() => render(<Result />)).not.toThrow()
  })

  it('should render', () => {
    render(<Result title="result title" subTitle="result subTitle" />)

    expect(screen.getByText(/result title/i)).toBeInTheDocument()
    expect(screen.getByText(/result subTitle/i)).toBeInTheDocument()
  })
})
