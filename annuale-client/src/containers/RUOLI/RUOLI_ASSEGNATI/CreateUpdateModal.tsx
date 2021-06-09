import { connect } from 'react-redux'

import Modal from '../../../components/modals/Modal'
import InsertRow from './InsertRow'

import { CreateUpdate, CloseModal, InsertOrUpdate } from '../../../actions/RUOLI'

import { RUOLI } from './index'

// Typescript interfaces

export const CreateUpdateModal = (props: any) => {
  let title = 'Modifica Ruolo'
  if (props.initialValues.id === null) {
    title = 'Crea Ruolo'
  }

  //for Modal

  const handleOpen = () => {
    const initialValues: RUOLI = {
      id: null, //p.e. test
      email: null,
      des_ruolo: null,
      tipo_ruolo: null
    }
    props.CreateUpdate(initialValues)
  }

  const handleClose = () => {
    props.CloseModal()
  }

  const handleSave = (row: RUOLI) => {
    props.InsertOrUpdate(row)
  }

  return (
    <Modal open={props.open} handleClose={handleClose} handleOpen={handleOpen} title={title}>
      <InsertRow initialValues={props.initialValues} handleSave={handleSave} />
    </Modal>
  )
}

const mapStateToProps = (state: any) => {
  const { initialValues, open } = state.RUOLI
  return {
    initialValues,
    open
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    CreateUpdate: (initialValues: RUOLI) => {
      dispatch(CreateUpdate(initialValues))
    },
    CloseModal: () => {
      dispatch(CloseModal())
    },
    InsertOrUpdate: (row: RUOLI) => {
      dispatch(InsertOrUpdate(row))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateModal)
