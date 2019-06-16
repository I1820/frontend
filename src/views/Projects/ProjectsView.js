import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Form,
    FormGroup,
    Input,
    Label,
    Row
} from 'reactstrap'

import _ from 'underscore'

import ReactHighcharts from 'react-highcharts'
import moment from 'moment-jalaali'
import JSONPretty from 'react-json-pretty'
import {DownloadThingsDataExcelAction, getProject, getThingsMainDataAction} from '../../actions/AppActions'
import {toast} from 'react-toastify'
import {connect} from 'react-redux'
import {DateTimeRangePicker} from 'react-advance-jalaali-datepicker'
import Select from 'react-select'
import ReactTable from 'react-table'
import Loading from '../../components/Loading'
import randomColor from 'randomcolor'
import './project.css'

class ProjectsView extends Component {
    constructor(props) {
        super(props);
        this.setThing = this.setThing.bind(this);
        this.renderPeriodPicker = this.renderPeriodPicker.bind(this);
        this.renderTimePicker = this.renderTimePicker.bind(this);
        this.getData = this.getData.bind(this);
        this.draw = this.draw.bind(this);
        this.downloadExcel = this.downloadExcel.bind(this);
        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);

        this.state = {
            draw: false,
            pages: 1,
            pageSize: 10,
            loading: false,
            type: 'area',
            selectedThing: {ids: [], options: []},
            period: 5000,
            project: {
                things: [],
                _id: this.props.match.params['id']
            },
            auto: false,
            config: {},
            data: [],
            tableData: [],
            keys: [],
            visible: [],
            excelParams: {
                things: '',
                projectId: '',
                offset: '',
                limit: '',
                since: ''
            }
        }

        // highchart initial configuration
        this.state.config = {
            chart: {
                zoomType: 'x',
                style: {
                    fontFamily: 'Vazir'
                }
            },
            plotOptions: {
                series: {
                    connectNulls: true
                }
            },
            time: {
                useUTC: false,
            },
            title: {
                text: 'داده‌های دریافتی'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'مقدار'
                }
            },
            credits: {
                enabled: true
            },
            tooltip: {
                backgroundColor: 'lightgray',
                borderColor: '#7CB5EC',
                borderRadius: 10,
                borderWidth: 3,
                useHTML: true,
                formatter: function () {
                    const res =
                        '<div>' +
                        '<div style="text-align: center;direction: rtl">' + this.point.name + '</div>' +
                        '<div style="text-align: center">' + this.series.name +
                        ': <span style="font-weight: bold; ">' + this.y + '</span></div>' +
                        '</div>';
                    return res
                }
            },
        };
    }

    static getColor(k) {
        return randomColor({luminosity: 'light', seed: k})
    }

    componentWillMount() {
        this.loadProject()
    }

    componentWillReceiveProps(props) {
        if (this.state.project._id) {
            props.projects.forEach((project) => {
                if (project._id === this.state.project._id) {
                    this.setState({
                        project
                    })
                }
            })
        }
    }

    loadProject() {
        if (this.state.project._id) {
            this.props.dispatch(getProject(this.state.project._id, undefined, 1))
        }
    }

    draw() {
        this.setState({draw: true});
        const config = {
            chart: {
                type: this.state.type,
                zoomType: 'x',
                style: {
                    fontFamily: 'Vazir'
                }
            },
            series: [{
                data: []
            }],
        };

        let things = {};
        this.state.project.things.forEach((thing) => {
            things[thing.interface.devEUI] = thing.name
        });

        // creates sensors series by their identification
        let sensors = [];
        this.state.data.forEach((d) => {
            _.allKeys(d.data).forEach((k) => {
                if (_.find(sensors, {name: `${things[d.thing_id]}: ${k}`}) === undefined) {
                    sensors.push({
                        label: k,
                        name: `${things[d.thing_id]}: ${k}`,
                        data: [],
                        color: ProjectsView.getColor(k)
                    })
                }
            })
        });

        // maps the sensors data into their series
        this.state.data.forEach((d) => {
            if (!d.data || d.data === null) { // do not parse the null data
              return
            }
            sensors.forEach((dataset) => {
                const n = Number(d.data[dataset.label]);
                if (!isNaN(n)) {
                    dataset.data.push({
                        name: moment(d.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss'),
                        x: new Date(d.timestamp).getTime(),
                        y: n
                    })
                }
            })
        });
        config.series = sensors;
        this.setState({
            config: Object.assign({}, this.state.config, config),
            draw: false
        })
    }

    getThings() {
        let things = [];
        this.state.project.things && this.state.project.things.forEach((thing) => {
                things.push({label: thing.name, value: thing._id})
            }
        );
        return things
    }

    setThing(things) {
        let selectedThing = {ids: [], options: []};
        selectedThing.options = things
        for (let i = 0; i < things.length; i++) {
            selectedThing.ids.push(things[i].value)
        }
        this.setState({selectedThing})
    }

    componentWillUnmount() {
        // use intervalId from the state to clear the interval
        this.stop()
    }

    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader style={{display: 'flex', alignItems: 'center'}}>
                        <CardTitle className="mb-0 font-weight-bold h6">دریافت داده</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>شی ارسال کننده:‌</Label>
                                <Col sm={5}>
                                    <Select
                                        style={{width: '100%'}}
                                        isMulti={true}
                                        isSearchable={true}
                                        options={this.getThings()}
                                        value={this.state.selectedThing.options}
                                        onChange={this.setThing}
                                        placeholder='اشیا'
                                        isRtl={true}
                                    />
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>زمان داده:‌</Label>
                                <Col sm={5}>
                                    <Select onChange={
                                        (option) => {
                                            this.stop();
                                            this.setState({
                                                auto: !(option.value === 0),
                                                window: option.value
                                            })
                                        }
                                    } options={[
                                        { value: 0, label: 'بازه زمانی' },
                                        { value: 60, label: 'یک ساعت اخیر' },
                                        { value: 5 * 60, label: 'پنج ساعت اخیر' },
                                        { value: 10 * 60, label: 'ده ساعت اخیر' },
                                        { value: 24 * 60, label: 'یک روز اخیر' },
                                        { value: 7 * 24 * 60, label: 'یک هفته اخیر' }
                                    ]}
                                    defaultValue={
                                        { value: 0, label: 'بازه زمانی' }
                                    }
                                    isRtl={true}
                                  />
                                </Col>
                            </FormGroup>
                            <FormGroup style={{display: this.state.auto ? 'none' : 'flex'}} row>
                                <Label sm={2}></Label>
                                <Col sm={5}>
                                    {this.renderTimePicker()}
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> نوع نمودار :</Label>
                                <Col sm={5}>
                                    <Select
                                           onChange={(event) => {
                                               this.setState({
                                                   type: event.value,
                                               })
                                           }}
                                           options={[
                                             { value: "area", label: "خطی" },
                                             { value: "column", label: "میله ای" }
                                           ]}
                                           defaultValue={
                                             { value: "area", label: "خطی" }
                                           }
                                           isRtl={true}
                                    />
                                </Col>
                            </FormGroup>
                            <Button outline color="success" size="sm" onClick={() => {
                                if (this.state.selectedThing.ids.length <= 0) {
                                    toast('ابتدا شی مورد نظر را انتخاب نمایید', {
                                        autoClose: 15000,
                                        type: toast.TYPE.ERROR
                                    });
                                    return
                                }
                                this.stop();

                                if (this.state.since || this.state.window) {
                                    this.setState({
                                        excelParams: {
                                            things: JSON.stringify(this.state.selectedThing),
                                            projectId: this.state.project._id,
                                            offset: 0,
                                            limit: this.state.pageSize,
                                            since: this.state.since ? this.state.since : Math.floor(Date.now() / 1000) - this.state.window * 60
                                        }
                                    });
                                    this.props.dispatch(getThingsMainDataAction(JSON.stringify(this.state.selectedThing),
                                        this.state.project._id,
                                        0,
                                        this.state.pageSize,
                                        this.state.since ? this.state.since : Math.floor(Date.now() / 1000) - this.state.window * 60,
                                        (status, data) => {
                                            let pages = 1;
                                            if (this.state.pageSize === data.length) {
                                                pages++
                                            }
                                            this.setState({tableData: data.reverse(), pages})
                                        }))
                                }
                                this.getData(() => {
                                    if (this.state.auto) {
                                        this.start()
                                    }
                                })
                            }
                            }>دریافت اطلاعات</Button>
                        </Form>
                    </CardBody>
                </Card>
                <Card className="text-justify">
                    <CardHeader style={{display: 'flex'}}>
                        <span>دریافت خودکار:</span>
                        <Button onClick={() => this.stop()} color="danger" style={{marginRight: '5px'}}>توقف</Button>
                        <Button onClick={() => this.start()} color="primary" style={{marginRight: '5px'}}>شروع</Button>
                        <Loading size={'30px'} isOpen={this.state.interval}/>
                    </CardHeader>
                    <CardBody>
                        <ReactHighcharts config={this.state.config} isPureConfig={true}/>
                    </CardBody>
                </Card>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">داده های جمع آوری شده</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={[...this.state.tableData]}
                            pages={this.state.pages}
                            columns={this.reactTableColumns()}
                            pageSizeOptions={[10, 15, 25, 50]}
                            loading={this.state.loading}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={false}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='داده‌ای وجود ندارد'
                            resizable={false}
                            defaultPageSize={10}
                            sortable={false}
                            className="-striped -highlight"
                            manual
                            onFetchData={(state, instance) => {
                                this.setState({
                                    excelParams: {
                                        things: JSON.stringify(this.state.selectedThing),
                                        projectId: this.state.project._id,
                                        offset: (state.page) * state.pageSize,
                                        limit: state.pageSize,
                                        since: this.state.since ? this.state.since : 0
                                    }
                                });
                                this.setState({loading: false, tableData: [], pageSize: state.pageSize});
                                if (this.state.since || this.state.window) {
                                    this.props.dispatch(getThingsMainDataAction(JSON.stringify(this.state.selectedThing),
                                        this.state.project._id,
                                        (state.page) * state.pageSize,
                                        state.pageSize,
                                        this.state.since ? this.state.since : Math.floor(Date.now() / 1000) - this.state.window * 60,
                                        (status, data) => {
                                            let pages = state.page + 1;
                                            console.log(state.pageSize, data.length);
                                            if (state.pageSize === data.length) {
                                                pages++
                                            }
                                            this.setState({tableData: data.reverse(), loading: false, pages})
                                        }))
                                }
                            }}
                        />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.downloadExcel} className="ml-1" color="success">خروجی اکسل</Button>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    downloadExcel() {
        const params = this.state.excelParams;
        if (params.things && params.projectId) {
            this.props.dispatch(DownloadThingsDataExcelAction(params.things, params.projectId, params.offset, params.limit, params.since))
        } else {
            toast( 'داده‌ای موجود نیست', {autoClose: 15000, type: toast.TYPE.ERROR})
        }
    }

    renderTimePicker() {
      return (
        <DateTimeRangePicker
            placeholderStart="تاریخ و ساعت شروع"
            placeholderEnd="تاریخ و ساعت پایان"
            format="jYYYY/jMM/jDD HH:mm"
            onChangeStart={(e, b) => {
                this.setState({ since: e })
            }}
            onChangeEnd={(e, b) => {
                this.setState({ until: e })
            }}
        />)
    }

    renderPeriodPicker() {
        if (this.state.auto) {
            return (
                <Col>
                    <Row>
                        <Label syle={{marginRight: 20}}>پس از </Label>
                        <Col sm={2}>
                            <Input type="number" defaultValue={5} onChange={(e) => {
                                let value = e.target.value;
                                this.setState({period: !isNaN(value) ? value * 1000 : 5000})
                            }}/>
                        </Col>
                        <Label syle={{marginRight: 20}}>ثانیه </Label>
                    </Row>
                </Col>
            )
        }
    }

    reactTableColumns() {
        return [
            {
                id: 'time',
                Header: 'زمان دریافت داده',
                accessor: row => moment(row.timestamp, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')
            },
            {
                Header: 'شی فرستنده',
                accessor: 'thing_id'
            },
            {
                id: 'data',
                Header: 'داده دریافت شده',
                accessor: row => <div style={{textAlign: 'left', direction: 'ltr'}}><JSONPretty id="json-pretty"
                                                                                                json={row.data}/>
                </div>
            }, {
                id: 'raw',
                Header: 'داده خام',
                accessor: row => <div style={{whiteSpace: 'pre-wrap', textAlign: 'left', direction: 'ltr'}}>
                    {row.raw}
                </div>
            },
        ]
    }

    start() {
        if (this.state.selectedThing.ids.length) {
            this.setState({
                interval: setInterval(() => {
                    this.getData()
                }, this.state.period)
            })
        }
    }

    stop() {
        clearInterval(this.state.interval);
        this.setState({
            interval: 0
        })
    }

    getData(cb) {
        this.props.dispatch(getThingsMainDataAction(JSON.stringify(this.state.selectedThing),
            this.state.project._id,
            0,
            0,
            this.state.since ? this.state.since : Math.floor(Date.now() / 1000) - this.state.window * 60,
            (status, data) => {
                this.setState({data: data.reverse()});
                this.draw();
                if (cb) {
                    cb()
                }
            }));
    }
}

function mapStateToPropes(state) {
    return {
        projects: state.projectReducer,
    }
}

export default connect(mapStateToPropes)(ProjectsView);
