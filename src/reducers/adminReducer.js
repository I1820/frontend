import _ from 'underscore'
import {GET_USERS,FETCH_USER } from "../constants/AppConstants";

export function adminReducer (state = {usersList:[],users:{}}, action) {
  switch (action.type) {
    case GET_USERS:
      return {usersList:action.newState}
    case FETCH_USER:
      return {
        ...state,
        users:{
          ...state.users,
          ...action.newState.user
        }
      }
    default:
      return state
  }
}
