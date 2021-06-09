import { DATI_SUCCESS_SELECT_RUOLI, CREATE_UPDATE_RUOLI, CLOSE_MODAL_RUOLI, DATI_SUCCESS_INSERT_OR_UPDATE_RUOLI, DATI_SUCCESS_DELETE_RUOLI } from '../actions/RUOLI'

const initialState = {
  items: [],
  count: 0,
  initialValues: {},
  result: {},
  rows: []
}

export default function ruoli(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_SUCCESS_SELECT_RUOLI: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          rows: action.rows.Payload
        }
      )
    }
    case CREATE_UPDATE_RUOLI: {
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
    case CLOSE_MODAL_RUOLI: {
      return Object.assign({}, state, { hasError: false }, { open: false })
    }
    case DATI_SUCCESS_INSERT_OR_UPDATE_RUOLI: {
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
    case DATI_SUCCESS_DELETE_RUOLI: {
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
