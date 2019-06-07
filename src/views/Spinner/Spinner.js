import React, {Component} from 'react'

class Spinner extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="spinner" style={{display: this.props.display ? 'block' : 'none'}}/>
        )
    }
}

export default Spinner
