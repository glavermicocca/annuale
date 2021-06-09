import { connect } from 'react-redux'

import Modal from '../../components/modals/Modal'

import { CreateUpdate, CloseModal, InsertOrUpdate } from '../../actions/VALORE'

import { DATA } from './index'

import AvatarEditor from '../../components/avatar-editor-val-anno-progr/MainGroup'
import { withRouter } from 'react-router-dom'

// Typescript interfaces

export const CreateUpdateModal = (props: any) => {
  let title = 'Modifica'
  if (props.initialValues.val === null) {
    title = 'Crea'
  }

  const sp = props.history.location.pathname.split('/')
  const val = decodeURIComponent(sp[1])
  const anno = decodeURIComponent(sp[2])
  const progr = decodeURIComponent(sp[3])

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
      <AvatarEditor val={val} anno={anno} progr={progr} />
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CreateUpdateModal))
