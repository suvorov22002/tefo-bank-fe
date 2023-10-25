import { CustomerStatuses, CustomerTypes, GetCustomersResponseData } from '../types'

export const getCustomersResponseDataMock: GetCustomersResponseData = {
  page: 1,
  limit: 10,
  totalItems: 2,
  data: [
    {
      residency: true,
      createdAt: '2023-08-16T14:52:09.399Z',
      updatedBy: 'Someone',
      code: 1101,
      unitName: 'unit 1',
      id: 1,
      type: CustomerTypes.LegalEntity,
      shortName: 'name',
      updatedAt: '2023-08-16T14:52:09.399Z',
      relationshipManagerName: 'John Doe',
      status: CustomerStatuses.Active,
    },
    {
      residency: true,
      createdAt: '2023-08-16T14:52:09.399Z',
      updatedBy: 'Someone 2',
      code: 1200,
      unitName: 'unit 2',
      id: 2,
      type: CustomerTypes.NaturalPerson,
      shortName: 'name name',
      updatedAt: '2023-08-16T14:52:09.399Z',
      relationshipManagerName: 'John Does',
      status: CustomerStatuses.PendingAuthorization,
    },
    {
      residency: true,
      createdAt: '2023-08-16T14:52:09.399Z',
      updatedBy: 'Someone 2',
      code: 12312,
      unitName: 'unit 2',
      id: 22,
      type: CustomerTypes.NaturalPerson,
      shortName: 'name name',
      updatedAt: '2023-08-16T14:52:09.399Z',
      relationshipManagerName: 'John Does',
      status: CustomerStatuses.Closed,
    },
    {
      residency: true,
      createdAt: '2023-08-16T14:52:09.399Z',
      updatedBy: 'Someone 2',
      code: 1232,
      unitName: 'unit 2',
      id: 223,
      type: CustomerTypes.NaturalPerson,
      shortName: 'name name',
      updatedAt: '2023-08-16T14:52:09.399Z',
      relationshipManagerName: 'John Does',
      status: CustomerStatuses.Prospect,
    },
    {
      residency: true,
      createdAt: '2023-08-16T14:52:09.399Z',
      updatedBy: 'Someone 2',
      code: 1231,
      unitName: 'unit 2',
      id: 224,
      type: CustomerTypes.NaturalPerson,
      shortName: 'name name',
      updatedAt: '2023-08-16T14:52:09.399Z',
      relationshipManagerName: 'John Does',
      status: CustomerStatuses.Inactive,
    },
  ],
}
