import { connect } from 'react-redux'

import { CreateUpdate, Delete } from '../../actions/PROGRESSIVO'
import { datiFailure } from '../../actions/action-types'
import { withRouter } from 'react-router-dom'
import { Container, Paper, Typography } from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import InsertRow from './InserRow'

import MobileStepper from '@material-ui/core/MobileStepper'
import { Button } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { useState } from 'react'

import { MainGroup as MultiPhotos } from '../_MULTIPHOTOS'

// Valore
// Anno
// Descrizione errore
// Tipo errore
// Metallo
// Contorno
// Peso
// Diametro
// LINK url

const useStyles = makeStyles(theme => ({
  root: {
    '& > * + *': {
      marginLeft: theme.spacing(2)
    }
  },
  carusel: {
    maxWidth: '100%',
    flexGrow: 1,
    paddingTop: theme.spacing(4)
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    height: 50,
    paddingLeft: theme.spacing(4),
    backgroundColor: theme.palette.background.default
  },
  img: {
    height: 'auto',
    maxWidth: '100%',
    overflow: 'hidden',
    display: 'block',
    width: '100%'
  },
  textContainer: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  },
  insertRow: {
    marginTop: theme.spacing(4),
    paddingBottom: theme.spacing(4)
  }
}))

const tutorialSteps = [
  {
    label: 'San Francisco – Oakland Bay Bridge, United States',
    imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bird',
    imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Bali, Indonesia',
    imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
  },
  {
    label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
    imgPath: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60'
  },
  {
    label: 'Goč, Serbia',
    imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
  }
]

const DataGridComp = (props: any) => {
  const classes = useStyles()
  const theme = useTheme()
  const preventDefault = (event: any) => event.preventDefault()

  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = tutorialSteps.length

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <>
      <Paper>
        <Container className={classes.insertRow}>
          <div className={classes.carusel}>
            <MultiPhotos></MultiPhotos>
            <MobileStepper
              steps={maxSteps}
              position="static"
              variant="text"
              activeStep={activeStep}
              nextButton={
                <Button size="small" onClick={handleNext} disabled={activeStep === maxSteps - 1}>
                  Next
                  {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                </Button>
              }
              backButton={
                <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
                  {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                  Back
                </Button>
              }
            />
          </div>
          <InsertRow />
        </Container>
      </Paper>
    </>
  )
}

const mapStateToProps = (state: any) => {
  const { auth } = state
  const { open, result } = state.VALORE

  return {
    user: auth ? auth.user : null,
    role: auth ? auth.role : null,
    open,
    result
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    CreateUpdate: (initialValues: any) => {
      dispatch(CreateUpdate(initialValues))
    },
    Delete: (selection: any) => {
      dispatch(Delete(selection))
    },
    DatiFailure: (error: any) => {
      dispatch(datiFailure(error))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DataGridComp))
