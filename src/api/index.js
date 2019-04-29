import {
  loginConfig,
  postConfig,
  getConfig,
  patchConfig,
  putConfig,
  uploadConfig,
  deleteConfig
} from './config'
import { setAuthState, initUser, changePassword } from '../actions/AppActions'


import _ from 'underscore'
import { sendingRequest, logout } from '../actions/AppActions'
import axios, { post, get } from 'axios';
import store from '../store'
/* global fetch */

const BASE_URL = 'http://api.dev1.platform.ceit.aut.ac.ir/api/v1'
const BASE_FILES_URL = 'http://api.dev1.platform.ceit.aut.ac.ir'
const BASE_ADMIN_URL = 'http://api.dev1.platform.ceit.aut.ac.ir/api/admin'
const GOOGLE_URL = 'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places'

const endpoints = {
  login: '/login',
  register: '/register',
  logout: '/logout',
  refresh: '/refresh',

  createProject: '/project',
  listProject: '/project',
  getProject: '/project',
  editProject: '/project',


  editProfile: '/user/update',

  listThings: '/thing',
  getThing: '/thing',
  editThing: '/thing',
  createThing: '/thing'

};

const Errors = {
  EMPTY_JSON_RESPONSE: 'پاسخ خالی از سرور',
  SOMETHING_IS_NOT_OK: 'خطای نامشخص',

  'email is required': 'وارد کردن ایمیل ضروری است',
  'invalid credentials': 'ایمیل و یا رمز عبور صحیح نمی باشد'
};

function controler(json = {}) {
  if (json === {}) {
    return {status: false, message: Errors.EMPTY_JSON_RESPONSE}
  }
  if (json.code !== 200) {
    if (json.result !== undefined) {
      return {status: false, message: translate(json.result), code: json.code}
    } else {
      return {status: false, message: Errors.SOMETHING_IS_NOT_OK, code: json.code}
    }
  }
  return {status: true};
};

const translate = (error) => {
  return Errors[error] !== undefined ? Errors[error] : error
};

function fetchData(endpoint = '/404', config = {}, dispatch, newUrl = false, loading = true) {

  return new Promise((resolve, reject) => {
    if (loading)
      dispatch(sendingRequest(true))

    fetch(newUrl ? endpoint : BASE_URL + endpoint, config)
      .then((response) => response.json())
      .then((json) => {
        if (loading)
          dispatch(sendingRequest(false))
        const {status, message, code} = controler(json)
        if ((code === 701 || code === 401) && endpoint !== endpoints.login) {
          console.log(message === 'token expired' && store.getState().userReducer.keep)
          if (message === 'token expired' && store.getState().userReducer.keep) {
            const promise = fetchData(endpoints.refresh, putConfig(), dispatch);
            promise.then((response) => {
              if (response.status === 'OK') {
                dispatch(setAuthState(true))
                dispatch(initUser({...response.result, keep: true}))
              }
            })
          }
          else {
            dispatch(logout())
          }
        }
        if (!status || (code && str(code).startsWith('7'))) {
          return resolve({status: 'FAILED', result: message,code})
        }
        return resolve({result: json.result, status: 'OK',code})
      })
      .catch((err) => {
        dispatch(sendingRequest(false))
        return resolve({status: 'FAILED', result: err})
      })
  })
};

export function streamFetch(endpoint = '/404', cb) {
  fetch(BASE_URL + endpoint, getConfig())
    .then((response) => response.json())
    .then((json) => {
      cb(json)
    })
};

function getFormData(object) {
  let formData = ''
  Object.keys(object).forEach(key => {
    formData += _.isUndefined(object[key]) ? ''
      : key + '=' + encodeURIComponent(object[key]) + '&'
  })
  return formData
};

module.exports.login = function (email, password, dispatch) {
  const config = loginConfig
  Object.assign(config, {body: getFormData({email, password})})
  return fetchData(endpoints.login, config, dispatch)
};

module.exports.listProject = function (dispatch) {
  return fetchData(endpoints.listProject, getConfig(), dispatch)
};


module.exports.register = function (data, dispatch) {
  const config = loginConfig
  Object.assign(config, {body: getFormData(data)})
  return fetchData(endpoints.register, config, dispatch)
};

module.exports.logout = function (dispatch) {
  return fetchData(endpoints.logout, postConfig(), dispatch)
};

module.exports.viewProfile = function (dispatch) {
  return fetchData('/user', getConfig(), dispatch)
};

module.exports.createProject = function (data, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(endpoints.createProject, config, dispatch)
};
//
//
module.exports.getProject = function (id, compress, dispatch) {
  if (compress)
    return fetchData(endpoints.getProject + '/' + id + '?compress=1', getConfig(), dispatch)
  return fetchData(endpoints.getProject + '/' + id, getConfig(), dispatch)
};
//
//
//
module.exports.editThing = function (thingId, data, dispatch) {
  const config = patchConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/things/${thingId}`, config, dispatch)
};
//
module.exports.editProject = function (id, data, dispatch) {
  const config = patchConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData('/project/' + id, config, dispatch)
};

module.exports.editAliases = function (id, data, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData('/project/' + id + '/aliases', config, dispatch)
};

// module.exports.editProfile = function (data, dispatch) {
//     const config = patchConfig()
//     if (data.other_info !== undefined) {
//         data.other_info = JSON.stringify(data.other_info)
//     }
//     Object.assign(config, {body: getFormData(data)})
//     return fetchData(endpoints.editProfile, config, dispatch)
// }

//
// module.exports.listThings = function (dispatch) {
//     return fetchData(endpoints.listThings, projectControler.list, getConfig(), dispatch)
// }
//
module.exports.getThing = function (thingId, dispatch) {
  return fetchData(`/things/${thingId}`, getConfig(), dispatch)
};

module.exports.getThings = function (dispatch) {
  return fetchData(`/things`, getConfig(), dispatch)
};
module.exports.getProjectThings = function (projectId, limit = 10, offset = 0, data, dispatch, loading = true) {
  const config = postConfig()
  const formData = {
    limit, offset, ...data
  }
  Object.assign(config, {body: getFormData(formData)})
  return fetchData(`/project/${projectId}/things`, config, dispatch, false, loading)
};

module.exports.getThingsList = function (limit = 10, offset = 0, data, dispatch, loading = true) {
  const config = postConfig()
  const formData = {
    limit, offset, ...data
  }
  Object.assign(config, {body: getFormData(formData)})
  return fetchData(`/things/list`, config, dispatch, false, loading)
};


module.exports.getGateways = function (dispatch) {
  return fetchData('/gateway', getConfig(), dispatch)
};

module.exports.createThing = function (data, projectId, dispatch) {
  const config = postConfig()
  data['project_id'] = projectId
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/things`, config, dispatch)
};
//
// module.exports.connectThing = function (thingId, projectId, dispatch) {
//     return fetchData('/project/' + projectId + '/things/' + thingId, projectControler.find, getConfig(), dispatch)
// }
//
module.exports.getThingsMainData = function (thing_ids, projectId, offset, limit, since, dispatch) {
  const config = postConfig()
  Object.assign(config, {
    body: getFormData({
      'project_id': projectId,
      since,
      offset,
      limit,
      thing_ids
    })
  })
  return fetchData(`/things/data`, config, dispatch)
};

module.exports.getThingsSampleData = function (thing_ids, projectId, since, until, window, dispatch) {
  const config = postConfig()
  Object.assign(config, {
    body: getFormData({
      'project_id': projectId,
      since,
      window,
      until,
      thing_ids
    })
  })
  return fetchData(`/things/data/sample`, config, dispatch)
};


module.exports.createCodec = function (data, thingId, projectId, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/things/${thingId}/codec`, config, dispatch)
};
module.exports.createGateway = function (data, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/gateway`, config, dispatch)
};

module.exports.updateGateway = function (data, dispatch) {
  const config = putConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/gateway/${data._id}`, config, dispatch)
};

module.exports.decryptFramePayload = function (data, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/decrypt-phy-payload/`, config, dispatch)
};

module.exports.uploadExcel = function (data, projectId, dispatch) {
  const url = `${BASE_URL}/things/from-excel`
  const formData = new FormData();
  formData.append('things', data)
  formData.append('project_id', projectId)
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data'
    }
  }
  return post(url, formData, config)
};

module.exports.uploadLegalDoc = function (file, dispatch) {
  const url = `${BASE_URL}/user/upload`
  const formData = new FormData();
  formData.append('file', file)
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data'
    }
  }
  return post(url, formData, config)
};
module.exports.uploadPicture = function (file, dispatch) {
  const url = `${BASE_URL}/user/picture`
  const formData = new FormData();
  formData.append('picture', file)
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data'
    }
  }
  return post(url, formData, config)
};

module.exports.DownloadThingsExcel = function (projectId, dispatch) {
  const url = `${BASE_URL}/project/${projectId}/things/export`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob'
  }
  return get(url, config)
};
module.exports.DownloadUserThingsExcel = function (dispatch) {
  const url = `${BASE_URL}/things/to-excel`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob'
  }
  return get(url, config)
};

module.exports.DownloadUserGatewaysExcel = function (dispatch) {
  const url = `${BASE_URL}/gateway/to-excel`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob'
  }
  return get(url, config)
};

module.exports.DownloadUserTransactionsExcel = function () {
  const url = `${BASE_URL}/payment/excel`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob'
  }
  return get(url, config)
};

module.exports.DownloadAdminTransactionsExcel = function (limit, offset) {
  const url = `${BASE_ADMIN_URL}/payment/to-excel?limit=${limit}&offset=${offset}`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob'
  }
  return get(url, config)
};

module.exports.DownloadThingsDataExcel = function (things, projectId, offset, limit, since) {
  const url = `${BASE_URL}/things/data/excel`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob',
  }
  const fd = new FormData();
  fd.append('thing_ids', things);
  fd.append('project_id', projectId);
  fd.append('offset', offset);
  fd.append('limit', limit);
  fd.append('since', since);
  return post(url, fd, config)
};

module.exports.DownloadUsersListExcel = function () {
  const url = `${BASE_ADMIN_URL}/users/excel`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data',
    },
    responseType: 'blob'
  }
  return get(url, config)
};

module.exports.DownloadThingProfileThingsExcel = function (profileId, dispatch) {
  const url = `${BASE_URL}/thing-profile/${profileId}/things-excel`
  const config = {
    headers: {
      'Authorization': 'Bearer ' + store.getState().userReducer.token,
      'Content-Type': 'multipart/form-data'
    },
    responseType: 'blob'
  };
  return get(url, config)
};


module.exports.getThingProfileList = function (dispatch) {
  return fetchData('/thing-profile', getConfig(), dispatch)
};

module.exports.createThingProfile = function (data, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/thing-profile`, config, dispatch)
};

module.exports.createScenario = function (data, id, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/project/${id}/scenario`, config, dispatch)
};
module.exports.updateScenarioAPI = function (data, projectId, scenarioId, dispatch) {
  const config = patchConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/project/${projectId}/scenario/${scenarioId}`, config, dispatch)
};

module.exports.sendThingKeys = function (data, thingId, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/things/${thingId}/keys`, config, dispatch)
};

module.exports.deleteProject = function (projectId, dispatch) {
  const config = deleteConfig();
  return fetchData(`/project/${projectId}`, config, dispatch)
};

module.exports.deleteGateway = function (gatewayId, dispatch) {
  const config = deleteConfig();
  return fetchData(`/gateway/${gatewayId}`, config, dispatch)
};

module.exports.editProfile = function (data, dispatch) {
  const config = patchConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/user/update`, config, dispatch)
};

module.exports.changePassword = function (data, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)});
  return fetchData(`/user/password`, config, dispatch)
};

module.exports.resetPasswordAPI = function (data, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/password/email`, config, dispatch)
};

module.exports.testCodecAPI = function (thingId, data, decode, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)});
  return fetchData(`/things/${thingId}/test?decode=${decode}`, config, dispatch)
};

module.exports.deleteDeviceProfile = function (profileId, dispatch) {
  const config = deleteConfig();
  return fetchData(`/thing-profile/${profileId}`, config, dispatch)
};

module.exports.getDeviceProfileAPI = function (profileId, dispatch) {
  return fetchData(`/thing-profile/${profileId}`, getConfig(), dispatch)
};

module.exports.getSingleGateway = function (id, dispatch) {
  const config = getConfig();
  return fetchData('/gateway/' + id, getConfig(), dispatch)
};

module.exports.deleteThing = function (projectId, thingId, dispatch) {
  const config = deleteConfig();
  return fetchData(`/things/${thingId}`, config, dispatch)
};

module.exports.deleteMultipleThing = function (thingIds, dispatch) {
  const config = postConfig();
  Object.assign(config, {
    body: getFormData({
      thing_ids: JSON.stringify(thingIds)
    })
  });
  return fetchData(`/things/delete`, config, dispatch)
};

module.exports.activateThing = function (thingId, active, dispatch) {
  const config = getConfig();
  return fetchData(`/things/${thingId}/activate?active=${active ? 1 : 0}`, config, dispatch)
};

module.exports.deleteCodecTemplate = function (projectId, codecId, dispatch) {
  const config = deleteConfig();
  return fetchData(`/project/${projectId}/codec/${codecId}`, config, dispatch)
};

module.exports.deleteScenario = function (projectId, scenarioId, dispatch) {
  const config = deleteConfig();
  return fetchData(`/project/${projectId}/scenario/${scenarioId}`, config, dispatch)
};

module.exports.newDownlink = function (thingId, data, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`/things/${thingId}/send`, config, dispatch)
};

module.exports.createCodecTemplate = function (projectId, data, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)});
  return fetchData(`/project/${projectId}/codec`, config, dispatch)
};

module.exports.updateCodecTemplate = function (codec_id, projectId, data, dispatch) {
  const config = patchConfig();
  Object.assign(config, {body: getFormData(data)});
  return fetchData(`/project/${projectId}/codec/${codec_id}`, config, dispatch)
};

module.exports.getCodecTemplateList = function (projectId, dispatch) {
  return fetchData(`/project/${projectId}/codec`, getConfig(), dispatch)
};

module.exports.activateScenario = function (projectId, scenarioId, dispatch) {
  return fetchData(`/project/${projectId}/scenario/${scenarioId}/activate`, getConfig(), dispatch)
};

module.exports.getThingCodec = function (thingId, dispatch) {
  return fetchData(`/things/${thingId}/codec`, getConfig(), dispatch)
};

module.exports.getCodecTemplate = function (projectId, codecId, dispatch) {
  return fetchData(`/project/${projectId}/codec/${codecId}`, getConfig(), dispatch)
};

module.exports.getScenario = function (projectId, scenarioId, dispatch) {
  return fetchData(`/project/${projectId}/scenario/${scenarioId}`, getConfig(), dispatch)
};

module.exports.getAdminPackage = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/packages`, getConfig(), dispatch, true)
};

module.exports.getAdminPaymentPortals = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/payment/portals`, getConfig(), dispatch, true)
};

module.exports.activatePaymentPortal = function (portal_id, active, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/payment/portals/${portal_id}/active?active=${active ? 1 : 0}`, getConfig(), dispatch, true)
};

module.exports.getUserPaymentPortals = function (dispatch) {
  return fetchData(`/payment/portals`, getConfig(), dispatch)
};


module.exports.getDiscounts = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/discount`, getConfig(), dispatch, true)
};

module.exports.deleteDiscount = function (id, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/discount/${id}`, deleteConfig(), dispatch, true)
};

module.exports.createDiscount = function (value, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData({value: value})})
  return fetchData(`${BASE_ADMIN_URL}/discount`, config, dispatch, true)
};

module.exports.getPackage = function (packageId, dispatch) {
  return fetchData(`/packages/${packageId}`, getConfig(), dispatch)
};

module.exports.createPackage = function (data, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`${BASE_ADMIN_URL}/packages`, config, dispatch, true)
};

module.exports.updatePackage = function (packageId, data, dispatch) {
  const config = patchConfig();
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`${BASE_ADMIN_URL}/packages/${packageId}`, config, dispatch, true)
};


module.exports.deletePackage = function (packageId, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/packages/${packageId}`, deleteConfig(), dispatch, true)
};

module.exports.activatePackage = function (packageId, active, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/packages/${packageId}/activate?active=${active ? 1 : 0}`, getConfig(), dispatch, true)
};

module.exports.getUserPackage = function (dispatch) {
  return fetchData(`/packages`, getConfig(), dispatch)
};

module.exports.buyPackage = function (packageId, code, dispatch) {
  const url = code ? `/packages/${packageId}/invoice?code=${code}` : `/packages/${packageId}/invoice`;
  return fetchData(url, getConfig(), dispatch)
};


module.exports.lint = function (projectId, code, dispatch) {
  const config = postConfig();
  Object.assign(config, {body: getFormData({code})})
  return fetchData(`/project/${projectId}/lint`, config, dispatch)
};

module.exports.getDashboard = function (dispatch) {
  return fetchData(`/user/dashboard`, getConfig(), dispatch)
};

module.exports.getUserThings = function (compress, dispatch) {
  return fetchData(`/things?compress=${compress}`, getConfig(), dispatch)
};


module.exports.setDashboardWidgetChart = function (widget, id, dispatch) {
  const config = postConfig();
  if (id)
    widget.id = id;
  Object.assign(config, {body: getFormData(widget)})
  return fetchData(`/user/widget/charts`, config, dispatch)
};
module.exports.deleteDashboardWidgetChart = function (id, dispatch) {
  const config = deleteConfig();
  return fetchData(`/user/widget/charts?id=${id}`, config, dispatch)
};

module.exports.getLogs = function (limit = 10, offset = 0, data, dispatch, loading = true) {
  const config = postConfig()
  const formData = {
    limit, offset, ...data
  }
  Object.assign(config, {body: getFormData(formData)})
  return fetchData(`${BASE_ADMIN_URL}/logs`, config, dispatch, true, loading)
};

module.exports.getUsers = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/users`, getConfig(), dispatch, true)
};

module.exports.getUser = function (userID, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/users/${userID}`, getConfig(), dispatch, true)
};
module.exports.getGlobalCodecs = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/codec`, getConfig(), dispatch, true)
};
module.exports.getUserTransaction = function (userID, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/users/${userID}/transactions`, getConfig(), dispatch, true)
};
module.exports.getAllTransactions = function (limit = 10,offset = 0, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/payment?offset=${offset}&limit=${limit}`, getConfig(), dispatch, true)
};
module.exports.getTransactionsOverview = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/payment/overview`, getConfig(), dispatch, true)
};
module.exports.getPermissions = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/permission`, getConfig(), dispatch, true)
};
module.exports.getRoles = function (dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/permission/role`, getConfig(), dispatch, true)
};

module.exports.setRole = function (userId, roleId, dispatch) {
  if (roleId)
    return fetchData(`${BASE_ADMIN_URL}/permission/${userId}/${roleId}`, postConfig(), dispatch, true)
  return fetchData(`${BASE_ADMIN_URL}/permission/${userId}`, postConfig(), dispatch, true)
};

module.exports.activeUser = function (userID, action = 0, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/users/${userID}/ban?active=${action}`, getConfig(), dispatch, true)
};

module.exports.impersonateUser = function (userID, active = 1, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/users/${userID}/impersonate?active=${active}`, getConfig(), dispatch, true)
};

module.exports.changeAdminPassword = function (userID, password, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData({password})})
  return fetchData(`${BASE_ADMIN_URL}/users/${userID}/password`, config, dispatch, true)
};

module.exports.getUserTransactionsAPI = function (dispatch) {
  return fetchData(`/payment`, getConfig(), dispatch)
};

module.exports.activateProject = function (projectId, active, dispatch) {
  return fetchData(`/project/${projectId}/activate?active=${active}`, getConfig(), dispatch)
};


module.exports.getGlobalCodecTemplate = function (codecId, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/codec/${codecId}`, getConfig(), dispatch, true)
};


module.exports.updateGlobalCodecTemplate = function (codec_id, data, dispatch) {
  const config = patchConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`${BASE_ADMIN_URL}/codec/${codec_id}`, config, dispatch, true)
};


module.exports.createGlobalCodecTemplate = function (data, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData(data)})
  return fetchData(`${BASE_ADMIN_URL}/codec`, config, dispatch, true)
};

module.exports.updateRole = function (roleId, permissions_ids, name, dispatch) {
  const config = patchConfig()
  Object.assign(config, {body: getFormData({name, permissions_ids})})
  return fetchData(`${BASE_ADMIN_URL}/permission/role/${roleId}`, config, dispatch, true)
};

module.exports.deleteGlobalCodec = function (codecId, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/codec/${codecId}`, deleteConfig(), dispatch, true)
};

module.exports.deleteRole = function (roleId, dispatch) {
  return fetchData(`${BASE_ADMIN_URL}/permission/role/${roleId}`, deleteConfig(), dispatch, true)
};

module.exports.addRole = function (permissions, dispatch) {
  const config = postConfig()
  Object.assign(config, {body: getFormData({name: 'نقش جدید', permissions_ids: JSON.stringify(permissions)})})
  return fetchData(`${BASE_ADMIN_URL}/permission/role`, config, dispatch, true)
};

module.exports.isOnlineAPI = function (dispatch) {
  return fetchData(`${GOOGLE_URL}`, getConfig(), dispatch, true)
};


module.exports.base_url = function () {
  return BASE_URL;
};
module.exports.base_files_url = function () {
  return BASE_FILES_URL;
};

