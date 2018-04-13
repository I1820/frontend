import {GET_PACKAGED, FREE} from '../constants/AppConstants'
import _ from 'underscore'

export function packageReducer(state = [], action) {
    switch (action.type) {
        case GET_PACKAGED:
            state = []
            return [
                ...state,
                ...action.newState
            ]
        case FREE:
            return []
        default:
            return state
    }
}
