import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from './DetailComponentProps';
export interface TbMobileRowProps {
    columns: ColumnModel[];
    onRowClick(row: any): void;
    row: any;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
}
export declare const TbMobileRow: React.FunctionComponent<TbMobileRowProps>;
