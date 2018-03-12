import {
    loginConfig,
    postConfig,
    getConfig,
    patchConfig,
    uploadConfig,
    deleteConfig
} from './config'

import _ from 'underscore'
import {sendingRequest, logout} from '../actions/AppActions'
import axios, {post} from 'axios';
import store from '../store'
/* global fetch */

const BASE_URL = 'http://backback.ceit.aut.ac.ir:50024/api/v1'

const endpoints = {
    login: '/login',
    register: '/register',
    logout: '/logout',

    createProject: '/project',
    listProject: '/project',
    getProject: '/project',
    editProject: '/project',

    editProfile: '/user/update',

    listThings: '/thing',
    getThing: '/thing',
    editThing: '/thing',
    createThing: '/thing'

}

const Errors = {
    EMPTY_JSON_RESPONSE: 'EMPTY_JSON_RESPONSE',
    SOMETHING_IS_NOT_OK: 'SOMETHING_IS_NOT_OK',

    'email is required': 'وارد کردن ایمیل ضروری است',
    'invalid credentials': 'ایمیل و یا رمز عبور صحیح نمی باشد'
}

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
    return {status: true}
}

const translate = (error) => {
    return Errors[error] !== undefined ? Errors[error] : error
}

function fetchData(endpoint = '/404', config = {}, dispatch) {

    return new Promise((resolve, reject) => {
        dispatch(sendingRequest(true))

        fetch(BASE_URL + endpoint, config)
            .then((response) => response.json())
            .then((json) => {
                dispatch(sendingRequest(false))
                const {status, message, code} = controler(json)
                console.log(code)
                if (code === 703 || code === 704 ) {
                    dispatch(logout())
                }
                if (!status) {
                    return resolve({status: 'FAILED', result: message})
                }
                return resolve({result: json.result, status: 'OK'})
            })
            .catch((err) => {
                dispatch(sendingRequest(false))
                return resolve({status: 'FAILED', result: err})
            })
    })
}

function getFormData(object) {
    let formData = ''
    Object.keys(object).forEach(key => {
        formData += _.isUndefined(object[key]) ? ''
            : key + '=' + encodeURIComponent(object[key]) + '&'
    })
    console.log('form data', object + ' ' + formData)
    return formData
}

module.exports.login = function (email, password, captcha, dispatch) {
    const config = loginConfig
    Object.assign(config, {body: getFormData({email, password, "g-recaptcha-response": captcha})})
    return fetchData(endpoints.login, config, dispatch)
}

module.exports.listProject = function (dispatch) {
    return fetchData(endpoints.listProject, getConfig(), dispatch)
}


module.exports.register = function (data, dispatch) {
    const config = loginConfig
    Object.assign(config, {body: getFormData(data)})
    return fetchData(endpoints.register, config, dispatch)
}

module.exports.logout = function (dispatch) {
    return fetchData(endpoints.logout, postConfig(), dispatch)
}

module.exports.viewProfile = function (dispatch) {
    return fetchData('/user', getConfig(),dispatch)
}

module.exports.createProject = function (data, dispatch) {
    const config = postConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData(endpoints.createProject, config, dispatch)
}
//
//
module.exports.getProject = function (id, dispatch) {
    return fetchData(endpoints.getProject + '/' + id, getConfig(), dispatch)
}
//
//
//
// module.exports.editThing = function (id,data,dispatch) {
//     const config = patchConfig()
//     Object.assign(config, {body: getFormData(data)})
//     return fetchData(endpoints.editThing + '/' + id, projectControler.edit, config, dispatch)
// }
//
module.exports.editProject = function (id, data, dispatch) {
    const config = patchConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData('/project/' + id, config, dispatch)
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
// module.exports.getThing = function (id, dispatch) {
//     return fetchData(endpoints.getThing + '/' + id, projectControler.find, getConfig(), dispatch)
// }
//
module.exports.getGateways = function (dispatch) {
    return fetchData('/gateway', getConfig(), dispatch)
}

module.exports.createThing = function (data, projectId, dispatch) {
    const config = postConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData(`/project/${projectId}/things`, config, dispatch)
}
//
// module.exports.connectThing = function (thingId, projectId, dispatch) {
//     return fetchData('/project/' + projectId + '/things/' + thingId, projectControler.find, getConfig(), dispatch)
// }
//
// module.exports.getProjectData = function (thingId,offset,limit, dispatch) {
//     return fetchData('/thing/' + thingId +'/data?offset='+offset+'&count='+limit, projectControler.find, getConfig(), dispatch)
// }
//
// module.exports.createCodec = function (data,id, dispatch) {
//     const config = postConfig()
//     Object.assign(config, {body: getFormData(data)})
//     return fetchData(`/thing/${id}/codec`, projectControler.create, config, dispatch)
// }
//
//
module.exports.createGateway = function (data, dispatch) {
    const config = postConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData(`/gateway`, config, dispatch)
}

module.exports.uploadExcel = function (data, projectId, dispatch) {
    const url = `${BASE_URL}/project/${projectId}/things/from-excel`
    const formData = new FormData();
    formData.append('things', data)
    const config = {
        headers: {
            'Authorization': 'Bearer ' + store.getState().userReducer.token,
            'Content-Type': 'multipart/form-data'
        }
    }
    return post(url, formData, config)
}


module.exports.getThingProfileList = function (dispatch) {
    return fetchData('/thing-profile', getConfig(), dispatch)
}

module.exports.createThingProfile = function (data, dispatch) {
    const config = postConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData(`/thing-profile`, config, dispatch)
}

module.exports.createScenario = function (data, id, dispatch) {
    const config = postConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData(`/project/${id}/scenario`, config, dispatch)
}

module.exports.activeThing = function (data, thingId, projectId, dispatch) {
    const config = postConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData(`/project/${projectId}/things/${thingId}/activate`, config, dispatch)
}

module.exports.deleteProject = function (projectId, dispatch) {
    const config = deleteConfig()
    return fetchData(`/project/${projectId}`, config, dispatch)
};

module.exports.deleteGateway = function (gatewayId, dispatch) {
    const config = deleteConfig()
    return fetchData(`/gateway/${gatewayId}`, config, dispatch)
};

module.exports.editProfile = function (data, dispatch) {
    const config = patchConfig()
    Object.assign(config, {body: getFormData(data)})
    return fetchData(`/user/update`, config, dispatch)
}

module.exports.deleteDeviceProfile = function (profileId, dispatch) {
    const config = deleteConfig()
    return fetchData(`/thing-profile/${profileId}`, config, dispatch)
};
