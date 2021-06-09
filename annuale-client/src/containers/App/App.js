import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'

import { connect } from 'react-redux'
import Header from '../../components/header/Header'
import Login from '../Login/index'
import PrivateRoute from '../misc/PrivateRoute'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'

import CssBaseline from '@material-ui/core/CssBaseline'

import { MainGroup as Valore } from '../_VALORE'

import { MainGroup as Ruoli } from '../RUOLI'

import { makeStyles } from '@material-ui/core/styles'

import { Box, Container, Typography } from '@material-ui/core'

import { useState } from 'react'

import Alerts from './Alerts'

import { themeOptions as AnnualeTheme } from './Themes/Annuale'

import Home from '../_HOME/Index'

const App = props => {
  // We keep the theme in app state
  const [toggleTheme, setToggleTheme] = useState('light')

  let selectedTheme = null

  if (process.env.REACT_APP_CUSTOMER === 'ANNUALE') {
    selectedTheme = AnnualeTheme
  }

  // we change the palette type of the theme in state
  const toggleDarkTheme = () => {
    setToggleTheme(toggleTheme === 'light' ? 'dark' : 'light')
    selectedTheme.palette.type = toggleTheme === 'light' ? 'dark' : 'light'
  }

  const muiTheme = createMuiTheme(selectedTheme)

  const { user, role } = props
  const isAuthenticated = true && user

  const useStyles = makeStyles(theme => ({
    root: {
      // width: '99%',
      // marginLeft: '0.5%',
      // marginRight: '0.5%',
      [theme.breakpoints.down('sm')]: {
        paddingTop: theme.mixins.toolbar.minHeight + 10
      },
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.mixins.toolbar.minHeight + 15
      },
      paddingBottom: theme.mixins.toolbar.minHeight + 120
    }
  }))

  const classes = useStyles()

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <Alerts />
      <Router>
        {/* {user == null && (
            <Redirect
              to={{
                pathname: '/login',
                state: { from: props.location }
              }}
            />
          )} */}
        {isAuthenticated && <Header user={user} role={role} toggleDarkTheme={() => toggleDarkTheme()} handleLogout={() => this.handleLogout()}></Header>}
        <div className={classes.root}>
          <Container maxWidth="lg">
            <Switch>
              <Route exact path="/Login" component={Login} user={user} />
              <PrivateRoute exact path="/Dashboard" isAuthenticated={isAuthenticated} component={<Typography variant="h4">Welcome</Typography>} />
              <PrivateRoute path="/Ruoli" isAuthenticated={isAuthenticated} component={render => <Ruoli role={role} />} />
              <Route path="/" component={Home} />
            </Switch>
          </Container>
        </div>
      </Router>
    </ThemeProvider>
  )
}

const mapStateToProps = state => {
  const { auth, data } = state
  return {
    user: auth ? auth.user : null,
    role: auth ? auth.role : null,
    data
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
