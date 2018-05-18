import _ from 'underscore'
import {GET_USERS} from "../constants/AppConstants";

export function adminReducer (state = {users:[]}, action) {
  switch (action.type) {
    case GET_USERS:
      state = []
      return {users:action.newState}
    default:
      return state
  }
}
