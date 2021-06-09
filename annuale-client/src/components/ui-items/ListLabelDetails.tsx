import React from 'react'
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: '100%',
      minWidth: '100%',
      backgroundColor: theme.palette.background.paper
    }
  })
)

export interface element {
  label: string
  descrizione: string
  avatar?: any | null
}

export default function FolderList(props: any) {
  const classes = useStyles()

  const avatar = (item: element) => {
    if (item.avatar !== null) return <ListItemAvatar>{item.avatar}</ListItemAvatar>
    if (item.avatar !== null)
      return (
        <ListItemAvatar>
          <Avatar>{item.avatar}</Avatar>
        </ListItemAvatar>
      )
  }

  return (
    <List className={classes.root}>
      {props.list
        .filter((item: any) => item !== null)
        .map((item: element, index: number) => {
          return (
            <ListItem alignItems="flex-start" key={index}>
              {avatar(item)}
              <ListItemText onClick={props.onRowClick} primary={item.descrizione} secondary={item.label} />
            </ListItem>
          )
        })}
      {props.extra && <ListItem>{props.extra}</ListItem>}
    </List>
  )
}
