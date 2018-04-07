import {INIT_USER, UPDATE_USER, FREE, GET_USERS} from '../constants/AppConstants'
import _ from 'underscore'

const assign = Object.assign || require('object.assign')
const initialState = {}

export function userReducer(state = initialState, action) {
    switch (action.type) {

        case GET_USERS:
            state = []
            return [
                ...state,
                ...action.newState.users
            ]
        case INIT_USER:
            if (!_.isUndefined(action.newState.user.legal) && action.newState.user.legal === true) {
                return assign({}, state, {
                    type: 'LEGAL',
                    username: action.newState.user.other_info.org_name,
                    email: action.newState.user.email,
                    other_info: action.newState.user.other_info,
                    token: action.newState.token
                })
            } else {
                return assign({}, state, {
                    type: 'REAL',
                    username: action.newState.user.name,
                    mobile: action.newState.user.mobile,
                    email: action.newState.user.email,
                    other_info: action.newState.user.other_info,
                    token: action.newState.token
                })
            }
        case UPDATE_USER:
            if (!_.isUndefined(action.newState.user.legal) && action.newState.user.legal === true) {
                return assign({}, state, {
                    type: 'LEGAL',
                    username: action.newState.user.other_info.org_name,
                    email: action.newState.user.email,
                    other_info: action.newState.user.other_info
                })
            } else {
                return assign({}, state, {
                    type: 'REAL',
                    username: action.newState.user.name,
                    email: action.newState.user.email,
                    other_info: action.newState.user.other_info
                })
            }
        case FREE:
            return {}
        default:
            return state
    }
}
