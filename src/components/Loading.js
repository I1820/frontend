import React, { Component } from 'react';


export default class Loading extends Component {

    constructor(props) {
        super(props);
        this.size = props.size ? props.size : '40px';
    }

    render() {
        return (
            <div className={'sk-fading-circle'} style={{
                height: this.size,
                width: this.width,
                display: this.props.isOpen ? 'inline-block' : 'none'
            }}>
                <div className={'sk-circle1 sk-circle'}/>
                <div className={'sk-circle2 sk-circle'}/>
                <div className={'sk-circle3 sk-circle'}/>
                <div className={'sk-circle4 sk-circle'}/>
                <div className={'sk-circle5 sk-circle'}/>
                <div className={'sk-circle6 sk-circle'}/>
                <div className={'sk-circle7 sk-circle'}/>
                <div className={'sk-circle8 sk-circle'}/>
                <div className={'sk-circle9 sk-circle'}/>
                <div className={'sk-circle10 sk-circle'}/>
                <div className={'sk-circle11 sk-circle'}/>
                <div className={'sk-circle12 sk-circle'}/>
            </div>
        )
    }
}