import React, { Component } from 'react'
import {
  activatePackagesAction,
  createDiscountAction,
  deleteDiscountAction,
  deletePackagesAction,
  forwardTo,
  getAdminPackagesAction,
  getDiscountsAction,
  NewPackage
} from '../../actions/AppActions'
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from 'reactstrap'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import ReactTable from 'react-table'
import { connect } from 'react-redux'
import Spinner from '../Spinner/Spinner'
import { toastAlerts } from '../Shared/toast_alert'
import classnames from 'classnames'
import { Link } from 'react-router-dom'

function mapStateToProps (state) {
  return {
    loading: state.homeReducer.currentlySending,
    packages: state.packageReducer.adminPackages,
    discounts: state.packageReducer.discounts
  }
}

class PackageList extends Component {
  constructor (props) {
    super(props)
    this.renderPackage = this.renderPackage.bind(this)
    this.deletePackage = this.deletePackage.bind(this)
    this.activatePackage = this.activatePackage.bind(this)
    this.toggleTab = this.toggleTab.bind(this)
    this.toggle = this.toggle.bind(this)
    this.reactTableColumns = this.reactTableColumns.bind(this)
    this.state = {
      packages: [],
      discounts: [],
      activeTab: 'packages',
      deletePackageModal: false,
      deletePackageRowId: 0,
      deleteDiscountModal: false,
      deleteDiscountRowId: 0,
      addDiscountModal: false,
      activatePackageRow: {
        id: 0,
        value: 0
      },
      form: { discount: 0 }
    }
  }

  componentWillReceiveProps (props) {
    this.setState({
      packages: props.packages,
      discounts: props.discounts
    })
  }

  componentWillMount () {
    this.props.dispatch(getAdminPackagesAction())
    this.props.dispatch(getDiscountsAction())
  }

  renderPackage (item) {
    return (
      <Col xs="12" sm="6" md="4" key={item._id}>
        <Card className="border-primary">
          <CardHeader>
            {item.name}
            <Badge color={item.default ? 'info' : item.is_active === true ? 'success' : 'danger'}>
              {item.default ? 'پیش فرض' : item.is_active === true ? 'فعال' : 'غیرفعال'}
            </Badge>
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                  <Col md='6'><span>{item.price} </span><span> ریال</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>تعداد سنسور</strong></Col>
                  <Col md='6'><span>{item.node_num}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>تعداد پروژه</strong></Col>
                  <Col md='6'><span>{item.project_num}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>مهلت بسته</strong></Col>
                  <Col md='6'><span>{item.time}</span></Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
          <CardFooter>
            <Button color="danger" size="sm" className="ml-1"
                    onClick={() => this.toggle('deletePackage', item._id)}>
              <i className="fa fa-remove fa-lg "/>حذف </Button>

            <Link to={`package/${item._id}`}>
            <Button color="info" size="sm" className="ml-1">
              <i className="fa fa-remove fa-lg "/>ویرایش
            </Button>
            </Link>
            <Button
              color="warning"
              size="sm"
              onClick={() => this.toggle('activatePackage', { id: item._id, value: !item.is_active })}
              className="ml-1">
              <i className="fa fa-edit fa-lg"/> {item.is_active === true ? 'غیرفعال سازی' : 'فعال سازی'}
            </Button>
          </CardFooter>

        </Card>
      </Col>
    )
  }

  render () {
    return (
      <div className="animated fadeIn">
        <Spinner display={this.props.loading}/>
        <Modal isOpen={this.state.deletePackageModal}
               toggle={() => this.toggle('deletePackage')}
               className="text-right">
          <ModalHeader>حذف پروژه</ModalHeader>
          <ModalBody>
            <h3>آیا از حذف بسته مطمئن هستید؟</h3>
            <h4>پس از حذف بسته امکان بازگرداندن آن وجود ندارد.</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={this.deletePackage}>حذف</Button>
            <Button color="danger" onClick={() => this.toggle('deletePackage')}>انصراف</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.activatePackageModal}
               toggle={() => this.toggle('activatePackage')}
               className="text-right">
          <ModalHeader>{this.state.activatePackageRow.value ? 'فعال سازی' : 'غیر فعال سازی'}</ModalHeader>
          <ModalBody>
            <h3>{'آیا از ' + (this.state.activatePackageRow.value ? 'فعال سازی' : 'غیر فعال سازی') + ' مطمئن هستید'}</h3>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={this.activatePackage}>
              {this.state.activatePackageRow.value ? 'فعال سازی' : 'غیر فعال سازی'}
            </Button>
            <Button color="danger" onClick={() => this.toggle('activatePackage')}>انصراف</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.addDiscountModal} toggle={() => this.toggle('addDiscount')}
               className="text-right">
          <ModalHeader>افزودن کد تخفیف</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup row>
                <Label sm={3}>مقدار</Label>
                <Col sm={9}>
                  <Input value={this.state.form.discount}
                         onChange={(event) => {
                           this.setState({ form: { ...this.state.form, discount: event.target.value } })
                         }}
                         min={0}
                         placeholder="۱۰۰۰ تومان"
                         type="number"/>
                </Col>
              </FormGroup>
            </Form>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={() => {
              this.toggle('addDiscount')
              this.props.dispatch(createDiscountAction(this.state.form.discount, toastAlerts))
            }}>ثبت</Button>
            <Button color="danger" onClick={() => this.toggle('addDiscount')}>انصراف</Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={this.state.deleteDiscountModal}
               toggle={() => this.toggle('deleteDiscount')}
               className="text-right">
          <ModalHeader>حذف کد تخفیف</ModalHeader>
          <ModalBody>
            <h3>آیا از حذف کد تخفیف مطمئن هستید ؟</h3>
            <br/>
            <h5>پس از حذف امکان برگشت اطلاعات وجود ندارد.</h5>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={() => {
              this.toggle('deleteDiscount')
              this.props.dispatch(deleteDiscountAction(this.state.deleteDiscountRowId, toastAlerts))
            }}>حذف</Button>
            <Button color="danger" onClick={() => this.toggle('deleteDiscount')}>انصراف</Button>
          </ModalFooter>
        </Modal>

        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'packages' })}
              onClick={() => {
                this.toggleTab('packages')
              }}>بسته‌ها</NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === 'discounts' })}
              onClick={() => {
                this.toggleTab('discounts')
              }}>کدهای تخفیف</NavLink>
          </NavItem>

        </Nav>
        <br/>

        <TabContent activeTab={this.state.activeTab} className="border-0">
          <TabPane tabId={'packages'}>
            <Card className="text-justify">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">لیست بسته‌ها</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="animated fadeIn">
                  <Row>
                    {this.state.packages.map((item) => this.renderPackage(item))}
                  </Row>
                </div>
              </CardBody>
              <CardFooter>
                <Button color="primary"
                        onClick={() => this.props.dispatch(NewPackage())}>{'بسته جدید'}</Button>
              </CardFooter>
            </Card>
          </TabPane>
          <TabPane tabId={'discounts'}>
            <Card className="text-justify">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">کد‌های تخفیف</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  data={this.state.discounts}
                  columns={this.reactTableColumns('discounts')}
                  pageSizeOptions={[10, 15, 25]}
                  nextText='بعدی'
                  previousText='قبلی'
                  filterable={true}
                  rowsText='ردیف'
                  pageText='صفحه'
                  ofText='از'
                  minRows='1'
                  noDataText='کد تخفیفی وجود ندارد'
                  resizable={false}
                  defaultPageSize={10}
                  className="-striped -highlight"
                />
              </CardBody>
              <CardFooter>
                <Button onClick={() => this.toggle('addDiscount')} color="primary">
                  {'افزودن کد تخفیف'}
                </Button>
              </CardFooter>
            </Card>
          </TabPane>
        </TabContent>
      </div>
    )
  }

  toggleTab (tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      })
    }
  }

  toggle (modal, id) {
    let state = {}
    if (modal === 'deletePackage') {
      state = {
        deletePackageModal: !this.state.deletePackageModal,
        deletePackageRowId: id ? id : ''
      }
    }
    if (modal === 'activatePackage') {
      state = {
        activatePackageModal: !this.state.activatePackageModal,
        activatePackageRow: id ? id : { id: 0, value: 0 }
      }
    }
    if (modal === 'deleteDiscount') {
      state = {
        deleteDiscountModal: !this.state.deleteDiscountModal,
        deleteDiscountRowId: id ? id : 0
      }
    }
    if (modal === 'addDiscount') {
      state = {
        addDiscountModal: !this.state.addDiscountModal,
      }
    }
    this.setState(state)
  }

  deletePackage () {
    const package_id = this.state.deletePackageRowId
    this.toggle('deletePackage', package_id)
    this.props.dispatch(deletePackagesAction(package_id, toastAlerts))
  }

  activatePackage () {
    const package_ = this.state.activatePackageRow
    this.toggle('activatePackage', package_)
    this.props.dispatch(activatePackagesAction(package_.id, package_.value, toastAlerts))
  }

  reactTableColumns (type) {
    switch (type) {
      case 'discounts':
        return [
          {
            id: 'code',
            Header: 'کد',
            accessor: row => <div>
              <CopyToClipboard text={row.code}>
                <i color="info" className={'icon-docs'}
                   style={{ marginRight: '10px', cursor: 'pointer' }}/>
              </CopyToClipboard>
              {row.code}
            </div>,
            filterable: false,
            maxWidth: 200
          },
          {
            Header: 'مقدار',
            accessor: 'value',
            filterable: false,
            maxWidth: 200
          },
          {
            Header: 'وضیعت',
            id: 'status',
            accessor: row => <Badge
              color={row.expired ? 'danger' : 'success'}>{row.expired ? 'استفاده شده' : 'استفاده نشده'} </Badge>,
            filterable: false,
            maxWidth: 200
          },
          {
            id: 'rowTools',
            Header: 'امکانات',
            filterable: false,
            accessor: row => {
              return (<div>
                <Button onClick={() => this.toggle('deleteDiscount', row._id)} className="ml-1"
                        color="danger"
                        size="sm">حذف کد تخفیف</Button>
              </div>)
            }
          },
        ]
    }
  }
}

export default connect(mapStateToProps)(PackageList);

