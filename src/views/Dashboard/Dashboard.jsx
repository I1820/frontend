import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row
} from 'reactstrap'
import {AvFeedback, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'
import {Link} from 'react-router-dom'
import Widget from './Widget'

import {connect} from 'react-redux'
import Select2 from 'react-select2-wrapper'
import {toastAlerts} from '../Shared/toast_alert'

import {
    deleteDashboardWidgetChartAction,
    getDashboardAction,
    getUserThingsAction,
    setDashboardWidgetChartAction
} from '../../actions/AppActions'
import {toPersianNumbers} from '../Shared/persian'


class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.refresh = this.refresh.bind(this);
        this.getThings = this.getThings.bind(this);
        this.renderWidgets = this.renderWidgets.bind(this);
        this.devEUI = '';
        this.state = {
            loading: false,
            first_loading: true,
            get_key: true,
            fetching: false,
            charts: {},
            modalToggle: {
                setWidgetChart: false,
                deleteWidgetChart: false,
            },
            things: [],
            aliases: [],
            selectedChart: 0,
            thing_num: 0,
            project_num: 0,
            modal: false,
            widget: {
                type: 'line',
                window: 1
            }
        }
    }

    toggle(modal) {
        this.setState({
            location: false,
            modalToggle: {...this.state.modalToggle, [modal]: !this.state.modalToggle[modal]}
        })
    }

    componentDidMount() {
        this.getThings();
        this.refresh()
    }

    componentWillUnmount() {
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.modalToggle.setWidgetChart}
                       toggle={() => {
                           this.toggle('setWidgetChart');
                           this.setState({
                               widget: {
                                   type: 'line',
                                   window: 1
                               }
                           })
                       }}
                       className="text-right">
                    <ModalHeader>افزونه جدید</ModalHeader>
                    <ModalBody>
                        <AvForm>
                            <AvGroup row>
                                <Label sm={3}> عنوان : </Label>
                                <Col sm={9}>
                                    <AvInput name={'name'}
                                             onChange={(event) => {
                                                 this.setState({
                                                     widget: {...this.state.widget, title: event.target.value}
                                                 })
                                             }}
                                             type="text"
                                             required/>
                                    <AvFeedback>الزامی است</AvFeedback>
                                </Col>
                            </AvGroup>
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
                            <AvGroup style={{display: this.state.location ? 'none' : 'flex'}} row>
                                <Label sm={3}> alias : </Label>
                                <Col sm={9}>
                                    <Input type="select" onChange={(event) => {
                                        if (event.target.value !== 'ENTER_KEY') {
                                            let aliasSelect = '';
                                            this.state.aliases.forEach((alias) => {
                                                if (Object.keys(alias)[0] === event.target.value) {
                                                    aliasSelect = alias[Object.keys(alias)[0]]
                                                }
                                            });
                                            this.setState({
                                                widget: {
                                                    ...this.state.widget,
                                                    key: event.target.value,
                                                    alias: aliasSelect
                                                },
                                                get_key: false,

                                            })
                                        } else {
                                            this.setState({
                                                widget: {...this.state.widget, key: '', alias: ''},
                                                get_key: true,
                                                alias: event.target.name
                                            })
                                        }
                                    }}>{
                                        <option value={'ENTER_KEY'}>ورود کلید</option>
                                    }
                                        {
                                            this.state.aliases.map((alias, index) => {
                                                return (
                                                    <option key="index"
                                                            value={Object.keys(alias)[0]}>{alias[Object.keys(alias)[0]]}</option>)
                                            })
                                        }
                                    </Input>
                                </Col>
                            </AvGroup>
                            <AvGroup style={{display: this.state.location || !this.state.get_key ? 'none' : 'flex'}}
                                     row>
                                <Label sm={3}> کلید : </Label>
                                <Col sm={9}>
                                    <AvInput name={'key'}
                                             onChange={(event) => {
                                                 this.setState({
                                                     widget: {...this.state.widget, key: event.target.value}
                                                 })
                                             }}
                                             type="text"
                                             required/>
                                    <AvFeedback>الزامی است</AvFeedback>
                                </Col>
                            </AvGroup>
                            <FormGroup style={{display: this.state.location ? 'none' : 'flex'}} row>
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
                            <FormGroup row>
                                <Label sm={3}> نوع افزونه:</Label>
                                <Col sm={9}>
                                    <Input type="select" onChange={(event) => {
                                        this.setState({
                                            widget: {...this.state.widget, type: event.target.value}
                                        })
                                    }}>
                                        <option value={'line'}>نمودار خطی</option>
                                        <option value={'table'}>جدول</option>
                                    </Input>
                                </Col>
                            </FormGroup>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.setState({loading: true});
                            this.toggle('setWidgetChart');
                            this.props.dispatch(setDashboardWidgetChartAction({
                                ...this.state.widget,
                                devEUI: this.devEUI
                            }, null, (a, v) => {
                                this.setState({loading: false});
                                toastAlerts(a, v)
                            }));
                            this.setState({widget: {type: 'line', window: 1}});
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
                            this.toggle('deleteWidgetChart');
                            this.refresh()
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle('deleteWidgetChart')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Row>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-right">
                            <CardBody className="p-3 d-flex align-items-center">
                                <i className="icon-layers bg-info p-3 font-2xl ml-3"></i>
                                <div>
                                    <div
                                        className="text-value-sm text-info">{toPersianNumbers(this.state.project_num)}</div>
                                    <div className="text-muted text-uppercase font-weight-bold small">پروژه ثبت شده
                                        است
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <Link to="/projects"><Button color="link" block
                                                             className="text-muted d-flex justify-content-between align-items-center"
                                >
                                    <span className="small font-weight-bold">پروژه‌ها</span>
                                    <i className="fa fa-angle-left"></i>
                                </Button></Link>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col xs="12" sm="6" lg="3">
                        <Card className="text-right">
                            <CardBody className="p-3 d-flex align-items-center">
                                <i className="icon-screen-smartphone bg-danger p-3 font-2xl ml-3"></i>
                                <div>
                                    <div
                                        className="text-value-sm text-danger">{toPersianNumbers(this.state.thing_num)}</div>
                                    <div className="text-muted text-uppercase font-weight-bold small">شی ثبت شده است
                                    </div>
                                </div>
                            </CardBody>
                            <CardFooter>
                                <Link to="/things"><Button color="link" block
                                                           className="text-muted d-flex justify-content-between align-items-center"
                                >
                                    <span className="small font-weight-bold">اشیا</span>
                                    <i className="fa fa-angle-left"></i>
                                </Button></Link>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggle('setWidgetChart')
                        }}>افزونه جدید</Button>
                    </Col>
                </Row>
                <Row>
                    {this.renderWidgets()}
                </Row>
            </div>
        )
    }

    renderWidgets() {
        return (
            Object.keys(this.state.charts).map((key) => {
                return (
                    <Col sm="6" key={key}>
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle
                                    className="mb-0 font-weight-bold h6">{this.state.title}</CardTitle>
                            </CardHeader>
                            <Widget chart={this.state.charts[key]}/>
                            <CardFooter>
                                <Button onClick={() => {
                                    this.setState({selectedChart: key}, () => this.toggle('deleteWidgetChart'))
                                }} color="danger">حذف</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                )
            })
        )
    }

    refresh() {
        if (this.state.fetching === true) {
            return
        }
        this.setState({
            fetching: true,
        });
        this.props.dispatch(getDashboardAction((data) => {
            this.setState({
                charts: data.charts,
                project_num: data.project_num,
                thing_num: data.things_num,
                fetching: false,
                first_loading: false
            })
        }))
    }

    getThings() {
        this.props.dispatch(getUserThingsAction(1, (data) => {
            this.setState({
                aliases: data.aliases,
                things: data.things
            })
        }))
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps)(Dashboard);
