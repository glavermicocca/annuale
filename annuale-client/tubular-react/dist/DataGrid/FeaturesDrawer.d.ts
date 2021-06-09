import * as React from 'react';
import { ColumnModel } from 'tubular-common';
export interface FeaturesDrawerProps {
    columns: ColumnModel[];
    onApplyFeatures: (columns: ColumnModel[]) => void;
    togglePanel: () => void;
}
export declare const FeaturesDrawer: React.FunctionComponent<FeaturesDrawerProps>;
