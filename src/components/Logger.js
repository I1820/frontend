import React, { Component } from 'react'
import { Button, Card, CardBody, CardHeader, Col, Nav, NavItem, NavLink, Row, TabContent, TabPane, } from 'reactstrap'
import Loading from './Loading'
import { streamFetch } from '../api'
import classnames from 'classnames'

export default class Logger extends Component {

  constructor (props) {
    super(props)
    this.fetchLog = this.fetchLog.bind(this)
    this.toggleTab = this.toggleTab.bind(this)
    this.start = this.start.bind(this)
    this.stop = this.stop.bind(this)
    this.clear = this.clear.bind(this)
    this.renderLogLora = this.renderLogLora.bind(this)
    this.renderLogPlatform = this.renderLogPlatform.bind(this)
    this.state = {
      open: false,
      platform: {
        data: [],
        offset: 0,
      },
      lora: {
        data: [],
        offset: 0,
      },
      activeTab: 'platform',
      fetching: false
    }
  }

  componentDidMount () {
  }

  toggleTab (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  fetchLog () {
    if (!this.state.fetching && this.props.project) {
      this.setState({ fetching: true })
      if (this.state.activeTab === 'lora') {
        streamFetch(`/project/${this.props.project}/log?type=lora`, (response) => {
          if (response && response.result && response.result.logs) {
            this.setState({
              lora: { ...this.state.lora, data: response.result.logs },
              fetching: false,
            })
          }
        })
      } else {
        streamFetch(`/project/${this.props.project}/log`, (response) => {
          if (response && response.result && response.result.logs) {
            this.setState({
              platform: { ...this.state.platform, data: response.result.logs },
              fetching: false,
            })
          }
        })
      }
    }
  }

  componentWillUnmount () {
    // use intervalId from the state to clear the interval
    clearInterval(this.state.interval)
  }

  render () {

    let height = this.state.open ? '80%' : '35px'
    return (

      <div style={{
        zIndex: '10',
        left: '0',
        right: '200px',
        position: 'fixed',
        bottom: '0',
        textAlign: 'center',
        transition: '200ms',
        height
      }}>
        <button onClick={() => {
          this.setState({ open: !this.state.open })
        }} type="button" style={{ width: '100%' }}
                className="btn btn-primary"> {this.state.open ? 'بستن' : 'باز کردن'}
        </button>

        <Card className="text-justify" style={{ height: '100%', overflow: 'hidden' }}>
          <CardHeader style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={() => this.stop()} color="danger" style={{ marginRight: '5px' }}>توقف</Button>
            <Button onClick={() => this.start()} color="primary" style={{ marginRight: '5px' }}>شروع</Button>
            <Button onClick={() => this.clear()} style={{ marginRight: '5px' }}>پاک کردن</Button>
            <Loading size={'30px'} isOpen={this.state.interval}/>
          </CardHeader>
          <CardBody style={{
            height: 'calc(100% - 55px)',
            overflowY: 'scroll'
          }}>
            <Nav tabs>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'platform' })}
                  onClick={() => {
                    this.toggleTab('platform')
                  }}>پلتفرم</NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({ active: this.state.activeTab === 'lora' })}
                  onClick={() => {
                    this.toggleTab('lora')
                  }}>لورا</NavLink>
              </NavItem>

            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              <TabPane tabId={'platform'}>
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
              </TabPane>
              <TabPane tabId={'lora'}>
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
                  {this.renderLogLora()}
                </div>
              </TabPane>
            </TabContent>
          </CardBody>
        </Card>


      </div>

    )
  }

  renderLogPlatform () {
    const data = this.state.platform.data
    return (data.slice(0).reverse().map((data, key) => {
      return (
        <Row style={{ padding: 22 }} key={key}>
          <Col style={{ width: '20%' }}>
            {`${data.Time}`}
            <br/>
            {`${data.Job}`}
          </Col>
          <Col style={{ width: '80%' }}>
            <pre style={{ color: '#fff' }}>
            {data.Message}
            </pre>
          </Col>
        </Row>)
    }))
  }

  renderLogLora () {
    const data = this.state.lora.data
    return (data.slice(0).reverse().map((data, key) => {
      return (
        <Row style={{ padding: 22 }} key={key}>
          <Col style={{ width: '20%' }}>
            {`${data.type}`}
          </Col>
          <Col style={{ width: '80%' }}>
            <pre style={{ color: '#fff' }}>
            {data.error}
            </pre>
          </Col>

        </Row>)
    }))
  }

  start () {
    this.fetchLog()
    let interval = setInterval(this.fetchLog, 5000)
    this.setState({ interval })
  }

  stop () {
    clearInterval(this.state.interval)
    this.setState({
      interval: 0
    })
  }

  clear () {
    if (this.state.activeTab === 'lora') {
      this.setState({
        lora: { ...this.state.lora, data: [] },
      })
    } else {
      this.setState({
        platform: { ...this.state.platform, data: [] },
      })
    }
  }

}

