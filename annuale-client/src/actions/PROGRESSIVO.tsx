import { callApi, loadIdToken } from '../utils/apiUtils'
import { baseURL, datiRequest, datiFailure, datiSuccess } from './action-types'

export const DATI_SUCCESS_COUNT_PROGRESSIVO = 'DATI_SUCCESS_COUNT_PROGRESSIVO'
export const DATI_SUCCESS_SELECT_PROGRESSIVO = 'DATI_SUCCESS_SELECT_PROGRESSIVO'

export const CREATE_UPDATE_PROGRESSIVO = 'CREATE_UPDATE_PROGRESSIVO'
export const CLOSE_MODAL_PROGRESSIVO = 'CLOSE_MODAL_PROGRESSIVO'

export const DATI_SUCCESS_INSERT_OR_UPDATE_PROGRESSIVO = 'DATI_SUCCESS_INSERT_OR_UPDATE_PROGRESSIVO'

export const DATI_SUCCESS_UPDATE_PROGRESSIVO_DETTAGLIO = 'DATI_SUCCESS_UPDATE_PROGRESSIVO_DETTAGLIO'

export const DATI_SUCCESS_DELETE_PROGRESSIVO = 'DATI_SUCCESS_DELETE_PROGRESSIVO'

const PATH = '/PROGRESSIVO'

// Action per abilitare il Modal ->
// mostra i valori iniziali per l'inserimento
// per la modifica invece mostra i valori di riga selezionati

export function Select(val: String, anno: String, progr: String) {
  const idToken = loadIdToken()
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify({ val, anno, progr })
  }

  return callApi(baseURL + PATH + '_dettaglio', config, datiRequest, datiSuccessSelect, datiFailure)
}

function datiSuccessSelect(rows: any, dispatch: any) {
  return {
    type: DATI_SUCCESS_SELECT_PROGRESSIVO,
    rows
  }
}

export const CreateUpdate = (initialValues: any) => {
  return {
    type: CREATE_UPDATE_PROGRESSIVO,
    initialValues,
    open: true
  }
}

export const CloseModal = () => {
  return {
    type: CLOSE_MODAL_PROGRESSIVO,
    open: false
  }
}

// update

export function UpdateProgressivoDettaglio(row: any) {
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

  return callApi(baseURL + PATH + '_dettaglio', config, datiRequest, datiSuccessUpdateProgressivoDettaglio, datiFailure)
}

function datiSuccessUpdateProgressivoDettaglio(row: any, dispatch: any) {
  dispatch(datiSuccess())
  return {
    type: DATI_SUCCESS_UPDATE_PROGRESSIVO_DETTAGLIO,
    row
  }
}

// insert or update

export function InsertOrUpdate(row: any) {
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

function datiSuccessInsertOrUpdate(row: any, dispatch: any) {
  dispatch(datiSuccess())
  return {
    type: DATI_SUCCESS_INSERT_OR_UPDATE_PROGRESSIVO,
    row
  }
}

// delete

export function Delete(selection: any) {
  const idToken = loadIdToken()
  const arrRows = selection.getSelectedRows().map((item: any) => {
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
    (result: any) => {
      selection.toggleAllRowsSelection()
      return {
        type: DATI_SUCCESS_DELETE_PROGRESSIVO,
        result
      }
    },
    datiFailure
  )
}
