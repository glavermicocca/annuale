import React from 'react'
import { createStyles, Theme, withStyles, WithStyles, makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import MuiDialogContent from '@material-ui/core/DialogContent'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import CloseIcon from '@material-ui/icons/Close'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import Add from '@material-ui/icons/Add'

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  })

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fabAdd: {
      // display: 'flex',
      // right: '1rem',
      // bottom: '4rem'
    },
    btnAdd: {
      textAlign: 'center',
      marginTop: '1rem',
      width: '100%'
    }
  })
)

export interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string
  children: React.ReactNode
  onClose: () => void
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent)

// const DialogActions = withStyles((theme: Theme) => ({
//   root: {
//     margin: 0,
//     padding: theme.spacing(1)
//   }
// }))(MuiDialogActions)

export default function CustomizedDialogs({ children, title, handleOpen, handleClose, open }: any) {
  const classes = useStyles()

  return (
    <div>
      <Box className={classes.btnAdd}>
        <Button endIcon={<Add />} className={classes.fabAdd} variant="contained" onClick={handleOpen} color="primary">
          Aggiungi
        </Button>
      </Box>
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          {title}
        </DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        {/* <DialogActions>
            <Button autoFocus onClick={handleClose} color="primary">
              Save changes
            </Button>
          </DialogActions> */}
      </Dialog>
    </div>
  )
}
