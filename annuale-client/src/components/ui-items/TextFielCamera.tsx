import React from 'react'
import TextField from '@material-ui/core/TextField'
import { Button, Dialog, DialogActions, DialogContent, FormControl } from '@material-ui/core'
import BarcodeScanner from './BarcodeScanner'
import CameraAltTwoTone from '@material-ui/icons/CameraAltTwoTone'

function TextFielCamera(props: any) {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }
  const handleClose = () => {
    setOpen(false)
  }

  const endAdo = (
    <Button variant="contained" color="secondary" onClick={handleClickOpen}>
      <CameraAltTwoTone />
    </Button>
  )

  return (
    <FormControl fullWidth>
      <TextField
        {...props}
        InputProps={{
          endAdornment: endAdo
        }}
        InputLabelProps={{
          shrink: true
        }}
      />
      <Dialog keepMounted={false} onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogContent dividers>
          <BarcodeScanner
            onChange={(value: string) => {
              props.setValue(props.name, value)
              handleClose()
            }}></BarcodeScanner>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose} color="primary">
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </FormControl>
  )
}

export default TextFielCamera
