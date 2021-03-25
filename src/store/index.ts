import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from "redux-devtools-extension"
import { createHashHistory } from 'history'
import createSagaMiddleware from 'redux-saga'
import createRootReducer from './reducers'
import rootSaga from './sagas'
import { routerMiddleware } from 'connected-react-router'
export const history = createHashHistory()
const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(applyMiddleware(routerMiddleware(history),sagaMiddleware))
)
sagaMiddleware.run(rootSaga)

export default store