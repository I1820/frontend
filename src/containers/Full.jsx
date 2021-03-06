import React, {Component} from 'react'
import {Redirect, Route, Switch} from 'react-router-dom'
import {Container} from 'reactstrap'
import {ClipLoader} from 'react-spinners'

import Header from '../components/Header'
import Sidebar from '../components/Sidebar/Sidebar.jsx'
import Breadcrumb from '../components/Breadcrumb'
import Footer from '../components/Footer/Footer'

import Dashboard from '../views/Dashboard/Dashboard.jsx'

import globalCodec from '../views/globalCodec/GlobalCodecList'
import AddGlobalTemplate from '../views/Editros/AddGlobalTemplate'
// PackageManagement
import PackageList from '../views/PackageManagement/PackageList'
import PackageCreate from '../views/PackageManagement/PackageCreate'
import UserTransactions from '../views/Packages/Trancations'

// usersManagement
import UsersList from '../views/AdminUsers/UsersList'
import RoleList from '../views/AdminUsers/RoleList'
import UserInfo from '../views/AdminUsers/UserInfo'

import Gateways from '../views/Gateways'
import GatewaysNew from '../views/Gateways/GatewaysNew'
import GatewaysView from '../views/Gateways/GatewaysView'

import DeviceProfile from '../views/DeviceProfile'
import DeviceProfileNew from '../views/DeviceProfile/DeviceProfileNew'

import Profile from '../views/Profile'

import ProjectsList from '../views/Projects/ProjectsList'
import ProjectsManage from '../views/Projects/ProjectsManage.js'
import ProjectsView from '../views/Projects/ProjectsView.js'
// Package
import Packages from '../views/Packages/Packages'
import SelectedPackage from '../views/Packages/SelectedPackage'

import ThingsExcel from '../views/Things/ThingsExcel.js'
import ThingsList from '../views/Things'
import CreateThing from '../views/Things/CreateThing.js'

import addScenario from '../views/Editros/addScenario'

import sendCodec from '../views/Editros/sendCodec'
import addTemplate from '../views/Editros/addTemplate'
import AllTransactions from '../views/PackageManagement/AllTransactions'
import AdminLinks from '../views/Admin/AdminLinks'
import Project from "../views/Projects/Project";

import {connect} from "react-redux";

class Full extends Component {
    render() {
        return (
            <div className="app">
                <Header/>
                <div className="app-body">
                    <Sidebar {...this.props}/>
                    <main className="main">
                        <Breadcrumb/>
                        <Container fluid>
                            <ClipLoader
                                sizeUnit={"px"}
                                css={{
                                    position: 'absolute',
                                    display: 'block',
                                    margin: '0 auto',
                                    justifyContent: 'center',
                                    zIndex: 50,
                                }}
                                size={150}
                                color={'#123abc'}
                                loading={this.props.loading}
                            />
                            <Switch>
                                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                                <Route path="/profile" name="Profile" component={Profile}/>

                                <Route path="/admin/transactions" name="AllTransactions" component={AllTransactions}/>
                                <Route path="/admin/roles" name="RoleList" component={RoleList}/>

                                <Route path="/admin/packages/new" name="NewPackage" component={PackageCreate}/>
                                <Route path="/admin/packages/:id" name="EditPackage" component={PackageCreate}/>
                                <Route path="/admin/packages" name="PackageList" component={PackageList}/>

                                <Route path="/admin/users/:user" name="UserInfo" component={UserInfo}/>
                                <Route path="/admin/users" name="UsersList" component={UsersList}/>

                                <Route path="/transactions" name="UserTransactions" component={UserTransactions}/>

                                <Route path="/gateways/new" name="GatewaysNew" component={GatewaysNew}/>
                                <Route path="/gateways/:id" name="GatewaysView" component={GatewaysView}/>
                                <Route path="/gateways" name="Gateways" component={Gateways}/>

                                <Route path="/device-profiles/new" name="DeviceProfileNew" component={DeviceProfileNew}/>
                                <Route path="/device-profiles/:id" name="ViewDeviceProfile" component={DeviceProfileNew}/>
                                <Route path="/device-profiles" name="DeviceProfile" component={DeviceProfile}/>


                                <Route path="/admin/global-codecs/new" name="addTemplate" component={AddGlobalTemplate}/>
                                <Route path="/admin/global-codecs/:id" name="editTemplate" component={AddGlobalTemplate}/>
                                <Route path="/admin/global-codecs" name="globalCodec" component={globalCodec}/>

                                <Route path="/admin/links" name="Adminlinks" component={AdminLinks}/>

                                <Route path="/projects/:id/manage/templates/new" name="addTemplate" component={addTemplate}/>
                                <Route path="/projects/:id/manage/templates/:tid" name="editTemplate" component={addTemplate}/>
                                <Route path="/projects/:id/manage/scenarios/new" name="addScenario" component={addScenario}/>
                                <Route path="/projects/:id/manage/scenarios/:sid" name="editScenario" component={addScenario}/>
                                <Route path="/projects/:id/manage/things/new" name="createThing" component={CreateThing}/>
                                <Route path="/projects/:id/manage/things/:tid/codec" name="sendCodec" component={sendCodec}/>
                                <Route path="/projects/:id/manage/things/:tid" name="editThing" component={CreateThing}/>
                                <Route path="/projects/:id/manage" name="ProjectsManage" component={ProjectsManage}/>
                                <Route path="/projects/:id/view" name="ProjectsView" component={ProjectsView}/>
                                <Route path="/projects/:id" name="Project" component={Project}/>
                                <Route path="/projects" name="ProjectsList" component={ProjectsList}/>


                                <Route path="/packages/:id" name="Package" component={SelectedPackage}/>
                                <Route path="/packages" name="Packages" component={Packages}/>

                                <Route path="/things/excel" name="ThingsExcel" component={ThingsExcel}/>
                                <Route path="/things" name="ThingsList" component={ThingsList}/>
                                <Redirect from="/" to="/dashboard"/>
                            </Switch>
                        </Container>
                    </main>
                </div>
                <Footer/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending
    };
}


export default connect(mapStateToProps)(Full);
