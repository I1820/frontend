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
import {connect} from 'react-redux'
import ReactTable from 'react-table'
import {deleteGlobalCodecAction, getGlobalCodecsAction} from '../../actions/AppActions'
import {Link} from "react-router-dom";

class globalCodecsList extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            items: [],
            deleteModal: false
        }
    }

    componentWillMount() {
        this.props.dispatch(getGlobalCodecsAction())
    }

    componentWillReceiveProps(props) {
        this.setState({items: props.globalCodecs})
    }

    render() {

        return (

            <div>
                <Modal isOpen={this.state.deleteModal} toggle={() => this.toggle()}
                       className="text-right">
                    <ModalHeader>حذف قالب</ModalHeader>
                    <ModalBody>
                        <h3>آیا از حذف قالب مطمئن هستید ؟</h3>
                        <br/>
                        <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="ml-1" onClick={() => {
                            this.toggle();
                            this.props.dispatch(deleteGlobalCodecAction(this.state.deleteCodec, () => {
                                this.props.dispatch(getGlobalCodecsAction())
                            }))
                        }}>حذف</Button>
                        <Button color="danger" onClick={() => this.toggle()}>انصراف</Button>
                    </ModalFooter>
                </Modal>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست کدک های عمومی</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <ReactTable
                            data={this.state.items}
                            columns={this.reactTableColumns()}
                            pageSizeOptions={[5, 10, 25]}
                            nextText='بعدی'
                            previousText='قبلی'
                            filterable={true}
                            rowsText='ردیف'
                            pageText='صفحه'
                            ofText='از'
                            minRows='1'
                            noDataText='داده ای وجود ندارد'
                            resizable={false}
                            defaultPageSize={5}
                            className="-striped -highlight"
                        />
                    </CardBody>
                    <CardFooter>
                        <Link to='/admin/global-codecs/new'>
                        <Button className="ml-1"
                                color="warning"
                                size="sm">ایجاد قالب</Button>
                        </Link>
                    </CardFooter>
                </Card>
            </div>
        )
    }

    reactTableColumns() {
        return [
            {
                Header: 'نام کدک',
                accessor: 'name'
            },
            {
                Header: 'کدک',
                accessor: 'code'
            },
            {
                id: 'rowTools',
                Header: 'امکانات',
                filterable: false,
                accessor: row => <div>
                    <Link to={`/admin/global-codecs/${row._id}`}>
                    <Button className="ml-1"
                            color="warning"
                            size="sm">ویرایش</Button>
                    </Link>
                    <Button onClick={() => {
                        this.toggle();
                        this.setState({deleteCodec: row._id})
                    }} className="ml-1" color="danger"
                            size="sm">حذف</Button>
                </div>
            }
        ]
    }

    toggle() {
        this.setState({deleteModal: !this.state.deleteModal})
    }
}

function mapStateToProps(state) {
    return {
        globalCodecs: state.adminReducer.globalCodecs
    }
}

export default connect(mapStateToProps)(globalCodecsList)

