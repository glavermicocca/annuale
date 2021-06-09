import { DATI_SUCCESS_SELECT_VALORE, CREATE_UPDATE_VALORE, CLOSE_MODAL_VALORE, DATI_SUCCESS_INSERT_OR_UPDATE_VALORE, DATI_SUCCESS_DELETE_VALORE } from '../actions/VALORE'

const initialState = {
  items: [],
  count: 0,
  initialValues: {},
  result: {},
  rows: []
}

export default function valore(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_SUCCESS_SELECT_VALORE: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          rows: action.rows.Payload
        }
      )
    }
    case CREATE_UPDATE_VALORE: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          initialValues: action.initialValues
        },
        { open: true }
      )
    }
    case CLOSE_MODAL_VALORE: {
      return Object.assign({}, state, { hasError: false }, { open: false })
    }
    case DATI_SUCCESS_INSERT_OR_UPDATE_VALORE: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          row: action.row
        },
        { open: false }
      )
    }
    case DATI_SUCCESS_DELETE_VALORE: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          result: action.result
        }
      )
    }
    case 'DATI_SUCCESS_ITEM': {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          item: action.item
        }
      )
    }
    default:
      return state
  }
}
