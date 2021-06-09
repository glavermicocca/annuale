import { connect } from 'react-redux'
import DataGridComp from './DataGridComp'
import TableCell from '@material-ui/core/TableCell'

import { SelectDepositi, SelectClienti } from '../../../actions/RUOLI_ASSEGNATI'
import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'

export const MainGroup = (props: any) => {
  const useStyles = makeStyles(theme => ({
    column: {
      justifyContent: 'center',
      alignItems: 'strech',
      display: 'flex',
      whiteSpace: 'nowrap'
    }
  }))

  const classes = useStyles()

  useEffect(() => {
    props.SelectDepositi()
    props.SelectClienti()
  }, [])

  return (
    <Grid container spacing={1}>
      <Grid item xs={12} sm={6}>
        <DataGridComp is_cliente={0} row={props.row} rows={props.rowsDepositi} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <DataGridComp is_cliente={1} row={props.row} rows={props.rowsClienti} />
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state: any, props: any) => {
  const { rowsDepositi, rowsClienti } = state.RUOLI_ASSEGNATI
  return {
    rowsDepositi,
    rowsClienti,
    ...props
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    SelectDepositi: () => {
      dispatch(SelectDepositi())
    },
    SelectClienti: () => {
      dispatch(SelectClienti())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainGroup)
