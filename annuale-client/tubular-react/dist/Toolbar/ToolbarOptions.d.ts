import { ReactNode } from 'react';
export declare class ToolbarOptions {
    advancePagination: boolean;
    enablePagination: boolean;
    customItems: ReactNode;
    actionsArea: React.ComponentType<any>;
    exportButton: boolean;
    printButton: boolean;
    searchText: boolean;
    rowsPerPageOptions: number[];
    itemsPerPage: number;
    title: string;
    constructor(options?: Partial<ToolbarOptions>);
    SetMobileMode(): void;
}
