import { callApi, loadIdToken } from '../utils/apiUtils'
import { baseURL, datiRequest, datiFailure, datiSuccess } from './action-types'

import { columns } from '../containers/_MULTIPHOTOS/Columns'
export const DATI_SUCCESS_SELECT_IMAGES = 'DATI_SUCCESS_SELECT_IMAGES'

export const DATI_SUCCESS_INSERT_OR_UPDATE_IMAGES = 'DATI_SUCCESS_INSERT_OR_UPDATE_IMAGES'

export const DATI_SUCCESS_DELETE_IMAGES = 'DATI_SUCCESS_DELETE_IMAGES'

export const DATI_SUCCESS_SELECT_IMAGES_LIST = 'DATI_SUCCESS_SELECT_IMAGES_LIST'

const PATH = '/IMAGES'

export function Select(cod: any) {
  const idToken = loadIdToken()
  const config = {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    }
  }

  return callApi(baseURL + PATH + `/${cod}/${Date()}`, config, datiRequest, datiSuccessSelectImages, datiFailure)
}

function datiSuccessSelectImages(rows: any, dispatch: any) {
  return {
    type: DATI_SUCCESS_SELECT_IMAGES,
    rows
  }
}

// Lista immagini del Dettaglio

export function SelectList(val: String, anno: String, progr: String) {
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

  return callApi(baseURL + PATH + `List?val=${val}&anno=${anno}&progr=${progr}`, config, datiRequest, datiSuccessSelectImagesList, datiFailure)
}

function datiSuccessSelectImagesList(rows: any, dispatch: any) {
  return {
    type: DATI_SUCCESS_SELECT_IMAGES_LIST,
    rows
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
    type: DATI_SUCCESS_INSERT_OR_UPDATE_IMAGES,
    row
  }
}

// delete

export function Delete(cod: any) {
  const idToken = loadIdToken()
  const config = {
    method: 'delete',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${idToken}`
    },
    body: JSON.stringify(cod)
  }

  return callApi(
    baseURL + PATH,
    config,
    datiRequest,
    (result: any) => {
      return {
        type: DATI_SUCCESS_DELETE_IMAGES,
        result
      }
    },
    datiFailure
  )
}
