import {FREE, INIT_USER, SET_TOKEN, SET_TRANSACTIONS, UPDATE_USER} from '../constants/AppConstants'
import {baseFilesURL} from '../api/index'

const md5 = require('js-md5');

const assign = Object.assign || require('object.assign');
const initialState = {};

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case INIT_USER:
            return assign({}, state, {
                legal: action.newState.user.legal,
                username: action.newState.user.name,
                mobile: action.newState.user.mobile,
                phone: action.newState.user.phone,
                email: action.newState.user.email,
                other_info: action.newState.user.other_info,
                access_token: action.newState.access_token,
                refresh_token: action.newState.refresh_token,
                config: action.newState.config,
                is_admin: action.newState.user.is_admin,
                package: action.newState.user.package,
                legal_info: action.newState.user.legal_info,
                legal_doc: action.newState.user.legal_doc,
                picture: action.newState.user.picture ? baseFilesURL() + action.newState.user.picture
                    : 'https://www.gravatar.com/avatar/' + md5(action.newState.user.email) + '?s240',
                impersonated: 'impersonated' in action.newState.user ? action.newState.user.impersonated : !!state.impersonated,
                transactions: []
            });

        case SET_TOKEN:
            return assign({}, state, {
                access_token: action.newState.access_token ? action.newState.access_token : state.access_token
            });

        case UPDATE_USER:
            return assign({}, state, {
                legal: action.newState.user.legal,
                username: action.newState.user.name,
                email: action.newState.user.email,
                phone: action.newState.user.phone,
                mobile: action.newState.user.mobile,
                other_info: action.newState.user.other_info,
                legal_info: action.newState.user.legal_info,
                legal_doc: action.newState.user.legal_doc,
                picture: action.newState.user.picture ? baseFilesURL() + action.newState.user.picture
                    : 'https://www.gravatar.com/avatar/' + md5(action.newState.user.email) + '?s240',
                package: action.newState.user.package
            });

        case SET_TRANSACTIONS:
            return assign({}, state, {
                transactions: action.newState.invoices ? action.newState.invoices : []
            });
        case FREE:
            return {};
        default:
            return state
    }
}
