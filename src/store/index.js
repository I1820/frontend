import { applyMiddleware, compose, createStore } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'
import persistState from 'redux-localstorage'

const enhancer = compose(
  persistState({}, {
    slicer: (paths) => {
      return (state) => {
        /* Custom logic goes here */
        return {
          homeReducer: state.homeReducer,
          userReducer: state.userReducer
        }
      }
    }
  })
)

// Creates the Redux reducer with the redux-thunk middleware, which allows us
// to do asynchronous things in the actions
// const createStoreWithMiddleware = applyMiddleware(thunk, logger)(createStore);
const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const store = createStoreWithMiddleware(rootReducer, enhancer)
export default store
