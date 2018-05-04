import React, { Component } from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table, Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import { connect } from 'react-redux';
import Select2 from 'react-select2-wrapper';
import { toastAlerts } from '../Shared/toast_alert';

import {
    deleteDashboardWidgetChartAction, getDashboardAction, getUserThingsAction,
    setDashboardWidgetChartAction
} from '../../actions/AppActions';
import moment from 'moment-jalaali';

const ReactHighcharts = require('react-highcharts');

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.renderCharts = this.renderCharts.bind(this)
        this.toggle = this.toggle.bind(this)
        this.refresh = this.refresh.bind(this)
        this.getThings = this.getThings.bind(this)
        this.renderCharts = this.renderCharts.bind(this)
        this.devEUI = ''
        this.state = {
            charts: {},
            modalToggle: {
                setWidgetChart: false,
                deleteWidgetChart: false,
            },
            things: [],
            selectedChart: 0,
            modal: false,
            widget: {
                window: 1
            }
        }
    }

    toggle(modal) {
        this.setState({modalToggle: {...this.state.modalToggle, [modal]: !this.state.modalToggle[modal]}})
    }

    componentDidMount() {
        this.getThings()
        this.refresh()
        let interval = setInterval(this.refresh, 5000)
        this.setState({
            interval
        })
    }


    componentWillUnmount() {
        clearInterval(this.state.interval)
    }


    render() {
        return (

            <div>

                <Modal isOpen={this.state.modalToggle.setWidgetChart} toggle={() => this.toggle('setWidgetChart')}
                       className="text-right">
                    <ModalHeader>افزونه جدید</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}> عنوان : </Label>
                                <Col sm={9}>
                                    <Input onChange={(event) => {
                                        this.setState({
                                            widget: {...this.state.widget, title: event.target.value}
                                        })
                                    }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> شی : </Label>
                                <Col sm={9}>
                                    <Select2
                                        style={{width: '100%'}}
                                        value={this.devEUI}
                                        data={this.state.things.map((thing) => {
                                            return {text: thing.name, id: thing.dev_eui}
                                        })}
                                        ref="tags"
                                        onSelect={(event) => {
                                            this.devEUI = event.target.value
                                        }}
                                        options={
                                            {
                                                placeholder: 'شی مورد نظر را انتخاب کنید',
                                            }
                                        }
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> کلید : </Label>
                                <Col sm={9}>
                                    <Input onChange={(event) => {
                                        this.setState({
                                            widget: {...this.state.widget, key: event.target.value}
                                        })
                                    }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}> بازه زمانی:</Label>
                                <Col sm={9}>
                                    <Input type="select" onChange={(event) => {
                                        this.setState({
                                            widget: {...this.state.widget, window: event.target.value}
                                        })
                                    }}>
                                        <option value={1}>یک ساعت اخیر</option>
                                        <option value={5}>5 ساعت اخیر</option>
                                        <option value={10}>10 ساعت اخیر</option>
                                        <option value={24}>یک روز اخیر</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggle('setWidgetChart')
                            this.props.dispatch(setDashboardWidgetChartAction({
                                ...this.state.widget,
                                devEUI: this.devEUI
                            }, null, toastAlerts))
                            this.refresh()
                        }}>ارسال</Button>
                        <Button color="danger" onClick={() => this.toggle('setWidgetChart')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalToggle.deleteWidgetChart} toggle={() => this.toggle('deleteWidgetChart')}
                       className="text-right">
                    <ModalHeader>حذف نمودار</ModalHeader>
                    <ModalBody>
                        <h4>آیا از حذف نمودار مطمئن هستید ؟</h4>
                        <br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.props.dispatch(deleteDashboardWidgetChartAction(this.state.selectedChart, toastAlerts));
                            this.toggle('deleteWidgetChart')
                            this.refresh()
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle('deleteWidgetChart')}>انصراف</Button>
                    </ModalFooter>
                </Modal>


                <div className="row">
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-primary">
                            <CardBody className="pb-0">
                                <h4 className="mb-0 h3 font-weight-bold">{this.state.project_num}</h4>
                                <p>پروژه ثبت شده است</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-white bg-info">
                            <CardBody className="pb-0">
                                <h4 className="mb-0 h3 font-weight-bold">{this.state.thing_num}</h4>
                                <p>شی ثبت شده است</p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggle('setWidgetChart')
                        }}>افزونه جدید</Button>
                    </Col>
                </div>
                <div className="row">
                    {
                        this.renderCharts()
                    }
                </div>
            </div>

        );

    }


    renderCharts() {

        return (
            Object.keys(this.state.charts).map((key) => {
                if (this.state.charts[key].data === undefined)
                    return;
                let config = {
                    plotOptions: {
                        line: {
                            animation: false
                        }
                    },
                    chart: {
                        style: {
                            fontFamily: 'Tahoma'
                        }
                    },
                    title: {
                        text: ''
                    },
                    xAxis: {
                        categories: []
                    },
                    yAxis: {
                        title: {
                            text: 'مقدار'
                        }
                    },
                    series: [{
                        data: []
                    }],
                    credits: {
                        enabled: false
                    },
                }

                config.series[0].data = []
                config.series[0].name = this.state.charts[key].title
                config.series[0].label = this.state.charts[key].title
                this.state.charts[key].data.map((d) => {
                    config.xAxis.categories.push(moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'))
                    config.series[0].data.push(d.value)
                    config.series[0].name = key

                })


                return (
                    <div className="col-md-12 col-lg-6" key={key}>
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle
                                    className="mb-0 font-weight-bold h6">{this.state.charts[key].title}</CardTitle>
                            </CardHeader>
                            <CardBody>
                                {/*<Line data={mainChart} options={mainChartOpts} height={300}/>*/}
                                <ReactHighcharts config={config}/>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => {
                                    this.setState({selectedChart: key}, () => this.toggle('deleteWidgetChart'))
                                }} color="danger">حذف</Button>
                            </CardFooter>
                        </Card>
                    </div>
                )
            })
        )
    }

    refresh() {
        this.props.dispatch(getDashboardAction((data) => {
            this.setState({
                charts: data.charts,
                project_num: data.project_num,
                thing_num: data.things_num,
            })
        }))
    }

    getThings() {
        this.props.dispatch(getUserThingsAction((data) => {
            this.setState({
                things: data.things
            })
        }))
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(Dashboard);
