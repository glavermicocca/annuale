import { connect } from 'react-redux'

import Modal from '../../components/modals/Modal'
import InsertRow from './InserRow'

import { CreateUpdate, CloseModal, InsertOrUpdate } from '../../actions/VALORE'

import { DATA } from './index'

// Typescript interfaces

export const CreateUpdateModal = (props: any) => {
  let title = 'Modifica'
  if (props.initialValues.val === null) {
    title = 'Crea'
  }

  //for Modal

  const handleOpen = () => {
    const initialValues: DATA = {
      val: null,
      anno: null,
      anno_label: null,
      progr: null
    }
    props.CreateUpdate(initialValues)
  }

  const handleClose = () => {
    props.CloseModal()
  }

  const handleSave = (row: DATA) => {
    props.InsertOrUpdate(row)
  }

  return (
    <Modal open={props.open || false} handleClose={handleClose} handleOpen={handleOpen} title={title}>
      <InsertRow initialValues={props.initialValues} handleSave={handleSave} />
    </Modal>
  )
}

const mapStateToProps = (state: any) => {
  const { initialValues, open } = state.VALORE
  return {
    initialValues,
    open
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    CreateUpdate: (initialValues: DATA) => {
      dispatch(CreateUpdate(initialValues))
    },
    CloseModal: () => {
      dispatch(CloseModal())
    },
    InsertOrUpdate: (row: DATA) => {
      dispatch(InsertOrUpdate(row))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUpdateModal)
