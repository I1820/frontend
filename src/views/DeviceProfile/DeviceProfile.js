import React, {Component} from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Button,
    Table
} from 'reactstrap';
import {getThingProfileListAction} from "../../actions/AppActions";
import connect from "react-redux/es/connect/connect";
import Spinner from "../Spinner/Spinner";


class DeviceProfile extends Component {

    constructor(props) {
        super(props);

        this.newDeviceProfile = this.newDeviceProfile.bind(this)
        this.state = {
            modal: false
        }
    }

    componentWillMount() {
        this.props.dispatch(getThingProfileListAction())
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست پروفایل اشیاء</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>اسم</th>
                                <th>آدرس</th>
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


    renderItem(profile, key) {
        return (
            <tr>
                <th>{key + 1}</th>
                <td>{profile.name}</td>
                <td>{profile.thing_profile_slug}</td>
                <td>
                    <Button color="danger">حذف</Button>
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
