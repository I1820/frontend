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
    Row,
} from 'reactstrap'

import {connect} from 'react-redux'
import {editProjectAction, getProject,} from '../../actions/AppActions'
import Spinner from "../Spinner/Spinner";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";

class Project extends Component {
    constructor(props) {
        super(props);

        this.loadProject = this.loadProject.bind(this);

        this.state = {
            project: {},
        };
    }

    componentWillMount() {
        this.loadProject()
    }

    componentWillReceiveProps(props) {
        const projectID = this.props.match.params.id;
        if (projectID) {
            props.projects.forEach((project) => {
                if (project._id === projectID) {
                    this.setState({
                        project
                    })
                }
            })
        }
    }

    loadProject() {
        const projectID = this.props.match.params.id;
        if (projectID) {
            this.props.dispatch(getProject(projectID))
        }
    }

    static callback(status, message) {
        if (status) {
            toast(message, {type: toast.TYPE.SUCCESS, autoClose: 15000});
        } else {
            toast(message, {type: toast.TYPE.ERROR, autoClose: 15000})
        }
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Row>
                    <Col>
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">اطلاعات پروژه</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form>
                                    <FormGroup style={{display: 'flex'}}>
                                        <div style={{minWidth: '65px', width: '20%'}}>
                                            <Label>نام پروژه:</Label>
                                        </div>
                                        <div style={{width: '80%'}}>
                                            <Input type="text" onChange={(event) => {
                                                this.setState({
                                                    project: {
                                                        ...this.state.project,
                                                        name: event.target.value
                                                    }
                                                })
                                            }} maxLength="50" value={this.state.project.name || ''}/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup style={{display: 'flex'}}>
                                        <div style={{minWidth: '65px', width: '20%'}}>
                                            <Label>توضیحات:</Label>
                                        </div>
                                        <div style={{width: '80%'}}>
                                            <Input value={this.state.project.description || ''} onChange={(event) => {
                                                this.setState({
                                                    project: {
                                                        ...this.state.project,
                                                        description: event.target.value
                                                    }
                                                })
                                            }} maxLength="150" type="textarea" style={{resize: 'none'}} name=""
                                                   rows="2"/>
                                        </div>
                                    </FormGroup>
                                    <FormGroup style={{display: 'flex'}}>
                                        <div style={{minWidth: '65px', width: '20%'}}>
                                            <Label>وضعیت:</Label>
                                        </div>
                                        <div style={{width: '80%'}}>
                                            <Badge color={this.state.project.active === true ? 'success' : 'danger'}>
                                                {this.state.project.active === true ? 'فعال' : 'غیرفعال'}
                                            </Badge>
                                        </div>
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

                                <Button onClick={() => this.toggle('activeProject')} className="ml-1" color="danger">{
                                    this.state.project.active ? 'غیرفعال سازی پروژه' : 'فعال سازی پروژه'
                                }</Button>

                                <Link to={`/projects/${this.state.project._id}/view`}>
                                    <Button color="warning" className="ml-1">
                                        داده‌ها
                                    </Button>
                                </Link>

                                <Link to={`/projects/${this.state.project._id}/manage`}>
                                    <Button color="warning" className="ml-1">
                                        مدیریت
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

function mapStateToProps(state) {
    return {
        projects: state.projectReducer,
        loading: state.homeReducer.currentlySending
    };
}

export default connect(mapStateToProps)(Project);
