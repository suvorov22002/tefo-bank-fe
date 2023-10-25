import { FC } from 'react'
import { render, screen } from '@testing-library/react'

import { Icon } from './icon'

const Svg: FC = props => (
  <svg width={50} height={50} viewBox="0 0 50 50" data-testid="svg" {...props}>
    <rect />
  </svg>
)

describe('Icon', () => {
  it('should render component', () => {
    render(<Icon component={Svg} data-testid="icon" />)

    const icon = screen.getByTestId('icon')
    const svg = screen.getByTestId('svg')

    expect(icon).toBeInTheDocument()
    expect(icon).toContainElement(svg)
    expect(icon).not.toBeEmptyDOMElement()
  })

  it('should have correct icon size', () => {
    render(<Icon style={{ fontSize: 100 }} component={Svg} data-testid="icon" />)

    const icon = screen.getByTestId('icon')
    const svg = screen.getByTestId('svg')

    expect(icon).toHaveStyle({ fontSize: '100px' })
    expect(svg).toHaveAttribute('width', expect.stringContaining('1em'))
  })
})
