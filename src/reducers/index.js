import { combineReducers } from 'redux'
import { homeReducer } from './homeReducer'
import { userReducer } from './userReducer'
import { projectReducer } from './projectReducer'
import { thingReducer } from './thingReducer'
import { gatewayReducer } from './gatewayReducer'
import { thingProfileReducer } from './thingProfileReducer'
import { packageReducer } from './packageReducer'
import { adminReducer } from './adminReducer'

const rootReducer = combineReducers({
  homeReducer,
  userReducer,
  projectReducer,
  thingReducer,
  gatewayReducer,
  thingProfileReducer,
  packageReducer,
  adminReducer
})

export default rootReducer
