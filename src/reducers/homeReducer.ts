/*
 * The reducer takes care of our data
 * Using actions, we can change our application state
 * To add a new action, add it to the switch statement in the homeReducer function
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return assign({}, state, {
 *       stateVariable: action.var
 *   });
 */

import {HomeAction} from '../actions/HomeActions'

// The initial application state
export interface IHomeReducerState {
    currentlySending: boolean;
    loggedIn: boolean;
    errorMessage: string;
}
const initialState: IHomeReducerState = {
    currentlySending: false,
    loggedIn: false,
    errorMessage: ''
};

// Takes care of changing the application state
export function homeReducer(state = initialState, action: HomeAction): IHomeReducerState {
    switch (action.type) {
        case 'SET_AUTH':
            return {...state, loggedIn: action.auth};
        case 'SENDING_REQUEST':
            return {...state, currentlySending: action.sending};
        case 'SET_ERROR_MESSAGE':
            return {...state, errorMessage: action.message};
        case 'FREE':
            return initialState;
        default:
            return state
    }
}
