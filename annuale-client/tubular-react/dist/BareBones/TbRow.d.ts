import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from './DetailComponentProps';
export interface TbRowProps {
    row: any;
    rowIndex: number;
    columns: ColumnModel[];
    onRowClick?(): void;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
}
export declare const TbRow: React.FunctionComponent<TbRowProps>;
