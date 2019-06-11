import {FETCH_CODEC_LIST, FETCH_PROJECT, FREE, GET_PROJECTS} from '../constants/AppConstants'
import _ from 'underscore'

export function projectReducer(state = [], action) {
    switch (action.type) {
        case GET_PROJECTS:
            return [
                ...action.newState.projects
            ];
        case FETCH_PROJECT:
            if (_.find(state, {_id: action.newState.project._id}) !== undefined) {
                return state.map((currentItem) => {
                    if (action.newState.project._id === currentItem._id) {
                        return {
                            ...currentItem,
                            ...action.newState.project
                        };
                    } else {
                        return currentItem;
                    }
                })
            } else {
                let newState = state.slice();
                newState.splice(newState.length, 0, action.newState.project);
                return newState;
            }
        case FETCH_CODEC_LIST:
            if (_.find(state, {_id: action.id}) !== undefined) {
                return state.map((currentItem, index) => {
                    if (action.id === currentItem._id) {
                        currentItem['templates'] = action.newState.codecs;
                        return currentItem
                    } else {
                        return currentItem
                    }
                })
            }
            return [];
        case FREE:
            return [];
        default:
            return state
    }
}
