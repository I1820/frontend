import _ from 'underscore'
import {GET_GATEWAYS} from "../constants/AppConstants";

export function gatewayReducer (state = [], action) {
    switch (action.type) {
        case GET_GATEWAYS:
            state = []
            return [
                ...state,
                ...action.newState
            ]

        case 'FREE':
            return []
        default:
            return state
    }
}
