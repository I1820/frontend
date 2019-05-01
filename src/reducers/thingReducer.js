import { GET_THINGS, FREE, FETCH_THING } from '../constants/AppConstants'
import _ from 'underscore'

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
