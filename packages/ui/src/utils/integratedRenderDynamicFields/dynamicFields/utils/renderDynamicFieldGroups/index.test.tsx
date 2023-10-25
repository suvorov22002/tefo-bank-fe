import { render } from '@testing-library/react'

import { ReactElement } from 'react'
import { RenderDynamicFieldGroupsInCreateMode } from './renderDynamicFieldGroupsInCreateMode'
import { RenderDynamicFieldGroupsInEditMode } from './renderDynamicFieldGroupsInEditMode'
import { RenderDynamicFieldGroupsInViewMode } from './renderDynamicFieldGroupsInViewMode'
import { getRenderDynamicFields } from '../renderDynamicFields'
import { renderDynamicFieldGroups } from './index'
import {
  DynamicFieldApiClient,
  DynamicFieldEntities,
  DynamicFieldGroupAppearances,
  DynamicFieldGroupStatuses,
  DynamicFieldStatuses,
  DynamicFieldTypes,
  RenderTemplateModes,
} from '../../../types'

jest.mock('./renderDynamicFieldGroupsInCreateMode', () => ({
  RenderDynamicFieldGroupsInCreateMode: jest.fn(),
}))

jest.mock('./renderDynamicFieldGroupsInEditMode', () => ({
  RenderDynamicFieldGroupsInEditMode: jest.fn(),
}))

jest.mock('./renderDynamicFieldGroupsInViewMode', () => ({
  RenderDynamicFieldGroupsInViewMode: jest.fn(),
}))

const groupsToRenderMock = [
  {
    name: 'g1',
    code: 'g1',
    id: 'g1',
    label: 'g1Label',
    appearance: DynamicFieldGroupAppearances.Collapsed,
    index: 0,
    status: DynamicFieldGroupStatuses.Active,
    fields: [
      {
        id: 'f1',
        fieldName: 'f1_',
        entityName: DynamicFieldEntities.Bank,
        entityLevel: null,
        hiddenOnCreate: false,
        independent: true,
        status: DynamicFieldStatuses.Active,
        code: 'shortName',
        label: 'Code Group',
        required: false,
        order: 0,
        type: DynamicFieldTypes.Text,
        defaultValue: {},
        properties: {
          showCount: true,
        },
        validation: {
          rules: [],
        },
        groupCode: 'g1',
        placeholder: null,
        helpText: null,
        tooltip: null,
      },
    ],
  },
  {
    name: 'g2',
    code: 'g2',
    id: 'g2',
    label: 'g2Label',
    appearance: DynamicFieldGroupAppearances.Expanded,
    index: 0,
    status: DynamicFieldGroupStatuses.Active,
    fields: [
      {
        id: 'f2',
        fieldName: 'f2_',
        entityName: DynamicFieldEntities.Bank,
        entityLevel: null,
        hiddenOnCreate: false,
        independent: true,
        status: DynamicFieldStatuses.Active,
        code: 'shortName',
        label: 'CF2',
        required: false,
        order: 0,
        type: DynamicFieldTypes.Text,
        defaultValue: {},
        properties: {
          showCount: true,
        },
        validation: {
          rules: [],
        },
        groupCode: 'g2',
        placeholder: null,
        helpText: null,
        tooltip: null,
      },
    ],
  },
]

const apiClientMock: DynamicFieldApiClient = {
  get: jest.fn(() => Promise.resolve({ body: [], response: {} })),
} as unknown as DynamicFieldApiClient

const renderDynamicFieldMock = getRenderDynamicFields(apiClientMock)

describe('renderDynamicFieldGroups', () => {
  it('should use RenderDynamicFieldGroupsInCreateMode when render mode is Create', () => {
    render(
      renderDynamicFieldGroups(groupsToRenderMock, renderDynamicFieldMock, {
        mode: RenderTemplateModes.Create,
        customRenderDynamicField: jest.fn(),
      }) as ReactElement
    )

    expect(RenderDynamicFieldGroupsInCreateMode).toBeCalled()
  })

  it('should use RenderDynamicFieldGroupsInEditMode when render mode is Edit', () => {
    render(
      renderDynamicFieldGroups(groupsToRenderMock, renderDynamicFieldMock, {
        mode: RenderTemplateModes.Edit,
        customRenderDynamicField: jest.fn(),
      }) as ReactElement
    )

    expect(RenderDynamicFieldGroupsInEditMode).toBeCalled()
  })

  it('should use RenderDynamicFieldGroupsInViewMode when render mode is View', () => {
    render(
      renderDynamicFieldGroups(groupsToRenderMock, renderDynamicFieldMock, {
        mode: RenderTemplateModes.View,
        customRenderDynamicField: jest.fn(),
      }) as ReactElement
    )

    expect(RenderDynamicFieldGroupsInViewMode).toBeCalled()
  })
})
