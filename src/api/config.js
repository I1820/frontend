import store from '../store'

function getAuth() {
    return 'Bearer ' + store.getState().userReducer.access_token
}

export const refreshConfig = () => ({
    method: 'PUT',
    body: '',
    headers: {
        'Authorization': 'Bearer ' + store.getState().userReducer.refresh_token,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }

});

export const loginConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
};

export const postConfig = () => ({
    method: 'POST',
    body: '',
    headers: {
        'Authorization': getAuth(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
});

export const putConfig = () => ({
    method: 'PUT',
    body: '',
    headers: {
        'Authorization': getAuth(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
});

export const uploadConfig = () => ({
    method: 'POST',
    body: '',
    headers: {
        'Authorization': getAuth(),
        'Content-Type': 'multipart/form-data',
        'Accept': 'application/json'
    }
});

export const getConfig = () => ({
    method: 'GET',
    headers: {
        'Authorization': getAuth(),
        'Accept': 'application/json'
    }
});

export const patchConfig = () => ({
    method: 'PATCH',
    headers: {
        'Authorization': getAuth(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
});

export const deleteConfig = () => ({
    method: 'DELETE',
    headers: {
        'Authorization': getAuth(),
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    }
});
