/*
 * Actions change things in your application
 * Since this boilerplate uses a uni-directional data flow, specifically redux,
 * we have these actions which are the only way your application interacts with
 * your appliction state. This guarantees that your state is up to date and nobody
 * messes it up weirdly somewhere.
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 * 3) (optional) Add an async function like this:
 *    export function asyncYourAction(var) {
 *        return function(dispatch) {
 *             // Do async stuff here
 *             return dispatch(yourAction(var));
 *        }
 *    }
 *
 *    If you add an async function, remove the export from the function
 *    created in the second step
 */

import {
    SET_AUTH, CHANGE_FORM, SENDING_REQUEST, SET_ERROR_MESSAGE, INIT_USER, SELECT_PROJECT, GET_PROJECTS, FETCH_PROJECT,
    UPDATE_USER, FREE, GET_THINGS, FETCH_THING
} from '../constants/AppConstants'
import * as errorMessages from '../constants/MessageConstants'
import {
    login as loginAPI, logout as logoutAPI, register as registerAPI,
    listProject as listProjectsAPI, editProject as editProjectAPI,
    getProject as getProjectAPI, createProject as createProjectAPI,
    editProfile as editProfileAPI, listThings as listThingsAPI,
    getThing as getThingAPI, connectThing as connectThingAPI,
    createThing as createThingAPI, editThing as editThingAPI,
    getProjectData as getThingDataAPI, createCodec as createCodecAPI,
    createScenario as createScenarioAPI, uploadExcel as uploadExcelAPI,
    createGateway as createGatewayAPI, getGAteways as getGAtewaysAPI
} from '../api/index'

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 * @param (string) captcha
 * @param {function} errorCallback
 */
export function login(username, password, captcha, errorCallback) {
    return (dispatch) => {
        if (captcha === undefined)
            return dispatch(setErrorMessage('لطفا برروی گزینه من ربات نیستم کلیک کنید'))

        // Show the loading indicator, hide the last error
        // If no username or password was specified, throw a field-missing error
        if (anyElementsEmpty({username, password})) {
            errorCallback(setErrorMessage(errorMessages.FIELD_MISSING))
            return
        }
        const promise = loginAPI(username, password, captcha, dispatch)

        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                dispatch(setAuthState(true))
                dispatch(initUser(response.result))
                forwardTo('/dashboard')
            } else {
                errorCallback(translateErrorMessage(response.result))
            }
        })
    }
}

/**
 * Logs the current user out
 */
export function logout() {
    return (dispatch) => {
        logoutAPI(dispatch)
        forwardTo('/')
        dispatch(setAuthState(false))
        dispatch(freeState())
    }
}

/**
 * List All projects
 *
 */
export function getProjects() {
    return (dispatch) => {
        const promise = listProjectsAPI(dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setProjects(response.result))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

function setProjects(newState) {
    return {type: GET_PROJECTS, newState}
}

export function getProject(id) {
    return (dispatch) => {
        const promise = getProjectAPI(id, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setProject(response.result))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function editProject(id, state,cb) {
    return (dispatch) => {
        const promise = editProjectAPI(id, state, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                cb(true)
                dispatch(setProject(response.result))
            } else {
                cb(false,response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((e) =>{
            cb(false,e)
        })
    }
}

export function uploadExcel(file,cb) {
    return (dispatch) => {

        const promise = uploadExcelAPI(file, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 200) {
                window.location.reload()
                // dispatch(setProject(response.result))
            } else {
                // cb(false,response.result)
                // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((e) =>{
            console.log(e)
            // cb(false,e)
        })
    }
}

export function createProject(state,cb) {
    return (dispatch) => {
        const promise = createProjectAPI(state, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                console.log('response.result', response.result)
                dispatch(setProject(response.result))
                cb(true)
            } else {
                cb(false)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

function setProject(newState) {
    return {type: FETCH_PROJECT, newState}
}

/**
 * List All things
 *
 */
export function getThings() {
    return (dispatch) => {
        const promise = listThingsAPI(dispatch)
        promise.then((response) => {
            console.log('promise', response)
            if (response.status === 'OK') {
                dispatch(setThings(response.result))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function getThing(id) {
    return (dispatch) => {
        const promise = getThingAPI(id, dispatch)
        promise.then((response) => {
            console.log('promise', response)
            if (response.status === 'OK') {
                dispatch(setThing(response.result))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function createThing(data, cb) {
    return (dispatch) => {
        const promise = createThingAPI(data, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setThing(response.result))
                forwardTo('things')
                cb(true)
            } else {
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function createGateway(data, cb) {
    return (dispatch) => {
        const promise = createGatewayAPI(data, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                window.location.reload()
                cb(true)
            } else {
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function getGateways() {
    return (dispatch) => {
        const promise = getGAtewaysAPI(dispatch)
        promise.then((response) => {
            console.log('promise', response.result.gateway)
            if (response.status === 'OK') {
                dispatch(setGws(response.result.gateway))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}



export function editThing(id, data) {
    return (dispatch) => {
        const promise = editThingAPI(id, data, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setThing(response.result))
                forwardTo('things')
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}


function setThings(newState) {
    return {type: GET_THINGS, newState}
}


function setGws(newState) {
    return {type: 'GET_GWs', newState}
}

function setGateway(newState) {
    return {type: 'FETCH_GATE', newState}
}

function setThing(newState) {
    return {type: FETCH_THING, newState}
}

/**
 * Registers a user
 * @param  {object} data The username of the new user
 */
export function register(data, cb) {
    return (dispatch) => {
        const promise = registerAPI(data, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(changeForm({
                    password: ''
                }))
                cb(true)

                setTimeout(() => {
                    forwardTo('/login')
                }, 2000)

            } else {
                dispatch(setErrorMessage(response.result))
                cb(false)
            }
        })
    }
}

export function editProfile(data, cb) {
    return (dispatch) => {
        const promise = editProfileAPI(JSON.parse(JSON.stringify(data)), dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(updateUser(response.result))
                cb(true)
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
                cb(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}

export function connectThing(thingId, projectId) {
    return (dispatch) => {
        const promise = connectThingAPI(thingId, projectId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(getProject(projectId))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((err) => {
            console.log(err)
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}

export function createCodec(thingId, code, cb) {
    return (dispatch) => {
        const promise = createCodecAPI({code,name:'codec'}, thingId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                // dispatch(getProject(projectId))
                cb(true)
            } else {
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((err) => {
            cb(false, err)
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}

export function createScenario(thingId, code, cb) {
    return (dispatch) => {
        const promise = createScenarioAPI({code,name:'scenario'}, thingId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                // dispatch(getProject(projectId))
                cb(true)
            } else {
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((err) => {
            cb(false, err)
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}

/**
 * Sets the authentication state of the application
 * @param {boolean} newState True means a user is logged in, false means no user is logged in
 */
export function setAuthState(newState) {
    return {type: SET_AUTH, newState}
}

function freeState() {
    return {type: FREE}
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.password The new text of the password input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
export function changeForm(newState) {
    return {type: CHANGE_FORM, newState}
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.username The new text of the username input field of the form
 * @param  {string} newState.role The new text of the password input field of the form
 * @param  {string} newState.type
 * @return {object}                   Formatted action for the reducer to handle
 */
export function initUser(newState) {
    return {type: INIT_USER, newState}
}

export function updateUser(newState) {
    return {type: UPDATE_USER, newState}
}

/**
 * Sets the form state
 * @param  {object} newState          The new state of the form
 * @param  {string} newState.selectedProject The new text of the username input field of the form
 * @return {object}                   Formatted action for the reducer to handle
 */
const NEW_OBJECT = -1

export function selectProject(newState = NEW_OBJECT) {
    newState !== NEW_OBJECT ? forwardTo('project/' + newState) : forwardTo('project/new')
    return {type: SELECT_PROJECT, newState}
}

export function selectThing(newState = NEW_OBJECT) {
    newState !== NEW_OBJECT ? forwardTo('thing/' + newState) : forwardTo('thing/new')
    return {type: SELECT_PROJECT, newState}
}

/**
 * Sets the requestSending state, which displays a loading indicator during requests
 * @param  {boolean} sending The new state the app should have
 * @return {object}          Formatted action for the reducer to handle
 */
export function sendingRequest(sending) {
    return {type: SENDING_REQUEST, sending}
}

/**
 * Sets the errorMessage state, which displays the ErrorMessage component when it is not empty
 * @param message
 */
export function setErrorMessage(message) {
    return (dispatch) => {
        dispatch({type: SET_ERROR_MESSAGE, message})

        const form = document.querySelector('.form-page__form-wrapper')
        if (form) {
            form.classList.add('js-form__err-animation')

            // Remove the animation class after the animation is finished, so it
            // can play again on the next error
            setTimeout(() => {
                form.classList.remove('js-form__err-animation')
            }, 150)

            // Remove the error message after 3 seconds
            setTimeout(() => {
                dispatch({type: SET_ERROR_MESSAGE, message: ''})
            }, 3000)
        }
    }
}

function translateErrorMessage(message) {
    switch (message) {
        case 'The email must be a valid email address.':
            return 'ایمیل وارد شده صحیح نیست'
        default:
            return message
    }
}

/**
 * Forwards the user
 * @param {string} location The route the user should be forwarded to
 */
export function forwardTo(location) {
    console.log('forwardTo(' + location + ')')

    // browserHistory.push(location);
    window.location = '#/' + location

    cleanErrorMessage()
}

/**
 * Checks if any elements of a JSON object are empty
 * @param  {object} elements The object that should be checked
 * @return {boolean}         True if there are empty elements, false if there aren't
 */
function anyElementsEmpty(elements) {
    for (let element in elements) {
        if (!elements[element]) {
            return true
        }
    }
    return false
}

export function cleanErrorMessage() {
    setErrorMessage('')
}

export function getData(id, offset, limit, callback) {
    return (dispatch) => {
        const promise = getThingDataAPI(id, offset, limit, dispatch)
        promise.then((response) => {
            console.log('data', response)
            if (response.status === 'OK') {
                callback(response.result)
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}
