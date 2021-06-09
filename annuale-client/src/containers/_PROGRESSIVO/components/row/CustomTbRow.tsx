import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import { TableCell, Button, Checkbox, TableRow } from '@material-ui/core'

import PhotoLibraryTwoToneIcon from '@material-ui/icons/PhotoLibraryTwoTone'
import ViewListTwoToneIcon from '@material-ui/icons/ViewListTwoTone'

export default function CustomTbRow(columns: any, row: any, onRowClick: any, selection: any, rowSelectionEnabled: any, onRowClickDetail: any) {
  var selectContainer = <></>

  if (columns !== undefined && rowSelectionEnabled !== undefined) {
    const nname = columns!.find((c: any) => c.isKey)!.name
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

  return (
    <TableRow>
      {selectContainer}
      <TableCell onClick={onRowClick}>{row.progr}</TableCell>
      <TableCell onClick={onRowClick}>{row.descrizione_errore}</TableCell>
      {/* <TableCell onClick={onRowClick}>{row.tipo_errore}</TableCell> */}
      <TableCell align="right" onClick={() => onRowClickDetail(row)}>
        <Button variant="contained" size="medium" color="secondary">
          <PhotoLibraryTwoToneIcon />
          <ViewListTwoToneIcon />
        </Button>
      </TableCell>
    </TableRow>
  )
}
