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
    Form,
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Row,
} from 'reactstrap'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {activateProjectAction, editProjectAction, getProject,} from '../../actions/AppActions'
import {toast} from "react-toastify";
import {IProject} from "../../api/project";

interface IState {
    project: IProject;
    projectActivationModal: boolean;
}

class Project extends Component<any, IState> {
    constructor(props: any) {
        super(props);

        this.loadProject = this.loadProject.bind(this);

        this.state = {
            project: {
                _id: '',
                name: '',
                active: false,
                description: ''
            },
            projectActivationModal: false,
        };
    }

    componentWillMount() {
        this.loadProject()
    }

    static callback(status: boolean, message: string) {
        if (status) {
            toast(message, {type: toast.TYPE.SUCCESS, autoClose: 15000});
        } else {
            toast(message, {type: toast.TYPE.ERROR, autoClose: 15000})
        }
    }

    loadProject() {
        const projectID = this.props.match.params.id;
        if (projectID) {
            this.props.dispatch(getProject(projectID))
        }
    }

    componentWillReceiveProps(props: any) {
        const projectID = this.props.match.params.id;
        if (projectID) {
            let projects: IProject[] = props.projects;
            projects.forEach((project: IProject) => {
                if (project._id === projectID) {
                    this.setState({
                        project
                    })
                }
            })
        }
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.projectActivationModal}
                       toggle={() => this.setState({projectActivationModal: !this.state.projectActivationModal})}
                       className="text-right">
                    <ModalHeader>{`${this.state.project.active ? 'غیرفعال سازی' : 'فعال سازی'} پروژه `}</ModalHeader>
                    <ModalBody>
                        <h3>{` آیا از  ${this.state.project.active ? 'غیرفعال سازی' : 'فعال سازی'} مطمئن هستید؟  `}</h3>
                        <br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1"
                                onClick={() => {
                                    this.props.dispatch(activateProjectAction(
                                        this.state.project._id,
                                        this.state.project.active ? 0 : 1,
                                        () => {
                                            toast('با موفیت انجام شد.', {
                                                autoClose: 15000,
                                                type: toast.TYPE.SUCCESS
                                            })
                                        }
                                    ));
                                    this.setState({projectActivationModal: !this.state.projectActivationModal})
                                }
                                }>
                            {this.state.project.active ? 'غیرفعال سازی' : 'فعال سازی'}
                        </Button>
                        <Button color="danger"
                                onClick={() => this.setState({projectActivationModal: !this.state.projectActivationModal})}
                        >انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Row>
                    <Col>
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">اطلاعات پروژه</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup row>
                                        <Col xs={3}>
                                            <Label>نام پروژه:</Label>
                                        </Col>
                                        <Col xs={9}>
                                            <Input type="text" onChange={(event) => {
                                                this.setState({
                                                    project: {
                                                        ...this.state.project,
                                                        name: event.target.value
                                                    }
                                                })
                                            }} value={this.state.project.name}/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col xs={3}>
                                            <Label>توضیحات:</Label>
                                        </Col>
                                        <Col xs={9}>
                                            <Input value={this.state.project.description} onChange={(event) => {
                                                this.setState({
                                                    project: {
                                                        ...this.state.project,
                                                        description: event.target.value
                                                    }
                                                })
                                            }} type="textarea" rows="2"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Col xs={3}>
                                            <Label>وضعیت:</Label>
                                        </Col>
                                        <Col xs={9}>
                                            <Badge color={this.state.project.active ? 'success' : 'danger'}>
                                                {this.state.project.active ? 'فعال' : 'غیرفعال'}
                                            </Badge>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button onClick={() => {
                                    this.props.dispatch(editProjectAction(this.state.project._id, {
                                        name: this.state.project.name,
                                        description: this.state.project.description
                                    }, Project.callback))
                                }} className="ml-1" color="primary">ثبت اطلاعات</Button>

                                <Button
                                    onClick={() => this.setState({projectActivationModal: !this.state.projectActivationModal})}
                                    className="ml-1" color="danger">
                                    {
                                        this.state.project.active ? 'غیرفعال سازی پروژه' : 'فعال سازی پروژه'
                                    }
                                </Button>

                                <Link to={`/projects/${this.state.project._id}/view`}>
                                    <Button color="warning" className="ml-1">
                                        داده‌ها
                                        &nbsp;
                                        <i className="fas fa-database"></i>
                                    </Button>
                                </Link>

                                <Link to={`/projects/${this.state.project._id}/manage`}>
                                    <Button color="warning" className="ml-1">
                                        مدیریت
                                        &nbsp;
                                        <i className="fas fa-tasks"></i>
                                    </Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state: any) {
    return {
        projects: state.projectReducer,
    };
}

export default connect(mapStateToProps)(Project);
