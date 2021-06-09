import * as React from 'react';
import { ITbTableInstance } from 'tubular-react-common';
export interface PaginatorProps {
    tbTableInstance: ITbTableInstance;
    rowsPerPageOptions: number[];
    advancePagination: boolean;
}
export declare const Paginator: React.FunctionComponent<PaginatorProps>;
