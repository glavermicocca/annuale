import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface FiltersContainerProps {
    columns: ColumnModel[];
    onApply: () => void;
}
export declare const FiltersContainer: React.FunctionComponent<FiltersContainerProps>;
