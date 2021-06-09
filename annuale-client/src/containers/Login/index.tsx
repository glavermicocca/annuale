import { connect } from 'react-redux'
import { login } from '../../actions/auth'
import { GoogleLoginButton, MicrosoftLoginButton } from 'react-social-login-buttons'
import Container from '@material-ui/core/Container'
import { makeStyles } from '@material-ui/core/styles'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Typography from '@material-ui/core/Typography'

import welcome from './welcome.jpg'

import FormLogin from './form'

const useStyles = makeStyles(theme => ({
  media: {
    height: 240
  },
  backgroundGradient: {
    backgroundImage: 'background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);'
  },
  position: {
    marginTop: theme.spacing(3)
  }
}))

export const Index = (props: any) => {
  const classes = useStyles()
  return (
    <Container maxWidth="xs">
      <Card>
        <CardMedia className={classes.media} image={welcome} title="Contemplative Reptile" />
        <CardContent className={classes.backgroundGradient}>
          <Typography gutterBottom variant="h6" component="h6">
            Accedi...
          </Typography>
          <div className={classes.position}>
            <GoogleLoginButton
              onClick={() => {
                props.login('Google')
              }}
            />
            <MicrosoftLoginButton
              onClick={() => {
                props.login('Microsoft')
              }}
            />
          </div>
          <FormLogin />
        </CardContent>
      </Card>
    </Container>
  )
}

const mapStateToProps = (state: any) => {
  const { auth, data } = state
  return {
    user: auth ? auth.user : null,
    role: auth ? auth.role : null,
    data
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    login: (type: any) => {
      dispatch(login(type))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
