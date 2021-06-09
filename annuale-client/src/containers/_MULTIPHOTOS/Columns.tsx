import { ColumnDataType, ColumnSortDirection, createColumn } from 'tubular-common'

export const columns = [
  createColumn('id', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: true,
    label: 'id',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('val', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: 'valore',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('anno', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: 'anno',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('progr', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: false,
    label: 'Progressivo',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: false
  })
]

// aggregate: AggregateFunctions;
//     dataType: ColumnDataType;
//     dateOriginFormat?: string;
//     dateDisplayFormat?: string;
//     dateTimeOriginFormat?: string;
//     dateTimeDisplayFormat?: string;
//     filterArgument: string[] | number[];
//     filterOperator: CompareOperators;
//     filterText: string;
//     filterable: boolean;
//     exportable: boolean;
//     isKey: boolean;
//     label: string;
//     isComputed: boolean;
//     getComputedStringValue?: (column: ColumnModel, row: any, isHeader: boolean) => string;
//     name: string;
//     searchable: boolean;
//     sortDirection: ColumnSortDirection;
//     sortOrder: number;
//     sortable: boolean;
//     visible: boolean;
