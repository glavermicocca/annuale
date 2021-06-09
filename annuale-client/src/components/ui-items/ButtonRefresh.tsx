import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Button } from '@material-ui/core'
import Refresh from '@material-ui/icons/Refresh'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1)
  }
}))

function ButtonRefresh(forceGridRefresh: any) {
  const classes = useStyles()

  return (
    <Button onClick={forceGridRefresh} variant="outlined" color="secondary" className={classes.button}>
      <Refresh />
    </Button>
  )
}

export default ButtonRefresh
