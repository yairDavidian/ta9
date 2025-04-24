import { columnTypeEnum } from '../enums/table.enum';

export function getColumns() {
  return [
    {
      text: 'Color',
      path: 'color',
      type: columnTypeEnum.Color,
    },
    {
      text: 'Name',
      path: 'name',
      type: columnTypeEnum.Text,
    },
    {
      text: 'Description',
      path: 'description',
      type: columnTypeEnum.Text,
    },
    {
      text: 'CreateDate',
      path: 'createDate',
      type: columnTypeEnum.Date,
    },
    {
      text: 'LastUpdate',
      path: 'lastUpdate',
      type: columnTypeEnum.Date,
    },
    {
      text: 'CreatedBy',
      path: 'createdBy',
      type: columnTypeEnum.Text,
    },
    {
      text: 'Actions',
      path: 'actions',
      type: columnTypeEnum.Actions,
    },
  ];
}
