import { DATI_SUCCESS_SELECT_IMAGES_LIST, DATI_SUCCESS_INSERT_OR_UPDATE_IMAGES, DATI_SUCCESS_DELETE_IMAGES } from '../actions/IMAGES'

const initialState = {
  items: [],
  count: 0,
  initialValues: {},
  result: {},
  rows: []
}

const time = new Date().getTime()

export default function art_ana(state = initialState, action = {}) {
  switch (action.type) {
    case DATI_SUCCESS_SELECT_IMAGES_LIST: {
      return Object.assign(
        {},
        state,
        { hasError: false },
        {
          rows: action.rows.Payload.map(item => {
            return {
              label: '',
              imgPath: `/IMAGES?id=${encodeURIComponent(item[0])}&timestamp${time}`
            }
          })
        }
      )
    }
    case DATI_SUCCESS_INSERT_OR_UPDATE_IMAGES: {
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
    case DATI_SUCCESS_DELETE_IMAGES: {
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
