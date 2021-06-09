import { ColumnDataType, ColumnSortDirection, createColumn } from 'tubular-common'

export const columns = [
  createColumn('val', {
    dataType: ColumnDataType.String,
    filterable: true,
    isKey: true,
    label: 'valore',
    sortDirection: ColumnSortDirection.Ascending,
    sortable: true,
    searchable: true,
    visible: true
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
