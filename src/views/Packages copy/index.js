import React, {Component} from "react";
import Packages from './Packages';
import Data from './packageData'

class PackagesPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            orders :[],
            packages: Data,
            loadThings: false,
            warning: false,
        };
    }

    render() {
        return (
            <div className="animated fadeIn">
             
              <Packages packages={this.state.packages} />
            </div>
        )
    }
}

export default PackagesPage;

