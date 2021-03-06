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
    FormGroup,
    Input,
    Label,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
} from 'reactstrap'

import {AvFeedback, AvForm, AvGroup, AvInput} from 'availity-reactstrap-validation'

import {connect} from 'react-redux'
import {
    activateScenarioAction,
    activateThingAction,
    deleteCodecTemplateAction,
    getCodecTemplateListAction,
    deleteScenarioAction,
    deleteThingAction,
    DownloadThingsExcelAction,
    editAliasesAction,
    getProject,
    getProjectThingsListAction,
    refreshJWTAction,
    sendDownlinkAction,
    sendThingKeysAction,
} from '../../actions/AppActions'

import ReactTable from 'react-table'
import Logger from '../../components/Logger'
import {toastAlerts} from '../Shared/toast_alert'
import {toast} from 'react-toastify'
import {Link} from 'react-router-dom'
import {CopyToClipboard} from 'react-copy-to-clipboard'

class ProjectsManage extends Component {
    constructor(props) {
        super(props);

        this.renderDownlinkRow = this.renderDownlinkRow.bind(this);
        this.downloadExcel = this.downloadExcel.bind(this);
        this.deleteThing = this.deleteThing.bind(this);
        this.activateThing = this.activateThing.bind(this);
        this.deleteCodec = this.deleteCodec.bind(this);
        this.deleteScenario = this.deleteScenario.bind(this);
        this.loadProject = this.loadProject.bind(this);
        this.downLinksAdd = this.downLinksAdd.bind(this);
        this.deleteAlias = this.deleteAlias.bind(this);
        this.refreshToken = this.refreshToken.bind(this);
        this.reactTableColumns = this.reactTableColumns.bind(this);
        this.getAliases = this.getAliases.bind(this);
        this.callback = this.callback.bind(this);
        this.setThings = this.setThings.bind(this);
        this.fetchThings = this.fetchThings.bind(this);

        this.state = {
            OTAAModal: false,
            JWTModal: false,
            ABPModal: false,
            activeProject: false,
            id: '',
            project: {},
            things: [],
            table: {
                pages: 1,
            },
            dataModal: false,
            modalDownlinkRows: [],
            OTAA: {},
            ABP: {skipFCntCheck: true},
            keys: {},
            deleteThingModal: false,
            deleteThingRowId: 0,
            deleteCodecModal: false,
            deleteCodecRowId: 0,
            deleteScenarioModal: false,
            deleteScenarioRowId: 0,
            DownlinkThingRowId: 0,
            activateThing: {
                modal: false,
                rowId: 0,
                active: 0
            },
            newAlias: {key: '', alias: ''}
        };
        this.el_refs = {
            alias: {
                key: '',
                value: '',
            }
        };
        this.nextId = 1
    }

    downLinksAdd() {
        const data = {}, selected = this.state.DownlinkThingRowId;
        let json;
        this.state.modalDownlinkRows.forEach((item) => {
            if (item.key && item.value) {
                data[item.key] = item.value
            }
        });
        json = JSON.stringify(data);
        this.toggle('downlink');
        this.props.dispatch(sendDownlinkAction(
            selected,
            {data: json, fport: this.state.downlinkFport, confirmed: this.state.downlinkConfirmed},
            this.callback
        ))
    }

    deleteThing() {
        const data = {
            project_id: this.state.project._id,
            thing_id: this.state.deleteThingRowId,
        };
        this.toggle('deleteThing');
        this.props.dispatch(deleteThingAction(
            data.project_id,
            data.thing_id,
            this.callback
        ))
    }

    activateThing() {
        const data = {
            active: this.state.activateThing.active,
            thing_id: this.state.activateThing.rowId,
        };
        this.toggle('activateThing');
        this.props.dispatch(activateThingAction(
            data.thing_id,
            data.active,
            this.callback
        ))
    }

    deleteCodec() {
        const data = {
            project_id: this.state.project._id,
            codec_id: this.state.deleteCodecRowId,
        };
        this.toggle('deleteCodec');
        this.props.dispatch(deleteCodecTemplateAction(
            data.project_id,
            data.codec_id,
            this.callback
        ))
    }

    refreshToken() {
        const data = {
            thing_id: this.state.selectedThing,
        };
        let tokenCallback = (status, data) => {
            toastAlerts(status, data.message);
            if (status) {
                this.setState({keys: {JWT: data.token}});
                this.loadProject()
            }
        };
        tokenCallback = tokenCallback.bind(this);
        this.props.dispatch(refreshJWTAction(
            data.thing_id,
            tokenCallback
        ))
    }

    deleteScenario() {
        const data = {
            project_id: this.state.project._id,
            scenario_id: this.state.deleteScenarioRowId,
        };
        this.toggle('deleteScenario');
        this.props.dispatch(deleteScenarioAction(
            data.project_id,
            data.scenario_id,
            this.callback
        ))
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
            this.props.dispatch(getProject(projectID, (status) => {
                if (status)
                    this.props.dispatch(getCodecTemplateListAction(projectID))
            }, 1))
        }
    }

    fetchThings(state, instance) {
        const projectID = this.props.match.params.id;
        this.props.dispatch(getProjectThingsListAction(
            projectID,
            state.pageSize,
            state.page * state.pageSize,
            state.sorted,
            state.filtered,
            this.setThings
        ))
    }

    render() {
        return (
            <div>
                <Modal isOpen={this.state.deleteScenarioModal} toggle={() => this.toggle('deleteScenario')}
                       className="text-right">
                    <ModalHeader>حذف سناریو</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف سناریو مطمئن هستید ؟</h3>
                        <br/>
                        <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteScenario()
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle('deleteScenario')}>انصراف</Button>
                    </ModalFooter>
                </Modal>


                <Modal isOpen={this.state.JWTModal} toggle={() => this.toggle('JWT')}
                       className="text-right">
                    <ModalHeader>دریافت کلید</ModalHeader>
                    <ModalBody>
                        <FormGroup style={{display: 'flex'}} row>
                            <Label sm={3}>کلید:</Label>
                            <Col sm={9}>
                                <Input value={this.state.keys.JWT} type="textarea" readOnly dir="ltr" rows="6"/>
                                <CopyToClipboard text={this.state.keys.JWT}>
                                    <Button color={'info'}><i color="info" className={'icon-docs'} onClick={() => {
                                        toast('کپی شد', {autoClose: 15000, type: toast.TYPE.SUCCESS})
                                    }}/></Button>
                                </CopyToClipboard>
                            </Col>
                        </FormGroup>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.refreshToken()
                        }}>دریافت کلید جدید</Button>
                        <Button color="danger" onClick={() => this.toggle('JWT')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.deleteCodecModal} toggle={() => this.toggle('deleteCodec')}
                       className="text-right">
                    <ModalHeader>حذف قالب</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف قالب مطمئن هستید ؟</h3>
                        <br/>
                        <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteCodec()
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle('deleteCodec')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.deleteThingModal}
                       toggle={() => this.toggle('deleteThing')}
                       className="text-right">
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
                        <Button color="danger" onClick={() => this.toggle('deleteThing')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.activateThing.modal}
                       toggle={() => this.toggle('activateThing')}
                       className="text-right">
                    <ModalHeader>{this.state.activateThing.active ? 'فعال سازی ' : 'غیرفعال سازی '} شی</ModalHeader>
                    <ModalBody>
                        <h3>{'آیا از '}{this.state.activateThing.active ? 'فعال سازی ' : 'غیرفعال سازی '}{'شی مطمئن هستید؟'}</h3>
                        <br/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.activateThing()
                        }}>{this.state.activateThing.active ? 'فعال سازی ' : 'غیرفعال سازی '}</Button>
                        <Button color="danger" onClick={() => this.toggle('activateThing')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.dataModal} toggle={() => this.toggle('downlink')} className="text-right">
                    <ModalHeader>ارسال داده</ModalHeader>
                    <ModalBody>
                        {this.state.modalDownlinkRows.map(row => this.renderDownlinkRow(row.id, row.key, row.value))}
                        <Button color="success" onClick={() => {
                            this.setState({
                                modalDownlinkRows: [...this.state.modalDownlinkRows, {
                                    id: this.nextId++,
                                    key: '',
                                    value: ''
                                }]
                            })
                        }}>+ اضافه</Button>
                    </ModalBody>
                    <ModalFooter>
                        <FormGroup row>
                            <Col sm={7}>
                                <Label sm={5}>confirmed:</Label>
                                <Input
                                    onChange={(event) => {
                                        this.setState({
                                            downlinkConfirmed: event.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col sm={7}>
                                <Label sm={5}>fport:</Label>
                                <Input
                                    onChange={(event) => {
                                        this.setState({
                                            downlinkFport: event.target.value
                                        })
                                    }}
                                />
                            </Col>
                        </FormGroup>
                        <Button color="primary" className="ml-1" onClick={this.downLinksAdd}>ارسال</Button>
                        <Button color="danger" onClick={() => this.toggle('downlink')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.OTAAModal} toggle={() => this.toggle('OTAA')} className="text-right">
                    <ModalHeader className={'ltr'}>Over-the-Air Activation</ModalHeader>
                    <ModalBody>
                        <AvForm className={'english'}>
                            <AvGroup row>
                                <Col sm={9}>
                                    <AvInput
                                        name="appKey"
                                        defaultValue={this.state.keys['appKey']} onChange={(event) => {
                                        this.setState({
                                            OTAA: {
                                                appKey: event.target.value
                                            }
                                        })
                                    }}
                                        pattern="^[0-9A-Za-z]{32}$"
                                        required
                                        maxLength={32}
                                        placeholder="00AA11BB22CC33DD44FF55GG66HH77JJ"
                                        type="text"/>
                                    <br/>
                                    <AvFeedback>کلید معتبر نیست</AvFeedback>
                                </Col>
                                <Label sm={3}>Application key</Label>
                            </AvGroup>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            const data = {
                                OTAA: this.state.OTAA,
                                project_id: this.state.project,
                                thing_id: this.state.selectedThing,
                            };
                            this.toggle('OTAA');
                            this.props.dispatch(sendThingKeysAction(
                                data.OTAA,
                                data.thing_id,
                                this.callback))
                        }}>ارسال</Button>
                        <Button color="danger" onClick={() => this.toggle('OTAA')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Modal size={'lg'} isOpen={this.state.ABPModal} toggle={() => this.toggle('ABP')}
                       className="text-right">
                    <ModalHeader className={'ltr'}>Activation By Personalization</ModalHeader>
                    <ModalBody>
                        <AvForm className={'english'}>
                            <AvGroup row>
                                <Col sm={7}>
                                    <AvInput defaultValue={this.state.keys['devAddr']} name="devAddr"
                                             onChange={(event) => {
                                                 this.setState({
                                                     ABP: {
                                                         ...this.state.ABP,
                                                         [event.target.name]: event.target.value
                                                     }
                                                 })
                                             }}
                                             pattern="^[0-9A-Fa-f]{8}$"
                                             placeholder={'0011223344'}
                                             required
                                             maxLength={32}
                                             type="text"/>
                                    <br/>
                                    <AvFeedback>آدرس معتبر نیست</AvFeedback>
                                </Col>
                                <Label sm={5}>Device Address:</Label>
                            </AvGroup>

                            <AvGroup row>
                                <Col sm={7}>
                                    <AvInput defaultValue={this.state.keys['appSKey']} name="appSKey"
                                             onChange={(event) => {
                                                 this.setState({
                                                     ABP: {
                                                         ...this.state.ABP,
                                                         [event.target.name]: event.target.value
                                                     }
                                                 })
                                             }}
                                             maxLength={32}
                                             pattern="^[0-9A-Za-z]{32}$"
                                             required
                                             placeholder="44FF55GG66hh77jj00AA11BB22CC33DD"
                                             type="text"/>
                                    <br/>
                                    <AvFeedback>کلید معتبر نیست</AvFeedback>
                                </Col>
                                <Label sm={5}>Application Session Key:</Label>
                            </AvGroup>

                            <AvGroup row>
                                <Col sm={7}>
                                    <AvInput defaultValue={this.state.keys['nwkSKey']} name="nwkSKey"
                                             onChange={(event) => {
                                                 this.setState({
                                                     ABP: {
                                                         ...this.state.ABP,
                                                         [event.target.name]: event.target.value
                                                     }
                                                 })
                                             }}
                                             maxLength={32}
                                             pattern="^[0-9A-Za-z]{32}$"
                                             required
                                             placeholder="00AA11bb22CC33dd44FF55GG66HH77JJ"
                                             type="text"/>
                                    <br/>
                                    <AvFeedback>کلید معتبر نیست</AvFeedback>
                                </Col>
                                <Label sm={5}>Network Session Key:</Label>
                            </AvGroup>
                            <FormGroup row>
                                <Col sm={7}>
                                    <Input defaultValue={this.state.keys['fCntDown']} name="fCntDown"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }}
                                           placeholder="12"
                                           type="number"/>
                                </Col>
                                <Label sm={5}>Downlink Frame Counter:</Label>
                            </FormGroup>
                            <FormGroup row>
                                <Col sm={7}>
                                    <Input defaultValue={this.state.keys['fCntUp']} name="fCntUp"
                                           onChange={(event) => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       [event.target.name]: event.target.value
                                                   }
                                               })
                                           }}
                                           placeholder="12"
                                           type="number"/>
                                </Col>
                                <Label sm={5}>Uplink Frame Counter:</Label>
                            </FormGroup>

                            <FormGroup row>
                                <Col sm={7}>
                                    <Input value={'skipFCntCheck'} name="skipFCntCheck"
                                           defaultChecked={!!this.state.keys.skipFCntCheck}
                                           onChange={() => {
                                               this.setState({
                                                   ABP: {
                                                       ...this.state.ABP,
                                                       skipFCntCheck: !this.state.ABP.skipFCntCheck
                                                   }
                                               })
                                           }} type="checkbox"/>
                                </Col>
                                <Label sm={5}>Disable Frame Counter Validation:</Label>
                            </FormGroup>
                        </AvForm>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            const data = {
                                ABP: this.state.ABP,
                                thing_id: this.state.selectedThing,
                                project_id: this.state.project._id
                            };
                            this.toggle('ABP');
                            this.props.dispatch(sendThingKeysAction(
                                data.ABP,
                                data.thing_id,
                                this.callback))
                        }}>ارسال</Button>
                        <Button color="danger" onClick={() => this.toggle('ABP')}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">نام مستعار کلید داده‌ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.getAliases()}
                            columns={this.reactTableColumns('aliases')}
                            showPageSizeOptions={false}
                            nextText='بعدی'
                            previousText='قبلی'
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='یافت نشد'
                            resizable={false}
                            defaultPageSize={3}
                            className="-striped -highlight"
                        />
                        <table className="table">
                            <tbody>
                            <tr>
                                <td><input ref={input => this.el_refs.alias.key = input}
                                           onChange={(event) => {
                                               this.setState({
                                                   newAlias: {
                                                       ...this.state.newAlias,
                                                       key: event.target.value
                                                   }
                                               })
                                           }}
                                           type="text" className="form-control" placeholder={'مقدار اصلی'}/>
                                </td>
                                <td><input ref={input => this.el_refs.alias.value = input}
                                           onChange={(event) => {
                                               this.setState({
                                                   newAlias: {
                                                       ...this.state.newAlias,
                                                       alias: event.target.value
                                                   }
                                               })
                                           }} type="text" className="form-control"
                                           placeholder={'نام مستعار'}/>
                                </td>
                                <td>
                                    <Button onClick={() => {
                                        const newAlias = this.state.newAlias;
                                        if (!newAlias.key || !newAlias.alias) {
                                            toast('اطلاعات را کامل وارد کنید', {
                                                autoClose: 15000, type: toast.TYPE.ERROR
                                            });
                                            return
                                        }
                                        this.setState({
                                            project: {
                                                ...this.state.project,
                                                aliases: {
                                                    ...this.state.project.aliases,
                                                    [newAlias.key]: newAlias.alias
                                                }
                                            }
                                        });
                                        this.el_refs.alias.key.value = '';
                                        this.el_refs.alias.value.value = ''

                                    }} type="button" className="btn btn-primary">اضافه کردن
                                    </Button>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => {
                            this.props.dispatch(editAliasesAction(this.state.project._id, {
                                aliases: JSON.stringify(this.state.project.aliases)
                            }, toastAlerts))
                        }} color="primary">ثبت</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اشیا متصل شده به پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.state.things}
                            columns={this.reactTableColumns('things')}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='3'
                            noDataText='شی‌ای وجود ندارد'
                            loadingText='در حال دریافت اطلاعات...'
                            resizable={false}
                            loading={this.state.table.loading}
                            onFetchData={this.fetchThings}
                            pages={this.state.table.pages}
                            pageSizeOptions={[5, 10, 15, 25]}
                            manual
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                    <CardFooter>
                        <Link to={`/projects/${this.state.project._id}/manage/things/new`}>
                            <Button className="ml-1" color="primary">افزودن شی</Button>
                        </Link>
                        <Link to={`/things/excel/${this.state.project._id}`}>
                            <Button className="ml-1" color="success">افزودن دسته ای شی</Button>
                        </Link>
                        <Button onClick={this.downloadExcel} className="ml-1" color="success">خروجی اکسل</Button>
                    </CardFooter>
                </Card>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">انتخاب سناریو پروژه</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.state.project.scenarios}
                            columns={this.reactTableColumns('scenarios')}
                            pageSizeOptions={[10, 15, 25]}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='سناریویی وجود ندارد'
                            resizable={false}
                            defaultPageSize={10}
                            className="-striped -highlight"
                            getTrProps={(state, rowInfo) => {
                                if (rowInfo && rowInfo.original.is_active) {
                                    return {
                                        style: {
                                            background: '#20a8d8',
                                            color: '#fff'
                                        }
                                    }
                                } else {
                                    return {}
                                }
                            }}
                        />
                    </CardBody>
                    <CardFooter>
                        <Link to={`/projects/${this.state.project._id}/manage/scenarios/new`}>
                            <Button color="primary">افزودن سناریو</Button>
                        </Link>
                    </CardFooter>
                </Card>


                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست قالب های codec</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.state.project.templates}
                            columns={this.reactTableColumns('codecs')}
                            pageSizeOptions={[10, 15, 25]}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='قالبی وجود ندارد'
                            resizable={false}
                            defaultPageSize={10}
                            className="-striped -highlight"
                        />
                    </CardBody>
                    <CardFooter>
                        <Link to={`/projects/${this.state.project._id}/manage/templates/new`}>
                            <Button color="primary">افزودن قالب</Button>
                        </Link>
                    </CardFooter>
                </Card>

                <Logger project={this.state.project._id}/>
            </div>
        )
    }

    getAliases() {
        let aliases = this.state.project.aliases ? this.state.project.aliases : [];
        return Object.keys(aliases).map((key) => {
            return {value: aliases[key], key: key}
        })
    }

    renderDownlinkRow(id, key, value) {
        return (
            <FormGroup row key={id}>
                <Col sm={5}>
                    <Input type="text" value={key} onChange={(e) => {
                        const newRows = [...this.state.modalDownlinkRows];
                        const item = newRows.findIndex(item => item.id === id);
                        newRows[item].key = e.target.value;
                        this.setState({modalDownlinkRows: newRows})
                    }} placeholder="کلید"/>
                </Col>
                <Col sm={5}>
                    <Input type="text" value={value} onChange={(e) => {
                        const newRows = [...this.state.modalDownlinkRows];
                        const item = newRows.findIndex(item => item.id === id);
                        newRows[item].value = e.target.value;
                        this.setState({modalDownlinkRows: newRows})
                    }} placeholder="مقدار"/>
                </Col>
                <Col sm={2} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <Button color="danger" onClick={() => {
                        this.setState({
                            modalDownlinkRows: this.state.modalDownlinkRows.filter((value) => value.id !== id)
                        })
                    }} className="btn-sm" style={{float: 'left'}}>&times;</Button>
                </Col>
            </FormGroup>
        )

    }

    deleteAlias(event) {
        const key = event.target.value;
        const newState = {
            project: {
                ...this.state.project,
                aliases: {
                    ...this.state.project.aliases,
                }
            }
        };
        delete newState.project.aliases[key];
        this.setState(newState)
    }

    downloadExcel() {
        this.props.dispatch(DownloadThingsExcelAction(this.state.project._id))
    }

    callback(status, message) {
        toastAlerts(status, message);
        this.loadProject();
        this.fetchThings({
            page: 0,
            pageSize: 10,
            filtered: {},
            sorted: {}
        }, {})
    }

    setThings(res) {
        this.setState({
            things: res.things,
            table: {
                pages: res.pages,
                loading: false,
            }
        })
    }

    reactTableColumns(type) {
        switch (type) {
            case 'things':
                return [
                    {
                        Header: 'نام شی',
                        accessor: 'name',
                    },
                    {
                        Header: 'آدرس',
                        accessor: 'dev_eui',
                        filterMethod: (filter, row) =>
                            row[filter.id].startsWith(filter.value) ||
                            row[filter.id].endsWith(filter.value),
                    },
                    {
                        Header: 'نوع',
                        accessor: 'type',
                    },
                    {
                        Header: 'نحوه پارس کردن',
                        accessor: 'model',
                    },
                    {
                        Header: 'فعال سازی',
                        accessor: 'activation',
                        filterMethod: (filter, row) => row[filter.id].startsWith(filter.value.toUpperCase()),
                    },
                    {
                        id: 'status',
                        Header: 'وضعیت',
                        filterable: false,
                        accessor: row => {
                            return (<div>
                                <Badge color={row.active ? 'success' : 'secondary'}>
                                    {'وضعیت:'} {row.active ? 'فعال' : 'غیرفعال'}
                                </Badge>
                            </div>)
                        }
                    },
                    {
                        id: 'rowTools',
                        Header: 'امکانات',
                        filterable: false,
                        accessor: row => {
                            return (<div>
                                <Input type="select" name="type"
                                       onChange={(e) => {
                                           let action = e.target.value;
                                           e.target.value = '';
                                           if (action === 'send_key') {
                                               this.toggle(row.activation === 'ABP' ? 'ABP' : (row.activation === 'OTAA' ? 'OTAA' : 'JWT'), {
                                                   id: row._id,
                                                   keys: row.keys.length !== 0 ? row.keys : {skipFCntCheck: true}
                                               })
                                           } else if (action === 'edit') {
                                               window.location = `#/projects/${this.state.project._id}/manage/things/${row._id}`
                                           } else if (action === 'send_codec') {
                                               window.location = `#/projects/${this.state.project._id}/manage/things/${row._id}/codec`
                                           } else if (action === 'send_data') {
                                               this.toggle('downlink', row._id)
                                           } else if (action === 'delete') {
                                               this.toggle('deleteThing', row._id);
                                               this.setState({
                                                   downlinkFport: '',
                                                   downlinkConfirmed: ''
                                               })
                                           } else if (action === 'deactive') {
                                               this.toggle('activateThing', {
                                                   rowId: row._id,
                                                   active: row.active ? 0 : 1
                                               })
                                           }

                                       }} id="select">
                                    <option value="">امکانات</option>
                                    <option value="send_key">ارسال/دریافت کلید</option>
                                    <option value="edit">ویرایش</option>
                                    <option value="send_codec">ارسال codec</option>
                                    <option value="send_data">ارسال داده (داون لینک)</option>
                                    <option value="delete">حذف شئ</option>
                                    <option value="deactive">{row.active ? 'غیر فعال سازی' : 'فعال سازی'}</option>
                                </Input>
                            </div>)
                        }
                    },
                ];
            case 'scenarios':
                return [
                    {
                        Header: 'عنوان',
                        accessor: 'name',
                        maxWidth: 200,
                        style: {
                            display: 'flex',
                            alignItems: 'center'
                        }

                    },
                    {
                        id: 'rowTools',
                        Header: 'امکانات',
                        filterable: false,
                        accessor: row => <div>
                            <Button onClick={() => this.toggle('deleteScenario', row._id)}
                                    className="ml-1 float-left" color="danger" size="sm">حذف</Button>
                                <Link to={`/projects/${this.state.project._id}/manage/scenarios/${row._id}`}>
                            <Button className="ml-1 float-left" color="warning" size="sm">ویرایش</Button>
                        </Link>
                            <Button onClick={() => {
                                this.props.dispatch(activateScenarioAction(this.state.project._id, row._id))
                            }} disabled={row.is_active} className="ml-1 float-left" color="success"
                                    size="sm">فعالسازی</Button>
                        </div>
                    },
                ];
            case 'codecs':
                return [
                    {
                        Header: 'عنوان',
                        accessor: 'name',
                        maxWidth: 200,
                        style: {
                            display: 'flex',
                            alignItems: 'center'
                        }
                    },
                    {
                        id: 'rowTools',
                        Header: 'امکانات',
                        filterable: false,
                        accessor: row => <div>
                            <Button onClick={() => this.toggle('deleteCodec', row._id)}
                                    className="ml-1 float-left" color="danger" size="sm">حذف</Button>
                                <Link to={`/projects/${this.state.project._id}/manage/templates/${row._id}`}>
                            <Button className="ml-1 float-left" color="warning" size="sm">ویرایش</Button>
                            </Link>
                        </div>
                    },
                ];
            case 'aliases':
                return [
                    {
                        Header: 'مقدار اصلی',
                        accessor: 'key',
                        maxWidth: 200
                    },
                    {
                        Header: 'نام مستعار',
                        accessor: 'value',
                    },
                    {
                        id: 'operations',
                        Header: 'حذف',
                        accessor: (row) => <Button color="danger" onClick={this.deleteAlias} value={row.key}
                                                   className="btn-sm" style={{float: 'left'}}>&times;</Button>,
                        style: {
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }
                ];
            default:
                return [];
        }

    }

    toggle(modal, id) {
        let state = {};
        if (modal === 'deleteThing') {
            state = {
                deleteThingModal: !this.state.deleteThingModal,
                deleteThingRowId: id ? id : ''
            }
        }
        if (modal === 'deleteCodec') {
            state = {
                deleteCodecModal: !this.state.deleteCodecModal,
                deleteCodecRowId: id ? id : ''
            }
        }
        if (modal === 'deleteScenario') {
            state = {
                deleteScenarioModal: !this.state.deleteScenarioModal,
                deleteScenarioRowId: id ? id : ''
            }
        }
        if (modal === 'downlink') {
            state = {
                dataModal: !this.state.dataModal,
                modalDownlinkRows: [],
                DownlinkThingRowId: id ? id : ''
            }
        }
        if (modal === 'ABP') {
            state = {
                selectedThing: id ? id.id : '',
                keys: id ? id.keys : '',
                ABPModal: !this.state.ABPModal,
                ABP: id ? {...id.keys} : {skipFCntCheck: true}
            }
        }
        if (modal === 'OTAA') {
            state = {
                selectedThing: id ? id.id : '',
                keys: id ? id.keys : '',
                OTAAModal: !this.state.OTAAModal,
                OTAA: id ? {...id.keys} : {}
            }
        }
        if (modal === 'activateThing') {
            state = {
                activateThing: {
                    modal: !this.state.activateThing.modal,
                    rowId: id && id.rowId ? id.rowId : 0,
                    active: id && id.active ? id.active : 0
                }

            }
        }
        if (modal === 'JWT') {
            state = {
                JWTModal: !this.state.JWTModal,
                keys: id ? id.keys : {},
                selectedThing: id ? id.id : ''
            }
        }
        this.setState(state);
    }

}

function mapStateToProps(state) {
    return {
        projects: state.projectReducer,
    };
}

export default connect(mapStateToProps)(ProjectsManage);
