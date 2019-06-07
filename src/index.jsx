import React from 'react'
import ReactDOM from 'react-dom'
import {HashRouter, Redirect, Route, Switch} from 'react-router-dom'
// Redux provider
import {Provider} from 'react-redux'
//Redux Store
import store from './store/index'
// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css'
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css'
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css'
// Import Main styles for this application
import './scss/style.scss'
// Temp fix for reactstrap
import './scss/core/_dropdown-menu-right.scss'
// Toasts
import {toast} from 'react-toastify'
// Containers
import Full from './containers/Full.jsx'
// Views
import Login from './views/Login/Login'
import Register from './views/Register/Register'
import SuccessPayment from './views/Packages/SuccessPayment'
import FailurePayment from './views/Packages/FailurePayment'
import AutoLogin from './views/Login/AutoLogin'

function PrivateRoute({component: Component, ...rest}) {
    let {loggedIn} = store.getState().homeReducer;
    return (
        <Route
            {...rest}
            render={(props) => loggedIn === true
                ? <Component {...props} />
                : <Redirect to={{pathname: '/login', state: {from: props.location}}}/>}
        />
    )
}

function LoginRoute({component: Component, authed, ...rest}) {
    let {loggedIn} = store.getState().homeReducer;
    console.log(store.getState());
    return (
        <Route
            {...rest}
            render={(props) => loggedIn === true
                ? <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                : <Component {...props} />}
        />
    )
}

function RegisterRoute({component: Component, authed, ...rest}) {
    let {loggedIn} = store.getState().homeReducer;
    return (
        <Route
            {...rest}
            render={(props) => loggedIn === true
                ? <Redirect to={{pathname: '/', state: {from: props.location}}}/>
                : <Component {...props} />}
        />
    )
}

toast.configure({
    position: 'bottom-right',
    rtl: true,
    style: {
        fontFamily: 'Vazir',
        textAlign: 'right',
    }
});

ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <LoginRoute exact path="/login" name="Login Page" component={Login}/>
                <RegisterRoute exact path="/register" name="Register Page" component={Register}/>
                <Route path="/payment/success/" name="SuccessPayment" component={SuccessPayment}/>
                <Route path="/payment/failure/" name="FailurePayment" component={FailurePayment}/>
                <Route path="/auto-login/:token/" name="autoLogin" component={AutoLogin}/>
                <PrivateRoute path="/" name="Home" component={Full}/>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'));
