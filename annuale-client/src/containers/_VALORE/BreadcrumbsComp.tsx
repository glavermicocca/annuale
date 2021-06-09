import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import HomeIcon from '@material-ui/icons/Home'
import Link from '@material-ui/core/Link'
import { Breadcrumbs, makeStyles, Paper, Theme, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: theme.spacing(3)
  },
  link: {
    display: 'flex'
  },
  icon: {
    marginRight: theme.spacing(1),
    width: 30,
    height: 30
  }
}))

const BreadcrumbsComp = ({ props, history }: any) => {
  const classes = useStyles()

  const handleClick = () => {
    history.push()
  }

  const sp = history.location.pathname.split('/')
  const h_1 = decodeURIComponent(sp[1])
  const h_2 = decodeURIComponent(sp[2])
  const h_3 = decodeURIComponent(sp[3])

  return (
    <Paper className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb">
        {sp.length > 1 && (
          <Link variant="h6" color="inherit" href="/" onClick={handleClick} className={classes.link}>
            <HomeIcon className={classes.icon} />
            Home
          </Link>
        )}
        {sp.length > 1 && sp[1] !== '' && (
          <Link variant="h6" color="inherit" href={`/${sp[1]}`} onClick={handleClick} aria-current="page" className={classes.link}>
            {h_1}
          </Link>
        )}
        {sp.length > 2 && sp[2] !== '' && (
          <Link variant="h6" color="textPrimary" href={`/${sp[1]}/${sp[2]}`} onClick={handleClick} aria-current="page" className={classes.link}>
            {h_2}
          </Link>
        )}
        {sp.length > 3 && sp[3] !== '' && (
          <Link variant="h6" color="textPrimary" href={`/${sp[1]}/${sp[2]}/${sp[3]}`} onClick={handleClick} aria-current="page" className={classes.link}>
            {h_3}
          </Link>
        )}
      </Breadcrumbs>
    </Paper>
  )
}

const mapStateToProps = (state: any) => ({})

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BreadcrumbsComp))
