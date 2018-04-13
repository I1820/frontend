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
    UPDATE_USER, FREE, GET_THINGS, FETCH_THING, GET_THINGS_PROFILE, FETCH_THING_PROFILE, GET_GATEWAYS, FETCH_CODEC_LIST,
    SET_GATEWAY,NEW_PACKAGE, SELECT_USER, SELECT_PACKAGE, PAYMENT_RESULT
} from '../constants/AppConstants'
import * as errorMessages from '../constants/MessageConstants'
import {
    login as loginAPI, logout as logoutAPI, register as registerAPI,
    listProject as listProjectsAPI, editProject as editProjectAPI,
    getProject as getProjectAPI, createProject as createProjectAPI,
    editProfile as editProfileAPI, listThings as listThingsAPI,
    getThing as getThingAPI, connectThing as connectThingAPI,
    createThing as createThingAPI, editThing as editThingAPI, editAliases as editAliasesAPI,
    getProjectData as getThingDataAPI, createCodec as createCodecAPI,
    createScenario as createScenarioAPI, uploadExcel as uploadExcelAPI,
    createGateway as createGatewayAPI,
    deleteProject as deleteProjectAPI,
    deleteDeviceProfile as deleteDeviceProfileAPI,
    deleteGateway as deleteGatewaysAPI,
    getSingleGateway as getSingleGatewayAPI,
    getGateways,
    deleteThing as deleteThingAPI,
    newDownlink as newDownlinkAPI,
    lint
} from '../api/index'
import {
    activateScenario,
    activeThing, createTemplate, createThingProfile, deleteCodec, deleteScenario, getCodec, getCodecTemplateList,
    getScenario,
    getThingProfileList, updateScenarioAPI,
    viewProfile
} from '../api';

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 * @param (string) captcha
 * @param {function} errorCallback
 */
export function login(username, password, captcha, errorCallback) {
    return (dispatch) => {
        if (captcha === undefined) {
          errorCallback('لطفا برروی گزینه من ربات نیستم کلیک کنید')
            return
        }

        // Show the loading indicator, hide the last error
        // If no username or password was specified, throw a field-missing error
        if (anyElementsEmpty({username, password})) {
            errorCallback(errorMessages.FIELD_MISSING)
            return
        }
        const promise = loginAPI(username, password, captcha, dispatch)

        promise.then((response) => {
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

export function getProject(id, cb) {
    return (dispatch) => {
        const promise = getProjectAPI(id, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setProject(response.result))
                cb && cb(true);
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
                cb && cb(false);
            }
        })
    }
}


export function createProject(state, cb) {
    return (dispatch) => {
        const promise = createProjectAPI(state, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
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
            if (response.status === 'OK') {
                dispatch(setThings(response.result))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function getThingAction(projectId, thingId) {
    return (dispatch) => {
        const promise = getThingAPI(projectId, thingId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setThing(response.result))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}


export function editThingAction(projectId, thingId, data, cb) {
    return (dispatch) => {
        const promise = editThingAPI(projectId, thingId, data, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setThing(response.result))
                forwardTo(`projects/manage/${projectId}`)
            } else {
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}


function setThings(newState) {
    return {type: GET_THINGS, newState}
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
                cb(true)
                setTimeout(() => {
                    forwardTo('/login')
                }, 2000)
            } else {
                cb(response.result)
            }
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

export function NewPackage(newState = NEW_OBJECT) {
    newState !== NEW_OBJECT ? forwardTo('package/edit' + newState) : forwardTo('package/new')
    return {type: NEW_PACKAGE, newState}
}
export function SelectUser(newState = NEW_OBJECT){
    forwardTo('user/info/' + newState)
    return {type: SELECT_USER, newState}
}
export function selectPackage(newState = NEW_OBJECT) {
    forwardTo('selectedPackage/' + newState)
    return {type: SELECT_PACKAGE, newState}
}

export function resultOfPay(newState){
    newState == 'success'?  forwardTo('paymentResult/S/'+newState) : forwardTo('paymentResult/F/'+newState)
    //   console.log('status pay : '+ newState)
    // forwardTo('paymentResultS/'+newState)
    // console.log('status pay : '+ newState)
    return{type: PAYMENT_RESULT, newState}

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

export function getDataAction(things, projectId, offset, limit, callback) {
    return (dispatch) => {
        const promise = getThingDataAPI(things, projectId, offset, limit, dispatch)
        promise.then((response) => {
            console.log('data', response)
            if (response.status === 'OK') {
                callback(true, response.result.data)
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

/* thing profile actions */

export function getThingProfileListAction() {
    return (dispatch) => {
        const promise = getThingProfileList(dispatch);
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch({type: GET_THINGS_PROFILE, newState: response.result})
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function deleteDeviceProfileAction(profileId, cb) {
    return (dispatch) => {
        const promise = deleteDeviceProfileAPI(profileId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                window.location = '#/device-profile/list'
                cb(true)
            } else {
                cb(response.result)
            }
        })
    }
}

export function createThingProfileAction(data, cb) {
    return (dispatch) => {
        const promise = createThingProfile(data, dispatch);
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                dispatch({type: FETCH_THING_PROFILE, newState: response.result})
                forwardTo('device-profile/list')
            } else {
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

/* things actions */

export function createThingAction(data, project, cb) {
    return (dispatch) => {
        const promise = createThingAPI(data, project, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setThing(response.result))
                forwardTo(`projects/manage/${project}`)
                cb(true)
            } else {
                console.log(response)
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function activeThingAction(data, projectId, thingId, cb) {
    return (dispatch) => {
        const promise = activeThing(data, projectId, thingId, dispatch)
        promise.then((response) => {
            console.log(response);
            if (response.status === 'OK') {
                cb(true)
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
                cb(false, response.result)
            }
        })
    }
}

export function deleteThingAction(projectId, thingId, cb) {
    return (dispatch) => {
        const promise = deleteThingAPI(projectId, thingId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                cb(true)
            } else {
                cb(false, response.result)
            }
        })
    }
}

export function deleteCodecAction(projectId, codecId, cb) {
    return (dispatch) => {
        const promise = deleteCodec(projectId, codecId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                cb(true)
            } else {
                cb(false, response.result)
            }
        })
    }
}

export function deleteScenarioAction(projectId, scenarioId, cb) {
    return (dispatch) => {
        const promise = deleteScenario(projectId, scenarioId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                cb(true)
            } else {
                cb(false, response.result)
            }
        })
    }
}


export function uploadExcelAction(file, projectId, cb) {
    return (dispatch) => {

        const promise = uploadExcelAPI(file, projectId, dispatch)
        promise.then((response) => {
            if (response.status === 200) {
                // window.location.reload()
                cb(response.data.result.res)
            } else {
                // cb(false,response.result)
                // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((e) => {
            console.log(e)
            // cb(false,e)
        })
    }
}

/*  project actions */

export function createScenario(projectId, data) {
    return (dispatch) => {
        const promise = createScenarioAPI(data, projectId, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                forwardTo(`projects/manage/${projectId}`)
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((err) => {
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}

export function updateScenarioAction(projectId, scenarioId, data) {
    return (dispatch) => {
        const promise = updateScenarioAPI(data, projectId, scenarioId, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                forwardTo(`projects/manage/${projectId}`)
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((err) => {
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}


export function editProjectAction(id, state) {
    return (dispatch) => {
        const promise = editProjectAPI(id, state, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setProject(response.result))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((e) => {
            console.log(e);
        })
    }
}

export function editAliasesAction(id, aliases) {
    return (dispatch) => {
        const promise = editAliasesAPI(id, aliases, dispatch);
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(getProject(id, null))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((e) => {
            console.log(e)
        })
    }
}

export function deleteProjectAction(projectId, cb) {
    return (dispatch) => {
        const promise = deleteProjectAPI(projectId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                window.location = '#/projects/list'
                cb(true)
            } else {
                cb(response.result)
            }
        })
    }
}

/*  gateway actions */

export function getGatewaysAction() {
    return (dispatch) => {
        const promise = getGateways(dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch({type: GET_GATEWAYS, newState: response.result.gateways})
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function createGatewayAction(data, cb) {
    return (dispatch) => {
        const promise = createGatewayAPI(data, dispatch)
        promise.then((response) => {

            if (response.status === 'OK') {
                cb(true)
            } else {
                cb(false, response.result)
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

function setSingleGateway(newState) {
    return {type: SET_GATEWAY, newState}
}

export function getSingleGatewayAction(id) {
    return (dispatch) => {
        const promise = getSingleGatewayAPI(id, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch(setSingleGateway(response.result.gateway))
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        })
    }
}

export function deleteGatewaysAction(profileId, cb) {
    return (dispatch) => {
        const promise = deleteGatewaysAPI(profileId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                window.location = '#/gateways/list'
                cb(true)
            } else {
                cb(response.result)
            }
        })
    }
}

//user action

export function getProfileAction() {
    return (dispatch) => {
        const promise = viewProfile(dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                dispatch(updateUser(response.result))
            } else {
            }
        })
    }
}

export function editProfile(data, cb) {
    return (dispatch) => {
        const promise = editProfileAPI(data, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                cb(true)
                dispatch(updateUser(response.result))
            } else {
                cb(false)
            }
        }).catch((err) => {
            console.log(err)
        })
    }
}


/* downlink actions */

export function sendDownlinkAction(projectId, thingId, data, cb) {
    return (dispatch) => {
        const promise = newDownlinkAPI(projectId, thingId, data, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                cb(true)
            } else {
                cb(false,response.result)
            }
        })
    }
}


/*  codec actions */


export function getCodecAction(thingId, projectId, cb) {
    return (dispatch) => {
        const promise = getCodec(thingId, projectId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                if (cb)
                    cb(true, response.result.codec)
            } else {
                cb(false)
            }
        })
    }
}


export function getCodecTemplateListAction(projectId, cb) {
    return (dispatch) => {
        const promise = getCodecTemplateList(projectId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                dispatch({type: FETCH_CODEC_LIST, newState: response.result, id: projectId})
                if (cb)
                    cb(true, response.result.codecs)
            } else {
            }
        })
    }
}

export function createCodecAction(thingId, projectId, codec, cb) {
    return (dispatch) => {
        const promise = createCodecAPI({codec}, thingId, projectId, dispatch)
        promise.then((response) => {
            if (response.status === 'OK') {
                cb(true)
                forwardTo(`projects/manage/${projectId}`)
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

export function createTemplateAction(projectId, data) {
    return (dispatch) => {
        const promise = createTemplate(projectId, data, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                forwardTo(`projects/manage/${projectId}`)
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((err) => {
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}

export function activateScenarioAction(projectId, scenarioId) {
    return (dispatch) => {
        const promise = activateScenario(projectId, scenarioId, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                window.location.reload()
            } else {
                dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
            }
        }).catch((err) => {
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}

export function getScenarioAction(projectId, scenarioId, cb) {
    return (dispatch) => {
        const promise = getScenario(projectId, scenarioId, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                cb(true, response.result.scenario)
            } else {
                cb(false)
            }
        }).catch((err) => {
            cb(false)
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}


export function lintCode(projectId, code, cb) {
    return (dispatch) => {
        const promise = lint(projectId, code, dispatch)
        promise.then((response) => {
            console.log(response)
            if (response.status === 'OK') {
                cb(true, response.result.result)
            } else {
                cb(false)
            }
        }).catch((err) => {
            cb(false)
            dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        })
    }
}


