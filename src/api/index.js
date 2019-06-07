import {
    deleteConfig,
    getConfig,
    loginConfig,
    patchConfig,
    postConfig,
    putConfig,
    refreshConfig,
    refreshConfigToken
} from './config'
import {logout, sendingRequest, setAuthState, setTokenAction} from '../actions/AppActions'

import _ from 'underscore'

import {get, post} from 'axios'
import store from '../store'
/* global fetch */

const BASE_URL = 'http://api.dev2.platform.ceit.aut.ac.ir/api/v1';
const BASE_FILES_URL = 'http://api.dev2.platform.ceit.aut.ac.ir';
const BASE_ADMIN_URL = 'http://api.dev2.platform.ceit.aut.ac.ir/api/admin';

const endpoints = {
    login: '/login',
    register: '/register',
    logout: '/logoutAPI',
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

function controller(json = {}) {
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
    return {status: true}
}

const translate = (error) => {
    return Errors[error] !== undefined ? Errors[error] : error
};

function fetchData(endpoint = '/404', config = {}, dispatch, newUrl = false, loading = true) {
    return new Promise((resolve, reject) => {
        if (loading) {
            dispatch(sendingRequest(true))
        }

        fetch(newUrl ? endpoint : BASE_URL + endpoint, config)
            .then((response) => response.json())
            .then((json) => {
                if (loading) {
                    dispatch(sendingRequest(false))
                }

                const {status, message, code} = controller(json);

                if ((code === 701 || code === 401) && endpoint !== endpoints.login) {
                    if (message === 'token expired') {
                        const promise = fetchData(endpoints.refresh, refreshConfig(), dispatch);
                        promise.then((response) => {
                            if (response.status === 'OK') {
                                dispatch(setAuthState(true));
                                dispatch(setTokenAction(response.result.token));
                                // retry the query
                                return fetchData(endpoint, refreshConfigToken(config), dispatch, newUrl, loading).then(resolve)
                            } else {
                                dispatch(logout())
                            }
                        })
                    } else {
                        dispatch(logout())
                    }
                } else if (!status || (code && code.toString(10).startsWith('7'))) {
                    return resolve({status: 'FAILED', result: message, code})
                } else {
                    return resolve({result: json.result, status: 'OK', code})
                }
            })
            .catch((err) => {
                dispatch(sendingRequest(false));
                return resolve({status: 'FAILED', result: err})
            })
    })
}

export function streamFetch(endpoint = '/404', cb) {
    fetch(BASE_URL + endpoint, getConfig())
        .then((response) => response.json())
        .then((json) => {
            cb(json)
        })
}

function getFormData(object) {
    let formData = '';
    Object.keys(object).forEach(key => {
        formData += _.isUndefined(object[key]) ? ''
            : key + '=' + encodeURIComponent(object[key]) + '&'
    });
    return formData
}

export function login(email, password, dispatch) {
    const config = loginConfig;
    Object.assign(config, {body: getFormData({email, password})});
    return fetchData(endpoints.login, config, dispatch)
}

export function listProject(dispatch) {
    return fetchData(endpoints.listProject, getConfig(), dispatch)
}

export function register(data, dispatch) {
    const config = loginConfig;
    Object.assign(config, {body: getFormData(data)});
    return fetchData(endpoints.register, config, dispatch)
}

export function logoutAPI(dispatch) {
    return fetchData(endpoints.logout, postConfig(), dispatch)
}

export function viewProfile(dispatch) {
    return fetchData('/user', getConfig(), dispatch)
}

export function createProject(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(endpoints.createProject, config, dispatch)
}

//
//
export function getProject(id, compress, dispatch) {
    if (compress) {
        return fetchData(endpoints.getProject + '/' + id + '?compress=1', getConfig(), dispatch)
    }
    return fetchData(endpoints.getProject + '/' + id, getConfig(), dispatch)
}

//
//
//
export function editThing(thingId, data, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/things/${thingId}`, config, dispatch)
}

//
export function editProject(id, data, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData('/project/' + id, config, dispatch)
}

export function editAliases(id, data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData('/project/' + id + '/aliases', config, dispatch)
}

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
export function getThing(thingId, dispatch) {
    return fetchData(`/things/${thingId}`, getConfig(), dispatch)
}

export function getThings(dispatch) {
    return fetchData(`/things`, getConfig(), dispatch)
}

export function getProjectThings(projectId, limit = 10, offset = 0, data, dispatch, loading = true) {
    const config = postConfig();
    const formData = {
        limit, offset, ...data
    };
    Object.assign(config, {body: getFormData(formData)});
    return fetchData(`/project/${projectId}/things`, config, dispatch, false, loading)
}

export function getThingsList(limit = 10, offset = 0, data, dispatch, loading = true) {
    const config = postConfig();
    const formData = {
        limit, offset, ...data
    };
    Object.assign(config, {body: getFormData(formData)});
    return fetchData(`/things/list`, config, dispatch, false, loading)
}

export function getGateways(dispatch) {
    return fetchData('/gateway', getConfig(), dispatch)
}

export function createThing(data, projectId, dispatch) {
    const config = postConfig();
    data['project_id'] = projectId;
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/things`, config, dispatch)
}

//
// module.exports.connectThing = function (thingId, projectId, dispatch) {
//     return fetchData('/project/' + projectId + '/things/' + thingId, projectControler.find, getConfig(), dispatch)
// }
//
export function getThingsMainData(thingIDs, projectID, offset, limit, since, dispatch) {
    const config = postConfig();
    Object.assign(config, {
        body: getFormData({
            'project_id': projectID,
            since,
            offset,
            limit,
            'thing_ids': thingIDs
        })
    });
    return fetchData(`/things/data`, config, dispatch)
}

export function getThingsSampleData(thingIDs, projectID, since, until, window, dispatch) {
    const config = postConfig();
    Object.assign(config, {
        body: getFormData({
            'project_id': projectID,
            since,
            window,
            until,
            'thing_ids': thingIDs
        })
    });
    return fetchData(`/things/data/sample`, config, dispatch)
}

export function createCodec(data, thingId, projectId, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/things/${thingId}/codec`, config, dispatch)
}

export function createGateway(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/gateway`, config, dispatch)
}

export function updateGateway(data, dispatch) {
    const config = putConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/gateway/${data._id}`, config, dispatch)
}

export function decryptFramePayload(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/decrypt-phy-payload/`, config, dispatch)
}

export function uploadExcel(data, projectId, dispatch) {
    const url = `${BASE_URL}/things/from-excel`;
    const formData = new FormData();
    formData.append('things', data);
    formData.append('project_id', projectId);
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        }
    };
    return post(url, formData, config)
}

export function uploadLegalDoc(file, dispatch) {
    const url = `${BASE_URL}/user/upload`;
    const formData = new FormData();
    formData.append('file', file);
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        }
    };
    return post(url, formData, config)
}

export function uploadPicture(file, dispatch) {
    const url = `${BASE_URL}/user/picture`;
    const formData = new FormData();
    formData.append('picture', file);
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        }
    };
    return post(url, formData, config)
}

export function DownloadThingsExcel(projectId, dispatch) {
    const url = `${BASE_URL}/project/${projectId}/things/export`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    return get(url, config)
}

export function DownloadUserThingsExcel(dispatch) {
    const url = `${BASE_URL}/things/to-excel`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    return get(url, config)
}

export function DownloadUserGatewaysExcel(dispatch) {
    const url = `${BASE_URL}/gateway/to-excel`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    return get(url, config)
}

export function DownloadUserTransactionsExcel() {
    const url = `${BASE_URL}/payment/excel`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    return get(url, config)
}

export function DownloadAdminTransactionsExcel(limit, offset) {
    const url = `${BASE_ADMIN_URL}/payment/to-excel?limit=${limit}&offset=${offset}`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    return get(url, config)
}
export function DownloadThingsDataExcel(things, projectId, offset, limit, since) {
    const url = `${BASE_URL}/things/data/excel`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    const fd = new FormData();
    fd.append('thing_ids', things);
    fd.append('project_id', projectId);
    fd.append('offset', offset);
    fd.append('limit', limit);
    fd.append('since', since);
    return post(url, fd, config)
}

export function DownloadUsersListExcel() {
    const url = `${BASE_ADMIN_URL}/users/excel`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    return get(url, config)
}

export function DownloadThingProfileThingsExcel(profileId, dispatch) {
    const url = `${BASE_URL}/thing-profile/${profileId}/things-excel`;
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
    };
    return get(url, config)
}

export function getThingProfileList(dispatch) {
    return fetchData('/thing-profile', getConfig(), dispatch)
}

export function createThingProfile(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/thing-profile`, config, dispatch)
}

export function createScenario(data, id, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/project/${id}/scenario`, config, dispatch)
}

export function updateScenarioAPI(data, projectId, scenarioId, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/project/${projectId}/scenario/${scenarioId}`, config, dispatch)
}

export function sendThingKeys(data, thingId, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/things/${thingId}/keys`, config, dispatch)
}

export function deleteProject(projectId, dispatch) {
    const config = deleteConfig();
    return fetchData(`/project/${projectId}`, config, dispatch)
}

export function deleteGateway(gatewayId, dispatch) {
    const config = deleteConfig();
    return fetchData(`/gateway/${gatewayId}`, config, dispatch)
}

export function editProfile(data, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/user/update`, config, dispatch)
}

export function changePassword(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/user/password`, config, dispatch)
}

export function resetPasswordAPI(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/password/email`, config, dispatch)
}

export function testCodecAPI(thingId, data, decode, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/things/${thingId}/test?decode=${decode}`, config, dispatch)
}

export function deleteDeviceProfile(profileId, dispatch) {
    const config = deleteConfig();
    return fetchData(`/thing-profile/${profileId}`, config, dispatch)
}

export function getDeviceProfileAPI(profileId, dispatch) {
    return fetchData(`/thing-profile/${profileId}`, getConfig(), dispatch)
}

export function getSingleGateway(id, dispatch) {
    return fetchData('/gateway/' + id, getConfig(), dispatch)
}

export function deleteThing(projectId, thingId, dispatch) {
    const config = deleteConfig();
    return fetchData(`/things/${thingId}`, config, dispatch)
}

export function deleteMultipleThing(thingIds, dispatch) {
    const config = postConfig();
    Object.assign(config, {
        body: getFormData({
            thing_ids: JSON.stringify(thingIds)
        })
    });
    return fetchData(`/things/delete`, config, dispatch)
}

export function activateThing(thingId, active, dispatch) {
    const config = getConfig();
    return fetchData(`/things/${thingId}/activate?active=${active ? 1 : 0}`, config, dispatch)
}

export function deleteCodecTemplate(projectId, codecId, dispatch) {
    const config = deleteConfig();
    return fetchData(`/project/${projectId}/codec/${codecId}`, config, dispatch)
}

export function deleteScenario(projectId, scenarioId, dispatch) {
    const config = deleteConfig();
    return fetchData(`/project/${projectId}/scenario/${scenarioId}`, config, dispatch)
}

export function newDownlink(thingId, data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/things/${thingId}/send`, config, dispatch)
}

export function createCodecTemplate(projectId, data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/project/${projectId}/codec`, config, dispatch)
}

export function updateCodecTemplate(codec_id, projectId, data, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`/project/${projectId}/codec/${codec_id}`, config, dispatch)
}

export function getCodecTemplateList(projectId, dispatch) {
    return fetchData(`/project/${projectId}/codec`, getConfig(), dispatch)
}

export function activateScenario(projectId, scenarioId, dispatch) {
    return fetchData(`/project/${projectId}/scenario/${scenarioId}/activate`, getConfig(), dispatch)
}

export function getThingCodec(thingId, dispatch) {
    return fetchData(`/things/${thingId}/codec`, getConfig(), dispatch)
}

export function getCodecTemplate(projectId, codecId, dispatch) {
    return fetchData(`/project/${projectId}/codec/${codecId}`, getConfig(), dispatch)
}

export function getScenario(projectId, scenarioId, dispatch) {
    return fetchData(`/project/${projectId}/scenario/${scenarioId}`, getConfig(), dispatch)
}

export function getAdminPackage(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/packages`, getConfig(), dispatch, true)
}

export function getAdminPaymentPortals(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/payment/portals`, getConfig(), dispatch, true)
}

export function activatePaymentPortal(portal_id, active, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/payment/portals/${portal_id}/active?active=${active ? 1 : 0}`, getConfig(), dispatch, true)
}

export function getUserPaymentPortals(dispatch) {
    return fetchData(`/payment/portals`, getConfig(), dispatch)
}

export function getDiscounts(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/discount`, getConfig(), dispatch, true)
}

export function deleteDiscount(id, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/discount/${id}`, deleteConfig(), dispatch, true)
}

export function createDiscount(value, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData({value: value})});
    return fetchData(`${BASE_ADMIN_URL}/discount`, config, dispatch, true)
}

export function getPackage(packageId, dispatch) {
    return fetchData(`/packages/${packageId}`, getConfig(), dispatch)
}

export function createPackage(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`${BASE_ADMIN_URL}/packages`, config, dispatch, true)
}

export function updatePackage(packageId, data, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`${BASE_ADMIN_URL}/packages/${packageId}`, config, dispatch, true)
}

export function deletePackage(packageId, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/packages/${packageId}`, deleteConfig(), dispatch, true)
}

export function activatePackage(packageId, active, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/packages/${packageId}/activate?active=${active ? 1 : 0}`, getConfig(), dispatch, true)
}

export function getUserPackage(dispatch) {
    return fetchData(`/packages`, getConfig(), dispatch)
}

export function buyPackage(packageId, code, dispatch) {
    const url = code ? `/packages/${packageId}/invoice?code=${code}` : `/packages/${packageId}/invoice`;
    return fetchData(url, getConfig(), dispatch)
}

export function lint(projectId, code, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData({code})});
    return fetchData(`/project/${projectId}/lint`, config, dispatch)
}

export function getDashboard(dispatch) {
    return fetchData(`/user/dashboard`, getConfig(), dispatch)
}

export function getUserThings(compress, dispatch) {
    return fetchData(`/things?compress=${compress}`, getConfig(), dispatch)
}

export function setDashboardWidgetChart(widget, id, dispatch) {
    const config = postConfig();
    if (id) {
        widget.id = id
    }
    Object.assign(config, {body: getFormData(widget)});
    return fetchData(`/user/widget/charts`, config, dispatch)
}

export function deleteDashboardWidgetChart(id, dispatch) {
    const config = deleteConfig();
    return fetchData(`/user/widget/charts?id=${id}`, config, dispatch)
}

export function getLogs(limit = 10, offset = 0, data, dispatch, loading = true) {
    const config = postConfig();
    const formData = {
        limit, offset, ...data
    };
    Object.assign(config, {body: getFormData(formData)});
    return fetchData(`${BASE_ADMIN_URL}/logs`, config, dispatch, true, loading)
}

export function getUsers(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/users`, getConfig(), dispatch, true)
}

export function getUser(userID, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/users/${userID}`, getConfig(), dispatch, true)
}

export function getGlobalCodecs(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/codec`, getConfig(), dispatch, true)
}

export function getUserTransaction(userID, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/users/${userID}/transactions`, getConfig(), dispatch, true)
}

export function getAllTransactions(limit = 10, offset = 0, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/payment?offset=${offset}&limit=${limit}`, getConfig(), dispatch, true)
}

export function getTransactionsOverview(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/payment/overview`, getConfig(), dispatch, true)
}

export function getPermissions(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/permission`, getConfig(), dispatch, true)
}

export function getRoles(dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/permission/role`, getConfig(), dispatch, true)
}

export function setRole(userId, roleId, dispatch) {
    if (roleId) {
        return fetchData(`${BASE_ADMIN_URL}/permission/${userId}/${roleId}`, postConfig(), dispatch, true)
    }
    return fetchData(`${BASE_ADMIN_URL}/permission/${userId}`, postConfig(), dispatch, true)
}

export function activeUser(userID, action = 0, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/users/${userID}/ban?active=${action}`, getConfig(), dispatch, true)
}

export function impersonateUser(userID, active = 1, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/users/${userID}/impersonate?active=${active}`, getConfig(), dispatch, true)
}

export function changeAdminPassword(userID, password, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData({password})});
    return fetchData(`${BASE_ADMIN_URL}/users/${userID}/password`, config, dispatch, true)
}

export function getUserTransactionsAPI(dispatch) {
    return fetchData(`/payment`, getConfig(), dispatch)
}

export function activateProject(projectId, active, dispatch) {
    return fetchData(`/project/${projectId}/activate?active=${active}`, getConfig(), dispatch)
}

export function getGlobalCodecTemplate(codecId, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/codec/${codecId}`, getConfig(), dispatch, true)
}

export function updateGlobalCodecTemplate(codec_id, data, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`${BASE_ADMIN_URL}/codec/${codec_id}`, config, dispatch, true)
}

export function createGlobalCodecTemplate(data, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData(data)});
    return fetchData(`${BASE_ADMIN_URL}/codec`, config, dispatch, true)
}

export function updateRole(roleId, permissions_ids, name, dispatch) {
    const config = patchConfig();
    Object.assign(config, {body: getFormData({name, permissions_ids})});
    return fetchData(`${BASE_ADMIN_URL}/permission/role/${roleId}`, config, dispatch, true)
}

export function deleteGlobalCodec(codecId, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/codec/${codecId}`, deleteConfig(), dispatch, true)
}

export function deleteRole(roleId, dispatch) {
    return fetchData(`${BASE_ADMIN_URL}/permission/role/${roleId}`, deleteConfig(), dispatch, true)
}

export function addRole(permissions, dispatch) {
    const config = postConfig();
    Object.assign(config, {body: getFormData({name: 'نقش جدید', permissions_ids: JSON.stringify(permissions)})});
    return fetchData(`${BASE_ADMIN_URL}/permission/role`, config, dispatch, true)
}

export function baseURL() {
    return BASE_URL
}

export function baseFilesURL() {
    return BASE_FILES_URL
}
