import { INIT_USER, UPDATE_USER, SET_TOKEN, FREE ,SET_TRANSACTIONS} from '../constants/AppConstants'
import _ from 'underscore'

const assign = Object.assign || require('object.assign')
const initialState = {}

export function userReducer(state = initialState, action) {
    switch (action.type) {

        case INIT_USER:
            return assign({}, state, {
                type: 'REAL',
                username: action.newState.user.name,
                mobile: action.newState.user.mobile,
                phone: action.newState.user.phone,
                email: action.newState.user.email,
                other_info: action.newState.user.other_info,
                token: action.newState.token,
                keep: action.newState.keep ? action.newState.keep : state.keep,
                is_admin: action.newState.user.is_admin,
                package: action.newState.user.package,
                impersonated: 'impersonated' in action.newState.user ? action.newState.user.impersonated : !!state.impersonated,
                transactions:[]
            })

        case SET_TOKEN:
            return assign({}, state, {
                token: action.newState.token ? action.newState.token : state.token
            });
        case UPDATE_USER:
            if (!_.isUndefined(action.newState.user.legal) && action.newState.user.legal === true) {
                return assign({}, state, {
                    type: 'LEGAL',
                    username: action.newState.user.other_info.org_name,
                    email: action.newState.user.email,
                    other_info: action.newState.user.other_info
                })
            } else {
                return assign({}, state, {
                    type: 'REAL',
                    username: action.newState.user.name,
                    email: action.newState.user.email,
                    phone: action.newState.user.phone,
                    mobile: action.newState.user.mobile,
                    other_info: action.newState.user.other_info
                })
            }
      case SET_TRANSACTIONS:
        return assign({}, state, {
          transactions: action.newState.invoices ? action.newState.invoices : []
        });
        case FREE:
            return {}
        default:
            return state
    }
}
