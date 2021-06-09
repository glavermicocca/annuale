import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import DataCompReadOnly from './DataCompReadOnly'
import DataComp from './DataComp'
import { Select } from '../../actions/PROGRESSIVO'
import { withRouter } from 'react-router'

const MainGroup = (props: any) => {
  const sp = props.history.location.pathname.split('/')
  const val = decodeURIComponent(sp[1])
  const anno = decodeURIComponent(sp[2])
  const progr = decodeURIComponent(sp[3])

  useEffect(() => {
    props.Select(val, anno, progr)
  }, [])

  return (
    <>
      {props.user === null && props.rows.length > 0 && <DataCompReadOnly />}
      {props.user !== null && props.rows.length > 0 && <DataComp />}
    </>
  )
}

const mapStateToProps = (state: any, props: any) => {
  const { auth } = state
  const { open, result, rows } = state.PROGRESSIVO

  return {
    user: auth ? auth.user : null,
    role: auth ? auth.role : null,
    open,
    result,
    rows
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    Select: (val: String, anno: String, progr: String) => {
      dispatch(Select(val, anno, progr))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainGroup))
