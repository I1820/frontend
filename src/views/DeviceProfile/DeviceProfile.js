import React, {Component} from 'react'
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    CardTitle,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader
} from 'reactstrap'
import {deleteDeviceProfileAction, getThingProfileListAction} from '../../actions/AppActions'
import connect from 'react-redux/es/connect/connect'
import ReactTable from 'react-table'
import {toastAlerts} from '../Shared/toast_alert'
import {Link} from 'react-router-dom'

class DeviceProfile extends Component {

    constructor(props) {
        super(props);

        this.newDeviceProfile = this.newDeviceProfile.bind(this);
        this.callback = this.callback.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
        this.loadProfiles = this.loadProfiles.bind(this);

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
        toastAlerts(status, result);
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
                            this.toggle('delete', this.state.deleteRowId);
                            this.deleteProfile(this.state.deleteRowId)
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle('delete')}>انصراف</Button>
                    </ModalFooter>
                </Modal>
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
                            noDataText='پروفایلی یافت نشد'
                            resizable={false}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                    <CardFooter>
                        <Link to='/device-profiles/new'>
                            <Button color="primary">ساخت پروفایل</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    toggle(modal, id) {
        let state = {};
        if (modal === 'delete') {
            state = {
                deleteModal: !this.state.deleteModal,
                deleteRowId: id
            }
        }
        this.setState(state)
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
                    <Link to={`/device-profiles/${row._id}`}>
                        <Button className="ml-1" color="primary"
                                size="sm">مشاهده</Button>
                    </Link>
                </div>
            }
        ]
    }

}

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
    }
}

export default connect(mapStateToProps)(DeviceProfile);
