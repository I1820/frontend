import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';


export function toastAlerts(status, message) {
    console.log(status,message)
    if (status === true) {
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
                background: '#dbf2e3',
                color: '#28623c'
            }),
            progressClassName: css({
                background: '#28623c'
            })
        });
    } else {
        toast(message, {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: css({
                background: '#fee2e1',
                color: '#813838',
            }),
            progressClassName: css({
                background: '#813838'
            })
        });
    }
}