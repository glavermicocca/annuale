import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import DetailComponentProps from '../BareBones/DetailComponentProps';
import { TbRowProps } from '../BareBones/TbRow';
import { TbSelection } from '../utils/Selection';
export interface MobileDataGridTableProps {
    tbTableInstance: ITbTableInstance;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    onRowClick?(row: any): void;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
}
export declare const MobileDataGridTable: React.FunctionComponent<MobileDataGridTableProps>;
