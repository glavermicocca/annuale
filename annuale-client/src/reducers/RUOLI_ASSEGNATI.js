import {
  DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI,
  DATI_SUCCESS_INSERT_RUOLI_ASSEGNATI,
  DATI_SUCCESS_DELETE_RUOLI_ASSEGNATI,
  DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_DEPOSITI,
  DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_CLIENTI
} from '../actions/RUOLI_ASSEGNATI'

const initialState = {
  items: [],
  count: 0,
  initialValues: {},
  result: {},
  resultInsert: [],
  rows: [],
  rowsDepositi: [],
  rowsClienti: []
}

export default function ruoli(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          rows: action.rows.Payload
        }
      )
    }
    case DATI_SUCCESS_INSERT_RUOLI_ASSEGNATI: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          resultInsert: action.rows
        },
        { open: false }
      )
    }
    case DATI_SUCCESS_DELETE_RUOLI_ASSEGNATI: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          result: action.result
        }
      )
    }
    case DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_DEPOSITI: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          rowsDepositi: action.rows
        }
      )
    }
    case DATI_SUCCESS_SELECT_RUOLI_ASSEGNATI_CLIENTI: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          rowsClienti: action.rows
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
