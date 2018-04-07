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
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Input,
  Table
} from 'reactstrap';
import {connect} from 'react-redux';
import {getUsersAction} from "../../actions/AppActions";
import Spinner from "../Spinner/Spinner";


class Users extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    componentWillReceiveProps(props) {
        if (props.users !== undefined) {
            this.setState({
                users: props.users,
            })
        }
    }

    render() {
        return (
            <div>
                <Card className="text-justify">
                    <CardHeader>
                        <CardTitle className="mb-0 font-weight-bold h6">لیست کاربران نرم افزار</CardTitle>
                    </CardHeader>
                    <CardBody>
                        <Form inline>
                            <FormGroup>
                                <Input type="text" placeholder="نام و نام خانوادگی" />
                            </FormGroup>
                            <FormGroup>
                                <Button type="submit" color="primary">
                                    <i className="icon-magnifier"></i> جستجو
                                </Button>
                            </FormGroup>
                        </Form>
                        <hr />
                        <Table hover responsive className="table-outline">
                            <thead className="thead-light">
                            <tr>
                                <th>#</th>
                                <th>نام و نام خانوادگی</th>
                                <th>آدرس ایمیل</th>
                                <th>شماره موبایل</th>
                            </tr>
                            </thead>
                            <tbody>
                                <td>1</td>
                                <td>احمد رضایی</td>
                                <td>ahmad@yahoo.com</td>
                                <td>09123336666</td>
                            </tbody>
                        </Table>
                    </CardBody>
                </Card>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return {
        users: state.userReducer,
    };
}


export default connect(mapStateToProps)(Users);
