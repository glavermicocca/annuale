import SignaturePad from 'react-signature-pad-wrapper'

import React from 'react'
import { connect } from 'react-redux'
import { Button, Paper } from '@material-ui/core'

export const Index = props => {
  const signRef = React.useRef(null)

  const getSignRef = () => {
    return signRef.current.toDataURL()
  }

  const onClear = () => {
    signRef.current.clear()
  }

  return (
    <Paper elevation={2}>
      <SignaturePad ref={signRef} options={{ backgroundColor: 'rgb(255, 255, 255)', penColor: 'rgb(48, 67, 95)' }} />
      <Button color="primary" variant="contained" onClick={onClear}>
        Cancella
      </Button>
    </Paper>
  )
}

const mapStateToProps = state => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
