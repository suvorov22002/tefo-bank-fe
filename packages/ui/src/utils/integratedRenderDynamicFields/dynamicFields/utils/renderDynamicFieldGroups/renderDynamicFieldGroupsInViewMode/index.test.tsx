import { render, screen } from '@testing-library/react'

import { RenderDynamicFieldGroupsInViewMode } from './index'
import { getRenderDynamicFields } from '../../renderDynamicFields'
import {
  DynamicFieldApiClient,
  DynamicFieldEntities,
  DynamicFieldGroupAppearances,
  DynamicFieldGroupStatuses,
  DynamicFieldStatuses,
  DynamicFieldTypes,
} from '../../../../types'

const apiClientMock: DynamicFieldApiClient = {
  get: jest.fn(() => Promise.resolve({ body: [], response: {} })),
} as unknown as DynamicFieldApiClient

jest.mock('formik', () => {
  return {
    useField: (fieldProps: { name: string }) => {
      return [
        {
          onChange: jest.mock,
          name: fieldProps.name,
        },
        {},
        {},
      ]
    },
  }
})

const renderDynamicFieldMock = getRenderDynamicFields(apiClientMock)

describe('renderDynamicFieldsInCreateMode', () => {
  it('should handle appearance', () => {
    render(
      <RenderDynamicFieldGroupsInViewMode
        groups={[
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
        ]}
        renderDynamicFields={renderDynamicFieldMock}
      />
    )

    expect(screen.getByText('g1Label')).toBeInTheDocument()
    expect(screen.queryByText('Code Group')).not.toBeInTheDocument()
    expect(screen.getByText('g2Label')).toBeInTheDocument()
    expect(screen.getByText('CF2')).toBeVisible()
  })
})
