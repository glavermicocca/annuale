export const baseURL = process.env.REACT_APP_BASE_URL_API

export const DATI_REQUEST = 'DATI_REQUEST'
export const DATI_FAILURE = 'DATI_FAILURE'
export const DATI_SUCCESS = 'DATI_SUCCESS'
export const DATI_SUCCESS_DISMISS = 'DATI_SUCCESS_DISMISS'

export const DATI_FAILURE_DISMISS = 'DATI_FAILURE_DISMISS'

export function datiRequest() {
  return {
    type: DATI_REQUEST
  }
}

export function datiFailure(error) {
  return {
    type: DATI_FAILURE,
    error
  }
}

export function datiFailureDismiss() {
  return {
    type: DATI_FAILURE_DISMISS
  }
}

export function datiSuccess() {
  return { type: DATI_SUCCESS }
}

export function datiSuccessDismiss() {
  return { type: DATI_SUCCESS_DISMISS }
}
