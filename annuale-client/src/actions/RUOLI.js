import { callApi, loadIdToken } from '../utils/apiUtils'
import { baseURL, datiRequest, datiFailure, datiSuccess } from './action-types'

import { columns } from '../containers/RUOLI/Columns'

export const DATI_SUCCESS_COUNT_RUOLI = 'DATI_SUCCESS_COUNT_RUOLI'
export const DATI_SUCCESS_SELECT_RUOLI = 'DATI_SUCCESS_SELECT_RUOLI'

export const CREATE_UPDATE_RUOLI = 'CREATE_UPDATE_RUOLI'
export const CLOSE_MODAL_RUOLI = 'CLOSE_MODAL_RUOLI'

export const DATI_SUCCESS_INSERT_OR_UPDATE_RUOLI = 'DATI_SUCCESS_INSERT_OR_UPDATE_RUOLI'

export const DATI_SUCCESS_DELETE_RUOLI = 'DATI_SUCCESS_DELETE_RUOLI'

const PATH = '/RUOLI'

export function Select() {
  const idToken = loadIdToken()
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ columns })
  }
  return callApi(baseURL + PATH, config, datiRequest, datiSuccessCatMerce, datiFailure)
}

function datiSuccessCatMerce(rows, dispatch) {
  return {
    type: DATI_SUCCESS_SELECT_RUOLI,
    rows
  }
}

// Action per abilitare il Modal ->
// mostra i valori iniziali per l'inserimento
// per la modifica invece mostra i valori di riga selezionati

export const CreateUpdate = initialValues => {
  return {
    type: CREATE_UPDATE_RUOLI,
    initialValues,
    open: true
  }
}

export const CloseModal = () => {
  return {
    type: CLOSE_MODAL_RUOLI,
    open: false
  }
}

// insert or update

export function InsertOrUpdate(row) {
  const idToken = loadIdToken()
  const config = {
    method: 'put',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(row)
  }

  return callApi(baseURL + PATH, config, datiRequest, datiSuccessInsertOrUpdate, datiFailure)
}

function datiSuccessInsertOrUpdate(row, dispatch) {
  dispatch(datiSuccess())
  return {
    type: DATI_SUCCESS_INSERT_OR_UPDATE_RUOLI,
    row
  }
}

// delete

export function Delete(selection) {
  const idToken = loadIdToken()
  const arrRows = selection.getSelectedRows().map(item => {
    return item.id
  })
  const config = {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(arrRows)
  }

  return callApi(
    baseURL + PATH,
    config,
    datiRequest,
    result => {
      selection.toggleAllRowsSelection()
      return {
        type: DATI_SUCCESS_DELETE_RUOLI,
        result
      }
    },
    datiFailure
  )
}
