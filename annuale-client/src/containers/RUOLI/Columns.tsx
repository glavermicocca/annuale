import { ColumnDataType, ColumnSortDirection, createColumn } from 'tubular-common'

export const columns = [
  createColumn('id', {
    dataType: ColumnDataType.Numeric,
    filterable: false,
    isKey: true,
    label: 'id',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: false,
    visible: true
  }),
  createColumn('email', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: false,
    label: 'em@il',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
  }),
  createColumn('des_ruolo', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: false,
    label: 'Cognome Nome',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
  }),
  createColumn('tipo_ruolo', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: false,
    label: 'Tipologia ruolo',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
  }),
  createColumn('password', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: 'Tipologia ruolo',
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('empty_0', {
    // button per abilitare DETAIL
    dataType: ColumnDataType.String,
    label: ' ',
    isComputed: true
  }),
  createColumn('empty_1', {
    // button per abilitare DETAIL
    dataType: ColumnDataType.String,
    label: ' ',
    isComputed: true
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
