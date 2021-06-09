import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface StringFilterProps {
    column: ColumnModel;
    onApply: () => void;
}
export declare const StringFilter: React.FunctionComponent<StringFilterProps>;
