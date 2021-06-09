import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface GridHeaderCellProps {
    column: ColumnModel;
    key: string;
    sortColumn: (property: string) => void;
}
export declare const GridHeaderCell: React.FunctionComponent<GridHeaderCellProps>;
