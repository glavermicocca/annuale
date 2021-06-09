import { connect } from 'react-redux'

import Modal from '../../components/modals/Modal'
import InsertRow from './InserRow'

import { CreateUpdate, CloseModal, InsertOrUpdate } from '../../actions/VALORE'

import { ANNUALE } from './index'
import { withRouter } from 'react-router'
import { useState } from 'react'

// Typescript interfaces

export const CreateUpdateModal = ({ props, history }: any) => {
  const val = history.location.pathname.split('/')[1]
  const anno = history.location.pathname.split('/')[2]
  const progr = history.location.pathname.split('/')[3]

  let title = 'Crea annuale'

  //for Modal

  const initialValues: ANNUALE = {
    val,
    anno: null,
    anno_label: null,
    progr: null
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = (row: ANNUALE) => {
    props.InsertOrUpdate(row)
  }

  const [open, setOpen] = useState(false)

  return (
    <Modal open={open} handleClose={handleClose} handleOpen={handleOpen} title={title}>
      <InsertRow initialValues={initialValues} handleSave={handleSave} />
    </Modal>
  )
}

const mapStateToProps = (state: any) => {
  const { initialValues, open } = state.VALORE
  return {
    //initialValues,
    open
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    CreateUpdate: (initialValues: ANNUALE) => {
      dispatch(CreateUpdate(initialValues))
    },
    CloseModal: () => {
      dispatch(CloseModal())
    },
    InsertOrUpdate: (row: ANNUALE) => {
      dispatch(InsertOrUpdate(row))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUpdateModal))
