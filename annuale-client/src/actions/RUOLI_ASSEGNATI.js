import { callApi, loadIdToken } from '../utils/apiUtils'
import { baseURL, datiRequest, datiFailure, datiSuccess } from './action-types'

//import { columns } from '../containers/RUOLI_ASSEGNATI/Columns'

export const DATI_SUCCESS_COUNT_RUOLI_ASSEGNATI = 'DATI_SUCCESS_COUNT_RUOLI_ASSEGNATI'
export const DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI = 'DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI'

export const DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_DEPOSITI = 'DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_DEPOSITI'

export const DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_CLIENTI = 'DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_CLIENTI'

export const DATI_SUCCESS_INSERT_RUOLI_ASSEGNATI = 'DATI_SUCCESS_INSERT_RUOLI_ASSEGNATI'

export const DATI_SUCCESS_DELETE_RUOLI_ASSEGNATI = 'DATI_SUCCESS_DELETE_RUOLI_ASSEGNATI'

const PATH = '/RUOLI_ASSEGNATI'

export function Select() {
  const idToken = loadIdToken()
  const config = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  }
  return callApi(baseURL + PATH, config, datiRequest, datiSuccessCatMerce, datiFailure)
}

function datiSuccessCatMerce(rows, dispatch) {
  return {
    type: DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI,
    rows
  }
}

// Depositi

export function SelectDepositi() {
  const idToken = loadIdToken()
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  }
  return callApi(baseURL + PATH + `_depositi?is_cliente=${0}`, config, datiRequest, datiSuccessDepositi, datiFailure)
}

function datiSuccessDepositi(rows, dispatch) {
  return {
    type: DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_DEPOSITI,
    rows
  }
}

// Dipendenti

export function SelectClienti() {
  const idToken = loadIdToken()
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  }
  return callApi(baseURL + PATH + `_depositi?is_cliente=${1}`, config, datiRequest, datiSuccessClienti, datiFailure)
}

function datiSuccessClienti(rows, dispatch) {
  return {
    type: DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_CLIENTI,
    rows
  }
}

// insert or update

export function Insert(row) {
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

  return callApi(baseURL + PATH, config, datiRequest, datiSuccessInsert, datiFailure)
}

function datiSuccessInsert(rows, dispatch) {
  dispatch(datiSuccess())
  return {
    type: DATI_SUCCESS_INSERT_RUOLI_ASSEGNATI,
    rows
  }
}

// delete

export function Delete(selection) {
  const idToken = loadIdToken()
  const arrRows = selection.getSelectedRows().map(item => {
    return [item['ruoli_assegnati.id_ruolo'], item['depositi.cod_dep']]
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
        type: DATI_SUCCESS_DELETE_RUOLI_ASSEGNATI,
        result
      }
    },
    datiFailure
  )
}
