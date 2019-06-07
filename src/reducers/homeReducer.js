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

import {FREE, SENDING_REQUEST, SET_AUTH, SET_ERROR_MESSAGE} from '../constants/AppConstants'
// Object.assign is not yet fully supported in all browsers, so we fallback to
// a polyfill
const assign = Object.assign || require('object.assign');

// The initial application state
const initialState = {
    currentlySending: false,
    loggedIn: sessionStorage,
    errorMessage: ''
};

// Takes care of changing the application state
export function homeReducer(state = initialState, action) {
    switch (action.type) {
        case SET_AUTH:
            return assign({}, state, {
                loggedIn: action.newState
            });
        case SENDING_REQUEST:
            return assign({}, state, {
                currentlySending: action.sending
            });
        case SET_ERROR_MESSAGE:
            const error = typeof action.message === 'string' ? action.message : 'خطایی در عملیات رخ داد. مجددا تلاش کنید';
            return assign({}, state, {
                errorMessage: error
            });
        case FREE:
            return {};
        default:
            return state
    }
}
