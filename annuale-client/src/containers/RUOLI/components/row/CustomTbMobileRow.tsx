import { TbRowProps } from 'tubular-react/dist/BareBones/TbRow'

import { makeStyles } from '@material-ui/core/styles'

import { Button, Grid } from '@material-ui/core'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

import IconButton from '@material-ui/core/IconButton'
import GroupWorkTwoToneIcon from '@material-ui/icons/GroupWorkTwoTone'
import DeleteIcon from '@material-ui/icons/Delete'

import { MainGroup as DataGridDetailDepositiClienti } from '../../RUOLI_ASSEGNATI'

import { ARRAY_OF_ROLES } from '../../InsertRow'
import { useState } from 'react'

export default function CustomTbMobileRow({ columns, row, onRowClick, selection }: TbRowProps) {
  const useStyles = makeStyles(theme => ({
    btns: {
      marginRight: theme.spacing(1)
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

  const [expanded, setExpanded] = useState<boolean>(false)

  const handleChange = () => {
    setExpanded(!expanded)
  }

  const email = row.email
  const email_label = columns[1].label

  const des_ruolo = row.des_ruolo
  const des_ruolo_label = columns[2].label

  const tipo_ruolo = ARRAY_OF_ROLES.find((item: any) => item.option === row.tipo_ruolo)
  const tipo_ruolo_value = tipo_ruolo !== undefined ? tipo_ruolo.value : ''
  const tipo_ruolo_label = columns[3].label

  return (
    <Card className={classes.root} key={row.id}>
      <CardContent onClick={onRowClick} className={classes.content}>
        <Typography component="h5" variant="h5">
          {email}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {email_label}
        </Typography>
        <Typography component="h5" variant="h5">
          {des_ruolo}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {des_ruolo_label}
        </Typography>
        <Typography component="h5" variant="h5">
          {tipo_ruolo_value}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {tipo_ruolo_label}
        </Typography>
        <IconButton aria-label="delete" onClick={() => selection?.toggleRowSelection(row.id)}>
          <DeleteIcon />
        </IconButton>
      </CardContent>
      {row.tipo_ruolo !== 'ADMIN' && (
        <div className={classes.actions}>
          <Grid onClick={handleChange} container direction="row" justify="center" alignItems="center">
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
          </Grid>
          {expanded === false ? null : <DataGridDetailDepositiClienti row={row} />}
        </div>
      )}
    </Card>
  )
}
