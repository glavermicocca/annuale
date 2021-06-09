import * as React from 'react';
import { ColumnModel, DataGridStorage, TubularHttpClientAbstract } from 'tubular-common';
import { TbRowProps } from '../BareBones/TbRow';
import DetailComponentProps from '../BareBones/DetailComponentProps';
import { ToolbarOptions } from '../Toolbar/ToolbarOptions';
export interface DataGridProps {
    columns: ColumnModel[];
    dataSource: any[] | string | Request | TubularHttpClientAbstract;
    deps?: any[];
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    gridName: string;
    storage?: DataGridStorage;
    toolbarOptions?: ToolbarOptions;
    mobileBreakpointWidth?: number;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    rowMobileComponent?: React.FunctionComponent<TbRowProps>;
    footerComponent?: React.FunctionComponent<any>;
    onError?(err: string): void;
    onRowClick?(row: any): void;
    rowSelectionEnabled?: boolean;
}
export declare const DataGrid: React.FunctionComponent<DataGridProps>;
