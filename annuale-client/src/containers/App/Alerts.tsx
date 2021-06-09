import { connect } from 'react-redux'
import { Alert } from '@material-ui/lab'
import React, { useEffect, useState } from 'react'
import { makeStyles, Snackbar } from '@material-ui/core'

import { datiFailureDismiss, datiSuccessDismiss } from '../../actions/action-types'

const useStyles = makeStyles(theme => ({
  snackbar: {
    bottom: '80px',
    zIndex: 11000
  }
}))

export const Alerts = (props: any) => {
  const classes = useStyles()

  const handleCloseResult = (event?: React.SyntheticEvent, reason?: string) => {
    props.datiSuccessDismiss()
  }

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    props.datiFailureDismiss()
  }

  return (
    <>
      <Snackbar className={classes.snackbar} open={props.resultError} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error">
          {props.error?.statusText}
          {props.error?.message}
        </Alert>
      </Snackbar>
      <Snackbar className={classes.snackbar} open={props.result} autoHideDuration={2500} onClose={handleCloseResult}>
        <Alert onClose={handleCloseResult} severity="success">
          Salvato
        </Alert>
      </Snackbar>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const { base } = state
  return {
    ...base
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    datiFailureDismiss: () => {
      dispatch(datiFailureDismiss())
    },
    datiSuccessDismiss: () => {
      dispatch(datiSuccessDismiss())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
