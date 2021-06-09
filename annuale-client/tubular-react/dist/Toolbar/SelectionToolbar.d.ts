import * as React from 'react';
import { TbSelection } from '../utils/Selection';
export interface SelectionToolbarProps {
    selection: TbSelection;
    actionsArea?: React.ComponentType<any>;
}
export declare const SelectionToolbar: React.FunctionComponent<SelectionToolbarProps>;
