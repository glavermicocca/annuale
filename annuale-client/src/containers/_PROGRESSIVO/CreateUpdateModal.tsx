import { connect } from 'react-redux'

import Modal from '../../components/modals/Modal'
import InsertRow from './InserRow'

import { CreateUpdate, CloseModal, InsertOrUpdate } from '../../actions/VALORE'

import { PROGRESSIVO } from './index'
import { withRouter } from 'react-router'
import { useState } from 'react'

// Typescript interfaces

export const CreateUpdateModal = (props: any) => {
  const val = props.history.location.pathname.split('/')[1]
  const anno = props.history.location.pathname.split('/')[2]
  const progr = props.history.location.pathname.split('/')[3]

  console.log(val)

  let title = 'Crea annuale'

  //for Modal

  const initialValues: PROGRESSIVO = {
    val,
    anno,
    anno_label: null,
    progr: null
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSave = (row: PROGRESSIVO) => {
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
    CreateUpdate: (initialValues: PROGRESSIVO) => {
      dispatch(CreateUpdate(initialValues))
    },
    CloseModal: () => {
      dispatch(CloseModal())
    },
    InsertOrUpdate: (row: PROGRESSIVO) => {
      dispatch(InsertOrUpdate(row))
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUpdateModal))
