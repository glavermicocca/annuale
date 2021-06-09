import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { TbSelection } from '../utils/Selection';
import DetailComponentProps from '../BareBones/DetailComponentProps';
export interface GridHeaderProps {
    tbTableInstance: ITbTableInstance;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    rowSelectionEnabled: boolean;
    selection?: TbSelection;
}
export declare const GridHeader: React.FunctionComponent<GridHeaderProps>;
