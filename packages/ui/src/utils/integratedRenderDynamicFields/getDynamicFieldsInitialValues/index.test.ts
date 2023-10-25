import { getDynamicFieldsInitialValues } from '.'
import { DynamicFieldsTemplate, RenderTemplateModes } from '../types'

import { getDynamicFieldsInitialValuesInCreateMode } from './getDynamicFieldsInitialValuesInCreateMode'
import { getDynamicFieldsInitialValuesInEditMode } from './getDynamicFieldsInitialValuesInEditMode'

jest.mock('./getDynamicFieldsInitialValuesInCreateMode', () => ({
  getDynamicFieldsInitialValuesInCreateMode: jest.fn(),
}))

jest.mock('./getDynamicFieldsInitialValuesInEditMode', () => ({
  getDynamicFieldsInitialValuesInEditMode: jest.fn(),
}))

const dynamicFieldsTemplateMock: DynamicFieldsTemplate = {
  id: '1',
  name: 'template',
  groups: [],
  primaryFields: [],
  customFields: [],
}

describe('getDynamicFieldsInitialValues', () => {
  it('should use getDynamicFieldsInitialValuesInCreateMode when mode is Create', () => {
    getDynamicFieldsInitialValues({
      mode: RenderTemplateModes.Create,
      template: dynamicFieldsTemplateMock,
    })

    expect(getDynamicFieldsInitialValuesInCreateMode).toBeCalledWith(dynamicFieldsTemplateMock)
  })

  it('should use getDynamicFieldsInitialValuesInEditMode when mode is Edit', () => {
    const valuesMock = {}

    getDynamicFieldsInitialValues({
      mode: RenderTemplateModes.Edit,
      template: dynamicFieldsTemplateMock,
      values: valuesMock,
    })

    expect(getDynamicFieldsInitialValuesInEditMode).toBeCalledWith(
      dynamicFieldsTemplateMock,
      valuesMock
    )
  })
})
