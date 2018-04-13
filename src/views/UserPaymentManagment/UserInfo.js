import React, {Component} from "react";
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
    ModalFooter,
    Badge,
    Label,
    Input

} from 'reactstrap'
import Data from './userData'
import { connect } from 'react-redux';
import Spinner from "../Spinner/Spinner";

class PackageList extends Component {
    constructor(props) {
        super(props);
        this.renderProject = this.renderProject.bind(this)
        this.renderPackage = this.renderPackage.bind(this)
        this.renderThing = this.renderThing.bind(this)
        this.renderTransaction = this.renderTransaction.bind(this)
        this.state = {
            userInfo : Data,
        };
    }
   
    render() {
        let userInfo = this.state.userInfo;
        const userInfoArray = Object.values(userInfo);
        return (
           
            <div className="animated fadeIn">
             <Spinner display={this.props.loading}/>
            
            <Row>
              <Col>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اطلاعات کاربر </CardTitle>
                    </CardHeader>
                    <CardBody>
                    
                    <div className="animated fadeIn">
                      
                        <Row>
                        <Col xs="36" sm="18" md="12">
                                <Card className="border-success">
                                <CardHeader>
                                    <CardTitle className="mb-0 font-weight-bold h6">اطلاعات حساب کاربری</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <ListGroup>
                                        <ListGroupItem>
                                            <Row>
                                                <Col md='3'><strong>نام کاربر</strong></Col>
                                                <Col md='3'><span> تست</span></Col>
                                                <Col md='3'><strong> پست الکترونیکی</strong></Col>
                                                <Col md='3'><span>تست</span></Col>
                                            </Row>  
                                        </ListGroupItem>
                                        {/* <ListGroupItem>
                                            <Row>
                                                <Col md='6'><strong> پست الکترونیکی</strong></Col>
                                                <Col md='6'><span>تست</span></Col>
                                            </Row>  
                                        </ListGroupItem> */}
                                        <ListGroupItem>
                                            <Row>
                                                <Col md='3'><strong>تلفن ثابت </strong></Col>
                                                <Col md='3'><span>تست</span></Col>
                                                <Col md='3'><strong>تلفن همراه </strong></Col>
                                                <Col md='3'><span>تست</span></Col>
                                            </Row> 
                                        </ListGroupItem>
                                        {/* <ListGroupItem>
                                            <Row>
                                              
                                            </Row> 
                                        </ListGroupItem> */}
                                        <ListGroupItem>
                                            <Row>
                                                <Col md='3'><strong>نوع کاربری </strong></Col>
                                                <Col md='3'><span>تست</span></Col>
                                                <Col md='3'><strong>نوع مجموعه </strong></Col>
                                                <Col md='3'><span>تست</span></Col>
                                            </Row> 
                                        </ListGroupItem>
                                        {/* <ListGroupItem>
                                            <Row>
                                                
                                            </Row> 
                                        </ListGroupItem> */}
                                    </ListGroup>
                                </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>        
                           
                            <Col xs="18" sm="9" md="6">
                                <Card className="border-success">
                                <CardHeader>
                                    <CardTitle className="mb-0 font-weight-bold h6"> تراکنش‌های کاربر</CardTitle>
                                </CardHeader>
                                <CardBody>
                                <Table hover responsive className="table-outline">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>نام بسته</th>
                                        <th>تاریخ</th>
                                        <th>هزینه</th>
                                        <th>وضعیت</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                       {
                                            userInfoArray.map((el, key) => this.renderTransaction(el, key))
                                        
                                        }
                                    </tbody>
                                </Table>
                                </CardBody>
                                </Card>
                            </Col>
                            <Col xs="18" sm="9" md="6">
                                <Card className="border-success">
                                <CardHeader>
                                    <CardTitle className="mb-0 font-weight-bold h6"> پروژه‌های کاربر</CardTitle>
                                </CardHeader>
                                <CardBody>
                                <Table hover responsive className="table-outline">
                                    <thead className="thead-light">
                                    <tr>
                                        <th>#</th>
                                        <th>نام پروژه</th>
                                        <th>وضعیت</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                       {
                                            userInfoArray.map((el, key) => this.renderProject(el, key))
                                        
                                        }
                                    </tbody>
                                </Table>
                                </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>        
                            <Col xs="18" sm="9" md="6">
                                <Card className="border-success">
                                <CardHeader>
                                    <CardTitle className="mb-0 font-weight-bold h6">  بسته‌های کاربر</CardTitle>
                                </CardHeader>
                                <CardBody>
                                    <Table hover responsive className="table-outline">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>#</th>
                                            <th>نام بسته</th>
                                            <th>هزینه</th>
                                            <th>وضعیت</th>
                                            <th>تغییر وضعیت</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            userInfoArray.map((el, key) => this.renderPackage(el, key))
                                        }
                                        </tbody>
                                    </Table>
                                </CardBody>
                                </Card>
                            </Col>
                            <Col xs="18" sm="9" md="6">
                                <Card className="border-success">
                                <CardHeader>
                                    <CardTitle className="mb-0 font-weight-bold h6"> اشیا کاربر</CardTitle>                                </CardHeader>
                                <CardBody>
                                    <Table hover responsive className="table-outline">
                                        <thead className="thead-light">
                                        <tr>
                                            <th>#</th>
                                            <th>نام شی</th>
                                            <th>نوع</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                             userInfoArray.map((el, key) => this.renderThing(el, key))   
                                        }
                                        </tbody>
                                    </Table>
                                </CardBody>
                                </Card>
                            </Col>
                        </Row>

                       
                    </div>    
            
                    </CardBody>
                   
                </Card>
              </Col>
            </Row>
    
            </div>
        )
    }
    renderProject(el, key = 0) {
      
        return (
            <tr>
                <th>{key + 1}</th>
                <td>{el.projectName}</td>
                <td>{el.projectState === true ? <Badge color="success"> فعال</Badge> :  <Badge color="danger"> غیر فعال</Badge> }</td>
            </tr>
        )
    }
   
 renderPackage(el, key = 0) {
    return (
        <tr>
            <th>{key + 1}</th>
            <td>{el.packName}</td>
            <td>{el.cost}</td>
            <td>{el.state === true ? <Badge color="success"> فعال</Badge> :  <Badge color="danger"> غیر فعال</Badge> }</td>
            <td>

              <Label className="switch switch-text switch-pill switch-success">
              <Input type="checkbox" className="switch-input" defaultChecked/>
              <span className="switch-label" data-on="فعال" data-off=""></span>
              <span className="switch-handle"></span>
              </Label>

            </td>
        </tr>
    )
}

    renderThing(el, key = 0) {
        return (
            <tr>
                <th>{key + 1}</th>
                <td>{el.thingName}</td>
                <td>{el.thingType}</td>
                
            </tr>
        )
    }
    renderTransaction(el, key = 0) {
        return (
            <tr>
                <th>{key + 1}</th>
                <td>{el.packName}</td>
                <td>{el._date}</td>
                <td>{el.cost}</td>
                <td>{el.state === true ? <Badge color="success"> موفق</Badge> :  <Badge color="danger"> نا‌موفق </Badge> }</td>

            </tr>
        )
    }
}
function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending
    };
}


export default connect(mapStateToProps)(PackageList);


