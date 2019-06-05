import { FETCH_THING, FREE, GET_THINGS } from '../constants/AppConstants'

export function thingReducer (state = [], action) {
  switch (action.type) {
    case GET_THINGS:
      state = []
      return [
        ...state,
        ...action.newState.things
      ]
    case FETCH_THING:
      return [
        action.newState.thing
      ]
    case FREE:
      return []
    default:
      return state
  }
}
