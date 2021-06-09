import {
  DATI_SUCCESS_UPDATE_PROGRESSIVO_DETTAGLIO,
  DATI_SUCCESS_SELECT_PROGRESSIVO,
  CREATE_UPDATE_PROGRESSIVO,
  CLOSE_MODAL_PROGRESSIVO,
  DATI_SUCCESS_INSERT_OR_UPDATE_PROGRESSIVO,
  DATI_SUCCESS_DELETE_PROGRESSIVO
} from '../actions/PROGRESSIVO'

const initialState = {
  items: [],
  count: 0,
  initialValues: {},
  result: {},
  rows: []
}

export default function progressivo(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_SUCCESS_SELECT_PROGRESSIVO: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          rows: action.rows
        }
      )
    }
    case CREATE_UPDATE_PROGRESSIVO: {
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
    case CLOSE_MODAL_PROGRESSIVO: {
      return Object.assign({}, state, { hasError: false }, { open: false })
    }
    case DATI_SUCCESS_INSERT_OR_UPDATE_PROGRESSIVO: {
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
    case DATI_SUCCESS_UPDATE_PROGRESSIVO_DETTAGLIO: {
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
    case DATI_SUCCESS_DELETE_PROGRESSIVO: {
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
