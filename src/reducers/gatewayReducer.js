import _ from 'underscore'

export function gatewayReducer (state = [], action) {
    switch (action.type) {
        case 'GET_GWs':
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
