import {toast} from 'react-toastify'

export function toastAlerts(status, message) {
    if (status === true) {
        toast(message, {
            type: toast.TYPE.SUCCESS
        })
    } else {
        toast(message, {
            type: toast.TYPE.ERROR
        })
    }
}
