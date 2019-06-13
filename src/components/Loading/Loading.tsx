import React, {Component} from 'react'
import {Spinner} from "reactstrap";
import './Loading.css'

interface IProp {
    display: boolean;
}

export default class Loading extends Component<IProp> {
    render() {
        return (
            <div className="loading" style={{display: this.props.display ? 'block' : 'none'}}>
                <Spinner style={{ width: '10rem', height: '10rem' }} type="grow" />
            </div>
        )
    }
}
