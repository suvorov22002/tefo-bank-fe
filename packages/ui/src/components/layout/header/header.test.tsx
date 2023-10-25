import { fireEvent, render, screen } from '@testing-library/react'

import { Header } from './header'

describe('Header', () => {
  it('should render', () => {
    render(<Header data-testid="header" />)

    const header = screen.getByTestId('header')

    expect(header).toBeInTheDocument()
  })

  it('should render children', () => {
    const headerChildText = 'Header child text'

    render(
      <Header data-testid="header">
        <p>{headerChildText}</p>
      </Header>
    )

    const header = screen.getByTestId('header')

    expect(header).toHaveTextContent(headerChildText)
    expect(header).not.toBeEmptyDOMElement()
  })

  it('should render title', () => {
    const headerTextTitle = 'Header text title'

    render(
      <>
        <Header title={headerTextTitle} />
        <Header title={<p data-testid="header-component-title">Header component title</p>} />
      </>
    )

    expect(screen.getByText(headerTextTitle)).toBeInTheDocument()
    expect(screen.getByTestId('header-component-title')).toBeInTheDocument()
  })

  it('should show back button if there is onBack action', () => {
    render(<Header onBack={jest.fn()} />)

    const backButton = screen.getByRole('button')

    expect(backButton).toBeInTheDocument()
  })

  it('should not show back button if there is no onBack action', () => {
    render(<Header title="header" />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should handle onBack action', () => {
    const onBackMock = jest.fn()

    render(<Header onBack={onBackMock} />)

    const backButton = screen.getByRole('button')

    fireEvent.click(backButton)

    expect(onBackMock).toBeCalledTimes(1)
  })

  it('should render extra', () => {
    const extraContent = <div data-testid="extra" />

    render(<Header extra={extraContent} />)

    expect(screen.getByTestId('extra')).toBeInTheDocument()
  })
})
