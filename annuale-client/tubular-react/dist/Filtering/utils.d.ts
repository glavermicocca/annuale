import * as React from 'react';
import { ColumnModel, CompareOperators } from 'tubular-common';
export declare const handleFilterChange: (column: ColumnModel) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
export declare const onKeyDown: (onEnter: () => void) => (ev: React.KeyboardEvent) => void;
export interface FilterEditorProps {
    column: ColumnModel;
    onApply: () => void;
}
export declare const getOperatorText: (value: CompareOperators, title: string) => string;
export declare const getOperatorIcon: (operator: CompareOperators) => JSX.Element;
