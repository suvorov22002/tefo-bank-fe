import { INTEGRATED_RenderDynamicFields } from 'ui'

import {
  GetAllPermissionsTreeOptionsResponseData,
  GetJobTypeTemplateResponseData,
  GetJobTypesBasicInfoResponseData,
  GetJobTypesResponseData,
  GetPermissionsTreeOptionsResponseData,
  JobTypeStatuses,
} from '../types'

export const createJobTypeRequestMock = {
  name: 'string',
  status: JobTypeStatuses.Active,
  notes: 'string',
}

export const getJobTypeTemplateResponseMock: GetJobTypeTemplateResponseData = {
  id: '',
  name: '',
  groups: [],
  primaryFields: [
    {
      id: '1',
      code: 'notes',
      fieldName: null,
      fieldDescription: null,
      hiddenOnCreate: false,
      defaultValue: {},
      label: 'notes',
      entityName: null,
      placeholder: null,
      helpText: null,
      tooltip: null,
      required: false,
      visible: true,
      order: 2,
      groupCode: null,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      validation: {
        rules: [],
      },
      properties: {},
      entityLevel: null,
      independent: true,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
    },
    {
      id: '2',
      code: 'name',
      fieldName: null,
      fieldDescription: null,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      label: 'Name',
      entityName: null,
      placeholder: null,
      hiddenOnCreate: false,
      defaultValue: {},
      helpText: null,
      tooltip: null,
      required: true,
      visible: true,
      order: 0,
      groupCode: null,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.Text,
      validation: {
        rules: [
          {
            id: '1',
            status: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active,
            type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Required,
            priority: -10,
            value: true,
            message: 'Field value is missing',
          },
        ],
      },
      properties: {},
      entityLevel: null,
      independent: true,
    },
    {
      id: '3',
      code: 'status',
      fieldName: null,
      fieldDescription: null,
      label: 'Status',
      entityName: null,
      placeholder: null,
      helpText: null,
      tooltip: null,
      hiddenOnCreate: false,
      required: true,
      visible: true,
      status: INTEGRATED_RenderDynamicFields.DynamicFieldStatuses.Active,
      order: 1,
      groupCode: null,
      type: INTEGRATED_RenderDynamicFields.DynamicFieldTypes.List,
      defaultValue: { value: 'Active' },
      validation: {
        rules: [
          {
            id: '2',
            status: INTEGRATED_RenderDynamicFields.DynamicFieldValidationRuleStatuses.Active,
            type: INTEGRATED_RenderDynamicFields.ValidationRuleTypes.Required,
            priority: -10,
            value: true,
            message: 'Field value is missing',
          },
        ],
      },
      properties: {
        options: [
          {
            order: 2,
            key: 'INACTIVE',
            value: 'INACTIVE',
          },
          {
            order: 1,
            key: 'ACTIVE',
            value: 'ACTIVE',
          },
        ],
      },
      entityLevel: null,
      independent: true,
    },
  ],
  customFields: [],
}

export const getJobTypesResponseMock: GetJobTypesResponseData = {
  page: 1,
  limit: 10,
  totalItems: 4,
  data: [
    {
      id: '1',
      name: 'job type 1',
      status: JobTypeStatuses.Active,
      notes: '',
      units: 1,
      users: 2,
      permissions: ['11'],
    },
    {
      id: '2',
      name: 'job type 2',
      status: JobTypeStatuses.Active,
      notes: '',
      units: 2,
      users: 3,
      permissions: [],
    },
    {
      id: '3',
      name: 'job type 3',
      status: JobTypeStatuses.Active,
      notes: '',
      units: 3,
      users: 4,
      permissions: [],
    },
    {
      id: '4',
      name: 'job type 4',
      status: JobTypeStatuses.Active,
      notes: '',
      units: 4,
      users: 5,
      permissions: [],
    },
  ],
}

export const getJobTypesBasicInfoResponseMock: GetJobTypesBasicInfoResponseData = [
  {
    id: '1',
    name: 'job type 1',
  },
  {
    id: '2',
    name: 'job type 2',
  },
]

export const getPermissionsTreeOptionsResponseMock: GetPermissionsTreeOptionsResponseData = {
  page: 1,
  limit: 10,
  totalItems: 4,
  data: [
    {
      id: '1',
      label: 'Administrator',
      items: [
        {
          id: '11',
          label: 'Permission1',
        },
        {
          id: '12',
          label: 'Permission2',
        },
        {
          id: '13',
          label: 'Permission3',
        },
      ],
    },
    {
      id: '2',
      label: 'AIM',
      items: [
        {
          id: '21',
          label: 'Permission4',
        },
        {
          id: '22',
          label: 'Permission5',
        },
      ],
    },
    {
      id: '3',
      label: 'AIM',
      items: [
        {
          id: '31',
          label: 'Permission6',
        },
        {
          id: '32',
          label: 'Permission7',
        },
      ],
    },
  ],
}

export const getAllPermissionsTreeOptionsResponseMock: GetAllPermissionsTreeOptionsResponseData =
  getPermissionsTreeOptionsResponseMock.data
