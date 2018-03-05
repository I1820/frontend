import React, { Component } from 'react';


class Spinner extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="spinner" style={{ display: this.props.display ? 'block' : 'none' }}></div>
        );
    }

}

export default Spinner;
