import { Tag } from './tag'

import { render, screen } from '@testing-library/react'

describe('Tag', () => {
  it('should render without errors', () => {
    render(<Tag data-testid="tag" />)

    const tag = screen.getByTestId('tag')

    expect(tag).toBeInTheDocument()
  })

  it('should render children', () => {
    const tagChildText = 'Tag child text'

    render(<Tag data-testid="tag">{tagChildText}</Tag>)

    const tag = screen.getByTestId('tag')

    expect(tag).toHaveTextContent(tagChildText)
    expect(tag).not.toBeEmptyDOMElement()
  })
})
