import { render, screen } from '@testing-library/react'

import { RenderDynamicFieldGroupsInCreateMode } from './index'
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
  it('should appear expanded', () => {
    render(
      <RenderDynamicFieldGroupsInCreateMode
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
        ]}
        renderDynamicFields={renderDynamicFieldMock}
      />
    )

    expect(screen.getByText('g1Label')).toBeInTheDocument()
    expect(screen.getByText('Code Group')).toBeVisible()
  })
})
