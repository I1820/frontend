import React, {Component} from 'react';
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
    ListGroup,
    ListGroupItem,
    Button,
    ButtonGroup,
    ModalFooter,
    Label,
    Input,
    Table, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import {connect} from 'react-redux';
import {getProject} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";

class ProjectsManage extends Component {

    constructor(props) {
        super(props);

        this.toggleABP = this.toggleABP.bind(this)
        this.toggleOTAA = this.toggleOTAA.bind(this)
        this.addThing = this.addThing.bind(this)
        this.addScenario = this.addScenario.bind(this)


        this.state = {
            OTAAmodal: false,
            ABPmodel: false,
            id: "",
            project: {}
        }
    }

    componentWillMount() {
        this.loadProject()
    }

    componentWillReceiveProps(props) {
        const splitedUrl = window.location.href.split('/');
        const me = this;
        if (splitedUrl[splitedUrl.length - 1]) {
            props.projects.forEach((project) => {

                if (project._id === splitedUrl[splitedUrl.length - 1]) {
                    console.log('findddd', project)
                    this.setState({
                        project
                    })
                }
            })
        }
    }

    loadProject() {
        const splitedUrl = window.location.href.split('/');
        if (splitedUrl[splitedUrl.length - 1]) {
            this.props.dispatch(getProject(splitedUrl[splitedUrl.length - 1]))
        }
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Modal isOpen={this.state.OTAAmodal} toggle={this.toggleOTAA} className="text-right">
                    <ModalHeader>OTAA</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}> appKey : </Label>
                                <Col sm={9}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={this.toggle}>ذخیره</Button>
                        <Button color="danger" onClick={this.toggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.ABPmodel} toggle={this.toggleABP} className="text-right">
                    <ModalHeader>ABP</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}>appSKey : </Label>
                                <Col sm={9}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>devAddr : </Label>
                                <Col sm={9}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>fCntDown : </Label>
                                <Col sm={9}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>fCntUp : </Label>
                                <Col sm={9}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>nwkSKey : </Label>
                                <Col sm={9}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>skipFCntCheck : </Label>
                                <Col sm={9}>
                                    <Input type="text"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={this.toggle}>ذخیره</Button>
                        <Button color="danger" onClick={this.toggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">تغییر اطلاعات پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام پروژه : </Label>
                                <Col sm={5}>
                                    <Input type="text" value={this.state.project.name}/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>توضیحات :‌ </Label>
                                <Col sm={5}>
                                    <Input value={this.state.project.description} type="textarea" name="" rows="2"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary">ثبت اطلاعات</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اشیا متصل شده به پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>نام شی</th>
                                <th>آدرس</th>
                                <th>نوع</th>
                                <th>امکانات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.project.things !== undefined ?
                                    this.state.project.things.map((thing, key) => {
                                        return (this.renderThingItem(thing, key))
                                    }) :
                                    <br/>
                            }
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.addThing} className="ml-1" color="primary">افزودن شی</Button>
                        <Button onClick={this.uploadExcel} className="ml-1" color="success">افزودن دسته ای شی</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">انتخاب سناریو پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ListGroup className="p-0">
                            {
                                this.state.project.scenarios !== undefined ?
                                    this.state.project.scenarios.map(() => {
                                        return (this.renderScenarioItem())
                                    }) :
                                    <br/>
                            }
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.addScenario} color="primary">افزودن سناریو</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }


    renderScenarioItem() {
        return (
            <ListGroupItem className="justify-content-between">
                Cras justo odio
                <Button className="ml-1 float-left" color="warning" size="sm">ویرایش</Button>
                <Button className="ml-1 float-left" color="success" size="sm">نمایش</Button>
            </ListGroupItem>
        )
    }

    renderThingItem(thing, key) {
        return (
            <tr id={key}>
                <th>{key + 1}</th>
                <td>{thing.name}</td>
                <td>{thing.interface.devEUI}</td>
                <td>{thing.type}</td>
                <td>
                    <Button className="ml-1" onClick={thing.type === 'ABP' ? this.toggleABP : this.toggleOTAA}
                            color="success" size="sm">فعال سازی</Button>
                    <Button className="ml-1" color="warning" size="sm">ویرایش</Button>
                    <Button className="ml-1" color="danger" size="sm">حذف</Button>
                </td>
            </tr>
        )
    }

    uploadExcel() {
        window.location = "#/things/excel"
    }

    addThing() {
        window.location = `#/things/${this.state.project._id}/new`
    }

    addScenario() {
        window.location = `#/scenario/${this.state.project._id}/new`
    }


    toggleOTAA() {
        this.setState({
            OTAAmodal: !this.state.OTAAmodal
        });
    }

    toggleABP() {
        this.setState({
            ABPmodel: !this.state.ABPmodel
        });
    }

}

function mapStateToProps(state) {
    return {
        projects: state.projectReducer,
        loading:state.homeReducer.currentlySending
    };
}


export default connect(mapStateToProps)(ProjectsManage);
