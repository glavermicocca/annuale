import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import { ColumnModel } from 'tubular-common'

import MuiAccordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'
import LabelTwoToneIcon from '@material-ui/icons/LabelTwoTone'
import AlternateEmailTwoToneIcon from '@material-ui/icons/AlternateEmailTwoTone'
import GroupWorkTwoToneIcon from '@material-ui/icons/GroupWorkTwoTone'
import DeleteIcon from '@material-ui/icons/Delete'

import ListLabelDetail, { element } from '../../../../../components/ui-items/ListLabelDetails'

import { AccordionDetails } from '@material-ui/core'

import StoreMallDirectoryTwoToneIcon from '@material-ui/icons/StoreMallDirectoryTwoTone'
import FaceTwoTone from '@material-ui/icons/FaceTwoTone'

import VpnKeyTwoToneIcon from '@material-ui/icons/VpnKeyTwoTone'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import { Avatar, CardMedia } from '@material-ui/core'

import ModalSimple from '../../../../../components/modals/ModalSimple'
import AvatarEditor from '../../../../../components/avatar-editor/index'
import { useState } from 'react'

export default function CustomTbMobileRow({ columns, row, onRowClick, selection }: TbRowProps) {
  const useStyles = makeStyles(theme => ({
    btns: {
      margin: theme.spacing(1)
    },
    large: {
      width: theme.spacing(7),
      height: theme.spacing(7)
    },
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      width: '100%',
      margin: theme.spacing(1),
      flexDirection: 'row'
    },
    actions: {
      width: '100%',
      marginBottom: theme.spacing(1)
    },
    content: {
      width: '80%',
      flex: '1 0 auto'
    },
    avatar: {
      width: theme.spacing(7)
    }
  }))

  const classes = useStyles()

  const cod_dep = row[columns[3].name]
  const cod_dep_label = columns[3].label

  const des_dep = row[columns[4].name]
  const des_dep_label = columns[4].label

  const time = new Date().getTime()

  const path = `/IMAGESThumb?cod_dep=${encodeURIComponent(cod_dep)}&timestamp${time}`

  const [open, setOpen] = useState(false)
  const onClickAvatar = () => {
    setOpen(!open)
  }

  return (
    <Card className={classes.root}>
      <CardContent onClick={onRowClick} className={classes.content}>
        <Typography component="h5" variant="h5">
          {cod_dep}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {cod_dep_label}
        </Typography>
        <Typography component="h5" variant="h5">
          {des_dep}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {des_dep_label}
        </Typography>
        <IconButton aria-label="delete" onClick={() => selection?.toggleRowSelection(row['depositi.cod_dep'])}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
      <CardMedia className={classes.avatar}>
        <ModalSimple open={open} handleClose={onClickAvatar} title={"Carica/Modifica l'immagine"}>
          <AvatarEditor cod_dep={cod_dep} />
        </ModalSimple>
        {row['depositi.is_cliente'] !== undefined && row['depositi.is_cliente'] === '1' && (
          <Avatar onClick={onClickAvatar} src={path} className={classes.large}>
            <FaceTwoTone />
          </Avatar>
        )}
        {row['depositi.is_cliente'] !== undefined && row['depositi.is_cliente'] === '0' && (
          <Avatar onClick={onClickAvatar} variant="rounded" src={path} className={classes.large}>
            <StoreMallDirectoryTwoToneIcon />
          </Avatar>
        )}
      </CardMedia>
    </Card>
    // <Accordion className={classes.accordion}>
    //   <AccordionSummary expandIcon={<ExpandMoreIcon />}>
    //     <ListLabelDetail onRowClick={onRowClick} list={list} />
    //   </AccordionSummary>
    //   <AccordionDetails>
    //     <IconButton aria-label="delete" onClick={() => selection?.toggleRowSelection(row.id)}>
    //       <DeleteIcon />
    //     </IconButton>
    //   </AccordionDetails>
    // </Accordion>
  )
}
