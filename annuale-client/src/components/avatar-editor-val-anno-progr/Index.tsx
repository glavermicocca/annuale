import React, { useState } from 'react'
import { connect } from 'react-redux'
import ModalSimple from '../modals/ModalSimple'
import AvatarEditor from './MainGroup'
import { Avatar, makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  large: {
    width: '100%',
    height: '200px'
  },
  btns: {
    marginRight: theme.spacing(1)
  }
}))

const Index = (props: any) => {
  const classes = useStyles()

  const [open, setOpen] = useState(false)
  const onClickAvatar = () => {
    setOpen(!open)
  }

  const time = new Date().getTime()

  const path = `/IMAGESThumb?id=${encodeURIComponent(props.id)}&timestamp${time}`

  return (
    <>
      <ModalSimple open={open} handleClose={onClickAvatar} title={"Carica/Modifica l'immagine"}>
        <AvatarEditor id={props.id} />
      </ModalSimple>
      <Avatar onClick={onClickAvatar} variant="rounded" src={path} className={classes.large}>
        No image
      </Avatar>
    </>
  )
}

const mapStateToProps = (state: any, props: any) => {
  return { ...props }
}

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
