import React, { Component } from 'react';
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
    Badge,
    UncontrolledTooltip,
    Table
} from 'reactstrap';
import ReactTable from 'react-table'
import connect from 'react-redux/es/connect/connect';
import { getGatewaysAction, deleteGatewaysAction } from '../../actions/AppActions';
import Spinner from '../Spinner/Spinner';
import { ToastContainer, toast } from 'react-toastify';
import { css } from 'glamor';


class Gateways extends Component {

    constructor(props) {
        super(props);

        this.newGateway = this.newGateway.bind(this);
        this.viewGateway = this.viewGateway.bind(this);
        this.deleteModalToggle = this.deleteModalToggle.bind(this)
        this.deleteGateway = this.deleteGateway.bind(this)
        this.manageToastAlerts = this.manageToastAlerts.bind(this)
        this.loadGateways = this.loadGateways.bind(this)
        this.reactTableColumns = this.reactTableColumns.bind(this)

        this.state = {
            deleteModal: false,
            deleteRowId: 0,
        }
    }

    deleteGateway() {
        this.props.dispatch(deleteGatewaysAction(
            this.state.deleteRowId,
            this.manageToastAlerts
        ))
    }

    manageToastAlerts(status) {
        if (status === true) {
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
                <ToastContainer className="text-right"/>
                <Modal isOpen={this.state.deleteModal} toggle={this.deleteModalToggle} className="text-right">
                    <ModalHeader>حذف Gateway</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف Gateway مطمئن هستید ؟</h3>
                        <br/>
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
                        <CardTitle className="mb-0 font-weight-bold h6">Gateways List</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.props.gateways}
                            columns={this.reactTableColumns()}
                            pageSizeOptions={[10, 15, 25]}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='گذرگاهی وجود ندارد'
                            resizable={false}
                            defaultPageSize={10}
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
        window.location = '#/gateways/new'
    }

    viewGateway(id) {
        window.location = `#/gateways/view/${id}`
    }

    reactTableColumns() {
        return [
            {
                Header: 'نام گذرگاه(gateway)',
                accessor: 'name'
            },
            {
                Header: 'توضیحات',
                accessor: 'description'
            }, {
                Header: 'شناسه گذرگاه',
                accessor: 'mac',
                filterMethod: (filter, row) =>
                    row[filter.id].includes(filter.value)
            },
            {
                id: 'status',
                filterable: false,
                Header: 'وضعیت',
                accessor: row => <Badge color={row.last_seen_at['status'] === 'green' ? 'success' : 'danger'}
                                        id={`tooltip-${row._id}`}>
                    {row.last_seen_at['time'] && <UncontrolledTooltip placement="top" target={`tooltip-${row._id}`}>
                        {row.last_seen_at['time']}
                    </UncontrolledTooltip>}
                    {row.last_seen_at['status'] === 'green' ? 'فعال' : 'غیرفعال'}
                </Badge>
            }, {
                id: 'operations',
                Header: 'عملیات',
                filterable: false,
                accessor: row => <div>
                    <Button onClick={() => this.viewGateway(row._id)} className="ml-1" color="success"
                            size="sm">نمایش</Button>
                    <Button onClick={() => this.deleteModalToggle(row._id)} className="ml-1" color="danger"
                            size="sm">حذف</Button>
                </div>
            },

        ];
    }

}

function mapStateToProps(state) {
    return ({
        gateways: state.gatewayReducer,
        loading: state.homeReducer.currentlySending
    })
}


export default connect(mapStateToProps)(Gateways);
