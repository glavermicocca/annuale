import 'date-fns';
import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface DateFilterProps {
    column: ColumnModel;
    onApply: () => void;
}
export declare const DateFilter: React.FunctionComponent<DateFilterProps>;
