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
/* global fetch */

import {
  SET_AUTH,
  CHANGE_FORM,
  SENDING_REQUEST,
  SET_ERROR_MESSAGE,
  INIT_USER,
  SELECT_PROJECT,
  GET_PROJECTS,
  FETCH_PROJECT,
  UPDATE_USER,
  FREE,
  GET_THINGS,
  FETCH_THING,
  GET_THINGS_PROFILE,
  FETCH_THING_PROFILE,
  GET_GATEWAYS,
  FETCH_CODEC_LIST,
  SET_GATEWAY,
  NEW_PACKAGE,
  SELECT_USER,
  PAYMENT_RESULT,
  GET_USER_PACKAGES,
  GET_ADMIN_PACKAGES,
  GET_DISCOUNTS,
  GET_PACKAGE,
  GET_USERS,
  GET_CODECS,
  FETCH_USER,
  SET_TOKEN,
  SET_TRANSACTIONS
} from '../constants/AppConstants'
import * as errorMessages from '../constants/MessageConstants'
import {
  login as loginAPI, logout as logoutAPI, register as registerAPI,
  listProject as listProjectsAPI, editProject as editProjectAPI,
  getProject as getProjectAPI, createProject as createProjectAPI,
  editProfile as editProfileAPI, changePassword as changePasswordAPI, getThings as listThingsAPI,
  getThing as getThingAPI, connectThing as connectThingAPI,
  createThing as createThingAPI, editThing as editThingAPI, editAliases as editAliasesAPI,
  getProjectData as getThingDataAPI, createCodec as createCodecAPI,
  createScenario as createScenarioAPI, uploadExcel as uploadExcelAPI,
  DownloadThingsExcel as DownloadThingsExcelAPI,
  DownloadThingProfileThingsExcel as DownloadThingProfileThingsExcelAPI,
  createGateway as createGatewayAPI, updateGateway as updateGatewayAPI,
  deleteProject as deleteProjectAPI,
  deleteDeviceProfile as deleteDeviceProfileAPI,
  deleteGateway as deleteGatewaysAPI,
  getSingleGateway as getSingleGatewayAPI,
  getGateways,
  deleteThing as deleteThingAPI,
  newDownlink as newDownlinkAPI,
  getUserTransaction, getUser,
  lint,
  base_url
} from '../api/index'
import {
  activateScenario,
  sendThingKeys,
  createCodecTemplate,
  createThingProfile,
  deleteCodecTemplate,
  deleteScenario,
  getCodecTemplate,
  getThingCodec,
  updateCodecTemplate,
  getCodecTemplateList,
  getDashboard,
  getUserThings,
  getAdminPackage,
  getPackage,
  deletePackage,
  createPackage,
  updatePackage,
  getDiscounts,
  deleteDiscount,
  createDiscount,
  activatePackage,
  getUserPackage,
  buyPackage,
  getScenario,
  getThingProfileList,
  setDashboardWidgetChart,
  deleteDashboardWidgetChart,
  updateScenarioAPI,
  viewProfile,
  getDeviceProfileAPI,
  getUsers,
  getThingsMainData,
  getThingsSampleData,
  activateThing,
  activeUser, impersonateUser, getUserTransactionsAPI, activateProject, getGlobalCodecs, getGlobalCodecTemplate,
  updateGlobalCodecTemplate, createGlobalCodecTemplate, deleteGlobalCodec,
  changeAdminPassword, resetPasswordAPI, testCodecAPI, getPermissions, getRoles, setRole,
  uploadLegalDoc, uploadPicture
} from '../api';
import fileDownload from 'js-file-download'
import { toastAlerts } from '../views/Shared/toast_alert';

/**
 * Logs an user in
 * @param  {string} username The username of the user to be logged in
 * @param  {string} password The password of the user to be logged in
 * @param (string) captcha
 * @param {function} errorCallback
 */
export function login(username, password, captcha, keep, errorCallback) {
  return (dispatch) => {
    // if (captcha === undefined) {
    //   errorCallback('لطفا برروی گزینه من ربات نیستم کلیک کنید')
    //   return
    // }

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
        dispatch(initUser({...response.result, keep: !!keep}))
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
    forwardTo('/')
    dispatch(setAuthState(false))
    const promise = logoutAPI(dispatch)
    promise.then(() => dispatch(freeState()))
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
        cb(true, response.result)
      } else {
        cb(false, response.result)
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

export function getThingAction(thingId) {
  return (dispatch) => {
    const promise = getThingAPI(thingId, dispatch)
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
    const promise = editThingAPI(thingId, data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch(setThing(response.result))
        cb(true, 'با موفقیت انجام شد');
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
        }, 3000)
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

export function SelectUser(newState = NEW_OBJECT) {
  forwardTo('user/info/' + newState)
  return {type: SELECT_USER, newState}
}


export function resultOfPay(newState) {
  newState == 'success' ? forwardTo('paymentResult/S/' + newState) : forwardTo('paymentResult/F/' + newState)
  //   console.log('status pay : '+ newState)
  // forwardTo('paymentResultS/'+newState)
  // console.log('status pay : '+ newState)
  return {type: PAYMENT_RESULT, newState}

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

export function getThingsMainDataAction(things, projectId, offset, limit, since, callback) {
  return (dispatch) => {
    const promise = getThingsMainData(things, projectId, offset, limit, since, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        callback(true, response.result.data)
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

export function getThingsSampleDataAction(things, projectId, offset, limit, window, callback) {
  return (dispatch) => {
    const promise = getThingsSampleData(things, projectId, offset, limit, window, dispatch)
    promise.then((response) => {
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
        cb(true, 'با موفقیت حذف شد')
      } else {
        cb(false, response.result)
      }
    })
  }
}

export function getDeviceProfile(profileId, cb) {
  return (dispatch) => {
    const promise = getDeviceProfileAPI(profileId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, response.result.thing_profile)
      } else {
        cb(false, response.result)
        // window.location = '#/device-profile/list'
      }
    })
  }
}


export function createThingProfileAction(data, cb) {
  return (dispatch) => {
    const promise = createThingProfile(data, dispatch);
    promise.then((response) => {
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
        cb(true, 'با موفقیت انجام شد');
      } else {
        cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

export function sendThingKeysAction(data, thingId, cb) {
  return (dispatch) => {
    const promise = sendThingKeys(data, thingId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, 'با موفقیت فعال شد')
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        cb(false, response.result)
      }
    })
  }
}

export function refreshJWTAction(thingId, cb) {
  return (dispatch) => {
    const promise = sendThingKeys({}, thingId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, {message: 'با موفقیت فعال شد', token: response.result.keys.JWT});
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
        cb(false, {message: response.result})
      }
    })
  }
}

export function deleteThingAction(projectId, thingId, cb) {
  return (dispatch) => {
    const promise = deleteThingAPI(projectId, thingId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, 'با موفقیت حذف شد')
      } else {
        cb(false, response.result)
      }
    })
  }
}

export function activateThingAction(thingId, active, cb) {
  return (dispatch) => {
    const promise = activateThing(thingId, active, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, 'با موفقیت انجام شد')
      } else {
        cb(false, response.result)
      }
    })
  }
}

export function deleteCodecTemplateAction(projectId, codecId, cb) {
  return (dispatch) => {
    const promise = deleteCodecTemplate(projectId, codecId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, 'کدک با موفقیت حذف شد')
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
        cb(true, 'با موفقیت حذف شد')
      } else {
        cb(false, response.result)
      }
    })
  }
}


export function uploadExcelAction(file, projectId, cb) {
  return (dispatch) => {
    dispatch(sendingRequest(true))
    const promise = uploadExcelAPI(file, projectId, dispatch)
    promise.then((response) => {
      dispatch(sendingRequest(false))
      if (response.status === 200 && response.data.code == 200) {
        cb(response.data.result.res, 'با موفقیت انجام شد')
      } else {
        cb(false, response.data.result)
        // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((e) => {
      dispatch(sendingRequest(false))
      cb(false, 'مشکلی پیش آمد')
    })
  }
}

export function uploadLegalDocAction(file, cb) {
  return (dispatch) => {
    dispatch(sendingRequest(true))
    const promise = uploadLegalDoc(file, dispatch)
    promise.then((response) => {
      dispatch(sendingRequest(false))
      if (response.status === 200 && response.data.code == 200) {
        cb(true, {message: 'با موفقیت انجام شد', path: response.data.result.path})
      } else {
        cb(false, {message: response.data.result})
        // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((e) => {
      dispatch(sendingRequest(false))
      cb(false, 'مشکلی پیش آمد')
    })
  }
}

export function uploadPictureAction(file, cb) {
  return (dispatch) => {
    dispatch(sendingRequest(true))
    const promise = uploadPicture(file, dispatch)
    promise.then((response) => {
      dispatch(sendingRequest(false))
      if (response.status === 200 && response.data.code == 200) {
        cb(true, {message: 'با موفقیت انجام شد', user: response.data.result.user})
      } else {
        cb(false, {message: response.data.result})
        // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((e) => {
      dispatch(sendingRequest(false))
      cb(false, 'مشکلی پیش آمد')
    })
  }
}

export function DownloadThingsExcelAction(projectId) {
  return (dispatch) => {
    dispatch(sendingRequest(true))
    DownloadThingsExcelAPI(projectId).then((response) => {
      dispatch(sendingRequest(false))
      fileDownload(response.data, 'things.csv');
      toastAlerts('باموفقیت انجام شد.');
    })
  }
}

export function DownloadThingProfileThingsExcelAction(profileId) {
  return (dispatch) => {
    DownloadThingProfileThingsExcelAPI(profileId).then((response) => {
      fileDownload(response.data, 'things.csv');
    })
  }
}

/*  project actions */

export function createScenario(projectId, data, cb) {
  return (dispatch) => {
    const promise = createScenarioAPI(data, projectId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo(`projects/manage/${projectId}`)
      } else {
        cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      cb(false, 'خطای نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function updateScenarioAction(projectId, scenarioId, data) {
  return (dispatch) => {
    const promise = updateScenarioAPI(data, projectId, scenarioId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo(`projects/manage/${projectId}`)
      } else {
        cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      cb(false, 'خطای نامشخص')
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
        window.location = '#/projects'
        cb(true, response.result)
      } else {
        cb(false, response.result)
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
        cb(true, 'با موفقیت ساخته شد')
      } else {
        cb(false, response.result)
        // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

export function updateGatewayAction(data, cb) {
  return (dispatch) => {
    const promise = updateGatewayAPI(data, dispatch)
    promise.then((response) => {

      if (response.status === 'OK') {
        cb(true, 'با موفقیت انجام شد')
        dispatch(setSingleGateway(response.result.gateway))
      } else {
        cb(false, response.result)
        // dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
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

export function getProfileAction(cb) {
  return (dispatch) => {
    const promise = viewProfile(dispatch)
    promise.then((response) => {
      console.log(response);
      if (response.status === 'OK') {
        dispatch(initUser(response.result))
        cb && cb(true)
      } else {
      }
    })
  }
}

export function editProfile(data, cb) {
  return (dispatch) => {
    const promise = editProfileAPI(data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(true, 'باموفقیت ویرایش یافت')
        dispatch(updateUser(response.result))
      } else {
        cb && cb(false, response.result)
      }
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function changePassword(data, cb) {
  return (dispatch) => {
    const promise = changePasswordAPI(data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK')
        cb && cb(true, 'با موفقیت ویرایش یافت')
      else
        cb && cb(false, response.result)
    }).catch((err) => {
      console.log(err)
    })
  }
}


export function resetPasswordAction(data, cb) {
  return (dispatch) => {
    const promise = resetPasswordAPI(data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK' && response.result.success === true)
        cb && cb('رمز عبور جدید به ایمیل شما ارسال شد')
      else
        cb && cb(response.result)
    }).catch((err) => {
      console.log(err)
    })
  }
}

export function testCodec(thing_id, data, decode, cb) {
  return (dispatch) => {
    const promise = testCodecAPI(thing_id, data, decode, dispatch)
    promise.then((response) => {
      cb(response.result)
    }).catch((err) => {
      console.log(err)
    })
  }
}


/* downlink actions */

export function sendDownlinkAction(thingId, data, cb) {
  return (dispatch) => {
    const promise = newDownlinkAPI(thingId, data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, 'با موفقیت فرستاده شد')
      } else {
        cb(false, response.result)
      }
    })
  }
}


/*  codec actions */


export function getThingCodecAction(thingId, cb) {
  return (dispatch) => {
    const promise = getThingCodec(thingId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        if (cb)
          cb(true, response.result)
      } else {
        cb(false)
      }
    })
  }
}


export function getCodecTemplateAction(projectId, codecId, cb) {
  return (dispatch) => {
    const promise = getCodecTemplate(projectId, codecId, dispatch)
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


export function getGlobalCodecTemplateAction(codecId, cb) {
  return (dispatch) => {
    const promise = getGlobalCodecTemplate(codecId, dispatch)
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
          cb(true, response.result)
      } else {
      }
    })
  }
}

export function sendCodecAction(thingId, projectId, codec, codec_id, cb) {
  return (dispatch) => {
    let promise
    if (codec)
      promise = createCodecAPI({codec}, thingId, projectId, dispatch)
    else
      promise = createCodecAPI({codec_id}, thingId, projectId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo(`projects/manage/${projectId}`)
        cb(true, 'کدک با موفقیت ارسال شد.')
      } else {
        cb(false, 'مشکلی به وجود امده لطفا بعدا تلاش کنید.')
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      cb(false, err)
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function createCodecTemplateAction(projectId, data, cb) {
  return (dispatch) => {
    const promise = createCodecTemplate(projectId, data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo(`projects/manage/${projectId}`)
      } else {
        cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function createGlobalCodecTemplateAction(data, cb) {
  return (dispatch) => {
    const promise = createGlobalCodecTemplate(data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo(`admin/globalCodec`)
      } else {
        cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function updateCodecTemplateAction(codec_id, projectId, data, cb) {
  return (dispatch) => {
    const promise = updateCodecTemplate(codec_id, projectId, data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo(`projects/manage/${projectId}`)
      } else {
        cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function updateGlobalCodecTemplateAction(codec_id, data, cb) {
  return (dispatch) => {
    const promise = updateGlobalCodecTemplate(codec_id, data, dispatch)
    promise.then((response) => {
      console.log(response)
      if (response.status === 'OK') {
        forwardTo(`admin/globalCodec`)
      } else {
        cb(false, response.result)
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


/* packages action */

export function getAdminPackagesAction() {
  return (dispatch) => {
    const promise = getAdminPackage(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: GET_ADMIN_PACKAGES, newState: response.result.packages})
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

/* packages action */

export function getDiscountsAction() {
  return (dispatch) => {
    const promise = getDiscounts(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: GET_DISCOUNTS, newState: response.result.discounts})
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

/* packages action */

export function deleteDiscountAction(discountId, cb) {
  return (dispatch) => {
    const promise = deleteDiscount(discountId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(true, 'با موفقیت حدف شد.');
        dispatch(getDiscountsAction())
      } else {
        cb && cb(false, response.result);
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

/* packages action */

export function createDiscountAction(value, cb) {
  return (dispatch) => {
    const promise = createDiscount(value, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(true, 'با موفقیت اضافه شد.');
        dispatch(getDiscountsAction())
      } else {
        cb && cb(false, response.result);
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}


/* packages action */

export function getPackageAction(packageId) {
  return (dispatch) => {
    const promise = getPackage(packageId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: GET_PACKAGE, newState: response.result.package})
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

/* packages action */

export function createPackagesAction(data, cb) {
  return (dispatch) => {
    const promise = createPackage(data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo('admin/packages')
      } else {
        cb && cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      cb && cb(false, 'خطای نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

/* packages action */

export function updatePackagesAction(packageId, data, cb) {
  return (dispatch) => {
    const promise = updatePackage(packageId, data, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        forwardTo('admin/packages')
      } else {
        cb && cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      cb && cb(false, 'خطای نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

/* packages action */

export function deletePackagesAction(packageId, cb) {
  return (dispatch) => {
    const promise = deletePackage(packageId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(true, 'با موفقیت حذف شد')
        dispatch(new getAdminPackagesAction())
      } else {
        cb && cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      cb && cb(false, 'خطای نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

/* packages action */

export function activatePackagesAction(packageId, active, cb) {
  return (dispatch) => {
    const promise = activatePackage(packageId, active, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(true, 'با موفقیت انجام شد')
        dispatch(new getAdminPackagesAction())
      } else {
        cb && cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    }).catch((err) => {
      cb && cb(false, 'خطای نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

/* packages action */

export function getUserPackagesAction() {
  return (dispatch) => {
    const promise = getUserPackage(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: GET_USER_PACKAGES, newState: response.result.packages})
      } else {
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}

/* packages action */

export function buyPackagesAction(packageId, code, cb) {
  return (dispatch) => {
    const promise = buyPackage(packageId, code, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        window.location = base_url() + `/payment/${response.result.invoice._id}/pay`
      } else {
        cb && cb(false, response.result)
        dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
      }
    })
  }
}


export function getDashboardAction(callback) {
  return (dispatch) => {
    const promise = getDashboard(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        callback(response.result)
      } else {
      }
    })
  }
}

export function getUserThingsAction(callback) {
  return (dispatch) => {
    const promise = getUserThings(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        callback(response.result)
      } else {
      }
    })
  }
}

export function setDashboardWidgetChartAction(widget, id, cb) {
  return (dispatch) => {
    const promise = setDashboardWidgetChart(widget, id, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, 'با موفقیت اضافه شد')
      } else {
        cb(false, response.result)
      }
    })
  }
}

export function deleteDashboardWidgetChartAction(id, cb) {
  return (dispatch) => {
    const promise = deleteDashboardWidgetChart(id, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, 'با موفقیت حذف شد')
      } else {
        cb(true, 'مشکلی پیش آمد بعدا تلاش کنید')
      }
    })
  }
}


export function getUsersAction(cb = () => {
}) {
  return (dispatch) => {
    const promise = getUsers(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true, response.result.scenario)
        dispatch({type: GET_USERS, newState: response.result.users})
      } else {
        cb(false)
      }
    }).catch((err) => {
      cb(false)
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}


export function getGlobalCodecsAction(cb = () => {
}) {
  return (dispatch) => {
    const promise = getGlobalCodecs(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: GET_CODECS, newState: response.result.codecs})
      } else {
        cb(false)
      }
    }).catch((err) => {
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function deleteGlobalCodecAction(codecId, cb = () => {
}) {
  return (dispatch) => {
    const promise = deleteGlobalCodec(codecId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(true)
      } else {
        cb(false)
      }
    }).catch((err) => {
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}


export function getUserAction(userId, cb = () => {
}) {
  return (dispatch) => {
    const promise = getUser(userId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        // cb(true, response.result.scenario)
        dispatch({type: FETCH_USER, newState: response.result})
      } else {
        cb(false)
      }
    }).catch((err) => {
      cb(false)
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function getUserTransactionsAction(userId, cb = () => {
}) {
  return (dispatch) => {
    const promise = getUserTransaction(userId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(response.result.invoices)
      } else {
        cb(false)
      }
    }).catch((err) => {
      cb(false)
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function getPermissionsAction(cb) {
  return (dispatch) => {
    const promise = getPermissions(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(response.result.permissions)
      } else {
        cb && cb(false, response.result)
      }
    }).catch((err) => {
      cb(false, 'اشکال نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function getRolesAction(cb) {
  return (dispatch) => {
    const promise = getRoles(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(response.result.roles)
      } else {
        cb && cb(false, response.result)
      }
    }).catch((err) => {
      cb(false, 'اشکال نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function setRoleAction(userId, roleId, cb) {
  return (dispatch) => {
    const promise = setRole(userId, roleId, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(true, 'با موفقیت انجام شد')
      } else {
        cb && cb(false, response.result)
      }
    }).catch((err) => {
      cb(false, 'اشکال نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function activeUserAction(userId, action, cb = () => {
}) {
  return (dispatch) => {
    const promise = activeUser(userId, action, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: FETCH_USER, newState: response.result})
        cb(true, 'با موفقیت انجام شد')
      } else {
        cb(false, response.result)
      }
    }).catch((err) => {
      cb(false)
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function impersonateUserAction(userId, active = 1, cb) {
  return (dispatch) => {
    const promise = impersonateUser(userId, active, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: INIT_USER, newState: response.result})
        forwardTo('')
        window.location.reload()
        cb && cb(true, 'با موفقیت انجام شد')
      } else {
        cb && cb(false, response.result)
      }
    }).catch((err) => {
      cb(false, 'خطای نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function getUserTransactions() {
  return (dispatch) => {
    const promise = getUserTransactionsAPI(dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        dispatch({type: SET_TRANSACTIONS, newState: response.result})
      }
    }).catch((err) => {
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}


export function changePasswordAction(userId, password, cb) {
  return (dispatch) => {
    const promise = changeAdminPassword(userId, password, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb && cb(true, 'با موفقیت تغییر یافت')
      } else {
        cb && cb(false, response.result)
      }
    }).catch((err) => {
      cb(false, 'خطای نامشخص')
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}


export function activateProjectAction(projectId, active, cb) {
  return (dispatch) => {
    const promise = activateProject(projectId, active, dispatch)
    promise.then((response) => {
      if (response.status === 'OK') {
        cb(response.result)
      }
    }).catch((err) => {
      dispatch(setErrorMessage(errorMessages.GENERAL_ERROR))
    })
  }
}

export function setTokenAction(token) {
  return (dispatch) => {
    dispatch({type: SET_TOKEN, newState: {token: token}});
  }
}

