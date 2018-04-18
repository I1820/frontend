import React, {Component} from 'react';
import {
    Card,
    Modal,
    CardHeader,
    CardBody,
    CardFooter,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardTitle,
    Button,
    Table
} from 'reactstrap';
import connect from "react-redux/es/connect/connect";
import {getGatewaysAction, deleteGatewaysAction} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';
import Pagination from "react-js-pagination";



class Gateways extends Component {

    constructor(props) {
        super(props);

        this.newGateway = this.newGateway.bind(this);
        this.viewGateway = this.viewGateway.bind(this);
        this.deleteModalToggle = this.deleteModalToggle.bind(this)
        this.deleteGateway = this.deleteGateway.bind(this)
        this.manageToastAlerts = this.manageToastAlerts.bind(this)
        this.loadGateways = this.loadGateways.bind(this)

        this.state = {
            deleteModal: false,
            deleteRowId: 0
        }
    }

    deleteGateway() {
        this.props.dispatch(deleteGatewaysAction(
            this.state.deleteRowId,
            this.manageToastAlerts
        ))
    }

    manageToastAlerts(status) {
        if(status === true) {
            this.deleteModalToggle()
            this.loadGateways()

            toast('Gateway مورد نظر حذف شد', {
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
        this.loadGateways()
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <ToastContainer className="text-right" />
                <Modal isOpen={this.state.deleteModal} toggle={this.deleteModalToggle} className="text-right">
                    <ModalHeader>حذف Gateway</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف Gateway مطمئن هستید ؟</h3>
                        <br />
                        <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.deleteGateway(this.state.deleteRowId)
                        }}>حذف</Button>
                        <Button color="danger" onClick={this.deleteModalToggle}>انصراف</Button>
                    </ModalFooter>
                </Modal>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست گذرگاه ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>اسم</th>
                                <th>آدرس Mac</th>
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

                        <br />

                        <Pagination
                            activePage={1}
                            itemsCountPerPage={10}
                            totalItemsCount={450}
                            pageRangeDisplayed={5}
                            onChange={false}
                        />

                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.newGateway} color="primary">ساخت جدید</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    loadGateways() {
        this.props.dispatch(getGatewaysAction())
    }

    renderItem(gateway, key) {
        return (
            <tr id={key}>
                <th>{key + 1}</th>
                <td>{gateway.name}</td>
                <td className="english">{gateway.mac}</td>
                <td>
                    <Button onClick={() => this.viewGateway(gateway._id)} className="ml-1" color="success"
                            size="sm">نمایش</Button>
                    <Button onClick={() => this.deleteModalToggle(gateway._id)} className="ml-1" color="danger"
                            size="sm">حذف</Button>
                </td>
            </tr>
        )
    }

    deleteModalToggle(id) {
        this.setState({
            deleteModal: !this.state.deleteModal,
            deleteRowId: id
        });
    }

    newGateway() {
        window.location = "#/gateways/new"
    }

    viewGateway(id) {
        window.location = `#/gateways/view/${id}`
    }

}

function mapStateToProps(state) {
    return ({
        gateways: state.gatewayReducer,
        loading: state.homeReducer.currentlySending
    })
}


export default connect(mapStateToProps)(Gateways);
