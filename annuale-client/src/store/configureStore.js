import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import auth from '../reducers/auth'
import alerts from '../reducers/alerts'
import VALORE from '../reducers/VALORE'
import PROGRESSIVO from '../reducers/PROGRESSIVO'
import IMAGES from '../reducers/IMAGES'
import RUOLI from '../reducers/RUOLI'
import RUOLI_ASSEGNATI from '../reducers/RUOLI_ASSEGNATI'
import base from '../reducers/base'

const logger = createLogger()
const rootReducer = combineReducers({
  base,
  auth,
  alerts,
  VALORE,
  PROGRESSIVO,
  IMAGES,
  RUOLI,
  RUOLI_ASSEGNATI
})

const initialState = {}

export default function configureStore() {
  let store

  if (module.hot) {
    store = createStore(rootReducer, initialState, compose(applyMiddleware(thunkMiddleware, logger), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))
  } else {
    store = createStore(
      rootReducer,
      initialState,
      compose(applyMiddleware(thunkMiddleware), f => f)
    )
  }

  return store
}
