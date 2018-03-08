import React, {Component} from 'react';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    Modal,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table
} from 'reactstrap';

import {connect} from 'react-redux';
import {createProject, getProjects} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";

class ProjectsList extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)
        this.showProject = this.showProject.bind(this)
        this.onCreateProject = this.onCreateProject.bind(this)
        this.state = {
            modal: false,
            dataModal: false,
            projects: [{}],
        }
    }

    componentWillMount() {
        this.loadProjects()
    }

    componentWillReceiveProps(props) {
        if (props.projects !== undefined) {
            this.setState({
                projects: props.projects,
                projectName: "",
                projectDesc: ""
            })
        }
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className="text-right">
                    <ModalHeader>پروژه جدید</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>نام پروژه : </Label>
                                <Col sm={9}>
                                    <Input type="text"
                                           onChange={event => this.setState({
                                               projectName: event.target.value
                                           })}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>توضیحات :‌ </Label>
                                <Col sm={9}>
                                    <Input type="textarea" name=""
                                           rows="2"
                                           onChange={event => this.setState({
                                               projectDesc: event.target.value
                                           })}/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.props.dispatch(createProject({
                                'name': this.state.projectName,
                                'description': this.state.projectDesc,
                            }, this.onCreateProject))
                        }}>ذخیره</Button>
                        <Button color="danger" onClick={this.toggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست پروژه ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>نام پروژه</th>
                                <th>توضیحات</th>
                                <th>وضعیت</th>
                                <th>صاحب پروژه</th>
                                <th>امکانات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.projects.map((project, key) => {
                                    return (this.renderItem(project, key))
                                })
                            }
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.toggle} color="primary">پروژه جدید</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    renderItem(project = {}, key = 0) {
        return (
            <tr>
                <th>{key + 1}</th>
                <td>{project.name}</td>
                <td>{project.description}</td>
                <td><Badge color="success">{project.active === true ? 'فعال' : 'غیرفعال'}</Badge></td>
                <td>{project.owner.name}</td>
                <td>
                    <Button onClick={() => this.showProject(project._id)} className="ml-1" color="success"
                            size="sm">نمایش</Button>
                    <Button onClick={() => this.manageProject(project._id)} className="ml-1" color="warning"
                            size="sm">مدیریت</Button>
                    <Button className="ml-1" color="danger" size="sm">حذف</Button>
                </td>
            </tr>
        )
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    showProject() {
        window.location = "#/projects/view"
    }


    onCreateProject(status) {
        if (status) {
            this.toggle()
            this.loadProjects()
        } else {
            //TODO Alert
        }
    }

    loadProjects() {
        this.props.dispatch(getProjects())
    }

    showProject(id) {
        window.location = `#/projects/view/${id}`
    }

    manageProject(id) {
        window.location = `#/projects/manage/${id}`
    }


}

function mapStateToProps(state) {
    return {
        projects: state.projectReducer,
        loading: state.homeReducer.currentlySending
    };
}


export default connect(mapStateToProps)(ProjectsList);
