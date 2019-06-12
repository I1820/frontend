/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */

export type HomeAction =
    | { type: 'SET_AUTH'; auth: boolean }
    | { type: 'SENDING_REQUEST'; sending: boolean }
    | { type: 'SET_ERROR_MESSAGE'; message: string }
    | { type: 'FREE' }

export function setAuthState(auth: boolean): HomeAction {
    return {type: 'SET_AUTH', auth}
}

export function freeState() {
    return {type: 'FREE'}
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 */
export function sendingRequest(sending: boolean): HomeAction {
    return {type: 'SENDING_REQUEST', sending}
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
export function setErrorMessage(message: string): HomeAction {
    return {type: 'SET_ERROR_MESSAGE', message}
}
