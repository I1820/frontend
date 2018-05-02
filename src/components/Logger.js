import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import { streamFetch } from '../api';

export default class Logger extends Component {


    componentDidMount() {
        let interval = setInterval(() => {
            streamFetch(`/project/${this.props.project}/log`, (response) => {
                if (response && response.result && response.result.logs)
                    this.setState({data: response.result.logs})
            })
        }, 5000)
        this.setState({interval})
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        clearInterval(this.state.interval);
    }


    constructor(props) {
        super(props)
        this.state = {
            open: false,
            data: []
        }
    }

    render() {

        let height = this.state.open ? '80%' : '10%'
        return (
            <div style={{
                width: '80%',
                height: '12%',

            }}>
                <div style={{
                    zIndex: '10',
                    width: '80%',
                    position: 'fixed',
                    bottom: '0',
                    textAlign: 'center',
                    height
                }}>
                    <button onClick={() => {
                        this.setState({open: !this.state.open})
                    }} type="button" style={{width: '100%'}}
                            className="btn btn-primary"> {this.state.open ? 'بستن' : 'باز کردن'}
                    </button>
                    <div style={{
                        color: 'white',
                        textAlign: 'left',
                        padding: '10',
                        overflowY: 'scroll',
                        background: 'black',
                        margin: '10',
                        height: '100%'
                    }}>
                        {this.renderLog()}
                    </div>
                </div>
            </div>

        )
    }

    renderLog() {
        return (this.state.data.slice(0).reverse().map((data, key) => {
            return (
                <Row style={{padding: 22}} key={key}>
                    <Col>
            <pre style={{color: '#fff'}}>
            {data.Message}
            </pre>
                    </Col>
                    <div style={{width: '20%'}}>
                        {`${data.Time}   ${data.job}`}
                    </div>
                </Row>)
        }))
    }

}

