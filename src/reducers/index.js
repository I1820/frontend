import {combineReducers} from 'redux'
import {homeReducer} from './homeReducer'
import {userReducer} from './userReducer'
import {projectReducer} from './projectReducer'
import {thingReducer} from './thingReducer'
import {gatewayReducer} from './gatewayReducer'

const rootReducer = combineReducers({
  homeReducer,
  userReducer,
  projectReducer,
  thingReducer,
  gatewayReducer
})

export default rootReducer
