import { ColumnDataType, ColumnSortDirection, createColumn } from 'tubular-common'

export const columns = [
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
    isKey: true,
    label: 'Progressivo',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
  }),
  createColumn('descrizione_errore', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: false,
    label: 'Descrizione errore',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
  }),
  createColumn('tipo_errore', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: false,
    label: 'Tipo errore',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: false
  }),
  createColumn('metallo', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: '',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('contorno', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: '',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('peso', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: '',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('diametro', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: '',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('link', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: '',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('empty_1', {
    // button per abilitare DETAIL
    dataType: ColumnDataType.String,
    isKey: false,
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
