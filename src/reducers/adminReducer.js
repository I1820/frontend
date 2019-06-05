import { FETCH_USER, GET_CODECS, GET_USERS } from '../constants/AppConstants'

export function adminReducer (state = { usersList: [], users: {} }, action) {
  switch (action.type) {
    case GET_USERS:
      return { usersList: action.newState }
    case FETCH_USER:
      return {
        ...state,
        users: {
          ...state.users,
          ...action.newState.user
        }
      }
    case GET_CODECS:
      return { ...state, globalCodecs: action.newState }
    default:
      return state
  }
}
