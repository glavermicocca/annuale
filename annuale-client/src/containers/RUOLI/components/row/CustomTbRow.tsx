import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import TableRow from '@material-ui/core/TableRow'

import { ARRAY_OF_ROLES } from '../../InsertRow'
import React from 'react'
import { Button } from '@material-ui/core'

import GroupWorkTwoToneIcon from '@material-ui/icons/GroupWorkTwoTone'

import { MainGroup as DataGridDetailDepositiClienti } from '../../RUOLI_ASSEGNATI'

import { makeStyles } from '@material-ui/core/styles'

export default function CustomTbRow({ columns, row, onRowClick, selection, rowSelectionEnabled }: TbRowProps) {
  const useStyles = makeStyles(theme => ({
    column: {
      width: '50%',
      minWidth: '50%'
    }
  }))

  const classes = useStyles()

  const [expanded, setExpanded] = React.useState<boolean>(false)

  const handleChange = () => {
    setExpanded(!expanded)
  }

  var selectContainer = <></>

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

  const tipo_ruolo = ARRAY_OF_ROLES.find((item: any) => item.option === row.tipo_ruolo)

  return (
    <>
      <TableRow hover={true} key={row.id}>
        {selectContainer}
        <TableCell onClick={onRowClick}>{row.id}</TableCell>
        <TableCell onClick={onRowClick}>{row.email}</TableCell>
        <TableCell onClick={onRowClick}>{row.des_ruolo}</TableCell>
        <TableCell onClick={onRowClick}>{tipo_ruolo !== undefined ? tipo_ruolo.value : ''}</TableCell>
        {row.tipo_ruolo !== 'ADMIN' ? (
          <TableCell onClick={handleChange}>
            {expanded === false ? (
              <Button variant="contained" size="small" color="secondary">
                Assegnazioni&nbsp;&nbsp;
                <GroupWorkTwoToneIcon />
              </Button>
            ) : (
              <Button variant="contained" size="small" color="primary">
                Assegnazioni&nbsp;&nbsp;
                <GroupWorkTwoToneIcon />
              </Button>
            )}
          </TableCell>
        ) : (
          <TableCell />
        )}
      </TableRow>
      {expanded === false ? null : (
        <TableRow key={row.id + '_sub'}>
          <TableCell width="100%" colSpan={6}>
            <DataGridDetailDepositiClienti row={row} />
          </TableCell>
        </TableRow>
      )}
    </>
  )
}
