import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';

import News from '../../views/News/';

//Payment Portal Managment
import PaymentPortalManagment from '../../views/PaymentPortalManagment/PamentPortalList.js'

import globalCodec from '../../views/globalCodec/GlobalCodecList'
import AddTemplate from '../../views/Editros/addGlobalTemplate'

//PackageManagment
import PackageList from '../../views/PackageManagement/PackageList'
import NewPackage from '../../views/PackageManagement/PackageManage'
//usersManagement
import UsersList from '../../views/UserPaymentManagment/UsersList'
import RoleList from '../../views/UserPaymentManagment/RoleList'
import UserInfo from '../../views/UserPaymentManagment/UserInfo'
import UserTransactions from '../../views/UserPaymentManagment/UsersTrancations'

import Gateways from '../../views/Gateways/Gateways.js';
import GatewaysNew from '../../views/Gateways/GatewaysNew.js';
import GatewaysView from '../../views/Gateways/GatewaysView.js';

import DeviceProfile from '../../views/DeviceProfile/DeviceProfile.js';
import DeviceProfileNew from '../../views/DeviceProfile/DeviceProfileNew.js';

import Profile from '../../views/Profile/';

import ProjectsList from '../../views/Projects/ProjectsList.js';
import ProjectsManage from '../../views/Projects/ProjectsManage.js';
import ProjectsView from '../../views/Projects/ProjectsView.js';

//package
import MyPackages from '../../views/Packages/MyPckages'
import SelectedPackage from '../../views/Packages/SelectedPackage'
import Transactions from '../../views/Packages/Transactions'
import BuyedPackages from '../../views/Packages/BuyedPackage'

import ThingsExcel from '../../views/Things/ThingsExcel.js';
import ThingsList from '../../views/Things/ThingsList.js'
import CreateThing from '../../views/Things/CreateThing.js'

import addScenario from '../../views/Editros/addScenario'

import Colors from '../../views/Theme/Colors/';
import Typography from '../../views/Theme/Typography/';

import Charts from '../../views/Charts/';
import Widgets from '../../views/Widgets/';

// Base
import Cards from '../../views/Base/Cards/';
import Forms from '../../views/Base/Forms/';
import Switches from '../../views/Base/Switches/';
import Tables from '../../views/Base/Tables/';
import Tabs from '../../views/Base/Tabs/';
import Breadcrumbs from '../../views/Base/Breadcrumbs/';
import Carousels from '../../views/Base/Carousels/';
import Collapses from '../../views/Base/Collapses/';
import Dropdowns from '../../views/Base/Dropdowns/';
import Jumbotrons from '../../views/Base/Jumbotrons/';
import ListGroups from '../../views/Base/ListGroups/';
import Navbars from '../../views/Base/Navbars/';
import Navs from '../../views/Base/Navs/';
import Paginations from '../../views/Base/Paginations/';
import Popovers from '../../views/Base/Popovers/';
import ProgressBar from '../../views/Base/ProgressBar/';
import Tooltips from '../../views/Base/Tooltips/';

// Buttons
import Buttons from '../../views/Buttons/Buttons/';
import ButtonDropdowns from '../../views/Buttons/ButtonDropdowns/';
import ButtonGroups from '../../views/Buttons/ButtonGroups/';
import SocialButtons from '../../views/Buttons/SocialButtons/';

// Icons
import Flags from '../../views/Icons/Flags/';
import FontAwesome from '../../views/Icons/FontAwesome/';
import SimpleLineIcons from '../../views/Icons/SimpleLineIcons/';

// Notifications
import Alerts from '../../views/Notifications/Alerts/';
import Badges from '../../views/Notifications/Badges/';
import Modals from '../../views/Notifications/Modals/';
import sendCodec from '../../views/Editros/sendCodec';
import addTemplate from '../../views/Editros/addTemplate';
import {ToastContainer} from 'react-toastify';
import AllTransactions from '../../views/AdminPayments/AllTransactions';

class Full extends Component {
  render() {
    return (
      <div className="app">
        <ToastContainer className="text-right"/>
        <Header/>
        <div className="app-body">
          <Sidebar {...this.props}/>
          <main className="main">
            <Breadcrumb/>
            <Container fluid>
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/news" name="News" component={News}/>
                <Route path="/profile" name="Profile" component={Profile}/>

                <Route path="/admin/packages" name="PackageList" component={PackageList}/>
                <Route path="/admin/transactions" name="AllTransactions" component={AllTransactions}/>
                <Route path="/admin/users" name="UsersList" component={UsersList}/>
                <Route path="/admin/roles" name="RoleList" component={RoleList}/>

                <Route path="/package/new" name="NewPackage" component={NewPackage}/>
                <Route path="/package/:id" name="EditPackage" component={NewPackage}/>
                <Route path="/admin/user/info/:user" name="UserInfo" component={UserInfo}/>

                <Route path="/transactions" name="UserTransactions" component={UserTransactions}/>

                <Route path="/gateways/new" name="GatewaysNew" component={GatewaysNew}/>
                <Route path="/gateways/view/:id" name="GatewaysView" component={GatewaysView}/>
                <Route path="/gateways" name="Gateways" component={Gateways}/>

                <Route path="/device-profile/new" name="DeviceProfileNew" component={DeviceProfileNew}/>
                <Route path="/device-profile/view/:id" name="ViewDeviceProfile" component={DeviceProfileNew}/>
                <Route path="/device-profile" name="DeviceProfile" component={DeviceProfile}/>

                <Route path="/scenario" name="addScenario" component={addScenario}/>
                <Route path="/codec" name="sendCodec" component={sendCodec}/>
                <Route path="/template" name="addTemplate" component={addTemplate}/>

                <Route path="/admin/globalCodec/edit/:id" name="AddTemplate" component={AddTemplate}/>
                <Route path="/admin/globalCodec/create" name="AddTemplate" component={AddTemplate}/>
                <Route path="/admin/globalCodec" name="globalCodec" component={globalCodec}/>

                <Route path="/projects/manage/:id" name="ProjectsManage" component={ProjectsManage}/>
                <Route path="/projects/view/:id" name="ProjectsView" component={ProjectsView}/>
                <Route path="/projects" name="ProjectsList" component={ProjectsList}/>


                <Route path="/packages" name="packages" component={MyPackages}/>
                <Route path="/selectedPackage/:id" name="selectedPackage" component={SelectedPackage}/>

                <Route path="/buyedPackages" name="BuyedPackages" component={BuyedPackages}/>

                <Route path="/things/excel" name="ThingsExcel" component={ThingsExcel}/>
                <Route path="/things/edit/:project_id/:thing_id" name="createThing" component={CreateThing}/>
                <Route path="/things/new/:project_id" name="createThing" component={CreateThing}/>
                <Route path="/things" name="ThingsList" component={ThingsList}/>


                <Route path="/payment-portal/management" name="PaymentPortalManagment"
                       component={PaymentPortalManagment}/>
                <Route path="/theme/colors" name="Colors" component={Colors}/>
                <Route path="/theme/typography" name="Typography" component={Typography}/>
                <Route path="/base/cards" name="Cards" component={Cards}/>
                <Route path="/base/forms" name="Forms" component={Forms}/>
                <Route path="/base/switches" name="Swithces" component={Switches}/>
                <Route path="/base/tables" name="Tables" component={Tables}/>
                <Route path="/base/tabs" name="Tabs" component={Tabs}/>
                <Route path="/base/breadcrumbs" name="Breadcrumbs" component={Breadcrumbs}/>
                <Route path="/base/carousels" name="Carousels" component={Carousels}/>
                <Route path="/base/collapses" name="Collapses" component={Collapses}/>
                <Route path="/base/dropdowns" name="Dropdowns" component={Dropdowns}/>
                <Route path="/base/jumbotrons" name="Jumbotrons" component={Jumbotrons}/>
                <Route path="/base/list-groups" name="ListGroups" component={ListGroups}/>
                <Route path="/base/navbars" name="Navbars" component={Navbars}/>
                <Route path="/base/navs" name="Navs" component={Navs}/>
                <Route path="/base/paginations" name="Paginations" component={Paginations}/>
                <Route path="/base/popovers" name="Popovers" component={Popovers}/>
                <Route path="/base/progress-bar" name="Progress Bar" component={ProgressBar}/>
                <Route path="/base/tooltips" name="Tooltips" component={Tooltips}/>
                <Route path="/buttons/buttons" name="Buttons" component={Buttons}/>
                <Route path="/buttons/button-dropdowns" name="ButtonDropdowns"
                       component={ButtonDropdowns}/>
                <Route path="/buttons/button-groups" name="ButtonGroups" component={ButtonGroups}/>
                <Route path="/buttons/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/icons/flags" name="Flags" component={Flags}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons"
                       component={SimpleLineIcons}/>
                <Route path="/notifications/alerts" name="Alerts" component={Alerts}/>
                <Route path="/notifications/badges" name="Badges" component={Badges}/>
                <Route path="/notifications/modals" name="Modals" component={Modals}/>
                <Route path="/widgets" name="Widgets" component={Widgets}/>
                <Route path="/charts" name="Charts" component={Charts}/>
                <Redirect from="/" to="/dashboard"/>
              </Switch>
            </Container>
          </main>
          <Aside/>
        </div>
        <Footer/>
      </div>
    );
  }
}

export default Full;
