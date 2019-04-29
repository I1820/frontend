import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

// Redux provider
import { Provider } from 'react-redux';

//Redux Store
import store from './store/index'

// Styles
// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import '../scss/style.scss'
// Temp fix for reactstrap
import '../scss/core/_dropdown-menu-right.scss'

// Containers
import Full from './containers/Full/'

// Views
import Login from './views/Pages/Login/Login'
import Register from './views/Pages/Register/'
import Page404 from './views/Pages/Page404/'
import Page500 from './views/Pages/Page500/'
import SuccessPayment from './views/Packages/SuccessPayment'
import FailurePayment from './views/Packages/FailurePayment'
import AutoLogin from './views/Pages/Login/AutoLogin';


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
    console.log(store.getState())
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


ReactDOM.render((
    <Provider store={store}>
        <HashRouter>
            <Switch>
                <LoginRoute exact path="/login" name="Login Page" component={Login}/>
                <RegisterRoute exact path="/register" name="Register Page" component={Register}/>
                <Route exact path="/404" name="Page 404" component={Page404}/>
                <Route exact path="/500" name="Page 500" component={Page500}/>
                <Route path="/payment/success/" name="SuccessPayment" component={SuccessPayment}/>
                <Route path="/payment/failure/" name="FailurePayment" component={FailurePayment}/>
                <Route path="/auto-login/:token/" name="autoLogin" component={AutoLogin}/>
                <PrivateRoute path="/" name="Home" component={Full}/>
            </Switch>
        </HashRouter>
    </Provider>
), document.getElementById('root'));
