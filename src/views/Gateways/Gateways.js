import React, { Component } from 'react'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  UncontrolledTooltip
} from 'reactstrap'
import ReactTable from 'react-table'
import connect from 'react-redux/es/connect/connect'
import { deleteGatewaysAction, DownloadUserGatewaysExcelAction, getGatewaysAction } from '../../actions/AppActions'
import Spinner from '../Spinner/Spinner'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

class Gateways extends Component {

  constructor (props) {
    super(props)

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

  deleteGateway () {
    this.deleteModalToggle()
    this.props.dispatch(deleteGatewaysAction(
      this.state.deleteRowId,
      this.manageToastAlerts
    ))
  }

  manageToastAlerts (status) {
    if (status === true) {
      this.loadGateways()

      toast('Gateway مورد نظر حذف شد', {
         autoClose: 15000, type: toast.TYPE.SUCCESS
      })
    } else {
      toast(status, {
        autoClose: 15000, type: toast.TYPE.ERROR
      })
    }
  }

  componentWillMount () {
    this.loadGateways()
  }

  render () {
    return (
      <div>
        <Spinner display={this.props.loading}/>
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
            <Link to={'#/gateways/new'}>
              <Button color="primary">ساخت جدید</Button>
            </Link>
            <Button
              onClick={() => this.props.dispatch(DownloadUserGatewaysExcelAction())}
              color="success">خروجی اکسل</Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  loadGateways () {
    this.props.dispatch(getGatewaysAction())
  }

  deleteModalToggle (id) {
    this.setState({
      deleteModal: !this.state.deleteModal,
      deleteRowId: id
    })
  }

  reactTableColumns () {
    return [
      {
        Header: 'نام گذرگاه(gateway)',
        accessor: 'name'
      },
      {
        Header: 'توضیحات',
        accessor: 'description'
      }, {
        id: 'mac',
        Header: 'شناسه گذرگاه',
        accessor: row =>
          <div style={{ letterSpacing: '1px' }}>
            {row.mac.match(/.{1,2}/g).reduce((ac, item) => ac + `${item}:`, '').slice(0, -1)}
          </div>,
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
          <Link to={`#/gateways/view/${row._id}`}>
            <Button className="ml-1" color="success"
                    size="sm">نمایش</Button>
          </Link>
          <Button onClick={() => this.deleteModalToggle(row._id)} className="ml-1" color="danger"
                  size="sm">حذف</Button>
        </div>
      },

    ]
  }

}

function mapStateToProps (state) {
  return ({
    gateways: state.gatewayReducer,
    loading: state.homeReducer.currentlySending
  })
}

export default connect(mapStateToProps)(Gateways)
