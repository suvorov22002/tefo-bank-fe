import { render } from '@testing-library/react'

import { Popconfirm } from './popconfirm'

describe('Popconfirm', () => {
  it('should render without errors', () => {
    expect(() => render(<Popconfirm title="title" />)).not.toThrow()
  })
})
