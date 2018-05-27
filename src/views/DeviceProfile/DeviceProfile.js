import React, { Component } from 'react';
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
import {getThingProfileListAction, deleteDeviceProfileAction, forwardTo} from '../../actions/AppActions';
import connect from 'react-redux/es/connect/connect';
import Spinner from '../Spinner/Spinner';
import ReactTable from 'react-table'
import { toastAlerts } from '../Shared/toast_alert';



class DeviceProfile extends Component {

    constructor(props) {
        super(props);

        this.newDeviceProfile = this.newDeviceProfile.bind(this)
        this.callback = this.callback.bind(this)
        this.deleteProfile = this.deleteProfile.bind(this)
        this.loadProfiles = this.loadProfiles.bind(this)


        this.state = {
            modal: false,
            deleteModal: false,
            deleteRowId: 0
        }
    }

    deleteProfile() {
        this.props.dispatch(deleteDeviceProfileAction(
            this.state.deleteRowId,
            this.callback
        ))
    }

    callback(status, result) {
        toastAlerts(status, result)
        this.loadProfiles()
    }

    componentWillMount() {
        this.loadProfiles()
    }

    loadProfiles() {
        this.props.dispatch(getThingProfileListAction())
    }

    render() {
        return (
            <div>

                <Modal isOpen={this.state.deleteModal} toggle={() => this.toggle('delete')} className="text-right">
                    <ModalHeader>حذف پروفایل</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف پروفایل مطمئن هستید‌؟</h3>
                        <br/>
                        <h5>پس از حذف امکان بازگشت آن وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggle('delete', this.state.deleteRowId)
                            this.deleteProfile(this.state.deleteRowId)
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle('delete')}>انصراف</Button>
                    </ModalFooter>
                </Modal>
                <Spinner display={this.props.loading}/>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">پروفایل اشیا</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.props.profiles}
                            columns={this.reactTableColumns()}
                            pageSizeOptions={[10, 15, 25]}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='پروفالی‌ای یافت نشد'
                            resizable={false}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                    <CardFooter>
                        <Button onClick={() => window.location = '#/device-profile/new'}
                                color="primary">ساخت پروفایل</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    toggle(modal, id) {
        let state = {};
        if (modal == 'delete')
            state = {
                deleteModal: !this.state.deleteModal,
                deleteRowId: id
            }
        this.setState(state);
    }


    newDeviceProfile() {

    }

    reactTableColumns() {
        return [
            {
                Header: 'عنوان',
                accessor: 'name'
            },
            {
                Header: 'شناسه پروفایل',
                accessor: 'thing_profile_slug'
            },
            {
                id: 'rowTools',
                Header: 'عملیات',
                filterable: false,
                accessor: row => <div>
                    <Button onClick={() => this.toggle('delete', row._id)} className="ml-1" color="danger"
                            size="sm">حذف</Button>
                  <Button onClick={()=>forwardTo(`device-profile/${row._id}`)} className="ml-1" color="primary"
                          size="sm">مشاهده</Button>
                </div>
            }
        ];
    }


}

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
        loading: state.homeReducer.currentlySending
    }
}


export default connect(mapStateToProps)(DeviceProfile);
