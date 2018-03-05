import React, {Component} from 'react';
import { connect } from 'react-redux';
import {
    Row,
    Col,
    Card,
    Form,
    Badge,
    Modal,
    FormGroup,
    CardHeader,
    CardBody,
    CardFooter,
    ModalHeader,
    ModalBody,
    ModalFooter,
    CardTitle,
    Button,
    ButtonGroup,
    Label,
    Input,
    Table,
    ListGroup,
    ListGroupItem,
    Alert
} from 'reactstrap';


class SelectedPackage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            result: 'failure',
            // 'succsess',
            yourPick: ''
          };
    }


    render() {
        const isCurrent = this.state.yourPick 
        return (
            <div>
                
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">بسته منتخب </CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Alert color="primary">
                            <h4 className="alert-heading">توجه</h4>
                            <p>
                            لطفا پس از حصول اطمینان از انتخاب صحیح بسته، بر روی دکمه پرداخت کلیک کنید.
                            </p>
                            
                        </Alert>       
                        
                        <Card>
                         <CardHeader>
                            <CardTitle className="mb-0 font-weight-bold h6">   
                              <i className="fa fa-align-justify"></i><strong>  مشخصات خریدار </strong>
                            </CardTitle>
                         </CardHeader>
                         <CardBody>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col md='6'><strong>نام و نام‌خانوادگی</strong></Col>
                                        <Col md='6'><span>{this.props.data.username}</span></Col>
                                    </Row>  
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col md='6'><strong>ایمیل</strong></Col>
                                        <Col md='6'><span>{this.props.data.email}</span></Col>
                                    </Row>  
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col md='6'><strong> تلفن همراه</strong></Col>
                                        <Col md='6'><span>{this.props.data.other_info.mobile}</span></Col>
                                    </Row>  
                                </ListGroupItem>
                          
                             </ListGroup>
                         </CardBody>    
                        </Card>


                        <Card>
                         <CardHeader>
                            <CardTitle className="mb-0 font-weight-bold h6"> 
                                <i className="fa fa-align-justify"></i><strong> مشخصات بسته </strong>
                            </CardTitle>
                         </CardHeader>
                         <CardBody>
                            <ListGroup>
                                <ListGroupItem>
                                    <Row>
                                        <Col md='6'><strong> نام بسته</strong></Col>
                                        <Col md='6'><span></span></Col>
                                    </Row>  
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                                        <Col md='6'><span></span><span> ریال</span></Col>
                                    </Row>  
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col md='6'><strong>تعداد سنسور</strong></Col>
                                        <Col md='6'><span></span></Col>
                                    </Row>  
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col md='6'><strong>مهلت بسته</strong></Col>
                                        <Col md='6'><span></span></Col>
                                    </Row> 
                                </ListGroupItem>
                             </ListGroup>
                         </CardBody>    
                        </Card>


                        <Card>
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">   <i className="icon-basket-loaded icons"></i>  درگاه پرداخت   {isCurrent}   </CardTitle>
                            </CardHeader>
                            <CardBody>
                                    <Row>
                                        <Col md='2'>
                                            {/* <div className="p-3 mb-3 bg-primary">Primary</div> */}
                                            <div>
                                                <Input className="pay-input-style back2" type="radio" id="radio2"  
                                                       value="ملت"
                                                       onChange={this.paymentGateway.bind(this)}/>
                                                <Label check htmlFor="radio2"> </Label>
                                            </div>
                                        </Col>    
                                        <Col md='2'>
                                            <div >
                                                <Input className="pay-input-style back1" type="radio"  id="radio1"  
                                                       value='پارسیان'
                                                       onChange={this.paymentGateway.bind(this)}/>
                                                <Label check htmlFor="radio1">  </Label>
                                            </div>
                                        </Col>
                                        <Col md='2'>
                                            <div >
                                                <Input className="pay-input-style back3" type="radio" id="radio3" 
                                                       value="آینده"
                                                       onChange={this.paymentGateway.bind(this)}/>
                                                <Label check htmlFor="radio3"> </Label>
                                            </div>
                                        </Col> 
                                    </Row>  
                            </CardBody>    
                            </Card>

                    
                    
                    
                    
                    
                    
                         <Alert color="dark">
                            <Col md="9">
                                <div>
                                    <FormGroup check inline>
                                        <Input className="form-check-input" type="checkbox" id="inline-checkbox" name="inline-checkbox1" value="ok"/>
                                        <Label className="form-check-label" check htmlFor="inline-checkbox">  <span >  قوانین و مقررات را قبول می‌کنم.</span></Label>
                                    </FormGroup>
                                </div>
                                <div >
                                    <Row >
                                        <Col md='3'>
                                            <Button color="success">پرداخت از طریق بانک</Button>{' '}
                                        </Col>
                                        <Col md='3'>
                                          <Button color="secondary">انصراف</Button>{' '}
                                        </Col>  
                                    </Row>
                                </div>
                            </Col>
                         </Alert>
                    
                    
                    
                    
                    </CardBody>



                    {/* <CardFooter>
                        <Button color="primary">ثبت اطلاعات</Button>
                    </CardFooter> */}
                </Card>
            </div>
        );
    }
    paymentGateway(e) {
        this.setState({ yourPick: e.target.value })
    
      }
}

function select(state) {
    return {
      data: state.userReducer
    };
  }
export default connect(select)(SelectedPackage);
