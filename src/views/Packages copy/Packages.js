import React, {Component} from 'react'
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

} from 'reactstrap'
import h from './../helper'

class Packages extends Component {


    constructor(props) {
      super(props);
      this.renderRow = this.renderRow.bind(this)
      this.renderPackage = this.renderPackage.bind(this)
      this.chunkPackage = h.array_chunk(Object.keys(this.props.packages), 5);
    }

    renderPackage(key){
        let details = this.props.packages[key];
       console.log(key)
        return(
            // index={key} details={this.props.products[key] }  addToCart={this.props.addToCart} orders={this.props.orders}
            <Col key={key}>


            
                {/* <Package details={this.props.packages[key]} /> */}
                <Card  className="pointer card-accent-primary">
                    <CardHeader >    
                    <strong className="persian-style">{details.packageName}</strong>         
                    </CardHeader>
                    <CardBlock className="pack-card">
                        <p><strong className="persian-style"> مبلغ قابل پرداخت</strong>:<span className="persian-style">{details.cost} </span><span className="persian-style"> ریال</span></p>
                        <p><strong className="persian-style"> زمان خرید بسته</strong>:<span className="persian-style">{details.startTime}</span></p>
                        <p><strong className="persian-style"> زمان انقضا بسته</strong>:<span className="persian-style">{details.endTime}</span></p>
                        <p><strong className="persian-style">تعداد سنسور</strong>:<span className="persian-style">{details.sensor}</span></p>
                        <p><strong className="persian-style"> مهلت بسته</strong>:<span className="persian-style">{details.time}</span></p>    
                        <Row >
                            <Col></Col>
                            <Col>
                            {/* this.props.addToCart(this.props.index) */}
                               <Button   color="#108ee9" onClick={() => this.props.dispatch(selectPackage(key))}>
                                  <span  style={{color:"#255577"}}  className="persian-style">
                                      خرید
                                  </span>
                               </Button>
                            </Col>
                            <Col></Col>
                        </Row>
                    </CardBlock> 
                </Card> 
                </Col>
        );
    }

    renderRow(key) {
        return(
            <Row key={key}>
                {this.chunkPackage[key].map(this.renderPackage)}
            </Row>
        );
    }

    render(){
        console.log(this.chunkPackage)
        return (
            <Row>
                <Col>
                    <Row className="row-package">
                        <Card className="text-justify">
                            <CardHeader>
                                <CardTitle className="mb-0 font-weight-bold h6">لیست بسته‌ها</CardTitle>
                            </CardHeader>
                            <CardBody>
                                 {Object.keys(this.chunkPackage).map(this.renderRow)}
                            </CardBody>
                            
                        </Card>
                    </Row>
                </Col>
            </Row>
        )
    }

}

  export default Packages;
 