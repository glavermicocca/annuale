import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import TableCell from '@material-ui/core/TableCell'
import Checkbox from '@material-ui/core/Checkbox'
import TableRow from '@material-ui/core/TableRow'

import ModalSimple from '../../../../../components/modals/ModalSimple'
import AvatarEditor from '../../../../../components/avatar-editor/index'

import { Avatar, makeStyles } from '@material-ui/core'

import StoreMallDirectoryTwoToneIcon from '@material-ui/icons/StoreMallDirectoryTwoTone'
import FaceTwoTone from '@material-ui/icons/FaceTwoTone'
import { useState } from 'react'

const useStyles = makeStyles(theme => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  }
}))

export default function CustomTbRow({ columns, row, onRowClick, selection, rowSelectionEnabled }: TbRowProps) {
  var selectContainer = <></>

  var classes = useStyles()

  const time = new Date().getTime()

  const cod_dep = row['depositi.cod_dep']

  const path = `/IMAGESThumb?cod_dep=${encodeURIComponent(cod_dep)}&timestamp${time}`

  const [open, setOpen] = useState(false)
  const onClickAvatar = () => {
    setOpen(!open)
  }

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

  return (
    <TableRow hover={true} key={row['depositi.des_dep']}>
      {selectContainer}
      <ModalSimple open={open} handleClose={onClickAvatar} title={"Carica/Modifica l'immagine"}>
        <AvatarEditor cod_dep={cod_dep} />
      </ModalSimple>
      <TableCell onClick={onClickAvatar}>
        {row['depositi.is_cliente'] !== undefined && row['depositi.is_cliente'] === '1' && (
          <Avatar src={path} className={classes.large}>
            <FaceTwoTone />
          </Avatar>
        )}
        {row['depositi.is_cliente'] !== undefined && row['depositi.is_cliente'] === '0' && (
          <Avatar variant="rounded" src={path} className={classes.large}>
            <StoreMallDirectoryTwoToneIcon />
          </Avatar>
        )}
      </TableCell>
      <TableCell onClick={onRowClick}>{row['depositi.cod_dep']}</TableCell>
      <TableCell onClick={onRowClick}>{row['depositi.des_dep']}</TableCell>
    </TableRow>
  )
}
