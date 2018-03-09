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
import connect from "react-redux/es/connect/connect";
import {getGatewaysAction} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";


class Gateways extends Component {

    constructor(props) {
        super(props);
        this.newGateway = this.newGateway.bind(this);
        this.viewGateway = this.viewGateway.bind(this);
    }


    componentWillMount() {
        this.props.dispatch(getGatewaysAction())
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست پروژه ها</CardTitle>
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
                                this.props.gateways.map((gateway, key) => {
                                    return (this.renderItem(gateway, key))
                                })
                            }
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.newGateway} color="primary">ساخت جدید</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }


    renderItem(gateway, key) {
        return (
            <tr id={key}>
                <th>{key + 1}</th>
                <td>{gateway.name}</td>
                <td>{gateway.mac}</td>
                <td>
                    <Button color="success" onClick={this.viewGateway} className="ml-1">نمایش</Button>
                    <Button color="danger">حذف</Button>
                </td>
            </tr>
        )
    }

    newGateway() {
        window.location = "#/gateways/new"
    }

    viewGateway() {
        window.location = "#/gateways/view"
    }

}

function mapStateToProps(state) {
    return ({
        gateways: state.gatewayReducer,
        loading: state.homeReducer.currentlySending
    })
}


export default connect(mapStateToProps)(Gateways);
