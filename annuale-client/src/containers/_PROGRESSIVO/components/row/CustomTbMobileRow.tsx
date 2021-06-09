import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import { makeStyles, withStyles } from '@material-ui/core/styles'

import { ColumnModel } from 'tubular-common'

import MuiAccordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import IconButton from '@material-ui/core/IconButton'

import DeleteIcon from '@material-ui/icons/Delete'

import ListLabelDetail, { element } from '../../../../components/ui-items/ListLabelDetails'

import { AccordionDetails } from '@material-ui/core'

import LabelIcon from '@material-ui/icons/Label'
import VpnKeyIcon from '@material-ui/icons/VpnKey'

export default function CustomTbMobileRow({ columns, row, onRowClick, selection }: TbRowProps) {
  const Accordion = withStyles(theme => ({
    root: {
      //backgroundColor: theme.palette.background.paper
    }
  }))(MuiAccordion)

  const useStyles = makeStyles(theme => ({
    accordion: {
      width: '100%',
      minWidth: '100%',
      display: 'flex',
      flexDirection: 'column',
      flexFlow: 'wrap',
      padding: theme.spacing(0)
    }
  }))

  const classes = useStyles()

  const icons = [<VpnKeyIcon />, <LabelIcon />]

  const list: Array<element> = columns
    .filter((column: ColumnModel, index: number) => column.visible)
    .map((column: ColumnModel, index: number) => {
      const el: element = { label: column.label, descrizione: row[column.name], avatar: icons[index] }
      return el
    })

  return (
    <Accordion className={classes.accordion}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <ListLabelDetail onRowClick={onRowClick} list={list} />
      </AccordionSummary>
      <AccordionDetails>
        <IconButton aria-label="delete" onClick={() => selection?.toggleRowSelection(row.cod_cat)}>
          <DeleteIcon />
        </IconButton>
      </AccordionDetails>
    </Accordion>
  )
}
