import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface FilterControlProps {
    column: ColumnModel;
    onApply: () => void;
}
export declare const FilterControl: React.FunctionComponent<FilterControlProps>;
