import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import TableRow from '@material-ui/core/TableRow'
import { makeStyles } from '@material-ui/core'

let lastValore: String = ''

const useStyles = makeStyles(theme => ({
  row: {
    backgroundColor: 'red'
  },
  rowNew: {
    backgroundColor: 'blue'
  }
}))

export default function CustomTbRow({ columns, row, onRowClick, selection, rowSelectionEnabled }: TbRowProps) {
  var selectContainer = <></>

  const classes = useStyles()

  if (columns !== undefined && rowSelectionEnabled !== undefined) {
    const nname = columns!.find(c => c.isKey)!.name
    selectContainer = (
      <TableCell padding="checkbox">
        <Checkbox
          checked={selection!.rowSelection[row[nname]] ?? false}
          onChange={() => {
            selection!.toggleRowSelection(row[nname])
          }}
          value={selection!.rowSelection[row[nname]] ?? false}
          inputProps={{ 'aria-label': 'select all desserts' }}
        />
      </TableCell>
    )
  }

  console.log(lastValore, row.valore)

  if (lastValore === '') {
    lastValore = row.valore
  }

  if (lastValore !== row.valore) {
    lastValore = row.valore
    return (
      <TableRow className={classes.row} key={row.id}>
        {selectContainer}
        <TableCell onClick={onRowClick}>{row.cc}</TableCell>
        <TableCell onClick={onRowClick}>{row.valore}</TableCell>
        <TableCell onClick={onRowClick}>{row.anno}</TableCell>
        <TableCell onClick={onRowClick}>{row.progressivo}</TableCell>
        <TableCell onClick={onRowClick}>{row.anno_valore}</TableCell>
      </TableRow>
    )
  } else {
    lastValore = row.valore
    return (
      <TableRow className={classes.rowNew} key={row.id}>
        {selectContainer}
        <TableCell onClick={onRowClick}>{row.cc}</TableCell>
        <TableCell onClick={onRowClick}>{row.valore}</TableCell>
        <TableCell onClick={onRowClick}>{row.anno}</TableCell>
        <TableCell onClick={onRowClick}>{row.progressivo}</TableCell>
        <TableCell onClick={onRowClick}>{row.anno_valore}</TableCell>
      </TableRow>
    )
  }
}
