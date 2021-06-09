import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { MainGroup as Valore } from '../_VALORE'
import { MainGroup as Annuale } from '../_ANNUALE'
import { MainGroup as Progressivo } from '../_PROGRESSIVO'
import { MainGroup as Dettaglio } from '../_DETTAGLIO'

import BreadcrumbsComp from '../_VALORE/BreadcrumbsComp'

const Index = ({ props, history }: any) => {
  const path_1 = history.location.pathname.split('/')[1]
  const path_2 = history.location.pathname.split('/')[2]
  const path_3 = history.location.pathname.split('/')[3]
  const path_4 = history.location.pathname.split('/')[4]

  return (
    <>
      <BreadcrumbsComp />
      {path_1 === '' && <Valore />}
      {path_1 !== '' && path_2 === undefined && <Annuale />}
      {path_2 !== undefined && path_2 !== '' && path_3 === undefined && <Progressivo />}
      {path_3 !== undefined && path_3 !== '' && path_4 === undefined && <Dettaglio />}
    </>
  )
}

const mapStateToProps = ({ state, props }: any) => ({})

const mapDispatchToProps = {}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))
