import React, {Component} from "react";
import Data from './packageData'
import {selectPackage} from '../../actions/AppActions'
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
    ListGroupItem

} from 'reactstrap'
import { connect } from 'react-redux';

class PackagesPage extends Component {
    constructor(props) {
        super(props);
        this.renderPackage = this.renderPackage.bind(this)
        this.state = {
            orders :[],
            packages: Data,
            loadThings: false,
            warning: false,
        };
    }
    renderPackage(key) {
        let details = this.state.packages[key];
        return (
            <Col xs="12" sm="6" md="4">
            <Card className="border-primary">
            <CardHeader>
                {details.packageName}
            </CardHeader>
            <CardBody>
               <ListGroup>
                  <ListGroupItem>
                      <Row>
                        <Col md='6'><strong> مبلغ قابل پرداخت</strong></Col>
                        <Col md='6'><span>{details.cost} </span><span> ریال</span></Col>
                      </Row>  
                 </ListGroupItem>
                  <ListGroupItem>
                      <Row>
                        <Col md='6'><strong>تعداد سنسور</strong></Col>
                        <Col md='6'><span>{details.sensor}</span></Col>
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
            {/* onClick={() => this.props.dispatch(selectPackage(key))}     onClick={this.selectedPackage}*/}
                    <Button  color="primary"  onClick={() => this.props.dispatch(selectPackage(key))} > 
                     <i className="icon-basket-loaded icons"></i> خرید
                    </Button>
            </CardFooter>

            </Card>
        </Col>
        )
    }
    render() {
        console.log(this.state.packages)
        return (
           
            <div className="animated fadeIn">
            <Row>
              <Col>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست بسته‌ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                    
                    <div className="animated fadeIn">
                      
                        <Row>
                        
                        {Object.keys(this.state.packages).map(( key) => this.renderPackage( key))}
                                
 
                        </Row>
        
                    </div>    
            
                    </CardBody>
                
                </Card>
              </Col>
            </Row>
    
            </div>
        )
    }

    // selectedPackage() {
    //     window.location = "#/selectedPackage/"
    // }
}
function select(state) {

    return {
    };
  }
  
  export default connect(select)(PackagesPage);

