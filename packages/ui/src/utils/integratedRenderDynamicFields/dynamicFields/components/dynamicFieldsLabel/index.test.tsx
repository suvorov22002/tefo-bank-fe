import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import { DynamicFieldsLabel } from './index'

describe('DynamicFieldsLabel', () => {
  it('should show label', () => {
    render(<DynamicFieldsLabel label="testLabel" />)

    expect(screen.getByText('testLabel')).toBeInTheDocument()
  })

  it('should show label and tooltip if tooltip is passed', async () => {
    render(<DynamicFieldsLabel label="testLabel" tooltip="testTooltip" />)

    expect(screen.getByText('testLabel')).toBeInTheDocument()

    fireEvent.mouseEnter(screen.getByRole('img'))

    await waitFor(() => {
      expect(screen.getByText('testTooltip')).toBeInTheDocument()
    })
  })
})
