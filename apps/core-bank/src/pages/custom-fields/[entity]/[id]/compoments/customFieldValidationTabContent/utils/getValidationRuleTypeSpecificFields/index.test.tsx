import { INTEGRATED_RenderDynamicFields } from 'ui'
import { ReactElement } from 'react'
import { render } from '@testing-library/react'

import { getValidationRuleTypeSpecificFields } from './index'
import {
  LessDateValidationRuleTypeSpecificFields,
  MaxFutureValidationRuleTypeSpecificFields,
  MaxLengthValidationRuleTypeSpecificFields,
  MaxPastValidationRuleTypeSpecificFields,
  MaxValidationRuleTypeSpecificFields,
  MinFutureValidationRuleTypeSpecificFields,
  MinLengthValidationRuleTypeSpecificFields,
  MinPastValidationRuleTypeSpecificFields,
  MinValidationRuleTypeSpecificFields,
  MoreDateValidationRuleTypeSpecificFields,
  PatternValidationRuleTypeSpecificFields,
} from '../../components'

jest.mock('../../components', () => ({
  LessDateValidationRuleTypeSpecificFields: jest.fn(),
  MaxFutureValidationRuleTypeSpecificFields: jest.fn(),
  MaxLengthValidationRuleTypeSpecificFields: jest.fn(),
  MaxPastValidationRuleTypeSpecificFields: jest.fn(),
  MaxValidationRuleTypeSpecificFields: jest.fn(),
  MinFutureValidationRuleTypeSpecificFields: jest.fn(),
  MinLengthValidationRuleTypeSpecificFields: jest.fn(),
  MinPastValidationRuleTypeSpecificFields: jest.fn(),
  MinValidationRuleTypeSpecificFields: jest.fn(),
  MoreDateValidationRuleTypeSpecificFields: jest.fn(),
  PatternValidationRuleTypeSpecificFields: jest.fn(),
}))

describe('getValidationRuleTypeSpecificFields', () => {
  it('should call LessDateValidationRuleTypeSpecificFields when type is LessDate', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.LessDate
      ) as ReactElement
    )

    expect(LessDateValidationRuleTypeSpecificFields).toBeCalled()
  })
  it('should call MaxFutureValidationRuleTypeSpecificFields when type is MaxFuture', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxFuture
      ) as ReactElement
    )

    expect(MaxFutureValidationRuleTypeSpecificFields).toBeCalled()
  })

  it('should call MaxLengthValidationRuleTypeSpecificFields when type is MaxLength', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxLength
      ) as ReactElement
    )

    expect(MaxLengthValidationRuleTypeSpecificFields).toBeCalled()
  })
  it('should call MaxPastValidationRuleTypeSpecificFields when type is MaxPast', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MaxPast
      ) as ReactElement
    )

    expect(MaxPastValidationRuleTypeSpecificFields).toBeCalled()
  })
  it('should call MaxValidationRuleTypeSpecificFields when type is Max', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Max
      ) as ReactElement
    )

    expect(MaxValidationRuleTypeSpecificFields).toBeCalled()
  })

  it('should call MinFutureValidationRuleTypeSpecificFields when type is MinFuture', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinFuture
      ) as ReactElement
    )

    expect(MinFutureValidationRuleTypeSpecificFields).toBeCalled()
  })
  it('should call MinLengthValidationRuleTypeSpecificFields when type is MinLength', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinLength
      ) as ReactElement
    )

    expect(MinLengthValidationRuleTypeSpecificFields).toBeCalled()
  })
  it('should call MinPastValidationRuleTypeSpecificFields when type is MinPast', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MinPast
      ) as ReactElement
    )

    expect(MinPastValidationRuleTypeSpecificFields).toBeCalled()
  })
  it('should call MinValidationRuleTypeSpecificFields when type is Min', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Min
      ) as ReactElement
    )

    expect(MinValidationRuleTypeSpecificFields).toBeCalled()
  })
  it('should call MoreDateValidationRuleTypeSpecificFields when type is MoreDate', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.MoreDate
      ) as ReactElement
    )

    expect(MoreDateValidationRuleTypeSpecificFields).toBeCalled()
  })

  it('should call PatternValidationRuleTypeSpecificFields when type is Regex', () => {
    render(
      getValidationRuleTypeSpecificFields(
        INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Regex
      ) as ReactElement
    )

    expect(PatternValidationRuleTypeSpecificFields).toBeCalled()
  })
})
