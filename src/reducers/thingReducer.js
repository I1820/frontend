import {GET_THINGS, FREE, FETCH_THING} from '../constants/AppConstants'
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
      if (_.find(state, {_id: action.newState.thing._id}) !== undefined) {
        return state.map((currentItem, index) => {
          if (action.newState.thing._id === currentItem._id) {
            return {
              ...action.newState.thing,
              ...currentItem
            }
          } else {
            return currentItem
          }
        })
      } else {
        return [
          ...state,
          action.newState.thing
        ]
      }
    case FREE:
      return []
    default:
      return state
  }
}
