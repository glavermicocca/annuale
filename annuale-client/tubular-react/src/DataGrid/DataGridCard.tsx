import { GridListTile, GridListTileBar, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import LabelImportant from '@material-ui/icons/LabelImportant';
import makeStyles from '@material-ui/styles/makeStyles';
import * as React from 'react';
import { ColumnDataType, ColumnModel } from 'tubular-common';
import { humanize } from 'uno-js';
import DetailComponentProps from '../BareBones/DetailComponentProps';
import { TbSelection } from '../utils/Selection';

const useStyles = makeStyles((theme: Theme) => ({
    cardActions: {
        justifyContent: 'flex-end',
        paddingTop: 0,
    },
    cardBtn: {
        color: 'none',
        textDecoration: 'none',
    },
    cardMobile: {
        marginBottom: theme.spacing(1),
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(3),
        maxHeight: '400px',
        minHeight: '200px',
        minWidth: '20%',
        maxWidth: '20%',
    },
    dataLabel: {
        flexDirection: 'column',
        flexGrow: 1,
        fontWeight: 'bold',
        margin: '4px',
        textAlign: 'right',
        width: '100%',
    },
    dataRow: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    dataValue: {
        flexDirection: 'column',
        flexGrow: 1,
        margin: '2px',
        textAlign: 'left',
        width: '50%',
    },
    titleBar: {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, ' + 'rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    },
}));

const renderGeneral = (column: ColumnModel, item: any) => item[column.name];

const renderBoolean = (column: ColumnModel, item: any) => (
    <input type="checkbox" checked={item[column.name]} disabled={true} />
);

const renderString = (column: ColumnModel, item: any) =>
    item[column.name] && item[column.name].length > 50
        ? item[column.name].substring(0, 50) + '...'
        : renderGeneral(column, item);

const columnRender = (column: ColumnModel, item: any) => {
    switch (column.dataType) {
        case ColumnDataType.Boolean:
            return renderBoolean(column, item);
        case ColumnDataType.String:
            return renderString(column, item);
        default:
            return renderGeneral(column, item);
    }
};

export interface DataGridCardProps {
    columns: ColumnModel[];
    item: any;
    onClickCallback: (row: any) => void;
    rowSelectionEnabled?: boolean;
    selection?: TbSelection;
    detailComponent?: React.FunctionComponent<DetailComponentProps>;
}

export const DataGridCard = ({ columns, item, onClickCallback }: DataGridCardProps) => {
    const classes = useStyles({});

    return (
        <Card className={classes.cardMobile}>
            <GridListTile>
                <img />
                <GridListTileBar
                    title={'pippo'}
                    titlePosition="top"
                    actionIcon={<IconButton aria-label={`star pippo`} className={classes.icon} />}
                    actionPosition="left"
                    className={classes.titleBar}
                />
            </GridListTile>
            <CardContent>
                {columns.map((column: ColumnModel, index: number) => (
                    <div className={classes.dataRow} key={index}>
                        <Typography component="div" variant="body2" color="textSecondary" className={classes.dataLabel}>
                            {humanize(column.name)}:
                        </Typography>
                        <Typography component="div" variant="body2" color="textSecondary" className={classes.dataValue}>
                            {columnRender(column, item)}
                        </Typography>
                    </div>
                ))}
                <CardActions className={classes.cardActions}>
                    {onClickCallback && (
                        <IconButton className={classes.cardBtn} color="default" onClick={onClickCallback} size="small">
                            <LabelImportant />
                        </IconButton>
                    )}
                </CardActions>
            </CardContent>
        </Card>
    );
};
