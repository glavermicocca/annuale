import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbRowProps } from '../BareBones/TbRow';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from '../BareBones/DetailComponentProps';
interface GridBodyProps {
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    tbTableInstance: ITbTableInstance;
    rowComponent: React.FunctionComponent<TbRowProps>;
    rowSelectionEnabled?: boolean;
    onRowClick?(row: any): void;
    selection?: TbSelection;
}
export declare const GridBody: React.FunctionComponent<GridBodyProps>;
export {};
