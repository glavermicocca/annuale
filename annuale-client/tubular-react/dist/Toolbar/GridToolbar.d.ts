import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
import { ToolbarOptions } from './ToolbarOptions';
export interface GridToolbarProps {
    toolbarOptions: ToolbarOptions;
    gridName: string;
    tbTableInstance: ITbTableInstance;
}
export declare const GridToolbar: React.FunctionComponent<GridToolbarProps>;
