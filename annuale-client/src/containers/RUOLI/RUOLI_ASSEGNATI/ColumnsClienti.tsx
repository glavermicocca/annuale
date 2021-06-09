import { ColumnDataType, ColumnSortDirection, createColumn } from 'tubular-common'

export const columns = [
  createColumn('empty_0', {
    // button per abilitare DETAIL
    dataType: ColumnDataType.String,
    label: ' ',
    isComputed: true
  }),
  createColumn('ruoli_assegnati.id_ruolo', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: true,
    label: 'id_ruolo',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('depositi.is_cliente', {
    dataType: ColumnDataType.String,
    filterable: false,
    isKey: false,
    label: 'is_cliente',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: false,
    searchable: false,
    visible: false
  }),
  createColumn('depositi.cod_dep', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: false,
    label: 'Codice',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
  }),
  createColumn('depositi.des_dep', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: true,
    label: 'Cognome Nome',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
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
