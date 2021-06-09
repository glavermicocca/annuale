import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbRowProps } from '../BareBones/TbRow';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from '../BareBones/DetailComponentProps';
export interface DataGridTableProps {
    tbTableInstance: ITbTableInstance;
    rowComponent: React.FunctionComponent<TbRowProps>;
    footerComponent: React.FunctionComponent<any>;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    onRowClick?(row: any): void;
}
export declare const DataGridTable: React.FunctionComponent<DataGridTableProps>;
