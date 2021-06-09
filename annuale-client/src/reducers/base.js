import { DATI_REQUEST, DATI_FAILURE, DATI_SUCCESS, DATI_SUCCESS_DISMISS, DATI_FAILURE_DISMISS } from '../actions/action-types'

const initialState = {
  hasError: false,
  result: false,
  resultError: false,
  error: null
}

export default function base(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false,
        hasError: false
      })
    case DATI_FAILURE:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: action.error,
        resultError: true
      })
    case DATI_FAILURE_DISMISS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        error: null,
        result: false,
        resultError: false
      })
    case DATI_SUCCESS:
      return Object.assign({}, state, {
        result: true
      })
    case DATI_SUCCESS_DISMISS:
      return Object.assign({}, state, {
        result: false
      })
    default:
      return state
  }
}
