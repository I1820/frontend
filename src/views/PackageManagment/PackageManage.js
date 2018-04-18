import React, {Component} from 'react';
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
} from 'reactstrap';
import {GoogleMap, Marker, withGoogleMap, withScriptjs} from "react-google-maps"
import connect from "react-redux/es/connect/connect";
import Spinner from "../Spinner/Spinner";


class PackageManage extends Component {

    constructor(props) {
        super(props);

        this.changeForm = this.changeForm.bind(this)

        this.state = {
           
        }
    }

    componentWillMount() {
   
    }

    render() {
        return (
            <div>
                <Spinner display={this.props.loading}/>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">اطلاعات بسته</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form>
                            <FormGroup row>
                                <Label sm={2}>نام بسته : </Label>
                                <Col sm={5}>
                                    <Input name="name" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}> تعداد سنسور : </Label>
                                <Col sm={5}>
                                    <Input name="sensor-num" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>  مهلت بسته : </Label>
                                <Col sm={5}>
                                    <Input name="Deadline-pack" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                            <FormGroup row>
                                <Label sm={2}>  مبلغ بسته (تومان)  : </Label>
                                <Col sm={5}>
                                    <Input name="Deadline-pack" onChange={this.changeForm} type="text"/>
                                </Col>
                            </FormGroup>
                           
                        </Form>
                    </CardBody>
                    <CardFooter>
                        <Button onClick={this.submitForm} color="primary">ثبت بسته</Button>
                    </CardFooter>
                </Card>

             
            </div>
        );
    }

  

    changeForm(event) {
        let state = {}
        state[event.target.name] = event.target.value
        this.setState({
            form: {
                ...this.state.form,
                ...state
            }
        })
    }


    callBack(){

    }
}


function mapStateToProps(state) {
    return {
        loading: state.homeReducer.currentlySending
    }
}

export default connect(mapStateToProps)(PackageManage);
