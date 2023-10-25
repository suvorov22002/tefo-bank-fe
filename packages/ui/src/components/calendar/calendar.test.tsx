import { render } from '@testing-library/react'

import { Calendar } from './calendar'

describe('Calendar', () => {
  it('should render without errors', () => {
    expect(() => render(<Calendar />)).not.toThrow()
  })
})
