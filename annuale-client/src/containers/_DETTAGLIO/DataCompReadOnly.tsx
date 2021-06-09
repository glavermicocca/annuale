import { connect } from 'react-redux'

import { Select, CreateUpdate, Delete } from '../../actions/PROGRESSIVO'
import { SelectList } from '../../actions/IMAGES'
import { datiFailure } from '../../actions/action-types'
import { withRouter } from 'react-router-dom'
import { Paper, Typography } from '@material-ui/core'

import { makeStyles, useTheme } from '@material-ui/core/styles'

import Link from '@material-ui/core/Link'

import MobileStepper from '@material-ui/core/MobileStepper'
import { Button, Container } from '@material-ui/core'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import { useEffect, useState } from 'react'

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
  text: {
    marginLeft: theme.spacing(2)
  }
}))

// const props.rowsImages = [
//   {
//     label: 'San Francisco – Oakland Bay Bridge, United States',
//     imgPath: 'https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60'
//   },
//   {
//     label: 'Bird',
//     imgPath: 'https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60'
//   },
//   {
//     label: 'Bali, Indonesia',
//     imgPath: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250&q=80'
//   },
//   {
//     label: 'NeONBRAND Digital Marketing, Las Vegas, United States',
//     imgPath: 'https://images.unsplash.com/photo-1518732714860-b62714ce0c59?auto=format&fit=crop&w=400&h=250&q=60'
//   },
//   {
//     label: 'Goč, Serbia',
//     imgPath: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60'
//   }
// ]

const DataGridComp = (props: any) => {
  const classes = useStyles()
  const theme = useTheme()
  const preventDefault = (event: any) => event.preventDefault()

  const [activeStep, setActiveStep] = useState(0)
  const maxSteps = props.rowsImages.length

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const sp = props.history.location.pathname.split('/')
  const val = decodeURIComponent(sp[1])
  const anno = decodeURIComponent(sp[2])
  const progr = decodeURIComponent(sp[3])

  useEffect(() => {
    props.Select(val, anno, progr)
    props.SelectList(val, anno, progr)
  }, [])

  return (
    <Paper>
      <Container>
        <div className={classes.carusel}>
          {props.rowsImages.length > 0 && (
            <>
              <Paper square elevation={0} className={classes.header}>
                <Typography>{props.rowsImages[activeStep].label}</Typography>
              </Paper>
              <img className={classes.img} src={props.rowsImages[activeStep].imgPath} alt={props.rowsImages[activeStep].label} />
            </>
          )}
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

        {props.rows.length > 0 && (
          <div className={classes.textContainer}>
            {props.rows[0].descrizione_errore !== null && (
              <>
                <Typography variant="caption">Descrizione errore</Typography>
                <Typography className={classes.text}>{props.rows[0].descrizione_errore}</Typography>
              </>
            )}

            {props.rows[0].tipo_errore !== null && (
              <>
                <Typography variant="caption">Tipo errore</Typography>
                <Typography className={classes.text}>{props.rows[0].tipo_errore}</Typography>
              </>
            )}

            {props.rows[0].metallo !== null && (
              <>
                <Typography variant="caption">Metallo</Typography>
                <Typography className={classes.text}>{props.rows[0].metallo}</Typography>
              </>
            )}

            {props.rows[0].contorno !== null && (
              <>
                <Typography variant="caption">Contorno</Typography>
                <Typography className={classes.text}>{props.rows[0].contorno}</Typography>
              </>
            )}

            {props.rows[0].peso !== null && (
              <>
                <Typography variant="caption">Peso</Typography>
                <Typography className={classes.text}>{props.rows[0].peso}</Typography>
              </>
            )}

            {props.rows[0].diametro !== null && (
              <>
                <Typography variant="caption">Diametro</Typography>
                <Typography className={classes.text}>{props.rows[0].diametro}</Typography>
              </>
            )}

            {props.rows[0].link !== '' && (
              <Typography className={classes.root}>
                <Link href={props.rows[0].link} onClick={preventDefault} variant="button">
                  {props.rows[0].link}
                </Link>
              </Typography>
            )}
          </div>
        )}
      </Container>
    </Paper>
  )
}

const mapStateToProps = (state: any, props: any) => {
  const { auth } = state
  const { open, result, rows } = state.PROGRESSIVO
  const rowsImages = state.IMAGES.rows

  console.log(rowsImages)

  return {
    user: auth ? auth.user : null,
    role: auth ? auth.role : null,
    open,
    result,
    rows,
    rowsImages
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    Select: (val: String, anno: String, progr: String) => {
      dispatch(Select(val, anno, progr))
    },
    SelectList: (val: String, anno: String, progr: String) => {
      dispatch(SelectList(val, anno, progr))
    },
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
