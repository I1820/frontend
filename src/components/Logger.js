import React, {Component} from 'react'
import {Button, Card, CardBody, CardHeader, Col, Row,} from 'reactstrap'
import Loading from './Loading'
import {streamFetch} from '../api'

export default class Logger extends Component {
    constructor(props) {
        super(props);
        this.fetchLog = this.fetchLog.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.clear = this.clear.bind(this);
        this.renderLogPlatform = this.renderLogPlatform.bind(this);
        this.state = {
            platform: {
                data: [],
                offset: 0,
            },
            fetching: false
        }
    }

    componentDidMount() {
    }

    fetchLog() {
        if (!this.state.fetching && this.props.project) {
            this.setState({fetching: true});
            streamFetch(`/project/${this.props.project}/log`, (response) => {
                if (response && response.result && response.result.logs) {
                    this.setState({
                        platform: {...this.state.platform, data: response.result.logs},
                        fetching: false,
                    })
                }
            })
        }
    }

    componentWillUnmount() {
        clearInterval(this.state.interval)
    }

    render() {
        return (
            <Card className="text-justify" style={{height: '100%', overflow: 'hidden'}}>
                <CardHeader style={{display: 'flex', alignItems: 'center'}}>
                    <Button onClick={() => this.stop()} color="danger" style={{marginRight: '5px'}}>توقف</Button>
                    <Button onClick={() => this.start()} color="primary" style={{marginRight: '5px'}}>شروع</Button>
                    <Button onClick={() => this.clear()} style={{marginRight: '5px'}}>پاک کردن</Button>
                    <Loading size={'30px'} isOpen={this.state.interval}/>
                </CardHeader>
                <CardBody style={{
                    height: 'calc(100% - 55px)',
                    overflowY: 'scroll'
                }}>
                    <div style={{
                        color: 'white',
                        direction: 'ltr',
                        textAlign: 'left',
                        padding: '10',
                        overflowY: 'scroll',
                        background: 'black',
                        margin: '10',
                        height: '100%'
                    }}>
                        {this.renderLogPlatform()}
                    </div>
                </CardBody>
            </Card>
        )
    }

    renderLogPlatform() {
        const data = this.state.platform.data;
        return (data.slice(0).reverse().map((data, key) => {
            return (
                <Row style={{padding: 22}} key={key}>
                    <Col style={{width: '20%'}}>
                        {`${data.Time}`}
                        <br/>
                        {`${data.Job}`}
                    </Col>
                    <Col style={{width: '80%'}}>
                        <pre style={{color: '#fff'}}>
                            {data.Message}
                        </pre>
                    </Col>
                </Row>)
        }))
    }

    start() {
        this.fetchLog();
        let interval = setInterval(this.fetchLog, 5000);
        this.setState({interval})
    }

    stop() {
        clearInterval(this.state.interval);
        this.setState({
            interval: 0
        })
    }

    clear() {
        this.setState({
            platform: {...this.state.platform, data: []},
        })
    }
}
