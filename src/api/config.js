import store from '../store'

const getAuth = () => {
  return 'Bearer ' + store.getState().userReducer.token
}

module.exports.loginConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/plain, */*'
  }
}

module.exports.postConfig = () => ({
  method: 'POST',
  body: '',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/plain, */*'
  }
})

module.exports.putConfig = () => ({
  method: 'PUT',
  body: '',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/plain, */*'
  }
})

module.exports.uploadConfig = () => ({
  method: 'POST',
  body: '',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'multipart/form-data',
    'Accept': 'application/json, text/plain, */*'
  }
})

module.exports.getConfig = () => ({
  method: 'GET',
  headers: {
    'Authorization': getAuth(),
    'Accept': 'application/json, text/plain, */*'
  }
})

module.exports.patchConfig = () => ({
  method: 'PATCH',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/plain, */*'
  }
})

module.exports.deleteConfig = () => ({
  method: 'DELETE',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json, text/plain, */*'
  }
})
