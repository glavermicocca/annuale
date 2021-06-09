import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'

import React, { useState, useEffect } from 'react'
import { useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'

import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { FormGroup, FormControlLabel, Switch, Box } from '@material-ui/core'
import HomeTwoToneIcon from '@material-ui/icons/HomeTwoTone'
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToApp'

import SupervisedUserCircleTwoToneIcon from '@material-ui/icons/SupervisedUserCircleTwoTone'

import FilterVintageTwoToneIcon from '@material-ui/icons/FilterVintageTwoTone'

import { makeStyles } from '@material-ui/core'

import UserProfileCard from './UserProfileCard'

import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone'
import Brightness2TwoToneIcon from '@material-ui/icons/Brightness2TwoTone'

import { logout } from '../../actions/auth'

const useStyles = makeStyles(theme => ({
  link: {
    color: 'inherit',
    textDecoration: 'inherit'
  }
}))

const Header = props => {
  const classes = useStyles()

  const { user, role } = props
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const onLogoutClick = event => {
    event.preventDefault()
    props.logout()
  }

  const [selectedIndex, setSelectedIndex] = useState(1)

  useEffect(() => {
    setSelectedIndex(1)
    if (props.history.location.pathname.indexOf('Valore') > 0) {
      setSelectedIndex(2)
    } else if (props.history.location.pathname.indexOf('Ruoli') > 0) {
      setSelectedIndex(8)
    }
  }, [props.history.location.pathname])

  const [toggleTheme, setToggleTheme] = React.useState(true)

  const handleToggle = event => {
    setToggleTheme(event.target.checked)
    props.toggleDarkTheme()
  }

  return (
    <>
      <AppBar>
        <Toolbar>
          <Box alignItems="center" display="flex" flexGrow={1}>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleDrawerOpen} edge="start">
              <MenuIcon />
            </IconButton>
          </Box>
          <FormGroup>
            <FormControlLabel
              control={<Switch checked={toggleTheme} onChange={handleToggle} aria-label="login switch" />}
              label={toggleTheme ? <Brightness4TwoToneIcon /> : <Brightness2TwoToneIcon />}
            />
          </FormGroup>
        </Toolbar>
      </AppBar>
      <Drawer variant="temporary" anchor="left" open={open}>
        <IconButton onClick={handleDrawerClose}>{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        <UserProfileCard user={user}></UserProfileCard>
        <List>
          <Link className={classes.link} to="/" onClick={handleDrawerClose}>
            <ListItem button selected={selectedIndex === 1}>
              <ListItemIcon>
                <HomeTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Home"></ListItemText>
            </ListItem>
          </Link>
        </List>
        <Divider />
        <List>
          {role === 'ADMIN' && (
            <>
              <List>
                <Link className={classes.link} to="/Ruoli" onClick={handleDrawerClose}>
                  <ListItem button selected={selectedIndex === 8}>
                    <ListItemIcon>
                      <SupervisedUserCircleTwoToneIcon />
                    </ListItemIcon>
                    <ListItemText primary="Ruoli"></ListItemText>
                  </ListItem>
                </Link>
              </List>
              <Divider />
            </>
          )}
          <Link className={classes.link} to="/Logout" onClick={onLogoutClick}>
            <ListItem button selected={selectedIndex === 9}>
              <ListItemIcon>
                <ExitToAppTwoToneIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItem>
          </Link>
        </List>
      </Drawer>
    </>
  )
}

const mapStateToProps = (state, props) => {
  return {
    props
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header))
