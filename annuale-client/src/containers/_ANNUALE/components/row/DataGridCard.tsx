import { GridListTile, GridListTileBar, Theme } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import { ColumnDataType, ColumnModel } from 'tubular-common'
import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import { humanize } from 'uno-js'

import ImageAvatarEditor from '../../../../components/avatar-editor-val/Index'

import NavigateNextIcon from '@material-ui/icons/NavigateNext'

const useStyles = makeStyles((theme: Theme) => ({
  cardActions: {
    justifyContent: 'flex-end',
    paddingTop: 0
  },
  cardBtn: {
    color: 'none',
    textDecoration: 'none'
  },
  cardMobile: {
    marginBottom: theme.spacing(1),
    marginRight: theme.spacing(1),
    maxHeight: '200px',
    minHeight: '200px',
    minWidth: '200px',
    maxWidth: '200px'
  },
  dataLabel: {
    flexDirection: 'column',
    flexGrow: 1,
    fontWeight: 'bold',
    margin: '4px',
    textAlign: 'right',
    width: '100%'
  },
  dataRow: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  dataValue: {
    flexDirection: 'column',
    flexGrow: 1,
    margin: '2px',
    textAlign: 'left',
    width: '50%'
  },
  titleBar: {
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },
  icon: {
    color: 'white'
  },
  takeSpace: {
    height: '200px'
  }
}))

const renderGeneral = (column: ColumnModel, item: any) => item[column.name]

const renderBoolean = (column: ColumnModel, item: any) => <input type="checkbox" checked={item[column.name]} disabled={true} />

const renderString = (column: ColumnModel, item: any) => (item[column.name] && item[column.name].length > 50 ? item[column.name].substring(0, 50) + '...' : renderGeneral(column, item))

const columnRender = (column: ColumnModel, item: any) => {
  switch (column.dataType) {
    case ColumnDataType.Boolean:
      return renderBoolean(column, item)
    case ColumnDataType.String:
      return renderString(column, item)
    default:
      return renderGeneral(column, item)
  }
}

export const DataGridCard = ({ columns, row, onRowClick, selection }: TbRowProps) => {
  const classes = useStyles()

  return (
    <Card className={classes.cardMobile}>
      <GridListTile>
        <GridListTileBar
          title={`${row.anno}`}
          titlePosition="bottom"
          actionIcon={
            <IconButton onClick={onRowClick} className={classes.icon}>
              <NavigateNextIcon />
            </IconButton>
          }
          actionPosition="left"
          className={classes.titleBar}
        />
        <Typography className={classes.takeSpace} variant="h3">
          {row.anno_label}
        </Typography>
      </GridListTile>
      <CardContent>
        {/* {columns.map((column: ColumnModel, index: number) => (
          <div className={classes.dataRow} key={index}>
            <Typography component="div" variant="body2" color="textSecondary" className={classes.dataLabel}>
              {humanize(column.name)}:
            </Typography>
            <Typography component="div" variant="body2" color="textSecondary" className={classes.dataValue}>
              {columnRender(column, row)}
            </Typography>
          </div>
        ))} */}
        {/* <CardActions className={classes.cardActions}>{`${row.anno} - ${row.anno_label}`}</CardActions> */}
      </CardContent>
    </Card>
  )
}
