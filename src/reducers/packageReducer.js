import {
    GET_ADMIN_PACKAGES,
    GET_USER_PACKAGES,
    GET_PACKAGE,
    GET_DISCOUNTS,
    FREE
} from '../constants/AppConstants'

export function packageReducer(state = {adminPackages: [], userPackages: [], discounts: [], package: {}}, action) {
    switch (action.type) {
        case GET_ADMIN_PACKAGES:
            return {
                ...state,
                adminPackages: [...action.newState],
            }
        case GET_USER_PACKAGES:
            return {
                ...state,
                userPackages: [...action.newState]
            }
        case GET_PACKAGE:
            return {
                ...state,
                package: {...action.newState}
            }
        case GET_DISCOUNTS:
            return {
                ...state,
                discounts: [...action.newState]
            }
        case FREE:
            return {adminPackages: [], userPackages: [], package: {}}
        default:
            return state
    }
}
