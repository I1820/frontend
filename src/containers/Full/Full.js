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
import ShowPackages from '../../views/Packages'
import SelectedPackage from '../../views/Packages/SelectedPackage'
import SuccessPayment from '../../views/Packages/SuccessPayment'
import UnSuccessPayment from '../../views/Packages/FailurePayment'
import Transactions from '../../views/Packages/Transactions'
import BuyedPackages from '../../views/Packages/BuyedPackage'

import ThingsExcel from '../../views/Things/ThingsExcel.js';
import ThingsList from '../../views/Things/ThingsList.js'
import CreateThing from '../../views/Things/CreateThing.js'

import addScenario from '../../views/Scenario/addScenario'

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
              <Switch>
                <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                <Route path="/news" name="News" component={News}/>
                <Route path="/profile" name="Profile" component={Profile}/>
                <Route path="/gateways/new" name="GatewaysNew" component={GatewaysNew}/>
                <Route path="/gateways/list" name="Gateways" component={Gateways}/>
                <Route path="/gateways/view" name="GatewaysView" component={GatewaysView}/>
                <Route path="/device-profile/list" name="DeviceProfile" component={DeviceProfile}/>
                <Route path="/device-profile/new" name="DeviceProfileNew" component={DeviceProfileNew}/>
                <Route path="/scenario/new" name="addScenario" component={addScenario}/>
                <Route path="/projects/list" name="ProjectsList" component={ProjectsList}/>
                <Route path="/projects/manage" name="ProjectsManage" component={ProjectsManage}/>
                <Route path="/projects/view" name="ProjectsView" component={ProjectsView}/>

                <Route path="/packages" name="packages" component={ShowPackages}/>
                <Route path="/selectedPackage/" name="selectedPackage" component={SelectedPackage}/>
                <Route path="/paymentResult/S/" name="SuccessPayment" component={SuccessPayment}/>
                <Route path="/paymentResult/F/" name="UnSuccessPayment" component={UnSuccessPayment}/>
                <Route path="/transactions" name="Transactions" component={Transactions}/>
                <Route path="/buyedPackages" name="BuyedPackages" component={BuyedPackages}/>

                <Route path="/things/excel" name="ThingsExcel" component={ThingsExcel}/>
                <Route path="/things/new" name="ThingsExcel" component={CreateThing}/>
                <Route path="/things/list" name="ThingsList" component={ThingsList}/>
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
                <Route path="/buttons/button-dropdowns" name="ButtonDropdowns" component={ButtonDropdowns}/>
                <Route path="/buttons/button-groups" name="ButtonGroups" component={ButtonGroups}/>
                <Route path="/buttons/social-buttons" name="Social Buttons" component={SocialButtons}/>
                <Route path="/icons/flags" name="Flags" component={Flags}/>
                <Route path="/icons/font-awesome" name="Font Awesome" component={FontAwesome}/>
                <Route path="/icons/simple-line-icons" name="Simple Line Icons" component={SimpleLineIcons}/>
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
