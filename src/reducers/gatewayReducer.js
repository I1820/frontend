import _ from 'underscore'
import { GET_GATEWAYS, SET_GATEWAY } from '../constants/AppConstants'

export function gatewayReducer (state = [], action) {
  switch (action.type) {
    case GET_GATEWAYS:
      state = []
      return [
        ...state,
        ...action.newState
      ]
    case SET_GATEWAY:
      if (_.find(state, { _id: action.newState._id }) !== undefined) {
        return state.map((currentItem, index) => {
          if (action.newState._id === currentItem._id) {
            console.log('find gateway', currentItem)
            return {
              ...action.newState,
              currentItem
            }
          } else {
            return currentItem
          }
        })
      } else {
        console.log('insert')
        return [
          ...state,
          action.newState
        ]
      }
    case 'FREE':
      return []
    default:
      return state
  }
}
