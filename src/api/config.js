import store from '../store'

const getAuth = () => {
  return 'Bearer ' + store.getState().userReducer.token
}

module.exports.loginConfig = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}

module.exports.postConfig = () => ({
  method: 'POST',
  body: '',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

module.exports.putConfig = () => ({
    method: 'PUT',
    body: '',
    headers: {
        'Authorization': getAuth(),
        'Content-Type': 'application/x-www-form-urlencoded'
    }
})

module.exports.uploadConfig = () => ({
  method: 'POST',
  body: '',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'multipart/form-data'
  }
})

module.exports.getConfig = () => ({
  method: 'GET',
  headers: {
    'Authorization': getAuth()
  }
})

module.exports.patchConfig = () => ({
  method: 'PATCH',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})

module.exports.deleteConfig = () => ({
  method: 'DELETE',
  headers: {
    'Authorization': getAuth(),
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
