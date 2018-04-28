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
import { getThingProfileListAction, deleteDeviceProfileAction } from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";
import Spinner from "../Spinner/Spinner";
import { toast } from 'react-toastify';
import { css } from 'glamor';
import { style } from "react-toastify";

style({
    colorProgressDefault: 'white'
});


class DeviceProfile extends Component {

    constructor(props) {
        super(props);

        this.newDeviceProfile = this.newDeviceProfile.bind(this)
        this.deleteModalToggle = this.deleteModalToggle.bind(this)
        this.manageToastAlerts = this.manageToastAlerts.bind(this)
        this.deleteProfile = this.deleteProfile.bind(this)
        this.loadProfiles = this.loadProfiles.bind(this)

        this.state = {
            modal: false,
            deleteModal: false,
            deleteRowId: 0
        }
    }

    deleteProfile(id) {
        this.props.dispatch(deleteDeviceProfileAction(
            this.state.deleteRowId,
            this.manageToastAlerts
        ))
    }

    manageToastAlerts(status) {
        this.deleteModalToggle()
        this.loadProfiles()

        if(status === true) {
            toast('پروفایل مورد نظر حذف گردید', {
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
            toast(status, {
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
        this.loadProfiles()
    }

    loadProfiles() {
        this.props.dispatch(getThingProfileListAction())
    }

    render() {
        return (
            <div>

                <Modal isOpen={this.state.deleteModal} toggle={this.deleteModalToggle} className="text-right">
                    <ModalHeader>حذف پروفایل</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف پروفایل مطمئن هستید‌؟</h3>
                        <br />
                        <h5>پس از حذف امکان بازگشت آن وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteProfile(this.state.deleteRowId)
                        }}>حذف</Button>
                        <Button color="danger" onClick={this.deleteModalToggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>
                <Spinner display={this.props.loading}/>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">پروفایل اشیا</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>اسم</th>
                                <th>شناسه پروفایل</th>
                                <th>امکانات</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.props.profiles.map((profile, key) => {
                                    return (this.renderItem(profile, key))
                                })
                            }
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.newDeviceProfile} color="primary">ساخت پروفایل</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    deleteModalToggle(id) {
        this.setState({
            deleteModal: !this.state.deleteModal,
            deleteRowId: id
        });
    }


    renderItem(profile, key) {
        return (
            <tr>
                <th>{key + 1}</th>
                <td>{profile.name}</td>
                <td className="english">{profile.thing_profile_slug}</td>
                <td>
                    <Button onClick={() => this.deleteModalToggle(profile._id)} className="ml-1" color="danger"
                     size="sm">حذف</Button>
                </td>
            </tr>
        )
    }

    newDeviceProfile() {
        window.location = '#/device-profile/new';
    }


}

function mapStateToProps(state) {
    return {
        profiles: state.thingProfileReducer,
        loading: state.homeReducer.currentlySending
    }
}


export default connect(mapStateToProps)(DeviceProfile);
