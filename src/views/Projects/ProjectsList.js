import React, {Component} from 'react'
import {
    Badge,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Col,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader, Row,
} from 'reactstrap'
import ReactTable from 'react-table'

import {AvFeedback, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'

import {toastAlerts} from '../Shared/toast_alert'

import {connect} from 'react-redux'
import {createProject, deleteProjectAction, getProjects} from '../../actions/AppActions'
import {Link} from "react-router-dom";
import ButtonGroup from "reactstrap/es/ButtonGroup";

class ProjectsList extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onCreateProject = this.onCreateProject.bind(this);
        this.deleteProject = this.deleteProject.bind(this);
        this.loadProjects = this.loadProjects.bind(this);
        this.reactTableColumns = this.reactTableColumns.bind(this);

        this.state = {
            createModal: false,
            deleteModal: false,
            projects: [{}],
            deleteRowId: 0
        }
    }

    componentWillMount() {
        this.loadProjects()
    }

    componentWillReceiveProps(props) {
        if (props.projects !== undefined) {
            this.setState({
                projects: props.projects,
            })
        }
    }

    deleteProject() {
        this.toggle('delete', this.state.deleteRowId);
        this.props.dispatch(deleteProjectAction(
            this.state.deleteRowId,
            (status, response) => {
                this.loadProjects();
                toastAlerts(status, response)
            }
        ))
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.deleteModal} toggle={() => this.toggle('delete')} className="text-right">
                    <ModalHeader>حذف پروژه</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف پروژه مطمئن هستید؟</h3>
                        <br/>
                        <h5>پس از حذف پروژه امکان بازگرداندن آن وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteProject(this.state.deleteRowId)
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle('delete')}>انصراف</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.createModal} toggle={() => this.toggle('create')} className="text-right">
                    <ModalHeader>پروژه جدید</ModalHeader>
                    <ModalBody>
                        <AvForm>
                            <AvGroup row>
                                <Label sm={3}>نام پروژه : </Label>
                                <Col sm={9}>
                                    <AvInput type="text"
                                             name={'projectName'}
                                             onChange={event => this.setState({
                                                 projectName: event.target.value
                                             })}
                                             required/>
                                    <AvFeedback>الزامی است</AvFeedback>
                                </Col>
                            </AvGroup>
                            <AvGroup row>
                                <Label sm={3}>توضیحات :‌ </Label>
                                <Col sm={9}>
                                    <AvInput type="textarea"
                                             name={'projectDescription'}
                                             rows="2"
                                             style={{resize: 'none'}}
                                             onChange={event => this.setState({
                                                 projectDesc: event.target.value
                                             })}/>
                                </Col>
                            </AvGroup>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggle('create');
                            this.props.dispatch(createProject({
                                'name': this.state.projectName,
                                'description': this.state.projectDesc,
                            }, this.onCreateProject))
                        }}>ذخیره</Button>
                        <Button color="danger" onClick={() => this.toggle('create')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Row>
                    <Col md={12}>
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">
                                    درباره پروژه
                                    <i className="fab fa-readme float-left"></i>
                                </CardTitle>
                            </CardHeader>
                            <CardBody>
                                پروژه مفهومی انتزاعی است که در دنیا خارج مشهود نیست.
                                پروژه در برگیرنده اشیا است و یک واحد محاسباتی برای کدک‌ها و یک سناریو در اختیار
                                شما قرار می‌دهد.
                                ساخت پروژه یک عمل زمانبر می‌باشد. در نظر داشته باشید که تعداد پروژه‌های شما
                                بر اساس بسته‌ای که خریداری کرده‌اید محدود شده است.
                                برای تضمین ایزوله بودن پروژه‌ها از کانتینرهای داکر استفاده می‌شود.
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                <Row>
                    <Col md={12}>
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">لیست پروژه‌ها</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <ReactTable
                                    data={this.state.projects}
                                    columns={this.reactTableColumns()}
                                    loading={this.props.loading}
                                    pageSizeOptions={[5, 10, 25]}
                                    nextText='بعدی'
                                    previousText='قبلی'
                                    rowsText='ردیف'
                                    pageText='صفحه'
                                    ofText='از'
                                    minRows='1'
                                    noDataText='پروژه‌ای برای نمایش وجود ندارد'
                                    resizable={false}
                                    defaultPageSize={5}
                                    className="-striped -highlight"
                                />
                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => this.toggle('create')} color="primary">پروژه جدید</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }

    reactTableColumns() {
        return [
            {
                Header: 'نام پروژه',
                style: {textAlign: 'center'},
                accessor: 'name'
            },
            {
                Header: 'صاحب پروژه',
                style: {textAlign: 'center'},
                accessor: 'owner.name'
            },
            {
                id: 'status',
                Header: 'وضعیت',
                accessor: 'active',
                style: {textAlign: 'center'},
                Cell: row => <Badge color={row.value === true ? 'success' : 'danger'}>
                    {row.value === true ? 'فعال' : 'غیرفعال'}
                </Badge>
            },
            {
                id: 'tools',
                Header: 'گزینه‌ها',
                accessor: '_id',
                sortable: false,
                style: {textAlign: 'center'},
                Cell: row => <ButtonGroup>
                    <Link to={`/projects/${row.value}`}>
                        <Button block className="ml-1" color="warning" size="sm">
                            <i className={'fa fa-eye'}/>
                        </Button>
                    </Link>
                    <Button block onClick={() => this.toggle('delete', row.value)} className="ml-1" color="danger"
                            size="sm">
                        <i className={'fa fa-trash'}/>
                    </Button>
                </ButtonGroup>
            }
        ]
    }

    toggle(modal, id) {
        let state = {};
        if (modal === 'delete') {
            state = {
                deleteModal: !this.state.deleteModal,
                deleteRowId: id
            }
        }
        if (modal === 'create') {
            state = {
                createModal: !this.state.createModal,
            }
        }
        this.setState(state)
    }

    onCreateProject(status, message) {
        toastAlerts(status, message)
    }

    loadProjects() {
        this.props.dispatch(getProjects())
    }
}

function mapStateToProps(state) {
    return {
        projects: state.projectReducer,
        loading: state.homeReducer.currentlySending
    }
}

export default connect(mapStateToProps)(ProjectsList);
