import {GET_THINGS_PROFILE, FREE, FETCH_THING_PROFILE} from '../constants/AppConstants'
import _ from 'underscore'

export function thingProfileReducer (state = [], action) {
    switch (action.type) {
        case GET_THINGS_PROFILE:
            state = []
            return [
                ...state,
                ...action.newState.thing_profiles
            ]
        case FETCH_THING_PROFILE:
            if (_.find(state, {_id: action.newState.thing_profile._id}) !== undefined) {
                return state.map((currentItem, index) => {
                    if (action.newState.thing_profile._id === currentItem._id) {
                        return {
                            ...action.newState.thing_profile,
                            ...currentItem
                        }
                    } else {
                        return currentItem
                    }
                })
            } else {
                return [
                    ...state,
                    action.newState.thing_profile
                ]
            }
        case FREE:
            return []
        default:
            return state
    }
}
