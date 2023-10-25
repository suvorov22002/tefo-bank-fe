import { render } from '@testing-library/react'

import { Tooltip } from './tooltip'

describe('Tooltip', () => {
  it('should render without errors', () => {
    expect(() => render(<Tooltip />)).not.toThrow()
  })
})
