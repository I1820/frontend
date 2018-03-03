import {SELECT_PROJECT, GET_PROJECTS, FETCH_PROJECT, FREE} from '../constants/AppConstants'
import _ from 'underscore'
const assign = Object.assign || require('object.assign')

export function projectReducer (state = [], action) {
  switch (action.type) {
    case GET_PROJECTS:
      state = []
      return [
        ...state,
        ...action.newState.projects
      ]
    case FETCH_PROJECT:
            // console.log(_.find(state, {_id: action.newState.project._id}))
      if (_.find(state, {_id: action.newState.project._id}) !== undefined) {
        return state.map((currentItem, index) => {
          if (action.newState.project._id === currentItem._id) {
            console.log('find',currentItem)
            return {
              ...action.newState.project,
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
          action.newState.project
        ]
      }
    case FREE:
      return []
    default:
      return state
  }
}
