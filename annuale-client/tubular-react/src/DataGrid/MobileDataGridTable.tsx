import { makeStyles, Theme } from '@material-ui/core';
import GridList from '@material-ui/core/GridList';
import * as React from 'react';

import { ITbTableInstance } from 'tubular-react-common';
import DetailComponentProps from '../BareBones/DetailComponentProps';
import { TbMobileRow } from '../BareBones/TbMobileRow';
import { TbRowProps } from '../BareBones/TbRow';
import { TbSelection } from '../utils/Selection';

const useStyles = makeStyles((theme: Theme) => ({
    gridList: {
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
}));

export interface MobileDataGridTableProps {
    tbTableInstance: ITbTableInstance;
    rowComponent?: React.FunctionComponent<TbRowProps>;
    onRowClick?(row: any): void;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
}

const generateOnRowClickProxy = (onRowClick: any) => {
    return (row: any) => {
        return () => {
            if (onRowClick) {
                onRowClick(row);
            }
        };
    };
};

export const MobileDataGridTable: React.FunctionComponent<MobileDataGridTableProps> = ({
    tbTableInstance,
    rowComponent,
    onRowClick,
    detailComponent,
    rowSelectionEnabled,
    selection,
}: MobileDataGridTableProps) => {
    const RowComponent = rowComponent ? rowComponent : TbMobileRow;
    const onRowClickProxy = onRowClick ? generateOnRowClickProxy(onRowClick) : (_row: any): (() => void) => void 0;

    const classes = useStyles();

    return (
        <GridList className={classes.gridList} cellHeight="auto">
            {tbTableInstance.state.data.map((row: any, index: number) => (
                <RowComponent
                    columns={tbTableInstance.state.columns}
                    row={row}
                    rowIndex={index}
                    onRowClick={onRowClickProxy(row)}
                    key={index}
                    detailComponent={detailComponent || null}
                    rowSelectionEnabled={rowSelectionEnabled}
                    selection={selection}
                />
            ))}
        </GridList>
    );
};
