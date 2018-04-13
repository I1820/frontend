import React, {Component} from "react";
import Data from './packageData'
import {selectPackage, NewPackage, getPackagesAction} from '../../actions/AppActions'
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBlock,
  Button,
  CardTitle,
  CardBody,
  Table,
  CardFooter,
  ListGroup,
  ListGroupItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter

} from 'reactstrap'
import {connect} from 'react-redux';
import Spinner from "../Spinner/Spinner";

class PackageList extends Component {
  constructor(props) {
    super(props);
    this.renderPackage = this.renderPackage.bind(this)
    this.deleteModalToggle = this.deleteModalToggle.bind(this)
    this.state = {
      packages: [],
      modal: false,
      deleteModal: false,
    };
  }

  componentWillReceiveProps(props){
    this.setState({packages:props.packages})
  }

  componentWillMount() {
    this.props.dispatch(getPackagesAction())
  }

  renderPackage(key) {
    let details = this.state.packages[key];
    return (
      <Col xs="12" sm="6" md="4">
        <Card className="border-primary">
          <CardHeader>
            {details.name}
          </CardHeader>
          <CardBody>
            <ListGroup>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                  <Col md='6'><span>{details.price} </span><span> ریال</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>تعداد سنسور</strong></Col>
                  <Col md='6'><span>{details.node_num}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>تعداد پروژه</strong></Col>
                  <Col md='6'><span>{details.project_num}</span></Col>
                </Row>
              </ListGroupItem>
              <ListGroupItem>
                <Row>
                  <Col md='6'><strong>مهلت بسته</strong></Col>
                  <Col md='6'><span>{details.time}</span></Col>
                </Row>
              </ListGroupItem>
            </ListGroup>
          </CardBody>
          <CardFooter>
            <Button color="danger" size="sm" className="ml-1" onClick={this.deleteModalToggle}> <i
              className="fa fa-remove fa-lg "></i> حذف</Button>
            <Button color="warning" size="sm" className="ml-1"> <i className="fa fa-edit fa-lg"></i> تغییرات</Button>
          </CardFooter>

        </Card>
      </Col>
    )
  }

  render() {
    return (

      <div className="animated fadeIn">
        <Spinner display={this.props.loading}/>
        <Modal isOpen={this.state.deleteModal} toggle={this.deleteModalToggle} className="text-right">
          <ModalHeader>حذف پروژه</ModalHeader>
          <ModalBody>
            <h3>آیا از حذف بسته مطمئن هستید؟</h3>
            <h4>پس از حذف بسته امکان بازگرداندن آن وجود ندارد.</h4>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" className="ml-1" onClick={() => {
              this.deleteModalToggle()
            }}>حذف</Button>
            <Button color="danger" onClick={this.deleteModalToggle}>انصراف</Button>
          </ModalFooter>
        </Modal>

        <Row>
          <Col>

            <Card className="text-justify">
              <CardHeader>
                <CardTitle className="mb-0 font-weight-bold h6">لیست بسته‌ها</CardTitle>
              </CardHeader>
              <CardBody>

                <div className="animated fadeIn">

                  <Row>

                    {Object.keys(this.state.packages).map((key) => this.renderPackage(key))}


                  </Row>

                </div>

              </CardBody>
              <CardFooter>
                <Button color="primary" onClick={() => this.props.dispatch(NewPackage())}>بسته جدید</Button>
              </CardFooter>
            </Card>
          </Col>
        </Row>

      </div>
    )
  }

  deleteModalToggle() {
    this.setState({
      deleteModal: !this.state.deleteModal
    });
  }

  // selectedPackage() {
  //     window.location = "#/selectedPackage/"
  // }
}

function mapStateToProps(state) {
  return {
    loading: state.homeReducer.currentlySending,
    packages: state.packageReducer
  };
}


export default connect(mapStateToProps)(PackageList);

