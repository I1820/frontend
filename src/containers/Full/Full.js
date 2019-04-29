import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom';
import {Container} from 'reactstrap';
import Header from '../../components/Header/';
import Sidebar from '../../components/Sidebar/';
import Breadcrumb from '../../components/Breadcrumb/';
import Aside from '../../components/Aside/';
import Footer from '../../components/Footer/';

import Dashboard from '../../views/Dashboard/';

import globalCodec from '../../views/globalCodec/GlobalCodecList'
import AddTemplate from '../../views/Editros/addGlobalTemplate'

// PackageManagment
import PackageList from '../../views/PackageManagement/PackageList'
import NewPackage from '../../views/PackageManagement/PackageManage'

// usersManagement
import UsersList from '../../views/UserPaymentManagment/UsersList'
import RoleList from '../../views/UserPaymentManagment/RoleList'
import UserInfo from '../../views/UserPaymentManagment/UserInfo'
import UserTransactions from '../../views/UserPaymentManagment/UsersTrancations'

import Gateways from '../../views/Gateways/Gateways';
import GatewaysNew from '../../views/Gateways/GatewaysNew';
import GatewaysView from '../../views/Gateways/GatewaysView';

import DeviceProfile from '../../views/DeviceProfile/DeviceProfile';
import DeviceProfileNew from '../../views/DeviceProfile/DeviceProfileNew';

import Profile from '../../views/Profile/';

import ProjectsList from '../../views/Projects/ProjectsList.js';
import ProjectsManage from '../../views/Projects/ProjectsManage.js';
import ProjectsView from '../../views/Projects/ProjectsView.js';

// Package
import MyPackages from '../../views/Packages/MyPckages'
import SelectedPackage from '../../views/Packages/SelectedPackage'
import Transactions from '../../views/Packages/Transactions'
import BuyedPackages from '../../views/Packages/BuyedPackage'

import ThingsExcel from '../../views/Things/ThingsExcel.js';
import ThingsList from '../../views/Things/ThingsList.js'
import CreateThing from '../../views/Things/CreateThing.js'

import addScenario from '../../views/Editros/addScenario'

import sendCodec from '../../views/Editros/sendCodec';
import addTemplate from '../../views/Editros/addTemplate';
import {ToastContainer} from 'react-toastify';
import AllTransactions from '../../views/AdminPayments/AllTransactions';
import PaymentPortalList from '../../views/PaymentPortalManagment/PaymentPortalList';
import AdminLinks from '../../views/Admin/AdminLinks';

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
                <Route path="/profile" name="Profile" component={Profile}/>

                <Route path="/admin/packages/show" name="PackageList" component={PackageList}/>
                <Route path="/admin/transactions" name="AllTransactions" component={AllTransactions}/>
                <Route path="/admin/users/list" name="UsersList" component={UsersList}/>
                <Route path="/admin/roles" name="RoleList" component={RoleList}/>

                <Route path="/admin/packages/new" name="NewPackage" component={NewPackage}/>
                <Route path="/admin/packages/edit/:id" name="EditPackage" component={NewPackage}/>
                <Route path="/admin/users/info/:user" name="UserInfo" component={UserInfo}/>

                <Route path="/transactions" name="UserTransactions" component={UserTransactions}/>

                <Route path="/gateways/new" name="GatewaysNew" component={GatewaysNew}/>
                <Route path="/gateways/view/:id" name="GatewaysView" component={GatewaysView}/>
                <Route path="/gateways" name="Gateways" component={Gateways}/>

                <Route path="/device-profile/new" name="DeviceProfileNew" component={DeviceProfileNew}/>
                <Route path="/device-profile/list/view/:id" name="ViewDeviceProfile" component={DeviceProfileNew}/>
                <Route path="/device-profile" name="DeviceProfile" component={DeviceProfile}/>

                <Route path="/scenario" name="addScenario" component={addScenario}/>
                <Route path="/codec" name="sendCodec" component={sendCodec}/>
                <Route path="/template" name="addTemplate" component={addTemplate}/>

                <Route path="/admin/globalCodec/edit/:id" name="AddTemplate" component={AddTemplate}/>
                <Route path="/admin/globalCodec/create" name="AddTemplate" component={AddTemplate}/>
                <Route path="/admin/globalCodec" name="globalCodec" component={globalCodec}/>

                <Route path="/admin/links" name="Adminlinks" component={AdminLinks}/>

                <Route path="/projects/manage/show/:id" name="ProjectsManage" component={ProjectsManage}/>
                <Route path="/projects/view/:id" name="ProjectsView" component={ProjectsView}/>
                <Route path="/projects" name="ProjectsList" component={ProjectsList}/>


                <Route path="/portals" name="portals" component={PaymentPortalList}/>
                <Route path="/packages" name="packages" component={MyPackages}/>
                <Route path="/selectedPackage/:id" name="selectedPackage" component={SelectedPackage}/>

                <Route path="/buyedPackages" name="BuyedPackages" component={BuyedPackages}/>

                <Route path="/things/excel" name="ThingsExcel" component={ThingsExcel}/>
                /*
                <Route path="/things/edit/:project_id/:thing_id" name="createThing" component={CreateThing}/>*/
                <Route path="/project/manage/createThing/:project_id" name="createThing" component={CreateThing}/>
                <Route path="/things" name="ThingsList" component={ThingsList}/>
                /*
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
