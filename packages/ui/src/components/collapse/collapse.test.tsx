import { render, screen } from '@testing-library/react'

import { Collapse, Panel } from './collapse'

describe('Collapse', () => {
  it('should render without errors', () => {
    render(
      <Collapse>
        <Panel header="header" key="1" data-testid="panel">
          test
        </Panel>
      </Collapse>
    )

    expect(screen.getByTestId('panel')).toBeInTheDocument()
  })
})
