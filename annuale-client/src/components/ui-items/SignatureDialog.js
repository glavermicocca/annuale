import { AppBar, Box, Button, Dialog, DialogTitle, IconButton, makeStyles, Paper, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core'
import React from 'react'

import SignaturePad from 'react-signature-pad-wrapper'

import CloseIcon from '@material-ui/icons/Close'
import BorderColorTwoToneIcon from '@material-ui/icons/BorderColorTwoTone'

const useStyles = makeStyles(theme => ({
  buttonCancella: {
    margin: theme.spacing(1),
    width: '10rem'
  },
  dialog: {
    //width: '400px'
  },
  appBar: {
    position: 'relative'
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  buttonConfirm: {
    height: theme.spacing(7)
  },
  boxConfirm: {
    marginTop: theme.spacing(3)
  },
  paperSignature: {
    background: 'rgba(255, 255, 255)',
    border: '1px solid',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  }
}))

function SignatureDialog(props) {
  const theme = useTheme()

  var classes = useStyles()

  const signRef = React.useRef(null)

  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = value => {
    setOpen(false)
    props.onCloseSignatureDialog(signRef.current?.toDataURL())
  }

  const onClear = () => {
    signRef.current?.clear()
  }

  return (
    <div>
      <Box className={classes.boxConfirm}>
        <Typography variant="subtitle1" className={classes.title}>
          La tua firma verrà impressa nel documento PDF di riepilogo e non verrà salvata altrove...
        </Typography>
        <Button
          className={classes.buttonConfirm}
          disabled={props.disabled}
          fullWidth={true}
          size="large"
          variant="contained"
          color="secondary"
          startIcon={<BorderColorTwoToneIcon />}
          onClick={handleClickOpen}>
          Aggiungi firma
        </Button>
      </Box>
      <Dialog fullScreen={true} className={classes.dialog} onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Utilizza l'area grigia per inserire una firma
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Salva
            </Button>
          </Toolbar>
        </AppBar>
        <Button className={classes.buttonCancella} color="primary" variant="contained" onClick={onClear}>
          Cancella
        </Button>
        <Paper elevation={2} className={classes.paperSignature}>
          <SignaturePad ref={signRef} redrawOnResize={true} options={{ backgroundColor: 'rgba(255, 255, 255)', penColor: 'rgb(64, 117, 157)' }} />
        </Paper>
      </Dialog>
    </div>
  )
}

export default SignatureDialog
