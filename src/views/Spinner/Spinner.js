import React, {Component} from 'react'

class Spinner extends Component {
    render() {
        return (
            <div className="spinner" style={{display: this.props.display ? 'block' : 'none'}}/>
        )
    }
}

export default Spinner
