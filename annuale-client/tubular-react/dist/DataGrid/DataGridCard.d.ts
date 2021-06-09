import * as React from 'react';
import { ColumnModel } from 'tubular-common';
import DetailComponentProps from '../BareBones/DetailComponentProps';
import { TbSelection } from '../utils/Selection';
export interface DataGridCardProps {
    columns: ColumnModel[];
    item: any;
    onClickCallback: (row: any) => void;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
}
export declare const DataGridCard: ({ columns, item, onClickCallback }: DataGridCardProps) => JSX.Element;
