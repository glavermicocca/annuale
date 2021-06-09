import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Avatar from '@material-ui/core/Avatar'
import { red } from '@material-ui/core/colors'

import image from './Rovescio.jpg'

const useStyles = makeStyles(theme => ({
  root: {
    minHeight: 240
  },
  media: {
    paddingTop: '56.25%', // 16:9
    backgroundPositionY: 'top'
  },
  avatar: {
    backgroundColor: red[400]
  }
}))

export default function RecipeReviewCard({ user, handleLogout }) {
  const classes = useStyles()

  return (
    <Card className={classes.root}>
      <CardMedia className={classes.media} image={image} />
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {user != null && user.substring(0, 1).toUpperCase()}
          </Avatar>
        }
        title={user}
        subheader={user}
      />
    </Card>
  )
}
