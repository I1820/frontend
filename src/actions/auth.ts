import {login as loginAPI, logout as logoutAPI} from '../api/index';
import {freeState, initUser, setAuthState} from "./AppActions";

import {ThunkDispatch} from 'redux-thunk'
import {AnyAction} from 'redux';

/**
 * Logs the current user out
 */
export function logout() {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        dispatch(setAuthState(false));
        logoutAPI(dispatch).then(() => dispatch(freeState()));
        window.location.href = '/';
    }
}

/**
 * Logs an user in
 */
export function login(
    username: string,
    password: string,
    keep: boolean,
    errorCallback: (err: string) => void
) {
    return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
        const promise = loginAPI(username, password, dispatch);

        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setAuthState(true));
                dispatch(initUser({...response.result}));
                window.location.href = '#/dashboard';
            } else {
                errorCallback(response.result)
            }
        })
    }
}
