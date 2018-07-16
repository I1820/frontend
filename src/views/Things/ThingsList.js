import React, { Component } from 'react';
import {
  Row,
  Col,
  Card,
  Form,
  Badge,
  FormGroup,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Button,
  ButtonGroup,
  Label,
  Input,
  Table,
  UncontrolledTooltip,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Modal
} from 'reactstrap';
import moment from 'moment-jalaali';
import ReactTable from 'react-table'
import { connect } from 'react-redux';
import Spinner from '../Spinner/Spinner';
import { deleteMultipleThingAction, getThings } from '../../actions/AppActions';
import { toastAlerts } from '../Shared/toast_alert';


class ThingsList extends Component {

  constructor(props) {
    super(props);
    this.deleteThings = this.deleteThings.bind(this)
    this.toggle = this.toggle.bind(this)
    this.callback = this.callback.bind(this)
    this.state = {
      deleteThingsModal: false,
      deleteThingIds: [],
    }
  }


  componentDidMount() {
    this.props.dispatch(getThings())
  }

  toggle(modal) {
    let state = {};
    if (modal === 'deleteThings')
      state = {
        deleteThingsModal: !this.state.deleteThingsModal,
      }
    this.setState(state);
  }

  deleteThings() {
    const data = {
      things_id: this.state.deleteThingIds,
    };
    this.toggle('deleteThings')
    this.props.dispatch(deleteMultipleThingAction(data.things_id,this.callback))
  }

  callback(status, message) {
    toastAlerts(status, message);
    this.props.dispatch(getThings())
  }

  render() {
    return (
      <div>
        <Modal isOpen={this.state.deleteThingsModal} toggle={() => this.toggle('deleteThings')}
               className="text-right">
          <ModalHeader>حذف شی</ModalHeader>
          <ModalBody>
            <h3>آیا از حذف اشیای انتخاب شده مطمئن هستید ؟</h3>
            <br/>
            <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={() => {
              this.deleteThings()
            }}>حذف</Button>
            <Button color="danger" onClick={() => this.toggle('deleteThings')}>انصراف</Button>
          </ModalFooter>
        </Modal>

        <Spinner display={this.props.loading}/>
        <Card className="text-justify">
          <CardHeader>
            <CardTitle className="mb-0 font-weight-bold h6">لیست اشیاء</CardTitle>
          </CardHeader>
          <CardBody>
            <ReactTable
              data={this.props.things}
              columns={this.reactTableColumns('things')}
              pageSizeOptions={[10, 15, 25]}
              nextText='بعدی'
              previousText='قبلی'
              filterable={true}
              rowsText='ردیف'
              pageText='صفحه'
              ofText='از'
              minRows='1'
              noDataText='شی‌ای وجود ندارد'
              resizable={false}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </CardBody>
          <CardFooter>
            <Button onClick={() => this.toggle('deleteThings')} color="danger">حذف انتخاب شده‌ها</Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  toggleCheckbox(id) {
    let ids = [...this.state.deleteThingIds];
    let index = ids.indexOf(id)
    if (index !== -1)
      ids.splice(index, 1);
    else
      ids.push(id);
    this.setState({deleteThingIds: ids}, () => console.log(this.state));
  }

  reactTableColumns(type) {
    switch (type) {
      case 'things':
        return [
          {
            Header: 'انتخاب',
            id: 'select',
            accessor: row => <input type="checkbox" onChange={() => this.toggleCheckbox(row._id)}/>,
            maxWidth: 50
          },
          {
            Header: 'نام شی',
            accessor: 'name',
            maxWidth: 200
          },
          {
            Header: 'آدرس',
            accessor: 'interface.devEUI',
            filterMethod: (filter, row) =>
              row[filter.id].startsWith(filter.value) ||
              row[filter.id].endsWith(filter.value),
            maxWidth: 180
          },
          {
            Header: 'نوع',
            accessor: 'activation',
            filterMethod: (filter, row) => row[filter.id].startsWith(filter.value.toUpperCase()),
            maxWidth: 60
          },
          {
            id: 'status',
            Header: 'وضعیت',
            filterable: false,
            accessor: row => {
              let badgeColor = 'success'
              switch (row.last_seen_at.status) {
                case 'gray':
                  badgeColor = 'secondary'
              }
              return (<div>
                {row.type === 'lora' ?
                  <Badge id={`tooltip-${row._id}`}
                         color={!row.last_seen_at['time'] ? 'secondary' : 'success'}>{row.last_seen_at['time'] ?
                    'اخرین تاریخ دریافت داده' : 'عدم دریافت داده'}</Badge> : ''}
                {row.last_seen_at['time'] &&
                <UncontrolledTooltip placement="top" target={`tooltip-${row._id}`}>
                  {moment(row.last_seen_at.time, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')}
                </UncontrolledTooltip>}
                {' '}
                <Badge color={row.active ? 'success' : 'secondary'}>
                  {'وضعیت:'} {row.active ? 'فعال' : 'غیرفعال'}
                </Badge>
                {' '}
                <Badge id={`tooltip2-${row._id}`} color={!row.last_parsed_at ? 'secondary' : 'success'}>
                  {row.last_parsed_at && row.last_parsed_at !== '' ? 'اخرین زمان پارس داده' : 'عدم پارس داده'}
                </Badge>
                {row.last_parsed_at && row.last_parsed_at !== '' ?
                  <UncontrolledTooltip placement="top" target={`tooltip2-${row._id}`}>
                    {moment(row.last_parsed_at, 'YYYY-MM-DD HH:mm:ss').format('jYYYY/jM/jD HH:mm:ss')}
                  </UncontrolledTooltip> : ''}
              </div>);
            }
          },
          {
            id: 'rowTools',
            Header: 'امکانات',
            maxWidth: 150,
            filterable: false,
            accessor: row => {
              return (<div>
                <Input type="select" name="type"
                       onChange={(e) => {
                         let action = e.target.value
                         e.target.value = ''
                         if (action === 'edit') {
                           window.location = `#/things/edit/${row.project._id}/${row._id}`
                         }
                         else if (action === 'send_codec') {
                           window.location = `#/codec/${row.project._id}/${row._id}`
                         }

                       }} id="select">
                  <option value="">امکانات</option>
                  <option value="edit">ویرایش</option>
                  <option value="send_codec">ارسال codec</option>
                </Input>
              </div>);
            }
          },
          {
            id: 'project',
            Header: 'پروژه',
            maxWidth: 200,
            filterable: false,
            accessor: row => <Button onClick={() => {
              window.location = `#/projects/manage/${row.project._id}`
            }} className="ml-1" color="warning" size="sm">{row.project.name}</Button>,
          },
        ]
    }

  }
}

function mapStateToProps(state) {
  return {
    things: state.thingReducer,
    loading: state.homeReducer.currentlySending
  };
}


export default connect(mapStateToProps)(ThingsList);
