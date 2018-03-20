import React, {Component} from 'react';
import {
    Col,
    Card,
    Form,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    ListGroup,
    ListGroupItem,
    Button,
    ModalFooter,
    Label,
    Input,
    Table, Modal, ModalHeader, ModalBody
} from 'reactstrap';
import {connect} from 'react-redux';
import {
    activeThingAction,
    editProjectAction,
    getProject,
    deleteThingAction,
    getCodecTemplateListAction, activateScenarioAction, deleteCodecAction, deleteScenarioAction,
} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";

import {ToastContainer, toast} from 'react-toastify';
import {css} from 'glamor';
import {style} from "react-toastify";

style({
    colorProgressDefault: 'white'
});

class ProjectsManage extends Component {

    constructor(props) {
        super(props);

        this.toggleABP = this.toggleABP.bind(this)
        this.toggleOTAA = this.toggleOTAA.bind(this)
        this.addThing = this.addThing.bind(this)
        this.addScenario = this.addScenario.bind(this)
        this.dataModalToggle = this.dataModalToggle.bind(this)
        this.modalAddable = this.modalAddable.bind(this)
        this.addTemplate = this.addTemplate.bind(this)
        this.uploadExcel = this.uploadExcel.bind(this)
        this.renderTemplateItem = this.renderTemplateItem.bind(this)
        this.deleteThingModalToggle = this.deleteThingModalToggle.bind(this)
        this.deleteThing = this.deleteThing.bind(this)
        this.deleteCodec = this.deleteCodec.bind(this)
        this.deleteSecnario = this.deleteSecnario.bind(this)
        this.manageToastAlerts = this.manageToastAlerts.bind(this)
        this.loadProject = this.loadProject.bind(this)
        this.downLinksAdd = this.downLinksAdd.bind(this)
        this.renderScenarios = this.renderScenarios.bind(this)
        this.renderCodecs = this.renderCodecs.bind(this)
        this.deleteCodecModalToggle = this.deleteCodecModalToggle.bind(this)
        this.deleteScenarioModalToggle = this.deleteScenarioModalToggle.bind(this)

        this.state = {
            OTAAmodal: false,
            ABPmodel: false,
            id: "",
            project: {},
            dataModal: false,
            modalAddableItems: [],
            OTAA: {},
            ABP: {},
            deleteThingModal: false,
            deleteThingRowId: 0,
            deleteCodecModal: false,
            deleteCodecRowId: 0,
            deleteScenarioModal: false,
            deleteScenarioRowId: 0
        }
    }

    downLinksAdd() {
        // alert()
    }

    deleteThing() {
        this.deleteThingModalToggle(0)
        this.props.dispatch(deleteThingAction(
            this.state.project._id,
            this.state.deleteThingRowId,
            this.manageToastAlerts
        ))
    }

    deleteCodec() {
        this.deleteCodecModalToggle(0)
        this.props.dispatch(deleteCodecAction(
            this.state.project._id,
            this.state.deleteCodecRowId,
            this.manageToastAlerts
        ))
    }

    deleteSecnario() {
        this.deleteScenarioModalToggle(0)
        this.props.dispatch(deleteScenarioAction(
            this.state.project._id,
            this.state.deleteScenarioRowId,
            this.manageToastAlerts
        ))
    }

    manageToastAlerts(status, message) {
        if (status === true) {
            // this.deleteThingModalToggle()
            this.loadProject()

            toast('آیتم مورد نظر حذف شد', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#dbf2e3',
                    color: '#28623c'
                }),
                progressClassName: css({
                    background: '#28623c'
                })
            });
        } else {
            toast(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#fee2e1',
                    color: '#813838',
                }),
                progressClassName: css({
                    background: '#813838'
                })
            });
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

    deleteThingModalToggle(id) {
        this.setState({
            deleteThingModal: !this.state.deleteThingModal,
            deleteThingRowId: id
        });
    }

    deleteCodecModalToggle(id) {
        this.setState({
            deleteCodecModal: !this.state.deleteCodecModal,
            deleteCodecRowId: id
        });
    }

    deleteScenarioModalToggle(id) {
        this.setState({
            deleteScenarioModal: !this.state.deleteScenarioModal,
            deleteScenarioRowId: id
        });
    }


    loadProject() {
        const splitedUrl = window.location.href.split('/');
        if (splitedUrl[splitedUrl.length - 1]) {
            this.props.dispatch(getProject(splitedUrl[splitedUrl.length - 1], (status) => {
                if (status)
                    this.props.dispatch(getCodecTemplateListAction(splitedUrl[splitedUrl.length - 1]))
            }))
        }
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <ToastContainer className="text-right"/>

                <Modal isOpen={this.state.deleteScenarioModal} toggle={this.deleteScenarioModalToggle}
                       className="text-right">
                    <ModalHeader>حذف شی</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف سناریو مطمئن هستید ؟</h3>
                        <br/>
                        <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteSecnario()
                        }}>حذف</Button>
                        <Button color="danger" onClick={this.deleteScenarioModalToggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.deleteCodecModal} toggle={this.deleteCodecModalToggle} className="text-right">
                    <ModalHeader>حذف شی</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف قالب مطمئن هستید ؟</h3>
                        <br/>
                        <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteCodec()
                        }}>حذف</Button>
                        <Button color="danger" onClick={this.deleteCodecModalToggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.deleteThingModal} toggle={this.deleteThingModalToggle} className="text-right">
                    <ModalHeader>حذف شی</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف شی مطمئن هستید ؟</h3>
                        <br/>
                        <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteThing()
                        }}>حذف</Button>
                        <Button color="danger" onClick={this.deleteThingModalToggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.dataModal} toggle={this.dataModalToggle} className="text-right">
                    <ModalHeader>ارسال داده</ModalHeader>
                    <ModalBody>
                        {this.state.modalAddableItems}
                        <Button color="success" onClick={this.modalAddable}>+ اضافه</Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={this.downLinksAdd}>ثبت</Button>
                        <Button color="danger" onClick={this.dataModalToggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.OTAAmodal} toggle={this.toggleOTAA} className="text-right">
                    <ModalHeader>OTAA</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={3}> appKey : </Label>
                                <Col sm={9}>
                                    <Input onChange={(event) => {
                                        this.setState({
                                            OTTA: {
                                                appKey: event.target.value
                                            }
                                        })
                                    }} type="text"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggleOTAA()
                            this.props.dispatch(activeThingAction(this.state.OTTA, this.state.selectedThing,
                                this.state.project._id, this.callback))
                        }}>ارسال</Button>
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
                                    <Input name="appSKey"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>devAddr : </Label>
                                <Col sm={9}>
                                    <Input name="devAddr"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>fCntDown : </Label>
                                <Col sm={9}>
                                    <Input name="fCntDown"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>fCntUp : </Label>
                                <Col sm={9}>
                                    <Input name="fCntUp"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>nwkSKey : </Label>
                                <Col sm={9}>
                                    <Input name="nwkSKey"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={3}>skipFCntCheck : </Label>
                                <Col sm={9}>
                                    <Input name="skipFCntCheck"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }} type="text"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggleABP()
                            this.props.dispatch(activeThingAction(this.state.ABP,
                                this.state.selectedThing, this.state.project._id, this.callback))
                        }}>ارسال</Button>
                        <Button color="danger" onClick={this.toggleABP}>انصراف</Button>
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
                                <Label sm={2}>توضیحات :‌ </Label>
                                <Col sm={5}>
                                    <Input value={this.state.project.description} onChange={(event) => {
                                        this.setState({
                                            project: {
                                                ...this.state.project,
                                                description: event.target.value
                                            }
                                        })
                                    }} type="textarea" name="" rows="2"/>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => {
                            this.props.dispatch(editProjectAction(this.state.project._id, {
                                name: this.state.project.name,
                                description: this.state.project.description
                            }))
                        }} color="primary">ثبت اطلاعات</Button>
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
                                this.renderScenarios()
                            }
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.addScenario} color="primary">افزودن سناریو</Button>
                    </CardFooter>
                </Card>


                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست قالب های codec</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ListGroup className="p-0">
                            {
                                this.renderCodecs()
                            }
                        </ListGroup>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.addTemplate} color="primary">افزودن قالب</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    renderScenarioItem(scenario) {
        return (
            <ListGroupItem active={scenario.is_active} className="justify-content-between">
                {scenario.name}
                <Button onClick={() => this.deleteScenarioModalToggle(scenario._id)}
                        className="ml-1 float-left" color="danger" size="sm">حذف</Button>
                <Button className="ml-1 float-left" onClick={() => {
                    window.location = `#/scenario/${this.state.project._id}/${scenario._id}`
                }} color="warning" size="sm">ویرایش</Button>
                <Button onClick={() => {
                    this.props.dispatch(activateScenarioAction(this.state.project._id, scenario._id))
                }} disabled={scenario.is_active} className="ml-1 float-left" color="success" size="sm">فعال
                    سازی</Button>

            </ListGroupItem>
        )
    }


    renderTemplateItem(template) {
        return (
            <ListGroupItem className="justify-content-between">
                {template.name}
                <Button onClick={() => this.deleteCodecModalToggle(template._id)}
                        className="ml-1 float-left" color="danger" size="sm">حذف</Button>
                <Button className="ml-1 float-left" color="warning" size="sm">ویرایش</Button>
            </ListGroupItem>
        )
    }

    renderThingItem(thing, key) {
        return (
            <tr id={key}>
                <th>{key + 1}</th>
                <td>{thing.name}</td>
                <td className="english">{thing.interface.devEUI}</td>
                <td>{thing.type}</td>
                <td>
                    <Button className="ml-1" onClick={() => {
                        thing.type === 'ABP' ? this.toggleABP() : this.toggleOTAA()
                        this.setState({
                            selectedThing: thing._id
                        })
                    }}
                            color="success" size="sm">فعال سازی</Button>
                    <Button onClick={() => {
                        window.location = `#/things/${this.state.project._id}/${thing._id}`
                    }} className="ml-1" color="warning" size="sm">ویرایش</Button>
                    <Button onClick={() => {
                        window.location = `#/codec/${this.state.project._id}/${thing._id}`
                    }} className="ml-1" color="secondary" size="sm">ارسال codec</Button>
                    <Button onClick={this.dataModalToggle} className="ml-1" color="primary" size="sm">ارسال
                        داده</Button>
                    <Button onClick={() => this.deleteThingModalToggle(thing._id)} className="ml-1" color="danger"
                            size="sm">حذف</Button>
                </td>
            </tr>
        )
    }

    dataModalToggle() {
        this.setState({
            dataModal: !this.state.dataModal
        });
    }

    uploadExcel() {
        window.location = `#/things/excel/${this.state.project._id}`
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

    modalAddable() {
        let newItem = (
            <FormGroup row>
                <Col sm={5}>
                    <Input type="text" placeholder="کلید"/>
                </Col>
                <Col sm={1} className="text-center"> : </Col>
                <Col sm={5}>
                    <Input type="text" placeholder="مقدار"/>
                </Col>
            </FormGroup>
        )

        this.setState(prevState => ({
            modalAddableItems: [...prevState.modalAddableItems, newItem]
        }))
    }

    callback(status, message) {
        if (!status)
            toast(message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#fee2e1',
                    color: '#813838',
                }),
                progressClassName: css({
                    background: '#813838'
                })
            });
        else
            toast('ف با موفقیت انجام شد', {
                position: toast.POSITION.BOTTOM_RIGHT,
                className: css({
                    background: '#dbf2e3',
                    color: '#28623c'
                }),
                progressClassName: css({
                    background: '#28623c'
                })
            });
    }

    renderScenarios() {
        console.log('this.state.project.scenarios', this.state.project)
        if (this.state.project.scenarios)
            return (this.state.project.scenarios.map(scenario => {
                return (this.renderScenarioItem(scenario))
            }))
    }

    renderCodecs() {
        if (this.state.project.templates)
            return (this.state.project.templates.map(template => {
                return (this.renderTemplateItem(template))
            }))
    }

    addTemplate() {
        window.location = `#/template/${this.state.project._id}/new`
    }


}

function mapStateToProps(state) {
    return {
        projects: state.projectReducer,
        loading: state.homeReducer.currentlySending
    };
}


export default connect(mapStateToProps)(ProjectsManage);
