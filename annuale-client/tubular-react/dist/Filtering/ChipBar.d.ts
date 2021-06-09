import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface ChipBarProps {
    columns: ColumnModel[];
    onClearFilter: (columnName: string) => void;
}
export declare const ChipBar: React.FunctionComponent<ChipBarProps>;
