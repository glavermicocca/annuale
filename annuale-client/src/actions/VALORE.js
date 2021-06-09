import { callApi, loadIdToken } from '../utils/apiUtils'
import { baseURL, datiRequest, datiFailure, datiSuccess } from './action-types'

export const DATI_SUCCESS_COUNT_VALORE = 'DATI_SUCCESS_COUNT_VALORE'
export const DATI_SUCCESS_SELECT_VALORE = 'DATI_SUCCESS_SELECT_VALORE'

export const CREATE_UPDATE_VALORE = 'CREATE_UPDATE_VALORE'
export const CLOSE_MODAL_VALORE = 'CLOSE_MODAL_VALORE'

export const DATI_SUCCESS_INSERT_OR_UPDATE_VALORE = 'DATI_SUCCESS_INSERT_OR_UPDATE_VALORE'

export const DATI_SUCCESS_DELETE_VALORE = 'DATI_SUCCESS_DELETE_VALORE'

const PATH = '/VALORE'

// Action per abilitare il Modal ->
// mostra i valori iniziali per l'inserimento
// per la modifica invece mostra i valori di riga selezionati

export const CreateUpdate = initialValues => {
  return {
    type: CREATE_UPDATE_VALORE,
    initialValues,
    open: true
  }
}

export const CloseModal = () => {
  return {
    type: CLOSE_MODAL_VALORE,
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
    type: DATI_SUCCESS_INSERT_OR_UPDATE_VALORE,
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
        type: DATI_SUCCESS_DELETE_VALORE,
        result
      }
    },
    datiFailure
  )
}
