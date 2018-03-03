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
    Label,
    Input,
    Badge

} from 'reactstrap'
import h from './../helper'

class Packages extends Component {
    constructor(props) {
      super(props);
      
     }

            
    render(){
        console.log(this.chunkPackage)
        return (
            <Row>
              <Col>

                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست بسته‌ها</CardTitle>
                    </CardHeader>
                    <CardBody>
                    
                    <div className="animated fadeIn">
                      
                        <Row>
                        
                                

                        <Col xs="12" sm="6" md="4">
                            <Card className="border-primary">
                            <CardHeader>
                                Card outline primary
                            </CardHeader>
                            <CardBody>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                            </CardBody>
                            <CardFooter>
                            {/* onClick={() => this.props.dispatch(selectPackage(key))} */}
                                    <Button  color="primary"> خرید</Button>
                            </CardFooter>

                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="4">
                        <Card className="border-primary">
                            <CardHeader>
                                Card outline primary
                            </CardHeader>
                            <CardBody>
                                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut
                                laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation
                                ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat.
                            </CardBody>
                            <CardFooter>
                            {/* onClick={() => this.props.dispatch(selectPackage(key))} */}
                                    <Button  color="primary"> خرید</Button>
                            </CardFooter>

                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="4">
                        <Card className="border-primary">
                            <CardHeader>
                                Card outline primary
                            </CardHeader>
                            <CardBody>
                               
                            </CardBody>
                            <CardFooter>
                            {/* onClick={() => this.props.dispatch(selectPackage(key))} */}
                                    <Button  color="primary"> خرید</Button>
                            </CardFooter>

                            </Card>
                        </Col>
                        <Col xs="12" sm="6" md="4">
                        <Card className="border-primary">
                            <CardHeader>
                                Card outline primary
                            </CardHeader>
                            <CardBody>
                               
                            </CardBody>
                            <CardFooter>
                            {/* onClick={() => this.props.dispatch(selectPackage(key))} */}
                                    <Button  color="primary"> خرید</Button>
                            </CardFooter>

                            </Card>
                        </Col>
                      
                        </Row>
        
                       
                       
                       
                    </div>    
            
                    </CardBody>
                
                </Card>
              </Col>
            </Row>
    
           
        )
    }

}

  export default Packages;
 
