import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface IChipFilterProps {
    column: ColumnModel;
    onRemoveFilter: (columnName: string) => void;
}
export declare const ChipFilter: React.FunctionComponent<IChipFilterProps>;
